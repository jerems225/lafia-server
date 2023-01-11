const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { verify2fa } = require('../controllers/users/2fa/verify-2fa');
const { createUser } = require('../controllers/users/createUser');
const { getUser, getUsers } = require('../controllers/users/getUser');
const { updateUser } = require('../controllers/users/updateUser');
const { provideCode } = require('../controllers/users/secretCode/provideCode');
const { verify } = require('../controllers/users/secretCode/verifyCode');
const router = express.Router();

router.get('/users', requireAuth, getUsers);
router.get('/user/:uuid', requireAuth, getUser);
router.put('/user/modify/:uuid', requireAuth, updateUser);
router.post('/register', createUser);

router.put('/user/add/secretcode/:uuid', requireAuth, provideCode);
router.post('/user/verify/secretcode/:uuid', requireAuth, verify);
router.post('/user/2fa/verify', requireAuth, verify2fa);

module.exports = router;