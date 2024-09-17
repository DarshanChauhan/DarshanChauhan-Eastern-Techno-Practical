module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.ENUM('admin', 'superAdmin', 'user', 'guest'), // Enum type || As well add in on constant file
            allowNull: false
        },
    }, {
        tableName: 'roles',
        timestamps: true,
    });

    return Role;
};
