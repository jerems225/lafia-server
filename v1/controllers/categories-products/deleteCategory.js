const categoryProductModel = require("../../models/category-product-model");
const companyModel = require("../../models/company-model");
const { validateId } = require("../businessLogic/validObjectId");

async function deleteCategory(req, res) {
    const category_uuid = req.params.category_uuid;
    const user_uuid = req.params.user_uuid;
    const validId = validateId(category_uuid);
    if (validId) {
        const category = await companyModel.findById(category_uuid);
        if (category) {
            const company = await companyModel.findOne({ categoryCompanyId: category._id, ownerId: user_uuid });
            if (company) {
                const deleteCategory = await categoryProductModel.deleteOne({ _id: category_uuid });
                if (deleteCategory) {
                    res.status(201).json({
                        status: 201,
                        message: "Category Product delete successfully !",
                        data: null
                    });
                }
                else {
                    res.status(401).json({
                        status: 401,
                        message: "Category Product not found !",
                        data: null
                    })
                }
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "This user cannot perform this endpoint!, you are not the owner !",
                    data: null
                })
            }
        }
        else {
            res.status(401).json({
                status: 401,
                message: "Category Company not found !",
                data: null
            })
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
    deleteCategory: deleteCategory
}