const express = require('express');
const { createUser } = require('../controllers/users/createUser');
const { getUsers } = require('../controllers/users/getUsers');
const router = express.Router();

router.get('/users',getUsers);

router.get('/user/:uid',(req,res,next)=> {
    
});

router.post('/user/register',createUser);

module.exports = router;