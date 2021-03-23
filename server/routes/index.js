const express = require('express');
const controllers = require('../controllers');
const router = express.Router();

router.get('/', controllers.getProductList);
router.get('/:product_id', controllers.getProduct);
router.get('/:product_id/styles', controllers.getProductStyles);

module.exports = router;