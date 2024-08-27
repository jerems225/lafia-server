const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { getProducts, getProduct, getAllProductsByOwner } = require('../controllers/products/getProduct');
const { createProduct } = require('../controllers/products/createProduct');
const { updateProduct } = require('../controllers/products/updateProduct');
const { deleteProduct } = require('../controllers/products/deleteProduct');
const { uploadImages } = require('../controllers/products/uploadImages');
const router = express.Router();

router.get('/products/:category_uuid', getProducts); //get all products
router.get('/products/owner/:owner_uuid', getAllProductsByOwner); //get all products by owner
router.get('/product/:product_uuid',  getProduct); //get product
router.post('/product/create', requireAuth, createProduct); //create new product
router.put('/product/modify/:product_uuid', requireAuth, updateProduct); //edit product
router.delete('/product/delete/:product_uuid/:user_uuid', requireAuth, deleteProduct); //remove product

router.post('/product/images/upload/:product_uuid', requireAuth, uploadImages); //upload file


module.exports = router;