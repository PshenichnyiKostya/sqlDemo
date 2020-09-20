const Sequelize = require('sequelize')

module.exports = sequelize.define('worker-work', {

    // id: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    // },

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
})