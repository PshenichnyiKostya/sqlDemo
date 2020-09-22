const {Router} = require('express')
const workerSeqRouter = Router()
const workersSeqController = require('../controllers/worker.seq.controller')

workerSeqRouter.get('/', workersSeqController.getWorkers)

workerSeqRouter.get('/:id', workersSeqController.getWorker)
//
workerSeqRouter.delete('/:id', workersSeqController.deleteWorker)
//
workerSeqRouter.post('/', workersSeqController.addWorker)
//
workerSeqRouter.put('/:id', workersSeqController.updateWorker)
//
workerSeqRouter.post('/work/:idWork', workersSeqController.addWorkForWorker)
//
workerSeqRouter.delete('/work/:idWork', workersSeqController.deleteWorkForWorker)
//
workerSeqRouter.get('/work/all', workersSeqController.getAllWorksInfo)

module.exports = workerSeqRouter
