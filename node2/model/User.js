module.exports = (sequelize, Sequelize) => {

    return sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING
        },
        active: {
            type: Sequelize.TINYINT(1),
            defaultValue: true
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()')
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })
}