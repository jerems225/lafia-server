const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { createRider } = require('../controllers/riders/createRider');
const { getRiders, getRider } = require('../controllers/riders/getRider');
const { updateRider } = require('../controllers/riders/updateRider');
const { deleteRider } = require('../controllers/riders/deleteRider');
const { uploadFiles } = require('../controllers/riders/uploadFiles');
const { onlineRider } = require('../controllers/riders/onlineRider');
const router = express.Router();

router.get('/riders', requireAuth, getRiders); //get all customers
router.get('/rider/:user_uuid', requireAuth, getRider) //get rider
router.post('/rider/create', requireAuth, createRider); //create new customer
router.put('/rider/modify/:user_uuid', requireAuth, updateRider); //edit customer
router.delete('/rider/delete/:user_uuid', requireAuth, deleteRider); //remove customer

router.post('/rider/files/upload/:user_uuid/', requireAuth, uploadFiles); //upload file

router.put('/rider/modify/online-status', requireAuth, onlineRider); //modify rider online status

module.exports = router;