const categoryProductModel = require("../../models/category-product-model");
const companyModel = require("../../models/company-model");
const productModel = require("../../models/product-model");
const { validateId } = require("../businessLogic/validObjectId");

async function deleteProduct(req, res) {
    const product_uuid = req.param.product_uuid;
    const user_uuid = req.param.user_uuid;
    const validIdProduct = validateId(product_uuid);
    const validIdUser = validateId(user_uuid);
    if (validIdProduct && validIdUser) {
        const product = await productModel.findById(product_uuid);
        if (product) {
            const category = await categoryProductModel.findById(product.categoryProductId);
            const company = await companyModel.findById(category.companyId);
            if (company.ownerId == user_uuid) {
                const deleteProduct = await productModel.deleteOne({ _id: product_uuid });
                if (deleteProduct) {
                    res.status(201).json({
                        status: 201,
                        message: "product deleted successfully !",
                        data: null
                    });
                }
                else {
                    res.status(500).json({
                        status: 201,
                        message: "Somethings wrong, try again",
                        data: null
                    });
                }
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "This user cannot perform this endpoint, you are not the owner !",
                    data: null
                });
            }
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
            message: "Invalid ID/ID's",
            data: null
        });
    }
}

module.exports = {
    deleteProduct : deleteProduct
}