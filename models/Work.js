const Sequelize = require('sequelize')
const db = require('../databaseConnection')
const Work = db.define('work', {

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
    }],
    freezeTableName: true,
    timestamps: false
})



module.exports = Work
