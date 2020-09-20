const express = require('express')
const app = express()
const config = require('config')
const PORT = config.get('port') || 3000
const bodyParser = require('body-parser');
const logger = require("morgan")
const workerRouter = require('./routes/worker.router')
const workRouter = require('./routes/work.router')
require('./databaseConnection')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(logger('dev'))
app.use('/api/worker', workerRouter)
app.use('/api/work', workRouter)
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(`Example app listening at http://localhost:${PORT}`)
    } catch (e) {
        console.error('Unable to connect to the database:', e);
    }
})