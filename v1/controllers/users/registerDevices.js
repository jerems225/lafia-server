const userModel = require("../../models/user-model");
const { validateId } = require("../businessLogic/validObjectId");

async function registerDevices(req, res) {
    try {
        const { token, user_uuid } = req.body;
        const validId = validateId(user_uuid);
        if (validId) {
            const user = await userModel.findOne({ _id: user_uuid });
            if (user) {
                const userToken = await userModel.findOne({ userDeviceTokens: token });
                if (!userToken) {
                    userModel.findByIdAndUpdate(user._id, { $push: { userDeviceTokens: token } }, { new: true }, (err, result) => {
                        if (err) {
                            res.status(500).json({
                                status: 500,
                                message: "Somethings wrong, try again",
                                data: null
                            });
                        }
                        else {
                            result.save((err, data) => {
                                if (err) {
                                    res.status(500).json({
                                        status: 500,
                                        message: "Somethings wrong, try again",
                                        data: null
                                    });
                                }
                                else {
                                    res.status(201).json({
                                        status: 201,
                                        message: "User Device Register Successfully !",
                                    });
                                }
                            })
                        }
                    })
                }
                else {
                    res.status(401).json({
                        status: 401,
                        message: "Device already register !",
                        data: null
                    });
                }
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "User not found !",
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
    userRegisterDevices: registerDevices
}