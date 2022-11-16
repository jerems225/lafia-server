const bcrypt = require('bcrypt');
const userModel = require('../../models/user-model');
const { randomString } = require('../businessLogic/registration');

async function generatePassword(plainTextPassword)
{
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
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


module.exports = {
    generatePassword : generatePassword,
    generateReferalCode : generateReferalCode
}
  