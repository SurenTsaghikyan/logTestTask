const { Sequelize, DataTypes } = require('sequelize');
const { DB, USER, PASSWORD, HOST, DIALECT } = require('../config')
const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: DIALECT
});
const Country = require('./Country')(sequelize, Sequelize)
const Number = require('./Number')(sequelize, Sequelize)
const User = require('./User')(sequelize, Sequelize)
const SendLog = require('./SendLog')(sequelize, Sequelize)

sequelize.sync({});

Number.belongsTo(Country, { onDelete: 'cascade' })
SendLog.belongsTo(User, { onDelete: 'cascade' })
SendLog.belongsTo(Number, { onDelete: 'cascade' })

module.exports = {
    Country,
    Number,
    User,
    SendLog,
    sequelize
}