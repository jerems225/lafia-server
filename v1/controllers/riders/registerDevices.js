const riderModel = require("../../models/rider-model");
const { validateId } = require("../businessLogic/validObjectId");

async function registerDevices(req, res) {
    const { token, user_uuid } = req.body;
    const validId = validateId(user_uuid);
    if (validId) {
        const rider = await riderModel.findOne({ userId: user_uuid });
        if (rider) {
            const riderToken = await riderModel.findOne({ riderDeviceTokens: token });
            if (!riderToken) {
                riderModel.findByIdAndUpdate(rider._id, { $push: { riderDeviceTokens: token } }, { new: true }, (err, result) => {
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
                                    message: "Rider Device Register Successfully !",
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
                message: "This user is not a Rider !",
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
    riderRegisterDevices: registerDevices
}