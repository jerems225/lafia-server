const doubleFactorModel = require('../../models/user-2fa-model');

//generate 2fa code
function generate2FACode(_start, _end) {
    return Math.floor(Math.random() * (_start - _end + 1) + _end)
}

//save new 2fa code
async function saveUser2Fa(doubleFactorObject) {
    //add data in database
    const data = new doubleFactorModel(doubleFactorObject);
    data.save(async (err, result) => {
        if (err) {
            return false
        }
        else {
            return true
        }
    });
}

//update current 2fa code
async function updateUser2Fa(doubleFactorObject) {
    const updateUserDoubleFactor = await doubleFactorModel.updateOne(
        { userId: doubleFactorObject.userId },
        {
            $set: {
                doubleFactorCode: doubleFactorObject.doubleFactorCode,
                dateExpired: doubleFactorObject.dateExpired,
                updatedAt: new Date()
            }
        }
    );

    if (updateUserDoubleFactor) {
        return true;
    }
    else {
        return false
    }
}

module.exports = {
    generate2FACode: generate2FACode,
    saveUser2Fa: saveUser2Fa,
    updateUser2Fa: updateUser2Fa
}