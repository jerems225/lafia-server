const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { createOrder } = require('../controllers/orders/createOrder');
const { getOrdersByCompany, getOrdersByRider, getOrder } = require('../controllers/orders/getOrder');
const { cancelOrder } = require('../controllers/orders/cancelOrder');

const router = express.Router();

router.post('/order/create', requireAuth, createOrder); //create user order
router.get('/orders/company/:company_uuid', requireAuth, getOrdersByCompany) //get orders by company
router.get('/orders/rider/:rider_uuid', requireAuth, getOrdersByRider) //get orders by rider
router.get('/order/:order_uuid', requireAuth, getOrder) //get order
router.put('/order/cancel/:order_uuid', requireAuth, cancelOrder) //get orders by company

module.exports = router;