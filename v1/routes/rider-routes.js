const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { createRider } = require('../controllers/riders/createRider');
const { getRider } = require('../controllers/riders/getRider');
const { updateRider } = require('../controllers/riders/updateRider');
const { deleteRider } = require('../controllers/riders/deleteRider');
const router = express.Router();

router.get('/riders',requireAuth, getRider); //get all customers
router.post('/rider/create', requireAuth, createRider); //create new customer
router.put('/rider/modify/:uuid',requireAuth, updateRider); //edit customer
router.delete('rider/delete/:uuid',requireAuth,deleteRider); //remove customer


module.exports = router;