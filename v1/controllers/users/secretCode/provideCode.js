const userModel = require('../../../models/user-model');
const SECRET_CODE_MIN = 4;

async function provideCode(req,res)
{
    const uuid = req.params.uuid;
    const { secret_code } = req.body;

    if(!secret_code)
    {
        res.status(401).json({
            status : 401,
            message : "Secret code cannot be empty, try again",
            data : null
        });
    }
    else if(secret_code < SECRET_CODE_MIN)
    {
        res.status(401).json({
            status : 401,
            message : `Secret code must be ${SECRET_CODE_MIN} characters`,
            data : null
        });
    }
    else
    {
        const user = await userModel.findOne({_id: uuid});
        if(user)
        {
            const updateUser = await userModel.updateOne(
                {_id: uuid},
                {$set: {
                    secretCode: secret_code
                }}
            );
    
            if(updateUser)
            {
                res.status(201).json({
                    status : 201,
                    message : "User secret code created successfully!",
                    data : await userModel.findById(uuid)
                });
            }
            else
            {
                res.status(500).json({
                    status : 500,
                    message : "Somethings wrong, try again",
                    data : null
                });
            }
        }
        else
        {
            res.status(401).json({
                status: 401,
                message: "User not found, try again with the correct uuid",
                data: null
            })
        }
    }


}

module.exports = {
    provideCode : provideCode
}