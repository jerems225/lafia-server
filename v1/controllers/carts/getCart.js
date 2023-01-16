const cartModel = require("../../models/cart-model");
const orderProductModel = require("../../models/order-product-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getCart(req, res)
{
    const user_uuid = req.params.user_uuid;
    const validId = validateId(user_uuid);
    if(validId)
    {
        const cart = await cartModel.findOne({ customerId : user_uuid, isValidated : false});
        if(cart)
        {
            res.status(201).json({
                status: 201,
                message: "User cart get successfully!",
                data: await orderProductModel.find({ cartId : cart._id })
            })
        }
        else
        {
            res.status(401).json({
                status: 401,
                message: "Sorry, your cart is empty!",
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
    getCart : getCart
}