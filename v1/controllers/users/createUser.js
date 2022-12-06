const userModel = require('../../models/user-model');
const { generatePassword, generateReferalCode } = require('../auth/auth');
const { checkUserExist } = require('../businessLogic/registration');
const send2fa = require('./2fa/send-2fa');

async function createUser(req,res){

    const { email,password, phone, roles} = req.body
    const UserExist = await checkUserExist(req.body);

    if(UserExist)
    {
        res.status(401).json(
            UserExist
        )
    }
    else
    {
        const user = {
            email: email,
            password: await generatePassword(password),
            phone: phone,
            roles: roles,
            referalCode: await generateReferalCode(),
            secretCode: null,
            createdAt: new Date(),
        }
    
        //add data in database
        const data = new userModel(user);
        data.save( async (err,result)=>{
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
                    await send2fa(result._id);
                    res.status(201).json({
                        status : 201,
                        message : "user created successfully",
                        data : result
                    });
                } 
        });
    }

}

module.exports = {
    createUser : createUser
}