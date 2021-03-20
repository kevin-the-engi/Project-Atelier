const fs = require('fs');
const readline = require('readline');
const validate = require('./validationFunctions');
const products = require('./validateProducts');

const readStyles = fs.createReadStream('./styles.csv', "utf8");
const writeStyles = fs.createWriteStream('./styles_clean.csv');
const styleSet = new Set();

readline.createInterface({
  input: readStyles,
  terminal: false
})
  .on('line', (line) => {
    let items = line.split(',');
    let fields = items.length;

    items[0] = validate.checkNum(items[0]);
    items[1] = validate.checkNum(items[1]);
    items[2] = validate.checkString(items[2]);
    items[3] = validate.checkPrice(items[3]);
    items[4] = validate.checkPrice(items[4]);
    items[5] = validate.checkBool(items[5]);

    let valid = !items.some(item => item === false);

    if (valid && fields === 6) {
      writeStyles.write(items.toString() + "\n");
    }
  })

module.exports = styleSet;

