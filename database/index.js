const mysql = require('mysql');
const config = require('./config.js');
// const database = require('./database.js');
// const styles = require('./styles.csv');
// const { Pool, Client } = require('pg');

// const db = new Client({
//   host: 'localhost',
//   user: 'postgres',
//   password: 'pass123',
//   database: 'products'
// })

const db = mysql.createConnection(config)

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database.');
  }
})

// db.query("SET search_path TO 'DOCUMENT';")

// id, name, slogan, description, category, default_price
// sqlDB.connect();
module.exports = db;