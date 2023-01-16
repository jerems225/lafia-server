const cartModel = require("../../models/cart-model");
const orderProductModel = require("../../models/order-product-model");
const { validateId } = require("../businessLogic/validObjectId");

async function deleteOrderProduct(req, res)
{
    const user_uuid = req.params.user_uuid;
    const product_uuid = req.params.product_uuid;
    const validId = validateId(product_uuid);
    const validIdUser = validateId(user_uuid);
    if(validId && validIdUser)
    {
        const cart = await cartModel.findOne({ customerId : user_uuid, isValidated : false });
        if(cart)
        {
            const deleteProduct = await orderProductModel.deleteOne( { cartId : cart._id, productId : product_uuid });
            if(deleteProduct)
            {
                res.status(201).json({
                    status: 201,
                    message: "Order Product delete successfully in the user cart !",
                })
            }
            else
            {
                res.status(401).json({
                    status: 401,
                    message: "Somethings wrong wit the deletion of this product",
                    data: null
                });
            }
        }
        else
        {
            res.status(401).json({
                status: 401,
                message: "This doesn't have a cart !",
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
    deleteOrderProduct : deleteOrderProduct
}