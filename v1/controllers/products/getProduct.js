const categoryProductModel = require("../../models/category-product-model");
const productModel = require("../../models/product-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getProducts(req, res) {
    try {
        const category_uuid = req.params.category_uuid;
        const validId = validateId(category_uuid);
        if (validId) {
            const category = await categoryProductModel.findById(category_uuid);
            if (category) {
                res.status(201).json({
                    status: 201,
                    message: "All Products of this category !",
                    data: await productModel.find({ categoryProductId: category_uuid })
                });
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "Categroy Product not found !",
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

async function getProduct(req, res) {
    try {
        const product_uuid = req.params.product_uuid;
        const validId = validateId(product_uuid);
        if (validId) {
            const product = await productModel.findById(product_uuid);
            if (product) {
                res.status(201).json({
                    status: 201,
                    message: "All Products of this category !",
                    data: product
                });
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "Product not found !",
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
    getProducts: getProducts,
    getProduct: getProduct
}