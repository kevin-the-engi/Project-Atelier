const db = require('../../database');

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
          product.features = features
          res.status(200).send(product);
        }
      })
    }
  })
};

const getProductFeatures = (productID, callback) => {
  // const query =
  //   `SELECT feature, feature_value
  //     FROM ProductFeatures
  //     WHERE product_id=${productID};`;
  db.query(query, (err, productFeatures) => {
    if (err) {
      callback('Error getting ProductFeatures', null);
    } else {
      let features = productFeatures.map(feature => {
        let set = {
          feature: feature.feature,
          value: feature.feature_value
        }

        return set;
      })

      callback(null, features);
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
      console.log('Error getting ProductStyles');
      res.sendStatus(404);
    } else {
      // console.log(productStyles)

      new Promise((res, rej) => {
        let styles = productStyles.map(style => {
          let set = {
            style_id: style.id,
            name: style.name,
            original_price: style.original_price,
            sale_price: style.sale_price,
            "default?": Boolean(style.default),
            photos: []
          }

          new Promise((resolve, reject) => {
            getProductPhotos(set.style_id, (err, photos) => {
              if (err) {
                // console.log(err);
                reject(err);
              } else {
                // console.log(photos);
                // resolve(photos);
                // console.log(set)
                resolve(photos);

                // resolve(photos);
              }
            });

          })
          .then((photos) => {
            let items = photos.map(photo => {
              return {
                url: photo.url,
                thumbnail_url: photo.thumbnail_url
              }

            })
            set.photos = items;
            // console.log(set)
          })
          .catch(err => {
            console.log(err)
          })

          return set;
        })
        res(styles);
      }).then((styles) => {
        // let photoSets = photos;
        // photoSets.push(photos);
        console.log(styles);
        // var test = [];
        // test.push(styles);

        // console.log(test);
      // console.log(photos);
        // console.log(styles);

        // console.log(photoSets);
        // set.photos = photoSets;
        // return set;
      })
      res.sendStatus(200);
      // res.status(200).send(styles);
    }
  })
};

const getProductPhotos = (styleID, callback) => {
  const query = `SELECT url, thumbnail_url FROM ProductPhotos WHERE style_id = ${styleID};`;

  db.query(query, (err, productPhotos) => {
    if (err) {
      callback('Error getting ProductPhotos', null)
    } else {
      callback(null, productPhotos);
    }
  })
};

const getProductStock = (styleID, callback) => {

};

module.exports = {
  getProduct,
  getProductStyles
}