const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { verify2fa } = require('../controllers/users/2fa/verify-2fa');
const { createUser } = require('../controllers/users/createUser');
const { getUser, getUsers } = require('../controllers/users/getUser');
const { updateUser } = require('../controllers/users/updateUser');
const { provideCode } = require('../controllers/users/secretCode/provideCode');
const { verify } = require('../controllers/users/secretCode/verifyCode');
const { verifyUser } = require('../controllers/users/resetPassowrd/verifyUser');
const { verifyCode } = require('../controllers/users/resetPassowrd/verifyCode');
const { updatePassword } = require('../controllers/users/resetPassowrd/updatePassword');
const router = express.Router();

router.get('/users',  getUsers);
router.get('/user/:uuid',  getUser);
router.put('/user/modify/:uuid', requireAuth, updateUser);
router.post('/user/register', createUser);

router.put('/user/add/secretcode/:uuid', requireAuth, provideCode);
router.post('/user/verify/secretcode/:uuid', requireAuth, verify);
router.post('/user/2fa/verify', requireAuth, verify2fa);

router.post('/user/password-reset/verify-user', verifyUser);
router.post('/user/password-reset/verify-code', verifyCode);
router.put('/user/password-reset', updatePassword);

module.exports = router;