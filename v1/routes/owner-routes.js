const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { updateOwner } = require('../controllers/owners/updateOwner');
const { getOwners, getOwner } = require('../controllers/owners/getOwner');
const router = express.Router();

router.get('/owners', requireAuth, getOwners); //get all owners
router.get('/owner/:user_uuid', requireAuth, getOwner); //get owner
router.put('/owner/modify/:user_uuid', requireAuth, updateOwner); //edit owner


module.exports = router;