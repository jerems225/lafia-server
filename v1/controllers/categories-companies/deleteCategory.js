const categoryCompanyModel = require("../../models/category-company-model");
const userModel = require("../../models/user-model");
const { validateId } = require("../businessLogic/validObjectId");

async function deleteCategory(req, res) {
    try {
        const category_uuid = req.params.category_uuid;
        const user_uuid = req.params.user_uuid;
        const validId = validateId(category_uuid);
        if (validId) {
            const category = await companyModel.findById(category_uuid);
            if (category) {
                const user = await userModel.findById(user_uuid);
                const deleteCategoryCompany = await categoryCompanyModel.deleteOne({ _id: category_uuid });
                if (deleteCategoryCompany) {
                    res.status(201).json({
                        status: 201,
                        message: "Category Company delete successfully !",
                        data: null
                    });
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
                res.status(401).json({
                    status: 401,
                    message: "This user cannot perform this endpoint!",
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
    catch (e) {
        res.status(500).json({
            status: 500,
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }



}

module.exports = {
    deleteCategory: deleteCategory
}