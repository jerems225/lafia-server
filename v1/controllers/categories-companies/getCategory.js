const categoryCompanyModel = require("../../models/category-company-model");
const companyModel = require("../../models/company-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getCategories(req, res) {
    const categories = await categoryCompanyModel.find();
    res.status(201).json({
        status: 201,
        message: "Successfull get all categories companies",
        data: categories
    });
}

async function getCategory(req, res) {
    const category_uuid = req.params.category_uuid;
    console.log(category_uuid)
    const validId = validateId(category_uuid);
    if (validId) {
        const category = await categoryCompanyModel.findById(category_uuid);
        if (category) {
            const companies = await companyModel.find({ categoryCompanyId: category_uuid });
            res.status(201).json({
                status: 201,
                message: "Category found successfully !",
                data: {
                    category: category,
                    companies: companies
                }
            });
        }
        else {
            res.status(401).json({
                status: 401,
                message: "Category not found !",
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
    getCategories: getCategories,
    getCategory: getCategory
}