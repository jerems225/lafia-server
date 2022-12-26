const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { deleteOwner } = require('../controllers/owners/deleteOwner');
const { updateOwner } = require('../controllers/owners/updateOwner');
const { createOwner } = require('../controllers/owners/createOwner');
const { getOwners, getOwner } = require('../controllers/owners/getOwner');
const router = express.Router();

router.get('/owners',requireAuth,getOwners); //get all owners
router.get('/owner/:owner_uuid',requireAuth,getOwner); //get owner
router.post('/owner/create', requireAuth,createOwner); //create new owner
router.put('/owner/modify/:owner_uuid',requireAuth,updateOwner); //edit owner
router.delete('/owner/delete/:owner_uuid',requireAuth,deleteOwner); //remove owner


module.exports = router;