// const sum = require('./sum');
const mysql = require('mysql');
const config = require('../config.js');

const db = mysql.createConnection(config);

describe('Database', () => {
  db.connect();

  // afterAll(() => {
  //   db.end();
  // })

  it('should let me run a query', (done) => {
    db.query('SELECT * FROM ProductInfo WHERE id=1;', (err, data) => {
      try {
        expect(data.length).toBe(1);
        done()
      } catch (err) {
        done(err);
      }
    });
  })

  it('should have tables for product info, features, photos, stock, and styles', (done) => {
    db.query('SHOW TABLES;', (err, data) => {
      data = JSON.parse(JSON.stringify(data));
      const tables = ['ProductFeatures', 'ProductInfo', 'ProductPhotos', 'ProductStock', 'ProductStyles'];
      const dataTables = data.map(table => tables.includes(table.Tables_in_Products))
      const tablesExist = dataTables.every(table => table === true);

      expect(data.length).toBe(5);
      expect(tablesExist).toBe(true);
      done();
    })
  })
});

describe('ProductInfo query', () => {
  // db.connect();

  afterAll(() => {
    db.end();
  })

  it('should have columns for id, name, slogan, description, category, and default_price', (done) => {
    db.query('SHOW COLUMNS FROM ProductInfo;', (err, data) => {
      try {
        data = JSON.parse(JSON.stringify(data));
        const fields = ['id', 'name', 'slogan', 'description', 'category', 'default_price'];
        const dataFields = data.map(column => fields.includes(column.Field));
        const fieldsExist = dataFields.every(field => field === true);

        expect(data.length).toBe(6);
        expect(fieldsExist).toBe(true);
        done();
      } catch (err) {
        done(err)
      }
    });
  });

  // it('should query the appropriate data for ProductInfo', () => {
  //   db.query
  // })
})