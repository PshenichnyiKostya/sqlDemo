const express = require('express')
const app = express()
const config = require('config')
const PORT = config.get('port') || 3000
const bodyParser = require('body-parser');
const logger = require("morgan")
const workerSQLRouter = require('./routes/worker.sql.router')
const workSQLRouter = require('./routes/work.sql.router')
const workSeqRouter = require('./routes/work.seq.router')
const workerSeqRouter = require('./routes/worker.seq.router')
const db = require('./databaseConnection')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(logger('dev'))
app.use('/sqlapi/worker', workerSQLRouter)
app.use('/sqlapi/work', workSQLRouter)
app.use('/seqapi/work', workSeqRouter)
app.use('/seqapi/worker', workerSeqRouter)
app.listen(PORT, async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        console.log(`Example app listening at http://localhost:${PORT}`)
    } catch (e) {
        console.error('Unable to connect to the database:', e);
    }
})