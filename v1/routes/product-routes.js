const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { getProducts, getProduct } = require('../controllers/products/getProduct');
const { createProduct } = require('../controllers/products/createProduct');
const { updateProduct } = require('../controllers/products/updateProduct');
const { deleteProduct } = require('../controllers/products/deleteProduct');
const router = express.Router();

router.get('/products/:category_uuid', requireAuth, getProducts); //get all products
router.get('/product/:product_uuid', requireAuth, getProduct); //get product
router.post('/product/create', requireAuth, createProduct); //create new product
router.put('/product/modify/:product_uuid', requireAuth, updateProduct); //edit product
router.delete('/product/delete/:product_uuid/:user_uuid', requireAuth, deleteProduct); //remove product


module.exports = router;