const fs = require('fs');
const readline = require('readline');
const validate = require('./validationFunctions');

const readProduct = fs.createReadStream('./product.csv', "utf8");
const writeProduct = fs.createWriteStream('./product_clean.csv');
const productSet = new Set();

readline.createInterface({
  input: readProduct,
  terminal: false
})
  .on('line', (line) => {
    let items = line.split(/,(?! )/g);

    if (items.length === 5 && items[4] !== undefined) {
      let split = items[4].split(',');
      items[4] = split[0];
      items.push(split[1]);
    }

    if (items[5] !== undefined) {
      items[5] = items[5].replace( /^\D+/g, '')
    }

    let fields = items.length;

    items[0] = validate.checkNum(items[0]);
    items[1] = validate.checkString(items[1]);
    items[2] = validate.checkString(items[2]);
    items[3] = validate.checkString(items[3]);
    items[4] = validate.checkString(items[4]);
    items[5] = validate.checkPrice(items[5]);

    productSet.add(items[0]);

    let valid = !items.some(item => item === false || item === NaN);

    if (valid && fields === 6) {
      writeProduct.write(items.toString() + "\n");
    }
  })

  module.exports = productSet;