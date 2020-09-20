const Sequelize = require('sequelize')


const Worker = sequelize.define('worker', {

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
})

Worker.associate = (models) => {
    Worker.belongsToMany(models.Work, {
        through: 'worker_work',
        as: 'works',
        foreignKey: 'idWorker'
    })
}

module.exports = Worker