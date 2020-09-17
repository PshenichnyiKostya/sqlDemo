const config = require('config')
const SQL_DATA_BASE = config.get('database')
const mysql = require('mysql2')

const connection = mysql.createConnection(SQL_DATA_BASE)

connection.connect(function (err) {
    if (err) {
        return console.error("Error: " + err.message);
    } else {
        console.log("Connection with database ")
    }
})

module.exports = connection