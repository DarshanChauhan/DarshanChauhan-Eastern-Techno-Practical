require("dotenv").config(); // If you are using .env file for environment variables

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  dialect: process.env.DIALECT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false,
  dialectOptions: {},
});

// Authenticate the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully ✅");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Define models
const User = require("./user.model.js")(sequelize, Sequelize.DataTypes);
const Role = require("./role.model.js")(sequelize, Sequelize.DataTypes);
const Sessions = require("./session.model.js")(sequelize, Sequelize.DataTypes);

// Create associations
User.associate = (models) => {
  User.belongsTo(models.Role, {
    foreignKey: "roleId",
    as: "role",
  });
};
Role.associate = (models) => {
  Role.hasMany(models.User, {
    foreignKey: "roleId",
    as: "users",
  });
};

// Call the associate methods to create relationships
User.associate({ Role });
Role.associate({ User });

// Sync with the database
sequelize
  .sync({ force: false }) // Set `force: true` to drop and recreate tables
  .then(() => {})
  .catch((err) => {
    console.error("Error syncing the database:", err);
  });

// Export models and sequelize connection
module.exports = {
  User,
  Role,
  Sessions,
  sequelize,
  Sequelize,
};
