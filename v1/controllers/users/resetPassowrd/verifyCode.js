const userResetPassword = require("../../../models/user-reset-password");

async function verifyCode(req, res) {
    try {
        const resetCode = req.body.reset_code;
        const code = await userResetPassword.findOne({ resetCode: resetCode });
        if (code) {
            res.status(201).json({
                status: 201,
                message: " The Reset Password Code is correct !"
            });
        }
        else {
            res.status(401).json({
                status: 401,
                message: "The Reset Password code is expired !",
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
    verifyCode: verifyCode
}