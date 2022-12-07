const userModel = require('../../models/user-model');

async function getUsers(req,res){
    const users = await userModel.find();
    res.status(201).json({
        status: 201,
        message: "Success",
        data: users
    });
}

module.exports = {
    getUsers : getUsers
}