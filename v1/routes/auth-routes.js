const express = require('express');
const { Auth } = require('../controllers/auth/auth');
const router = express.Router();

router.post('/login',Auth);

module.exports = router;