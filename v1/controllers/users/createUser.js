const uuid = require('uuid');
const userModel = require('../../models/user-models');
const { generatePassword } = require('../auth/auth');

async function createUser(req,res,next){

    const { email,password } = req.body

    const user = {
        email: email,
        password: await generatePassword(password)
    }

    //add data in database
    const data = new userModel(user);

    data.save((err,result)=>{
            if(err)
            {
                res.status(500).json({
                    status : 500,
                    message : "Somethings wrong, try again or check the error message",
                    data : err.message
                });
            }
            else
            {
                res.status(201).json({
                    status : 201,
                    message : "user created successfully",
                    data : result
                });
            } 
    });


}

module.exports = {
    createUser : createUser
}