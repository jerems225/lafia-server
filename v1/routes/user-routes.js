const express = require('express');
const { userValidator } = require('../controllers/users/createUser');
const createUser = require('../controllers/users/createUser');
const { getUsers } = require('../controllers/users/getUsers');
const router = express.Router();

router.get('/users',getUsers);

router.get('/user/:uid');

router.post('/user/register',userValidator(),createUser);

module.exports = router;