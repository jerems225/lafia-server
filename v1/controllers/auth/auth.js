require('dotenv').config()
const { JWT_SECRET_APP } = process.env;
const bcrypt = require('bcrypt');
const userModel = require('../../models/user-model');
const { randomString } = require('../businessLogic/registration');
const jwt = require('jsonwebtoken');

//encode password
async function generatePassword(plainTextPassword)
{
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
}

//generate jwt token
async function generateJWT(user) {
    return await jwt.sign(JSON.stringify(user), JWT_SECRET_APP);
}

//verify password and return boolean, ex: true for exact password
async function comparePasswords(plainTextPassword,hash)
{
    return await bcrypt.compare(plainTextPassword, hash);
}

async function generateReferalCode(){
    let referalCode = randomString(6);
    let existReferalCode = await userModel.findOne({referalCode: referalCode});
    //generate the new code if is exist
    while(existReferalCode != null){
        referalCode = randomString(6)
        existReferalCode = await userModel.findOne({referalCode: referalCode});
    }

    return referalCode;
}

async function loginUser(req,res){
    const { email, phone, password } = req.body;
    //verify email or phone (1)
    const user = await userModel.findOne({$or:[{email: email},{phone: phone}]});
    if(user)
    {
        //verify password (2)
        const verifyPassword = await comparePasswords(password,user.password);
        if(verifyPassword)
        {
            //generate token if (1) and (2) are success
            const jwt = await generateJWT(user);

            //return token
            res.status(201).json({
                status: 201,
                message: "User authenticate successfully",
                data: {
                    user:{
                        user
                    },
                    token: jwt
                }
            });
        }else
        {
            res.status(401).json({
                status: 401,
                message: "User cannot be authentify, wrong password"
            });
        }

    }
    else
    {
        res.status(401).json({
            status: 401,
            message: "User cannot be authentify, wrong email/phone"
        });
    }
}


module.exports = {
    generatePassword : generatePassword,
    generateReferalCode : generateReferalCode,
    generateJWT : generateJWT,
    loginUser : loginUser
}
