const {Router} = require('express')
const workRouter = Router()
const workController = require('../controllers/work.controller')

workRouter.get('/', workController.getWorks)

workRouter.get('/:id', workController.getWork)

workRouter.delete('/:id', workController.deleteWork)

workRouter.post('/', workController.addWork)

workRouter.put('/:id', workController.updateWork)

workRouter.delete('/worker/:idWorker', workController.deleteWorkerFromWork)

workRouter.get('/worker/all', workController.getAllWorkersInfo)

module.exports = workRouter