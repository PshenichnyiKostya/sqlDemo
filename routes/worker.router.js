const mysqlConnection = require('../dbConnection')
const {Router} = require('express')
const Worker = require('../models/Worker')
const workerRouter = Router()

workerRouter.get('/', async (req, res, next) => {
    mysqlConnection.query(Worker.GET_ALL_WORKERS, (err, rows) => {
        if (!err) {
            res.status(200).json(rows)
        } else {
            next(err)
        }
    })
})

workerRouter.get('/:id', async (req, res, next) => {
    mysqlConnection.query(Worker.GET_WORKER_BY_ID, [req.params.id], (err, rows) => {
        if (!err) {
            res.status(200).json(rows)
        } else {
            next(err)
        }
    })
})

workerRouter.delete('/:id', async (req, res, next) => {
    mysqlConnection.query(Worker.DELETE_WORKER_BY_ID, [req.params.id], (err, rows) => {
            if (!err) {
                if (rows.affectedRows) {
                    res.status(204).json(req.params.id)
                } else {
                    res.status(400).json({error: "Worker not found"})
                }
            } else {
                next(err)
            }
        }
    )
})

workerRouter.post('/', async (req, res, next) => {
    const {name, surname} = req.body
    mysqlConnection.query(Worker.POST_WORKER, [name, surname], (err, rows) => {
            if (!err) {
                res.status(201).json(rows.insertId)
            } else {
                next(err)
            }
        }
    )
})

workerRouter.put('/:id', async (req, res, next) => {
    const {name, surname} = req.body
    if (!name || !surname) {
        return res.status(400).json({error: "Enter all parameters"})
    }
    mysqlConnection.query(Worker.UPDATE_WORKER_BY_ID, [name, surname, req.params.id], (err, rows) => {
        if (!err) {
            console.log(rows)
            if (rows.affectedRows) {
                return res.status(200).json(req.params.id)
            } else {
                return res.status(400).json({error: "Worker not found"})
            }
        } else {
            next(err)
        }
    })
})

module.exports = workerRouter