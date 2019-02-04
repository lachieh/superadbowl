const Sequelize = require('sequelize');

module.exports = {
  development: {
    username: process.env.PRODUCTION_USERNAME || 'root',
    password: process.env.PRODUCTION_PASSWORD || 'root',
    database: process.env.PRODUCTION_DATABASE || 'superadbowl',
    host: process.env.PRODUCTION_HOST || '127.0.0.1',
    port: process.env.PRODUCTION_PORT || 3306,
    dialect: process.env.PRODUCTION_TYPE || 'mysql',
    operatorsAliases: Sequelize.Op,
  },
  production: {
    username: process.env.PRODUCTION_USERNAME,
    password: process.env.PRODUCTION_PASSWORD,
    database: process.env.PRODUCTION_DATABASE,
    host: process.env.PRODUCTION_HOST,
    port: process.env.PRODUCTION_PORT,
    dialect: process.env.PRODUCTION_TYPE,
    operatorsAliases: Sequelize.Op,
    dialectOptions: {
      ssl: true,
    },
  },
  session: {
    secret: process.env.PRODUCTION_SECRET || 'placeholdersecret',
    operatorsAliases: Sequelize.Op,
  },
};
