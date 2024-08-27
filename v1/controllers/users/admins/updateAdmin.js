const userModel = require("../../../models/user-model");
const { validateId } = require("../../businessLogic/validObjectId");

async function updateAdmin(req, res) {
    try {
        const admin_uuid = req.params.admin_uuid;
        const { firstName, lastName, email, phone, role, userId } = req.body
        if (validateId(userId) && validateId(admin_uuid)) {
            const user = await userModel.findOne({ _id: userId, role: "admin" });
            if (user) {
                const admin = await userModel.findOne({ _id: admin_uuid, role: "admin" })
                if (admin) {
                    const updateUser = await userModel.updateOne({
                        _id: admin_uuid
                    }, {
                        $set: {
                            lastName: lastName,
                            firstName: firstName,
                            email: email,
                            phone: phone,
                            role: role,
                            updatedAt: new Date(),
                        }
                    }
                    );
                    if (updateUser) {
                        res.status(201).json({
                            status: 201,
                            message: "Admin updated successfully !",
                            data: await userModel.findOne({ _id: admin_uuid, role: "admin" })
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
                        message: "Admin not found !"
                    });
                }
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "User not found !",
                    data: null
                })
            }

        }
        else {
            res.status(500).json({
                status: 500,
                message: "INVALID ID",
                data: null
            })
        }

    }
    catch (e) {
        res.status(500).json({
            status: 500,
            message: `An error server try occurred, Please again or check the message error ${e.message}!`,
            data: e.message
        })
    }
}


module.exports = {
    updateAdmin: updateAdmin
}