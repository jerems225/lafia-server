const userModel = require("../../../models/user-model");

async function removeUser(uuid)
{
    const removeUser = await userModel.remove({_id: uuid});
    if(removeUser)
    {
        return true;
    }
    else
    {
        return false;
    }
}

module.exports = {
    removeUser : removeUser
}