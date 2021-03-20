const fs = require('fs');
const readline = require('readline');
const validate = require('./validationFunctions');
const products = require('./validateProducts');

const readFeatures = fs.createReadStream('./features.csv', "utf8");
const writeFeatures = fs.createWriteStream('./features_clean.csv');

readline.createInterface({
  input: readFeatures,
  terminal: false
})
  .on('line', (line) => {
    let items = line.split(',');
    let fields = items.length;

    items[0] = validate.checkNum(items[0]);
    items[1] = validate.checkNum(items[1]);
    items[2] = validate.checkString(items[2]);

    if (fields > 4) {
      items[3] = validate.checkString(items[3] + ' ' + items[4]);
      items.pop();
      fields--;
    } else {
      items[3] = validate.checkString(items[3]);
    }

    let valid = !items.some(item => item === false);

    if (valid && fields === 4) {
      writeFeatures.write(items.toString() + "\n");
    }
  })
