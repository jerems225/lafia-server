const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { addProductToCart } = require('../controllers/carts/createCart');
const { updateCart } = require('../controllers/carts/updateCart');
const { getCart } = require('../controllers/carts/getCart');
const { deleteOrderProduct } = require('../controllers/carts/deleteOrderProduct');
const router = express.Router();

router.post('/cart/addproduct', requireAuth, addProductToCart); //add product to cart
router.put('/cart/modify/products', requireAuth, updateCart); //update user cart
router.get('/cart/:user_uuid', requireAuth, getCart); //get user cart
router.delete('/cart/deleteproduct/:user_uuid/:product_uuid',requireAuth, deleteOrderProduct) //remove product in user cart

module.exports = router;