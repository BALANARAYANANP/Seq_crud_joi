const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
