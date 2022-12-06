const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { createCustomer } = require('../controllers/customers/createCustomer');
const { deleteCustomer } = require('../controllers/customers/deleteCustomer');
const { getCustomer } = require('../controllers/customers/getCustomer');
const { updateCustomer } = require('../controllers/customers/updateCustomer');
const router = express.Router();

router.get('/customers',requireAuth,getCustomer); //get all customers
router.post('/customer/create', requireAuth,createCustomer); //create new customer
router.put('/customer/modify/:uuid',requireAuth,updateCustomer); //edit customer
router.delete('customer/delete/:uuid',requireAuth,deleteCustomer); //remove customer


module.exports = router;