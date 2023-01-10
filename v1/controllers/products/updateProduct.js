const categoryProductModel = require("../../models/category-product-model");
const companyModel = require("../../models/company-model");
const productModel = require("../../models/product-model");
const { validateId } = require("../businessLogic/validObjectId")

async function updateProduct(req, res) {
    const product_uuid = req.param.product_uuid;
    const { name, description, price, categoryProductId, userId } = req.body
    const validId = validateId(product_uuid);
    if (validId) {
        const product = await productModel.findById(product_uuid);
        if (product) {
            const validCid = validateId(categoryProductId);
            if (validCid) {
                const category = await categoryProductModel.findById(categoryProductId)
                if (category) {
                    const company = await companyModel.findById(category.companyId);
                    if (company.ownerId == userId) {
                        const productObject = {
                            name: name,
                            description: description,
                            price: price,
                            categoryProductId: categoryProductId,
                            updatedAt: new Date()
                        }

                        const updateProduct = await productModel.updateOne({
                            _id: product_uuid, $set: productObject
                        }
                        );
                        if (updateProduct) {
                            res.status(201).json({
                                status: 201,
                                message: "product updated successfully !",
                                data: await productModel.findById(product_uuid)
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
                        message: "Category Product not found !",
                        data: null
                    });
                }
            }
            else {
                res.status(500).json({
                    status: 500,
                    message: "Invalid Category Product ID",
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
            message: "Invalid ID",
            data: null
        });
    }

}

module.exports = {
    updateProduct: updateProduct
}