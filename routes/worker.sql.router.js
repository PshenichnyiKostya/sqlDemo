const {Router} = require('express')
const workerSqlRouter = Router()
const workerController = require('../controllers/worker.sql.controller')

workerSqlRouter.get('/', workerController.getWorkers)

workerSqlRouter.get('/:id', workerController.getWorker)

workerSqlRouter.delete('/:id', workerController.deleteWorker)

workerSqlRouter.post('/', workerController.addWorker)

workerSqlRouter.put('/:id', workerController.updateWorker)

workerSqlRouter.post('/work/:idWork', workerController.addWorkForWorker)

workerSqlRouter.delete('/work/:idWork', workerController.deleteWorkForWorker)

workerSqlRouter.get('/work/all', workerController.getAllWorksInfo)

module.exports = workerSqlRouter