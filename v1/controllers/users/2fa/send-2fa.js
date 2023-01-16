const userModel = require('../../../models/user-model');
const doubleFactorModel = require('../../../models/user-2fa-model');
const { generate2FACode, saveUser2Fa, updateUser2Fa } = require('../../businessLogic/2fa');
const sendMail = require('../../businessLogic/emails/send');
const sendSms = require('../../businessLogic/sms/send');
const { validateId } = require('../../businessLogic/validObjectId');

async function send2fa(uuid) {
    const validId = validateId(uuid);
    if (validId) {
        const user = await userModel.findOne({ _id: uuid });
        if (user) {
            const doubleFactor_code = generate2FACode(1000, 9999);
            if (user.email) {
                //send with email
                const subject = "Your verification Code !";
                const content = `Your verification code : ${doubleFactor_code}`;
                sendMail(user.email, subject, content);
            }

            if (user.phone) {
                const phone = "2250701959933";
                const content = `Your verification code : ${doubleFactor_code}`;
                //await sendSms(phone,content);
            }

            const user2fa = await doubleFactorModel.findOne({ userId: uuid });
            const doubleFactorObject = {
                doubleFactorCode: doubleFactor_code,
                dateExpired: new Date(),
                userId: uuid,
                createdAt: new Date()
            }
            if (!user2fa) {
                await saveUser2Fa(doubleFactorObject);
            }
            else {
                await updateUser2Fa(doubleFactorObject);
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

module.exports = send2fa;