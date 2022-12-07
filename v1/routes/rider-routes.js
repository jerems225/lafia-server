const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { createRider } = require('../controllers/riders/createRider');
const { getRiders, getRider } = require('../controllers/riders/getRider');
const { updateRider } = require('../controllers/riders/updateRider');
const { deleteRider } = require('../controllers/riders/deleteRider');
const router = express.Router();

router.get('/riders',requireAuth, getRiders); //get all customers
router.get('/rider/:rider_uuid',requireAuth,getRider) //get rider
router.post('/rider/create', requireAuth, createRider); //create new customer
router.put('/rider/modify/:rider_uuid',requireAuth, updateRider); //edit customer
router.delete('/rider/delete/:rider_uuid',requireAuth,deleteRider); //remove customer


module.exports = router;