const {Router} = require('express')
const workSeqRouter = Router()
const workSeqController = require('../controllers/work.seq.controller')

workSeqRouter.get('/', workSeqController.getWorks)
workSeqRouter.get('/:id', workSeqController.getWork)
workSeqRouter.post('/', workSeqController.addWork)
workSeqRouter.put('/:id', workSeqController.updateWork)
workSeqRouter.delete('/:id', workSeqController.deleteWork)
workSeqRouter.delete('/worker/:idWorker', workSeqController.deleteWorkerFromWork)
workSeqRouter.get('/worker/all', workSeqController.getAllWorkersInfo)

module.exports = workSeqRouter
