const userModel = require('../../../models/user-model');
const doubleFactorModel = require('../../../models/user-2fa-model');
const { validateId } = require('../../businessLogic/validObjectId');

async function verify2fa(req, res) {
    const { uuid, doubleFactorCode } = req.body;
    //get user
    const validId = validateId(uuid);
    if (validId) {
        const user = await userModel.findOne({ _id: uuid });
        //get user code
        if (user) {
            const user2fa = await doubleFactorModel.findOne({ userId: user._id });
            //verifiy if token is not expired
            const currentTime = new Date();
            if (currentTime > user2fa.dateExpired) {
                //verify if code is correct
                if (user2fa.doubleFactorCode == doubleFactorCode) {
                    res.status(201).json({
                        status: 201,
                        message: "The 2FA code is correct !",
                        data: user
                    })
                }
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "The 2FA code is expired !",
                    data: null
                })
            }
        }
        else {
            res.status(401).json({
                status: 401,
                message: "User not found",
                data: null
            });
        }
    }
    else {
        res.status(500).json({
            status: 500,
            message: "Invalid ID",
            data: null
        });
    }
}

module.exports = {
    verify2fa: verify2fa
}