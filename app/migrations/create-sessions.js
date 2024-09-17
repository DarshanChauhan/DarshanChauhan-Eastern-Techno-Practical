module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('sessions', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          allowNull: false,
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        expiresAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    },
  
    down: async (queryInterface) => {
      await queryInterface.dropTable('sessions');
    },
  };
  