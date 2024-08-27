const promoCodeModel = require("../../models/promo-code-model");
const userModel = require("../../models/user-model");
const { validateId } = require("../businessLogic/validObjectId");

async function createPromoCode(req, res)
{
    try
    {
        const { code, promoPercent, userId } = req.body;
        const validId = validateId(userId);
        if(validId)
        {
            const user =  await userModel.findById(userId);
            if(user)
            {
                if(user.role == "admin")
                {
                    const newPromoCode = new promoCodeModel({
                        code : code,
                        promoPercent: promoPercent,
                        createdAt: new Date()
                    })
    
                    newPromoCode.save((err, result) => {
                        if(err)
                        {
                            res.status(500).json({
                                status: 500,
                                message: "somethings wrong, try again later",
                                data: null
                            })
                        }
                        else
                        {
                            res.status(201).json({
                                status: 201,
                                message: "Promo Code created successfully !",
                                data: result
                            })
                        }
                    })
                }
                else
                {
                    res.status(401).json({
                        status: 401,
                        message: "This user cannot perform this endpoint !",
                        data: null
                    })
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
    createPromoCode : createPromoCode
}