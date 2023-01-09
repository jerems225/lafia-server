const categoryCompanyModel = require("../../models/category-company-model");
const { validateId } = require("../businessLogic/validObjectId");

async function deleteCategory(req, res) {
    const category_uuid = req.params.category_uuid;
    const validId = validateId(category_uuid);
    if (validId) {
        const category = await companyModel.findById(category_uuid);
        if(category)
        {
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
        else
        {
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