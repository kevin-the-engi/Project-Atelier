const db = require('../../database');
const redis = require('redis');

const client = redis.createClient();
client.auth('sdcpass');

const getProductList = (req, res) => {
  let count = req.query.count || 5;
  let page = req.query.page || 1;
  const total = count * page + 1;
  const query = `SELECT * FROM ProductInfo WHERE id < ${total};`;

  db.query(query, (err, products) => {
    if (err) {
      res.sendStatus(404);
    }
    else {
      res.status(200).send(products);
    }
  })
};

const getProduct = (req, res) => {
  const productID = req.params.product_id;
  const query = `SELECT * FROM ProductInfo WHERE id=${productID};`;

  client.get('product' + productID, (err, data) => {
    if (err) {
      throw err;
    }

    if(data !== null) {
      res.status(200).send(JSON.parse(data));
    } else {
      db.query(query, (err, productInfo) => {
        if (err) {
          // console.log('Error getting ProductInfo');
          res.sendStatus(404);
        } else {
          const product = productInfo[0];

          getProductFeatures(productID, (err, features)=> {
            if (err) {
              // console.log(err);
              res.sendStatus(500);
            } else {
              product.default_price = product.default_price !== null ? product.default_price.toString() : '0';
              product.features = JSON.parse(features[0].features);

              const productStr = JSON.stringify(product);
              client.set('product' + productID, productStr);

              res.status(200).send(product);
            }
          })
        }
      })
    }
  })
};

const getProductFeatures = (productID, callback) => {
  const query =
    `SELECT
      JSON_ARRAYAGG(JSON_OBJECT("feature", feature, "value", feature_value)) AS features
        FROM ProductFeatures
        WHERE product_id=${productID};`;

  db.query(query, (err, productFeatures) => {
    if (err) {
      callback('Error getting ProductFeatures', null);
    } else {
      callback(null, productFeatures);
    }
  })
};

const getProductStyles = (req, res) => {
  const productID = req.params.product_id;
  const query = `SELECT * FROM ProductStyles WHERE product_id=${productID};`;

  client.get('pstyle' + productID, (err, data) => {
    if (err) {
      throw err;
    }

    if(data !== null) {
      res.status(200).send(JSON.parse(data));
    } else {
      db.query(query, (err, productStyles) => {
        if (err) {
          res.sendStatus(404);
        } else {
          let promises = [];
          let styles = [];

          productStyles.forEach(style => {
            let set = {};

            promises.push(
              new Promise((resolve, reject) => {
                getProductPhotos(style.id, (err, photos) => {
                  if (err) {
                    reject(err);
                  } else {
                    set.style_id = style.id,
                    set.name = style.name,
                    set.original_price = style.original_price.toString(),
                    set.sale_price = style.sale_price !== null ? style.sale_price.toString() : '0',
                    set["default?"] = Boolean(style.default),
                    set.photos = JSON.parse(photos[0].photos),
                    resolve(set);
                  }
                })
              })
              .then((set) => {
                return new Promise((resolve, reject) => {
                  getProductStock(set.style_id, (err, stock) => {
                    if (err) {
                      reject(err);
                    } else {
                      set.skus = JSON.parse(stock[0].skus);
                      styles.push(set);
                      resolve(set);
                    }
                  })
                })
              })
            )
          })

          Promise.all(promises)
            .then(() => {
              const product = {
                product_id: productID,
                results: styles
              }

              const productStr = JSON.stringify(product);
              client.set('pstyle' + productID, productStr);

              res.status(200).send(product);
            })
            .catch((err) => {
              // console.log(err);
              res.sendStatus(500);
            });
        }
      })
    }
  })
};

const getProductPhotos = (styleID, callback) => {
  const query = `SELECT JSON_ARRAYAGG(JSON_OBJECT("url", url, "thumbnail_url", thumbnail_url)) AS photos FROM ProductPhotos WHERE style_id=${styleID}`;

  db.query(query, (err, photos) => {
    if (err) {
      callback('Error getting ProductPhotos', null)
    } else {
      callback(null, photos);
    }
  })
};

const getProductStock = (styleID, callback) => {
  const query =
    `SELECT
      JSON_OBJECTAGG(id, JSON_OBJECT("quantity", quantity, "size", size)) AS skus
        FROM ProductStock
        WHERE style_id=${styleID};`;

  db.query(query, (err, stock) => {
    if (err) {
      callback('Error getting ProductStock', null);
    } else {
      callback(null, stock);
    }
  })
}

module.exports = {
  getProductList,
  getProduct,
  getProductStyles
}