const uuid = require('uuid');
const { check,validationResult } = require('express-validator');

function userValidator() {
    const checkName = check('name').not().isEmpty();

    return new Array(checkName);
}

async function createUser(req,res,next){
    validationResult(req);

    const { name } = req.body

    const user = {
        id: uuid.v4(),
        name: name
    }

    //add data in database
    //if true send response

    res.status(201).json({
        status : 201,
        message : "user created successfully",
        data : user
    });
}

module.exports = {
    createUser : createUser,
    userValidator : userValidator
}