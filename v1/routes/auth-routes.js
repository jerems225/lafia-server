const express = require('express');
const { loginUser } = require('../controllers/auth/auth');
const router = express.Router();

router.post('/auth', loginUser);

module.exports = router;