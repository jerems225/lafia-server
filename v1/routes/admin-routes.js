const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { getAdmins, getAdmin } = require('../controllers/users/admins/getAdmin');
const { createAdmin } = require('../controllers/users/admins/createAdmin');
const { updateAdmin } = require('../controllers/users/admins/updateAdmin');
const { updatePassword } = require('../controllers/users/admins/updatePassword');

const router = express.Router();

router.get('/admins', requireAuth, getAdmins);
router.get('/admin/:admin_uuid/:user_uuid', requireAuth, getAdmin);
router.post('/admin/create/:user_uuid', requireAuth, createAdmin);
router.put('/admin/modify/:admin_uuid', requireAuth, updateAdmin);
router.put('/admin/modify/password/:admin_uuid', requireAuth, updatePassword);

module.exports = router;