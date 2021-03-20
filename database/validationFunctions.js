checkString = (item) => {
  if (typeof item !== 'string' || item.length === 0) {
    return false;
  } else if (item ==='null') {
    return 'NULL';
  } else {
    return item;
  }
}

checkNum = (item) => {
  if (typeof item === 'number') {
    return item
  } else if (!isNaN(Number(item))) {
    return Number(item);
  } else {
    return false;
  }
}

checkPrice = (item) => {
  if (item === 'null') {
    return 'NULL';
  } else if (Number(item) !== 0 || !isNaN(Number(item))) {
    return Number(item);
  } else {
    return false;
  }
}

checkSize = (item) => {
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  if (typeof item !== 'string') {
    return false;
  } else if (sizes.includes(item)) {
    return item;
  } else if (typeof Number(item) === 'number' && Number(item) !== 0) {
    return item;
  }
}

checkWebSite = (item) => {
  if (typeof item === 'string') {
    if (item.startsWith('"http://') || item.startsWith('"https://') || item.startsWith('"www.')) {
      if (!item.endsWith('"')) {
        return item + '"';
      } else {
        return item;
      }
    } else if (item.startsWith('"uhttp')) {
      let split = item.split('//');
      return 'https://' + split[1].slice(0, split[1].length - 1);
    } else {
      return false;
    }
  } else {
    return false;
  }
}

checkBool = (item) => {
  if (item === '0' || item === '1') {
    return Number(item);
  } else {
    return false;
  }
}

module.exports = {
  checkString,
  checkNum,
  checkPrice,
  checkSize,
  checkWebSite,
  checkBool
}