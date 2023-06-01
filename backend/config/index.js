require('dotenv').config();

module.exports = {
  HOST: process.env.MYSQL_HOST,
  PORT: process.env.MYSQL_PORT,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DB: process.env.MYSQL_DB,
  DIALECT: "mysql",
};