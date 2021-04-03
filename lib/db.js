const { Sequelize } = require('sequelize');
// you can choose to connect to sqlite here if you wish to
// also if you are using mysql on you local machine you need to update the credentials
const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL || 'mysql://root:elminster585@localhost/capstone-api', { logging: false });
module.exports = { sequelize };