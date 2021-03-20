const fs = require('fs');
const readline = require('readline');
const validate = require('./validationFunctions');
const styles = require('./validateStyles')

const readStock = fs.createReadStream('./skus.csv', "utf8");
const writeStock = fs.createWriteStream('./skus_clean.csv');

readline.createInterface({
  input: readStock,
  terminal: false
})
  .on('line', (line) => {
    let items = line.split(',');
    let fields = items.length;

    items[0] = validate.checkNum(items[0]);
    items[1] = validate.checkNum(items[1]);
    items[2] = validate.checkSize(items[2]);
    items[3] = validate.checkNum(items[3]);

    let valid = !items.some(item => item === false || item === NaN);

    if (valid && fields === 4) {
      writeStock.write(items.toString() + "\n");
    }
  })