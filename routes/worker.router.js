const {Router} = require('express')
const workerRouter = Router()
const workerController = require('../controllers/worker.controller')

workerRouter.get('/', workerController.getWorkers)

workerRouter.get('/:id', workerController.getWorker)

workerRouter.delete('/:id', workerController.deleteWorker)

workerRouter.post('/', workerController.addWorker)

workerRouter.put('/:id', workerController.updateWorker)

workerRouter.post('/work/:idWork', workerController.addWorkForWorker)

workerRouter.delete('/work/:idWork', workerController.deleteWorkForWorker)

workerRouter.get('/work/all', workerController.getAllWorksInfo)

module.exports = workerRouter