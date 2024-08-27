const userModel = require("../../../models/user-model");
const userResetPassword = require("../../../models/user-reset-password");
const sendMail = require("../../businessLogic/emails/send");
// const sendSms = require("../../businessLogic/sms/send");

function randomNumber(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

async function sendResetCode(userId) {
    try {
        const user = await userModel.findById(userId);
        const resetCode = randomNumber(1000, 9999);

        const newResetCode = new userResetPassword({
            userId: user._id,
            resetCode: resetCode,
            createdAt: new Date()
        });

        const saveCode = await newResetCode.save();
        if (saveCode) {
            if (user.email) {
                //send with email
                const subject = "Votre code de Réinitialisation du mot de passe !";
                const content = `Votre code de Réinitialisation du mot de passe : ${resetCode}`;
                sendMail(user.email, subject, content);
            }

            if (user.phone) {
                const phone = "2250701959933";
                const content = `Votre code de Réinitialisation du mot de passe : ${resetCode}`;
                //await sendSms(phone,content);
            }

            return true;
        }
        else {
            return false
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
    sendResetCode: sendResetCode
}