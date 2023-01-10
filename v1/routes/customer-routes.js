const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { createCustomer } = require('../controllers/customers/createCustomer');
const { deleteCustomer } = require('../controllers/customers/deleteCustomer');
const { getCustomers, getCustomer } = require('../controllers/customers/getCustomer');
const { updateCustomer } = require('../controllers/customers/updateCustomer');
const router = express.Router();

router.get('/customers', requireAuth, getCustomers); //get all customers
router.get('/customer/:customer_uuid', requireAuth, getCustomer); //get customer
router.post('/customer/create', requireAuth, createCustomer); //create new customer
router.put('/customer/modify/:customer_uuid', requireAuth, updateCustomer); //edit customer
router.delete('/customer/delete/:customer_uuid', requireAuth, deleteCustomer); //remove customer


module.exports = router;