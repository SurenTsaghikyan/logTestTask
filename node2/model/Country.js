module.exports = (sequelize, Sequelize) => {

    return sequelize.define('Country', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: Sequelize.CHAR(2)
        },
        title: {
            type: Sequelize.STRING
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
