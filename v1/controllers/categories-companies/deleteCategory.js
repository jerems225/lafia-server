const categoryCompanyModel = require("../../models/category-company-model");
const userModel = require("../../models/user-model");
const { validateId } = require("../businessLogic/validObjectId");

async function deleteCategory(req, res) {
    try {
        const category_uuid = req.params.category_uuid;
        const user_uuid = req.params.user_uuid;
        const validId = validateId(category_uuid);
        if (validId) {
            const category = await categoryCompanyModel.findById(category_uuid);
            if (category) {
                const user = await userModel.findById(user_uuid);
                const deleteCategoryCompany = await categoryCompanyModel.deleteOne({ _id: category_uuid });
                if (deleteCategoryCompany) {
                    res.status(201).json({
                        status: 201,
                        message: "Category Company delete successfully !",
                    });
                }
                else {
                    res.status(500).json({
                        status: 401,
                        message: "Somethings Wrong on the server side, try again!",
                    })
                }
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "Category not found !",
                })
            }
        }
        else {
            res.status(500).json({
                status: 401,
                message: "Invalid ID",
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