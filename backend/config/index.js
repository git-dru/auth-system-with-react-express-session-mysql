require('dotenv').config();
const dbConfig = {
  HOST: process.env.MYSQL_HOST,
  PORT: process.env.MYSQL_PORT,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DB: process.env.MYSQL_DB,
  DIALECT: "mysql",
};
const SESSION = {
  COOKIE_KEY: "thisappisawesome"
};

const KEYS = {
  dbConfig,
  ...SESSION
};

module.exports = KEYS