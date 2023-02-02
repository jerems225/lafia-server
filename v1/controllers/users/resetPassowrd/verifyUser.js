const userModel = require("../../../models/user-model");
const { sendResetCode } = require("./sendResetCode");

async function verifyUser(req, res) {
    try {
        const { email, phone } = req.body;

        const user = await userModel.findOne({ $or: [{ email: email }, { phone: phone }] });
        if (user) {
            const isCorrect = await sendResetCode(user._id);
            if (isCorrect) {
                res.status(201).json({
                    status: 201,
                    message: `User found successfully and reset password code sent to ${user.email}`,
                });
            }
            else {
                res.status(500).json({
                    status: 500,
                    message: "Somethings wrong !!",
                })
            }
        }
        else {
            res.status(401).json({
                status: 401,
                message: "This email/phone is not correspond to any user !",
            })
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
    verifyUser: verifyUser
}