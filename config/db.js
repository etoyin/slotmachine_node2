// const mysql = require('mysql2');
// require('dotenv').config();

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to the MySQL database.');
// });

// module.exports = connection;


const { createPool } = require("mysql2");
require("dotenv").config();

let proEnv = process.env;
const pool = createPool({
  port: proEnv.DB_PORT,
  host: proEnv.DB_HOST,
  user: proEnv.DB_USER,
  password: proEnv.DB_PASSWORD,
  database: proEnv.MYSQL_DB
})

module.exports = pool;


