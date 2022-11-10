const express = require('express');
const bodyParser = require('body-parser');
const { getUsers } = require('../controllers/users/getUsers');
const router = express.Router();

router.get('/users',getUsers);

router.get('/user/:uid');

router.post('/user/register', bodyParser.json());

module.exports = router;