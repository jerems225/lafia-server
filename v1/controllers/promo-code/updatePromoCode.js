const promoCodeModel = require("../../models/promo-code-model");
const userModel = require("../../models/user-model");
const { validateId } = require("../businessLogic/validObjectId");

async function updatePromoCode(req, res)
{
    try
    {
        const code_uuid = req.params.code_uuid;
        const { code, promoPercent, userId } = req.body;
        const validId = validateId(userId);
        if(validId)
        {
            const user =  await userModel.findById(userId);
            if(user)
            {
                if(user.role == "admin")
                {
                    const promoCode = await promoCodeModel.findById(code_uuid);
                    if(promoCode)
                    {
                        const promoObject = {
                            code : code,
                            promoPercent : promoPercent,
                            updatedAt: new Date()
                        }

                        const updatePromo = await promoCodeModel.updateOne({ _id : code_uuid }, { $set : promoObject} );
                        if(updatePromo)
                        {
                            res.status(201).json({
                                status: 201,
                                message: "Promo code updated successfully !",
                                data: await promoCodeModel.findById(promoCode._id)
                            });
                        }
                        else
                        {
                            res.status(401).json({
                                status: 401,
                                message: "Somethings wrong, try again !",
                                data: null
                            });
                        }
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
                })
            }
        }
        else
        {
            res.status(500).json({
                status: 500,
                message: "INVALID ID",
                data: null
            })
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
    updatePromoCode : updatePromoCode
}