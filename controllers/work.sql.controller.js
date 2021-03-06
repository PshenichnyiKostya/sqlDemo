const {QueryTypes} = require('sequelize')
const db = require('../databaseConnection')
module.exports = {
    getWorks: async (req, res, next) => {
        try {
            const DEFAULT_LIMIT = 100
            let limit = req.query.limit
            if (Number.isNaN(Number(limit))) {
                limit = DEFAULT_LIMIT
            }
            const works = await db.query(`SElECT * FROM work LIMIT ${limit}`, {
                type: QueryTypes.SELECT,
            })
            res.status(200).json({data: works})
        } catch (e) {
            next(e)
        }

    },
    getWork: async (req, res, next) => {
        try {
            const work = await db.query("SElECT * FROM work WHERE idWork=:id", {
                replacements: {id: req.params.id},
                type: QueryTypes.SELECT,
            })
            res.status(200).json({data: work})
        } catch (e) {
            next(e)
        }

    },
    deleteWork: async (req, res, next) => {
        try {

            await db.query("DELETE FROM worker_work WHERE (`idWork` = :idWork);", {
                replacements: {idWork: req.params.id},
                type: QueryTypes.DELETE,
            })
            await db.query("DELETE FROM work WHERE idWork=:id", {
                replacements: {id: req.params.id},
                type: QueryTypes.DELETE,
            })
            res.status(204).json()
        } catch (e) {
            next(e)
        }

    },
    addWork: async (req, res, next) => {
        try {
            const {name} = req.body
            if (!name) {
                return res.status(400).json({error: "Enter all parameters"})
            }
            const work = await db.query("INSERT INTO work (name) VALUES(:name)", {
                replacements: {name},
                type: QueryTypes.INSERT,
            })
            res.status(201).json({data: {id: work[0]}})
        } catch (e) {
            next(e)
        }


    },
    updateWork: async (req, res, next) => {
        try {
            const {name} = req.body
            if (!name) {
                return res.status(400).json({error: "Enter all parameters"})
            }
            const work = await db.query("UPDATE work SET name=:name WHERE idWork=:id", {
                replacements: {name, id: req.params.id},
                type: QueryTypes.UPDATE,
            })
            if (work[1]) {
                res.status(200).json({data: {id: req.params.id}})
            } else {
                res.status(404).json()
            }

        } catch (e) {
            next(e)
        }

    },
    deleteWorkerFromWork: async (req, res, next) => {
        try {
            const {idWork} = req.body
            if (!idWork) {
                return res.status(400).json({error: "Enter all parameters"})
            }
            await db.query("DELETE FROM worker_work WHERE (`idWorker` = :idWorker) and (`idWork` = :idWork);", {
                replacements: {idWorker: req.params.idWorker, idWork},
                type: QueryTypes.DELETE,
            })
            res.status(204).json()
        } catch (e) {
            next(e)
        }
    },
    getAllWorkersInfo: async (req, res, next) => {
        try {
            const {idWork} = req.body
            if (!idWork) {
                return res.status(400).json({error: "Enter all parameters"})
            }
            const jobs = await db.query("SElECT startWork,salary FROM worker_work WHERE idWork=:idWork", {
                replacements: {idWork},
                type: QueryTypes.SELECT,
            })
            const monthSalary = jobs.reduce((prev, cur) => prev + cur.salary, 0)
            res.status(200).json({data: {jobs, monthSalary}})
        } catch (e) {
            next(e)
        }
    }
}