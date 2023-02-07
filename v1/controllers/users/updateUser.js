const userModel = require("../../models/user-model");
const { validateId } = require("../businessLogic/validObjectId");

async function updateUser(req, res) {
    try {
        const uuid = req.params.uuid;
        const { lastName, firstName, email, phone, referalCode, secretCode, referrer } = req.body;
        const validId = validateId(uuid);
        if (validId) {
            const user = await userModel.findById(uuid);
            if (user) {
                const updateUser = await userModel.updateOne({
                    _id: uuid
                }, {
                    $set: {
                        lastName: lastName,
                        firstName: firstName,
                        email: email,
                        phone: phone,
                        referalCode: referalCode,
                        secretCode: secretCode,
                        referrer: referrer,
                        updatedAt: new Date(),
                    }
                }
                );
                if (updateUser) {
                    res.status(201).json({
                        status: 201,
                        message: "User updated successfully !",
                        data: await userModel.findById(uuid)
                    });
                }
                else {
                    res.status(500).json({
                        status: 201,
                        message: "Somethings wrong, try again",
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
    updateUser: updateUser
}