const Sequelize = require('sequelize')

const Work = sequelize.define('work', {

    idWork: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },

    name: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },

}, {
    indexes: [{
        unique: true,
        fields: ['name']
    }]
})

Work.associate = (models) => {
    Work.belongsToMany(models.Worker, {
        through: 'worker_work',
        as: 'workers',
        foreignKey: 'idWork'
    })
}


module.exports = Work