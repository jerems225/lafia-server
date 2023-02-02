const userModel = require('../../../models/user-model');
const { validateId } = require('../../businessLogic/validObjectId');
const SECRET_CODE_MIN = 4;

async function provideCode(req, res) {
    try {
        const uuid = req.params.uuid;
        const { secret_code } = req.body;
        const validId = validateId(uuid);
        if (validId) {
            if (!secret_code) {
                res.status(401).json({
                    status: 401,
                    message: "Secret code cannot be empty, try again",
                    data: null
                });
            }
            else if (secret_code < SECRET_CODE_MIN) {
                res.status(401).json({
                    status: 401,
                    message: `Secret code must be ${SECRET_CODE_MIN} characters`,
                    data: null
                });
            }
            else {
                const user = await userModel.findOne({ _id: uuid });
                if (user) {
                    const updateUser = await userModel.updateOne(
                        { _id: uuid },
                        {
                            $set: {
                                secretCode: secret_code
                            }
                        }
                    );

                    if (updateUser) {
                        res.status(201).json({
                            status: 201,
                            message: "User secret code created successfully!",
                            data: await userModel.findById(uuid)
                        });
                    }
                    else {
                        res.status(500).json({
                            status: 500,
                            message: "Somethings wrong, try again",
                            data: null
                        });
                    }
                }
                else {
                    res.status(401).json({
                        status: 401,
                        message: "User not found, try again with the correct uuid",
                        data: null
                    })
                }
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
    provideCode: provideCode
}