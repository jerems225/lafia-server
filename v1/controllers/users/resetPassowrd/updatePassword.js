const { isNull } = require("lodash");
const userModel = require("../../../models/user-model");
const { generatePassword } = require("../../auth/auth");
const { validateId } = require("../../businessLogic/validObjectId");
const sendMail = require("../../businessLogic/emails/send");

async function updatePassword(req, res)
{
    const { user_uuid, new_password } = req.body;
    const validId = validateId(user_uuid);
    if(validId)
    {
        if(isNull(new_password) || new_password == "")
        {
            res.status(401).json({
                status: 401,
                message: "new_password cannot be null or empty !"
            });
        }

        const updateUser = await userModel.updateOne({ _id: user_uuid }, { $set : {
            password : await generatePassword(new_password)
        }});

        if(updateUser)
        {
            const user = await userModel.findById(user_uuid);
            message = "Votre mot de passe a bien été réinitialisé, Merci à vous!";
            await sendMail(user.email, "réinitialisation du mot de passe", message );
            res.status(201).json({
                status: 201,
                message: "User Password Reset Successfully !",
                data: user
            })
        }
        else
        {
            res.status(500).json({
                status: 500,
                message: "Somethings wrong with the reset password process",
                data: null
            })
        }
    }
    else
    {
        res.status(500).json({
            status: 500,
            message: "Invalid ID",
            data: null
        })
    }
}

module.exports = {
    updatePassword : updatePassword
}