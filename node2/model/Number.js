module.exports = (sequelize, Sequelize) => {

    return sequelize.define('Number', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        number: {
            type: Sequelize.INTEGER
        },
        createdAt:{
            type: Sequelize.DATE,
            defaultValue:sequelize.literal('NOW()')
        },
    }, {
        timestamps: false,
        freezeTableName: true
    })
}
