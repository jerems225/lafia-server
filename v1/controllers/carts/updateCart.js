const cartModel = require("../../models/cart-model");
const orderProductModel = require("../../models/order-product-model");
const { validateId } = require("../businessLogic/validObjectId");

async function updateCart(req, res) {
    try {
        const { user_uuid, products } = req.body;
        const validId = validateId(user_uuid);
        if (validId) {
            const cart = await cartModel.findOne({ customerId: user_uuid, isValidated: false });
            if (cart) {
                products.forEach(async (product) => {
                    //get all orderproduct for this cart
                    const orderProduct = await orderProductModel.findOne({ productId: product.productId, cartId: cart._id })
                    //check if is products object
                    if (orderProduct) {
                        //if yes update it
                        updateProduct = await orderProductModel.updateOne({
                            _id: orderProduct._id
                        }, {
                            $set: {
                                quantity: product.quantity,
                                updatedAt: new Date(),
                            }
                        });

                        if (!updateProduct) {
                            res.status(401).json({
                                status: 401,
                                message: "Somethings wrong, with the update of a product, verify the productId !",
                                data: product
                            });
                        }
                    }
                });

                res.status(201).json({
                    status: 201,
                    message: "Cart updated successfully !",
                })
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "This doesn't have a cart !",
                    data: null
                });
            }
        }
        else {
            res.status(500).json({
                status: 500,
                message: "Invalid ID",
                data: null
            });
        }
    }
    catch (e) {
        res.status(500).json({
            status: 500,
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }

}

module.exports = {
    updateCart: updateCart
}