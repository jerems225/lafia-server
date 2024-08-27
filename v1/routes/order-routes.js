const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { createOrder } = require('../controllers/orders/createOrder');
const { getOrdersByCompany, getOrdersByRider, getOrder, getOrders, getOrdersByStatus, getOrdersByCustomer, getOrdersByOwner } = require('../controllers/orders/getOrder');
const { cancelOrder } = require('../controllers/orders/cancelOrder');

const router = express.Router();

router.post('/order/create', requireAuth, createOrder); //create user order
router.get('/orders/company/:company_uuid', requireAuth, getOrdersByCompany) //get orders by company
router.get('/orders/owner/:owner_uuid', requireAuth, getOrdersByOwner) //get orders by customer
router.get('/orders/customer/:user_uuid', requireAuth, getOrdersByCustomer) //get orders by customer
router.get('/orders/rider/:rider_uuid', requireAuth, getOrdersByRider) //get orders by rider
router.get('/orders-status', requireAuth, getOrdersByStatus) //get orders by status
router.get('/orders', requireAuth, getOrders) //get orders
router.get('/order/:order_uuid', requireAuth, getOrder) //get order
router.put('/order/cancel/:order_uuid', requireAuth, cancelOrder) //get orders by company

module.exports = router;