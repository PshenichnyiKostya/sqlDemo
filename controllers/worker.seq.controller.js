const Worker = require('../models/Worker')
const Work = require('../models/Work')
const Worker_Work = require('../models/Worker_Work')
module.exports = {
    getWorkers: async (req, res, next) => {
        try {
            const DEFAULT_LIMIT = 10000
            let limit = req.query.limit
            if (Number.isNaN(Number(limit))) {
                limit = DEFAULT_LIMIT
            }
            const workers = await Worker.findAll({limit: Number(limit)})
            res.status(200).json({data: workers})
        } catch (e) {
            next(e)
        }
    },
    getWorker: async (req, res, next) => {
        try {
            const worker = await Worker.findByPk(req.params.id)
            if (!worker) {
                return res.status(404).json({error: "Worker not found"})
            }
            return res.status(200).json({data: worker})
        } catch (e) {
            next(e)
        }

    },
    deleteWorker: async (req, res, next) => {
        try {

            await Worker_Work.destroy({where: {idWorker: req.params.id}})
            const worker = await Worker.findByPk(req.params.id)
            if (worker) {
                await worker.destroy()
                res.status(204).json({data: {id: req.params.id}})
            } else {
                res.status(404).json({error: "Worker not found"})
            }

        } catch (e) {
            next(e)
        }

    },
    addWorker: async (req, res, next) => {
        try {
            const {name, surname} = req.body
            if (!name || !surname) {
                return res.status(400).json({error: "Enter all parameters"})
            }
            try {
                const newWorker = await Worker.create({name, surname})
                return res.status(201).json({data: {id: newWorker.dataValues.idWorker}})
            } catch (e) {
                return res.status(400).json({error: "Enter correct parameters"})
            }

        } catch (e) {
            next(e)
        }
    },
    updateWorker: async (req, res, next) => {
        try {
            const {name, surname} = req.body
            if (!name || !surname) {
                return res.status(400).json({error: "Enter all parameters"})
            }
            const worker = await Worker.findByPk(req.params.id)

            if (worker) {
                await worker.update({name, surname})
                res.status(200).json({data: {id: worker.dataValues.idWorker}})
            } else {
                res.status(404).json({error: "Worker not found"})
            }

        } catch (e) {
            next(e)
        }


    },
    addWorkForWorker: async (req, res, next) => {
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

            const jobs = await Worker_Work.findAll({where: idWorker})

            const workingDay = jobs.reduce((prev, cur) => prev + cur.workDay, 0) + workDay
            if (workingDay > 20) {
                return res.status(400).json({error: `Worker can't add this job. Working day is more then 20h(${workingDay})`})
            }

            try {
                await Worker_Work.create({idWorker, idWork: req.params.idWork, workDay, salary, startWork})
                res.status(200).json()
            } catch (e) {
                return res.status(400).json({error: 'Can not add this job '})
            }

        } catch (e) {
            next(e)
        }
    },
    deleteWorkForWorker: async (req, res, next) => {
        try {
            const {idWorker} = req.body
            if (!idWorker) {
                return res.status(400).json({error: "Enter all parameters"})
            }
            await Worker_Work.destroy({where: {idWorker, idWork: req.params.idWork}})
            res.status(204).json()
        } catch (e) {
            next(e)
        }
    },
    getAllWorksInfo: async (req, res, next) => {
        try {
            const {idWorker} = req.body
            if (!idWorker) {
                return res.status(400).json({error: "Enter all parameters"})
            }

            const jobs = await Worker_Work.findAll({
                where: {idWorker}, attributes: ['idWork', 'salary', 'startWork'],
                include:[{
                    model: Work,
                    attributes:['name']
                }]
            })
            // let jobsFullInfo = []
            // for (let i = 0; i < jobs.length; i++) {
            //     let work = await Work.findByPk(jobs[i].idWork)
            //     jobsFullInfo.push({salary: jobs[i].salary, startWork: jobs[i].startWork, workName: work.name})
            // }
            const monthSalary = jobs.reduce((prev, cur) => prev + cur.salary, 0)
            res.status(200).json({data: {jobs, monthSalary}})
        } catch (e) {
            next(e)
        }
    }
}