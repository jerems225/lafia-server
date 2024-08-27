const promoCodeModel = require("../../models/promo-code-model");
const userModel = require("../../models/user-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getPromoCodes(req, res)
{
    try
    {
        const user_uuid = req.query.user_uuid;
        if(validateId(user_uuid))
        {
            const user = await userModel.findById(user_uuid);
            if(user)
            {
                if(user.role == 'admin')
                {
                    res.status(201).json({
                        status: 201,
                        message: "Get all promo codes",
                        data: await promoCodeModel.find()
                    });
                }
                else
                {
                    res.status(401).json({
                        status: 401,
                        message: "This user cannot perform this endpoint !",
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
                message: "INVALID ID",
                data: null
            });
        }
    }
    catch(e)
    {
        res.status(500).json({
            status: 500,
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }

}

async function getPromoCode(req, res)
{
    try{
        const code_uuid = req.params.code_uuid;
        const user_uuid = req.params.user_uuid;
        if(validateId(code_uuid) && validateId(user_uuid))
        {
            const user = await userModel.findById(user_uuid);
            if(user)
            {
                if(user.role == 'admin')
                {
                    const promoCode = await promoCodeModel.findById(code_uuid)
                    if(promoCode)
                    {
                        res.status(201).json({
                            status: 201,
                            message: "Get promo code",
                            data: promoCode
                        });
                    }
                    else
                    {
                        res.status(401).json({
                            status: 401,
                            message: "Promo Code not found !",
                            data: null
                        });
                    }
                }
                else
                {
                    res.status(401).json({
                        status: 401,
                        message: "This user cannot perform this endpoint !",
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
                message: "INVALID ID",
                data: null
            });
        }
    }
    catch(e)
    {
        res.status(500).json({
            status: 500,
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }
}

module.exports = {
    getPromoCode : getPromoCode,
    getPromoCodes : getPromoCodes
}