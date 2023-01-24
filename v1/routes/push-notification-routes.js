const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { OwnerRegisterDevices } = require('../controllers/owners/registerDevices');
const { userRegisterDevices } = require('../controllers/users/registerDevices');
const { riderRegisterDevices } = require('../controllers/riders/registerDevices');

const router = express.Router();

router.post('/owner/registerdevice', requireAuth, OwnerRegisterDevices); //register owner device for receive notification
router.post('/user/registerdevices', requireAuth, userRegisterDevices);  //register user device for receive notification
router.post('/rider/registerdevices', requireAuth, riderRegisterDevices); //register rider device for receive notification

module.exports = router;