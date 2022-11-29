const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { createUser } = require('../controllers/users/createUser');
const { getUsers } = require('../controllers/users/getUsers');
const { provideCode } = require('../controllers/users/secretCode/provideCode');
const router = express.Router();

router.get('/users',requireAuth,getUsers);

router.get('/user/:uuid',(req,res,next)=> {
    
});

router.put('/user/secretcode/:uuid',requireAuth, provideCode)

router.post('/register',createUser);

module.exports = router;