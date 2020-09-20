const {Router} = require('express')
const workRouter = Router()
const {QueryTypes} = require('sequelize')

workRouter.get('/', async (req, res, next) => {
    try {
        const works = await sequelize.query("SElECT * FROM work", {
            type: QueryTypes.SELECT,
        })
        res.status(200).json({data: works})
    } catch (e) {
        next(e)
    }

})

workRouter.get('/:id', async (req, res, next) => {
    try {
        const work = await sequelize.query("SElECT * FROM work WHERE idWork=:id", {
            replacements: {id: req.params.id},
            type: QueryTypes.SELECT,
        })
        res.status(200).json({data: work})
    } catch (e) {
        next(e)
    }

})

workRouter.delete('/:id', async (req, res, next) => {
    try {
        await sequelize.query("DELETE FROM work WHERE idWork=:id", {
            replacements: {id: req.params.id},
            type: QueryTypes.DELETE,
        })
        res.status(204).json()
    } catch (e) {
        next(e)
    }

})

workRouter.post('/', async (req, res, next) => {
    try {
        const {name} = req.body
        if (!name) {
            return res.status(400).json({error: "Enter all parameters"})
        }
        const work = await sequelize.query("INSERT INTO work (name) VALUES(:name)", {
            replacements: {name},
            type: QueryTypes.INSERT,
        })
        res.status(201).json({data: {id: work[0]}})
    } catch (e) {
        next(e)
    }


})

workRouter.put('/:id', async (req, res, next) => {
    try {
        const {name} = req.body
        if (!name) {
            return res.status(400).json({error: "Enter all parameters"})
        }
        const work = await sequelize.query("UPDATE work SET name=:name WHERE idWork=:id", {
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

})

workRouter.delete('/worker/:idWorker', async (req, res, next) => {
    try {
        const {idWork} = req.body
        if (!idWork) {
            return res.status(400).json({error: "Enter all parameters"})
        }
        await sequelize.query("DELETE FROM worker_work WHERE (`idWorker` = :idWorker) and (`idWork` = :idWork);", {
            replacements: {idWorker: req.params.idWorker, idWork},
            type: QueryTypes.DELETE,
        })
        res.status(204).json()
    } catch (e) {
        next(e)
    }
})

workRouter.get('/worker/all', async (req, res, next) => {
    try {
        const {idWork} = req.body
        if (!idWork) {
            return res.status(400).json({error: "Enter all parameters"})
        }
        const jobs = await sequelize.query("SElECT startWork,salary FROM worker_work WHERE idWork=:idWork", {
            replacements: {idWork},
            type: QueryTypes.SELECT,
        })
        const monthSalary = jobs.reduce((prev, cur) => prev + cur.salary, 0)
        res.status(200).json({data: jobs, monthSalary})
    } catch (e) {
        next(e)
    }
})

module.exports = workRouter