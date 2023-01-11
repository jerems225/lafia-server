const categoryProductModel = require("../../models/category-product-model");
const companyModel = require("../../models/company-model");
const productModel = require("../../models/product-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getCategories(req, res) {
    const company_uuid = req.params.company_uuid;
    const validId = validateId(company_uuid);
    if (validId) {
        const company = await companyModel.findById(company_uuid);
        if (company) {
            const categories = await categoryProductModel.find({ companyId: company_uuid });
            res.status(201).json({
                status: 201,
                message: "All categories product get successfully !",
                data: categories
            })
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

async function getCategory(req, res) {
    const category_uuid = req.params.category_uuid;
    const validIdCategory = validateId(category_uuid);
    if (validIdCategory) {
        const category = await categoryProductModel.findById(category_uuid);
        if (category) {
            const products = await productModel.find({ categoryProductId: category_uuid })
            res.status(201).json({
                status: 201,
                message: "Category Product found successfully !",
                data: {
                    category: category,
                    products: products
                }
            })
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

module.exports = {
    getCategories: getCategories,
    getCategory: getCategory
}