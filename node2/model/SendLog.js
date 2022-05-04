module.exports = (sequelize, Sequelize) => {

    return sequelize.define('SendLog', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        message: {
            type: Sequelize.STRING
        },
        success: {
            type: Sequelize.TINYINT(1),
            defaultValue: true
        },
        createdAt: {
            type: Sequelize.DATEONLY,
            defaultValue: sequelize.literal('NOW()')
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })
}