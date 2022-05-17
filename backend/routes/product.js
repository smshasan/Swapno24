const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');

const router = express.Router();

router.route('/createProduct').post(createProduct);
router.route('/getProducts').get(getProducts);


module.exports = router;