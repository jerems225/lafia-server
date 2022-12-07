const userModel = require("../../models/user-model");
const { generatePassword } = require("../auth/auth");
const { validateId } = require("../businessLogic/validObjectId");

async function updateUser(req,res)
{
    const uuid = req.params.uuid;
    const { email, phone, referalCode, secretCode, referrer } = req.body;
    const validId = validateId(uuid);
    if(validId)
    {
        const user = await userModel.findById(uuid);
        if(user)
        {
            const updateUser = await userModel.updateOne({_id: uuid, $set: {
                        email: email,
                        phone: phone,
                        referalCode: referalCode,
                        secretCode: secretCode,
                        referrer: referrer,
                        createdAt: new Date(),
                    }}
                );
            if(updateUser)
            {
                res.status(201).json({
                    status: 201,
                    message: "User updated successfully !",
                    data: await userModel.findById(uuid)
                });
            }
            else
            {
                res.status(500).json({
                    status: 201,
                    message: "Somethings wrong, try again",
                    data: null
                });
            }
        }
        else
        {
            res.status(401).json({
                status: 401,
                message: "User not found !",
                data: null
            });
        }
    }
    else
    {
        res.status(500).json({
            status: 500,
            message: "Invalid ID",
            data: null
        });
    }

}

module.exports = {
    updateUser : updateUser
}