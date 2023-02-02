const userModel = require('../../../models/user-model');
const doubleFactorModel = require('../../../models/user-2fa-model');
const { validateId } = require('../../businessLogic/validObjectId');

async function verify2fa(req, res) {
    try {
        const { uuid, doubleFactorCode } = req.body;
        //get user
        const validId = validateId(uuid);
        if (validId) {
            const user = await userModel.findOne({ _id: uuid });
            //get user code
            if (user) {
                const user2fa = await doubleFactorModel.findOne({ userId: user._id });
                //verifiy if token is not expired
                if (user2fa) {
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
    catch (e) {
        res.status(500).json({
            status: 500,
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }
}

module.exports = {
    verify2fa: verify2fa
}