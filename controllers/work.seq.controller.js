const Work = require('../models/Work')
const Worker_Work = require('../models/Worker_Work')

module.exports = {
    getWorks: async (req, res, next) => {
        try {
            const DEFAULT_LIMIT = 100
            let limit = req.query.limit
            if (Number.isNaN(Number(limit))) {
                limit = DEFAULT_LIMIT
            }
            const works = await Work.findAll({limit: Number(limit)})
            res.status(200).json({data: works})
        } catch (e) {
            next(e)
        }

    },
    getWork: async (req, res, next) => {
        try {
            const work = await Work.findByPk(req.params.id)
            if (!work) {
                return res.status(404).json({error: "Work not found"})
            }
            return res.status(200).json({data: work})
        } catch (e) {
            next(e)
        }

    },
    deleteWork: async (req, res, next) => {
        try {

            await Worker_Work.destroy({where: {idWork: req.params.id}})
            const work = await Work.findByPk(req.params.id)
            if (work) {
                await work.destroy()
                res.status(204).json({data: {id: req.params.id}})
            } else {
                res.status(404).json({error: "Work not found"})
            }

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
            try {
                const newWork = await Work.create({name})
                return res.status(201).json({data: {id: newWork.dataValues.idWork}})
            } catch (e) {
                return res.status(400).json({error: "Enter correct parameters"})
            }

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
            const work = await Work.findByPk(req.params.id)

            if (work) {
                await work.update({name})
                res.status(200).json({data: {id: work.dataValues.idWork}})
            } else {
                res.status(404).json({error: "Work not found"})
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
            await Worker_Work.destroy({where: {idWork, idWorker: req.params.idWorker}})
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
            const jobs = await Worker_Work.findAll({where: {idWork}, attributes: ['startWork', 'salary']})
            const monthSalary = jobs.reduce((prev, cur) =>
                prev + cur.dataValues.salary, 0)
            res.status(200).json({data: {jobs, monthSalary}})
        } catch (e) {
            next(e)
        }
    }
}