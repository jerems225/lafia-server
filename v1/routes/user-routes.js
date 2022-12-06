const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { createUser } = require('../controllers/users/createUser');
const { getUsers } = require('../controllers/users/getUsers');
const { provideCode } = require('../controllers/users/secretCode/provideCode');
const { verify } = require('../controllers/users/secretCode/verifyCode');
const router = express.Router();

router.get('/users',requireAuth,getUsers);

router.get('/user/:uuid',(req,res,next)=> {
    
});

router.post('/register',createUser);
router.put('/user/add/secretcode/:uuid',requireAuth, provideCode)
router.post('/user/verify/secretcode/:uuid', requireAuth, verify)

module.exports = router;