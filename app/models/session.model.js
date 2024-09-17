module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define(
      "Session",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'users', 
            key: 'id', 
          },
          allowNull: false,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        tableName: "sessions",
        timestamps: true,
      }
    );
  
    Session.associate = (models) => {
      Session.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    };
  
    return Session;
  };
  