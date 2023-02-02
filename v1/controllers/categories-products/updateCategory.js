const categoryProductModel = require("../../models/category-product-model");
const companyModel = require("../../models/company-model");
const { validateId } = require("../businessLogic/validObjectId");

async function updateCategory(req, res) {
    try {
        const category_uuid = req.params.category_uuid;
        const { name, description, companyId, userId } = req.body;
        const validId = validateId(companyId);
        if (validId) {
            const company = await companyModel.findById(companyId);
            if (company) {
                if (company.ownerId == userId) {
                    const categoryProduct = await categoryProductModel.findById(category_uuid);
                    if (categoryProduct) {
                        const updateCategory = await categoryProductModel.updateOne({
                            _id: category_uuid
                        }, {
                            $set: {
                                name: name,
                                description: description,
                                updatedAt: new Date(),
                            }
                        }
                        );
                        if (updateCategory) {
                            res.status(201).json({
                                status: 201,
                                message: "Category Product updated successfully !",
                                data: await categoryProductModel.findById(category_uuid)
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
                            message: "Category not found!",
                            data: null
                        });
                    }
                }
                else {
                    res.status(401).json({
                        status: 401,
                        message: "This user is not allow to perform this endpoint, you needs to be the owner of this company",
                        data: null
                    });
                }

            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "Company not found !",
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
    updateCategory: updateCategory
}