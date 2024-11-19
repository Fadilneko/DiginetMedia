const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('diginet_media', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
