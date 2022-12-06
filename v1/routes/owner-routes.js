const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { deleteCustomer } = require('../controllers/customers/deleteCustomer');
const { updateCustomer } = require('../controllers/customers/updateCustomer');
const { createOwner } = require('../controllers/owners/createOwner');
const { getOwner } = require('../controllers/owners/getOwner');
const router = express.Router();

router.get('/owners',requireAuth,getOwner); //get all owners
router.post('/owner/create', requireAuth,createOwner); //create new owner
router.put('/owner/modify/:uuid',requireAuth,updateCustomer); //edit owner
router.delete('owner/delete/:uuid',requireAuth,deleteCustomer); //remove owner


module.exports = router;