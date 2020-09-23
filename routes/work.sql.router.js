const {Router} = require('express')
const workSqlRouter = Router()
const workController = require('../controllers/work.sql.controller')

workSqlRouter.get('/', workController.getWorks)
workSqlRouter.get('/:id', workController.getWork)
workSqlRouter.delete('/:id', workController.deleteWork)
workSqlRouter.post('/', workController.addWork)
workSqlRouter.put('/:id', workController.updateWork)
workSqlRouter.delete('/worker/:idWorker', workController.deleteWorkerFromWork)
workSqlRouter.get('/worker/all', workController.getAllWorkersInfo)

module.exports = workSqlRouter