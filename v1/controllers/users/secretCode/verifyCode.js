const userModel = require('../../../models/user-model');
const { validateId } = require('../../businessLogic/validObjectId');
const SECRET_CODE_MIN = 4;

async function verify(req,res)
{
    const uuid = req.params.uuid;
    const { secret_code } = req.body;
    const validId = validateId(uuid);
    if(validId)
    {
        if(!secret_code)
        {
            res.status(500).json({
                status: 500,
                message: "Secret code cannot be empty!",
                data: null
            });
        }
        else if(secret_code < SECRET_CODE_MIN)
        {
            res.status(500).json({
                status: 500,
                message: `Secret code must be ${SECRET_CODE_MIN} characters`,
                data: null
            });
        }
        else
        {
            const user = await userModel.findOne({_id: uuid});
            if(user)
            {
                if(user.secretCode == secret_code)
                {
                    res.status(201).json({
                        status: 201,
                        message: "secret code is correct!",
                        data: user
                    });
                }
                else
                {
                    res.status(401).json({
                        status: 401,
                        message: "Invalid secret code!",
                        data: null
                    });
                }
            }
            else
            {
                res.status(401).json({
                    status: 401,
                    message: "User not found!",
                    data: null
                });
            }
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
    verify : verify
}