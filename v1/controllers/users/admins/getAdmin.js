const userModel = require('../../../models/user-model');
const { validateId } = require('../../businessLogic/validObjectId');

async function getAdmins(req, res) {
    try {
        const user_uuid = req.query.user_uuid
        if (validateId(user_uuid)) {
            const user = await userModel.findOne({ _id: user_uuid, role: "admin" })
            if (user) {
                const admins = await userModel.find({ role: "admin" });
                res.status(201).json({
                    status: 201,
                    message: "All admins found Successfully",
                    data: admins
                });
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
            message: `An error server try occurred, Please again or check the message error ${e.message} !`,
            data: e.message
        })
    }

}

async function getAdmin(req, res) {
    try {
        const user_uuid = req.params.user_uuid;
        const admin_uuid = req.params.admin_uuid;
        if (validateId(user_uuid) && validateId(admin_uuid)) {
            const user = await userModel.findOne({ _id: user_uuid, role: "admin" });
            if (user) {
                const admin = await userModel.findOne({ _id: admin_uuid, role: "admin" })
                if (admin) {
                    res.status(201).json({
                        status: 201,
                        message: "User found !",
                        data: admin
                    });
                }
                else {
                    res.status(401).json({
                        status: 401,
                        message: "Admin not found !",
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
    getAdmin: getAdmin,
    getAdmins: getAdmins
}