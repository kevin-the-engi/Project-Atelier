const mysql = require('mysql');
const { Pool, Client } = require('pg');

// const db = new Client({
//   host: 'localhost',
//   user: 'postgres',
//   password: 'pass123',
//   database: 'products'
// })

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Products'
})

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database.');
  }
})

// const productCSV =
//   `LOAD DATA LOCAL INFILE '\\product.csv' INTO TABLE ProductInfo FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES;`

// db.query(productCSV, (err) => {
//   if (err) {
//     console.log('Error loading data', err);
//   } else {
//     console.log('Loading data successful')
//   }
// })
// db.query("SET search_path TO 'DOCUMENT';")

// id, name, slogan, description, category, default_price
// sqlDB.connect();
module.exports = db;