const express = require('express')
const app = express()
const config = require('config')
const PORT = config.get('port') || 3000
const bodyParser = require('body-parser');
const logger = require("morgan")
const workerRouter = require('./routes/worker.router')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(logger('dev'))
app.use('/api/worker', workerRouter)
app.listen(PORT, (err) => {
    if (err) {
        return console.error("Error: " + err.message);
    } else {
        console.log(`Example app listening at http://localhost:${PORT}`)
    }
})