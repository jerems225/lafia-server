const cartModel = require("../../models/cart-model");
const companyModel = require("../../models/company-model");
const orderModel = require("../../models/order-model");
const orderProductModel = require("../../models/order-product-model");
const promoCodeModel = require("../../models/promo-code-model");
const userModel = require("../../models/user-model");
const { totalAmount, generateOrderRef, generateDeliveryCode } = require("../businessLogic/order");
const { validateId } = require("../businessLogic/validObjectId");

async function createOrder(req, res)
{
    let { orderPromoCode, deliveryLocation, companyId, userId } = req.body;
    const validIdCompany = validateId(companyId);
    const validIdUser = validateId(userId);
    if(validIdCompany && validIdUser)
    {
        const user = await userModel.findById(userId);
        if(user)
        {
            const company = await companyModel.findById(companyId);
            if(company)
            {
                const cart = await cartModel.findOne({ customerId : userId, isValidated : false });
                if(cart)
                {
                    if(orderPromoCode)
                    {
                        const promoCode = await promoCodeModel.findOne({ code : orderPromoCode });
                        if(!promoCode)
                        {
                            res.status(401).json({
                                status: 401,
                                message: "Invalid Promo Code !",
                                data: null
                            });
                        }
                    }
                    else
                    {
                        orderPromoCode = null;
                    }


                    const orderProducts = await orderProductModel.find({ cartId : cart._id });
                    //create order
                    const orderObject = {
                        orderRef: await generateOrderRef(4),
                        customerId: userId,
                        amount: await totalAmount(orderProducts, orderPromoCode),
                        products: orderProducts,
                        orderPromoCode: orderPromoCode,
                        deliveryLocation: deliveryLocation,
                        deliveryCode: await generateDeliveryCode(4),
                        deliveryMark: null,
                        status: "pending",
                        companyId: companyId,
                        riderId: null,
                        createdAt: new Date()
                    }

                    const order = new orderModel(orderObject);
                    order.save(async (err, result) => {
                        if(err)
                        {
                            res.status(500).json({
                                status: 500,
                                message: "Somethings wrong, try again or check the error message",
                                data: err.message
                            })
                        }
                        else
                        {
                            //notify the company
                            //notify the driver by short current map position
                            //set status of cart
                            await cartModel.updateOne({_id : cart._id}, {$set : {
                                isValidated : true
                            }})
                            res.status(201).json({
                                status: 201,
                                message: "Order created successfully !",
                                data: result
                            })
                        }
                    });
                }
                else
                {
                    res.status(401).json({
                        status: 401,
                        message: "This user doesn't have a cart !",
                        data: null
                    });
                }
            }
            else
            {
                res.status(401).json({
                    status: 401,
                    message: "Company not found !",
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
    createOrder : createOrder
}