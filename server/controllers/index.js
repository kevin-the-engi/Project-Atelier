const db = require('../../database');

const getProductList = (req, res) => {
  let count = req.query.count || 5;
  let page = req.query.page || 1;
  const total = count * page + 1;
  const query = `SELECT * FROM ProductInfo WHERE id < ${total};`;

  db.query(query, (err, products) => {
    if (err) {
      // console.log('Error getting Products');
      res.sendStatus(404);
    } else {
      res.status(200).send(products);
    }
  })

};

const getProduct = (req, res) => {
  const productID = req.params.product_id;
  const query = `SELECT * FROM ProductInfo WHERE id=${productID};`;
  // const query =
  //   `SELECT pi.*, pf.*
  //     FROM ProductInfo pi
  //       INNER JOIN ProductFeatures pf on pi.productID = pf.productID
  //     WHERE pi.productID = ${productID}`;
  // SELECT ps.id, ps.name, ps.sale_price, ps.original_price, ps.default_style, pp.url, pp.thumbnail_url, psk.id, psk.size, psk.quantity FROM ProductStyles ps INNER JOIN ProductPhotos pp ON ps.id = pp.style_id INNER JOIN ProductStock psk ON ps.id = psk.style_id WHERE ps.product_id = 1;

  db.query(query, (err, productInfo) => {
    if (err) {
      console.log('Error getting ProductInfo');
      res.sendStatus(404);
    } else {
      const product = productInfo[0];

      getProductFeatures(productID, (err, features)=> {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          product.default_price = product.default_price !== null ? product.default_price.toString() : '0';
          product.features = JSON.parse(features[0].features);
          res.status(200).send(product);
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
  // const query =
  //   `SELECT ps.id, ps.name, ps.sale_price, ps.original_price, ps.default_style, GROUP_CONCAT(DISTINCT pp.url, pp.thumbnail_url ORDER BY pp.url)
  //     FROM ProductStyles ps
  //       INNER JOIN ProductPhotos pp ON ps.id = pp.style_id
  //       WHERE ps.product_id = 1`;

  db.query(query, (err, productStyles) => {
    if (err) {
      // console.log('Error getting ProductStyles');
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
                // skus: JSON.parse(photos[0].skus)
                // styles.push(set);
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
          res.status(200).send(product);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    }
  })
};

const getProductPhotos = (styleID, callback) => {
  const query = `SELECT JSON_ARRAYAGG(JSON_OBJECT("url", url, "thumbnail_url", thumbnail_url)) AS photos FROM ProductPhotos WHERE style_id=${styleID}`;
  // const query =
  //   `SELECT
  //     JSON_OBJECTAGG(psk.id, JSON_OBJECT("quantity", psk.quantity, "size", psk.size)) AS skus,
  //     JSON_ARRAYAGG(JSON_OBJECT("url", pp.url, "thumbnail_url", pp.thumbnail_url)) AS photos
  //       FROM ProductStyles ps
  //         INNER JOIN ProductPhotos pp
  //           ON ps.id=pp.style_id
  //         INNER JOIN ProductStock psk
  //           ON ps.id=psk.style_id
  //       WHERE psk.style_id=${styleID} AND pp.style_id=${styleID}
  //       GROUP BY ps.id;`;

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