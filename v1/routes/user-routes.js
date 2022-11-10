const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.get('/users',(req,res,next) => {
    const users = [];
    res.json({
        status: 200,
        message: "success",
        data: users
    })
});

router.get('/user/:uid',(req,res,next) => {
    const uid = req.params.uid
    const user = {
        uid: uid
    }
    res.json({
        status: 200,
        message: "success",
        data: user
    });
});

router.post('/user/register',bodyParser.json(),(req,res) => {
    const body = req.body;
    console.log(body)
    res.json({
        status: 200,
        message: "success",
        data: body
    });
});

module.exports = router;