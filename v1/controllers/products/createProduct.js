const categoryProductModel = require("../../models/category-product-model");
const companyModel = require("../../models/company-model");
const productModel = require("../../models/product-model");
const { validateId } = require("../businessLogic/validObjectId")

async function createProduct(req, res) {
    try {
        const { name, description, price, deliveryCost, makingTime, categoryProductId, userId } = req.body
        const validId = validateId(categoryProductId);
        if (validId) {
            const category = await categoryProductModel.findById(categoryProductId);
            if (category) {
                const company = await companyModel.findById(category.companyId);
                if (company.ownerId == userId) {
                    const productObject = {
                        name: name,
                        description: description,
                        price: price,
                        deliveryCost: deliveryCost,
                        makingTime: makingTime,
                        categoryProductId: categoryProductId,
                        createdAt: new Date()
                    }

                    const data = new productModel(productObject);
                    data.save(async (err, result) => {
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
                                message: "Product created successfully !",
                                data: result
                            })
                        }
                    })
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
    createProduct: createProduct
}