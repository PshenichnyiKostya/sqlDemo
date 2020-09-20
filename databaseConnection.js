const {Sequelize} = require('sequelize')
const config = require('config')
const db = config.get('database')
const sequelize = new Sequelize(db?.database, db?.user, db?.password, {
    host: db?.host,
    dialect: db?.dialect
});

module.exports = sequelize

global.sequelize = sequelize