const categoryProductModel = require("../../models/category-product-model");
const companyModel = require("../../models/company-model");
const productModel = require("../../models/product-model");
const userModel = require("../../models/user-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getCategories(req, res) {
    try {
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
    catch (e) {
        res.status(500).json({
            status: 500,
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }
}

async function getAllCompaniesCategoriesByOwner(req, res) {
    try {
        const owner_uuid = req.params.owner_uuid;
        const validId = validateId(owner_uuid);
        if (validId) {
            const owner = await userModel.findOne({ _id: owner_uuid});
            if (owner) {

                //Get all owner company ids
                const companies = await companyModel.find({ ownerId : owner_uuid }, '_id');
                let companyIds = [];
                companies.length != 0 ? companyIds = companies.map((company) => company._id) : [];
                //Get All categories by company
                const categories = await categoryProductModel.find({ companyId : {$in: companyIds} });
                res.status(201).json({
                    status: 201,
                    message: "All categories product get successfully !",
                    data: categories
                })

            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "Owner not found !",
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
    getCategory: getCategory,
    getAllCompaniesCategoriesByOwner : getAllCompaniesCategoriesByOwner
}