const { default: mongoose } = require("mongoose");

function validateId(uuid)
{
    const validId = mongoose.isValidObjectId(uuid);
    if(validId)
    {
        return true;
    }
    else
    {
        return false;
    }
}

module.exports = {
    validateId : validateId
}