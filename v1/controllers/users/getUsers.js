const userModel = require('../../models/user-models');

async function getUsers(req,res, next){
    const uuid = req.uuid;
    //call access control function for authorised rule to perform this middleware
    //if true send datas
    const users = await userModel.find();

    res.status(200).json({
        status: 200,
        message: "Success",
        data: users
    });
}

module.exports = {
    getUsers
}