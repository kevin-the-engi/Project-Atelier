const fs = require('fs');
const readline = require('readline');
const validate = require('./validationFunctions');
const styles = require('./validateStyles');

const readPhotos = fs.createReadStream('./photos.csv', "utf8");
const writePhotos = fs.createWriteStream('./photos_clean.csv');

let id = 0;

readline.createInterface({
  input: readPhotos,
  terminal: false
})
  .on('line', (line) => {
    let items = line.split(',');
    let fields = items.length;

    items[0] = id;
    items[1] = validate.checkNum(items[1]);
    items[2] = validate.checkWebSite(items[2]);
    items[3] = validate.checkWebSite(items[3]);

    let valid = !items.some(item => item === false);

    if (valid && fields === 4) {
      writePhotos.write(items.toString() + "\n");
    }

    id++;
  })