const KEYS = require('./config')
const Sequelize = require('sequelize');


const sequelize = new Sequelize(KEYS.dbConfig.DB, KEYS.dbConfig.USER, KEYS.dbConfig.PASSWORD, {
  host: KEYS.dbConfig.HOST,
  dialect: KEYS.dbConfig.DIALECT
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;