const cartModel = require("../../models/cart-model");
const orderProductModel = require("../../models/order-product-model");
const productModel = require("../../models/product-model");
const { validateId } = require("../businessLogic/validObjectId");

async function createCart(user_uuid) {
    //create cart function
    const cartObject = {
        customerId: user_uuid,
        isValidated: false,
        createdAt: new Date()
    }

    const data = new cartModel(cartObject);
    data.save(async (err, result) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "Somethings wrong, try again or check the error message",
                data: err.message
            })
        }
        else {
            return result;
        }
    })
}


async function addProductToCart(req, res) {
    let { product_uuid, user_uuid, quantity } = req.body;
    const validId = validateId(user_uuid);
    const validIdProduct = validateId(product_uuid);
    if (validId && validIdProduct) {
        const product = await productModel.findById(product_uuid);
        if (product) {
            let cart = await cartModel.findOne({ customerId: user_uuid, isValidated: false });

            if (!cart) {
                //create new cart
                cart = await createCart(user_uuid);
            }
            //add new Order product
            const existOrderProduct = await orderProductModel.findOne({ productId: product_uuid, cartId: cart._id })
            if (existOrderProduct) {
                const updateOrderProduct = await orderProductModel.updateOne({ _id : existOrderProduct._id}, {$set : {
                    quantity : quantity + existOrderProduct.quantity
                }});

                if(updateOrderProduct)
                {
                    res.status(201).json({
                        status: 201,
                        message: "Product Add successfully in your cart !",
                        data: await orderProductModel.find({ cartId: cart._id, productId: product_uuid })
                    })
                }
                else
                {
                    res.status(500).json({
                        status: 500,
                        message: "Somethings wrong, try again or check the error message",
                        data: err.message
                    })
                }
            }
            else
            {
                const orderProduct = new orderProductModel({
                    productId: product_uuid,
                    product: await productModel.findById(product_uuid),
                    quantity: quantity,
                    cartId: cart._id
                });
    
                orderProduct.save(async (err, result) => {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Somethings wrong, try again or check the error message",
                            data: err.message
                        })
                    }
                    else {
                        res.status(201).json({
                            status: 201,
                            message: "Product Add successfully in your cart !",
                            data: await orderProductModel.find({ cartId: cart._id, productId: product_uuid })
                        })
                    }
                });
            }
            

        }
        else {
            res.status(401).json({
                status: 401,
                message: "product not found!",
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

module.exports = {
    addProductToCart : addProductToCart
}