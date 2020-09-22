const Sequelize = require('sequelize')
const db = require('../databaseConnection')
const Work = require('../models/Work')
const Worker = require('../models/Worker')

const Worker_Work = db.define('worker_work', {

    idWorker: {
        type: Sequelize.INTEGER,
        references: {model: 'worker', key: 'idWorker'},
        onDelete: 'CASCADE',
        allowNull: false,
        primaryKey: true,
    },

    idWork: {
        type: Sequelize.INTEGER,
        references: {model: 'work', key: 'idWork'},
        onDelete: 'CASCADE',
        allowNull: false,
        primaryKey: true,
    },

    workDay: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    startWork: {
        type: Sequelize.DATE,
        allowNull: false,
    },

    salary: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false
})


// Worker.belongsToMany(Work, {
//     through: 'worker_work',
//     // as: 'works',
//     foreignKey: 'idWorker'
// })
// Work.belongsToMany(Worker, {
//     through: 'worker_work',
//     // as: 'workers',
//     foreignKey: 'idWork'
// })

Worker_Work.hasMany(Work, {foreignKey: 'idWork', sourceKey: 'idWork'})
Worker_Work.hasMany(Worker, {foreignKey: 'idWorker', sourceKey: 'idWorker'})
module.exports = Worker_Work