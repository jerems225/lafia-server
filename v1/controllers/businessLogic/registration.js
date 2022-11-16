const userModel = require('../../models/user-model');

async function checkUserExist(body){
    const user = await userModel.findOne({ $or:[{email:body.email},{phone:body.phone}] });
    if(user)
    {
        if(user.email === body.email)
        {
            return {
                status: 401,
                message: "This email is already in used, try another one",
                data: null
            }
        }
        else
        {
            return {
                status: 401,
                message: "This phone is already in used, try another one",
                data: null
            };
        }
    }
    else
    {
        return false;
    }

}

function randomString(length){

    // declare all characters
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;

}

module.exports = {
    checkUserExist : checkUserExist,
    randomString : randomString
}