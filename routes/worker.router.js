const {Router} = require('express')
const workerRouter = Router()
const {QueryTypes} = require('sequelize')

workerRouter.get('/', async (req, res, next) => {
    try {
        const workers = await sequelize.query("SElECT * FROM worker", {
            type: QueryTypes.SELECT,
        })
        res.status(200).json({data: workers})
    } catch (e) {
        next(e)
    }

})

workerRouter.get('/:id', async (req, res, next) => {
    try {
        const worker = await sequelize.query("SElECT * FROM worker WHERE idWorker=:id", {
            replacements: {id: req.params.id},
            type: QueryTypes.SELECT,
        })
        res.status(200).json({data: worker})
    } catch (e) {
        next(e)
    }

})

workerRouter.delete('/:id', async (req, res, next) => {
    try {
        await sequelize.query("DELETE FROM worker WHERE idWorker=:id", {
            replacements: {id: req.params.id},
            type: QueryTypes.DELETE,
        })
        res.status(204).json()
    } catch (e) {
        next(e)
    }

})

workerRouter.post('/', async (req, res, next) => {
    try {
        const {name, surname} = req.body
        if (!name || !surname) {
            return res.status(400).json({error: "Enter all parameters"})
        }
        const worker = await sequelize.query("INSERT INTO worker (name, surname) VALUES(:name,:surname)", {
            replacements: {name, surname},
            type: QueryTypes.INSERT,
        })
        res.status(201).json({data: {id: worker[0]}})
    } catch (e) {
        next(e)
    }


})

workerRouter.put('/:id', async (req, res, next) => {
    try {
        const {name, surname} = req.body
        if (!name || !surname) {
            return res.status(400).json({error: "Enter all parameters"})
        }
        const worker = await sequelize.query("UPDATE worker SET name=:name, surname=:surname WHERE idWorker=:id", {
            replacements: {name, surname, id: req.params.id},
            type: QueryTypes.UPDATE,
        })

        if (worker[1]) {
            res.status(200).json({data: {id: req.params.id}})
        } else {
            res.status(404).json()
        }

    } catch (e) {
        next(e)
    }

})
// DELETE FROM `workersdb`.`worker_work` WHERE (`idWorker` = '5') and (`idWork` = '5');
//Add work for worker
workerRouter.post('/work/:idWork', async (req, res, next) => {
    try {
        const {idWorker, salary, workDay} = req.body
        if (!idWorker || !salary || !workDay) {
            return res.status(400).json({error: "Enter all parameters"})
        }
        if (workDay > 20 || workDay < 1) {
            return res.status(400).json({error: "Working day can be from 1 to 20 hours"})
        }
        let startWork = req.body.startWork
        startWork = startWork ? startWork : new Date()
        const jobs = await sequelize.query("SElECT * FROM worker_work WHERE idWorker=:idWorker", {
            replacements: {idWorker},
            type: QueryTypes.SELECT,
        })
        const workingDay = jobs.reduce((prev, cur) => prev + cur.workDay, 0) + workDay
        if (workingDay > 20) {
            return res.status(400).json({error: `Worker can't add this job. Working day is more then 20h(${workingDay})`})
        }
        await sequelize.query("INSERT INTO worker_work (`idWorker`, `idWork`, `workDay`, `startWork`,`salary`) VALUES (:idWorker, :idWork, :workDay, :startWork,:salary)", {
            replacements: {idWorker, idWork: req.params.idWork, workDay, salary, startWork},
            type: QueryTypes.INSERT,
        })
        res.status(200).json()
    } catch (e) {
        next(e)
    }
})

workerRouter.delete('/work/:idWork', async (req, res, next) => {
    try {
        const {idWorker} = req.body
        if (!idWorker) {
            return res.status(400).json({error: "Enter all parameters"})
        }
        await sequelize.query("DELETE FROM worker_work WHERE (`idWorker` = :idWorker) and (`idWork` = :idWork);", {
            replacements: {idWork: req.params.idWork, idWorker},
            type: QueryTypes.DELETE,
        })
        res.status(204).json()
    } catch (e) {
        next(e)
    }
})

workerRouter.get('/work/all', async (req, res, next) => {
    try {
        const {idWorker} = req.body
        if (!idWorker) {
            return res.status(400).json({error: "Enter all parameters"})
        }
        const jobs = await sequelize.query("SElECT startWork,salary,work.name FROM worker_work INNER JOIN work ON work.idWork=worker_work.idWork WHERE idWorker=:idWorker", {
            replacements: {idWorker},
            type: QueryTypes.SELECT,
        })
        const monthSalary = jobs.reduce((prev, cur) => prev + cur.salary, 0)
        res.status(200).json({data: jobs, monthSalary})
    } catch (e) {
        next(e)
    }
})

module.exports = workerRouter