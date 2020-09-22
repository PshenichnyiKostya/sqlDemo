const Sequelize = require('sequelize')
const db = require('../databaseConnection')

const Worker = db.define('worker', {

    idWorker: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        type: Sequelize.STRING(10),
        allowNull: false,
    },

    surname: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = Worker