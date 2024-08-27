const categoryProductModel = require("../../models/category-product-model");
const companyModel = require("../../models/company-model");
const productModel = require("../../models/product-model");
const userModel = require("../../models/user-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getProducts(req, res) {
    try {
        const category_uuid = req.params.category_uuid;
        const validId = validateId(category_uuid);
        if (validId) {
            const category = await categoryProductModel.findById(category_uuid);
            if (category) {
                res.status(201).json({
                    status: 201,
                    message: "All Products of this category !",
                    data: await productModel.find({ categoryProductId: category_uuid })
                });
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "Categroy Product not found !",
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

async function getAllProductsByOwner(req, res) {
    try {
        const owner_uuid = req.params.owner_uuid;
        const validId = validateId(owner_uuid);
        if (validId) {
            const owner = await userModel.findOne({ _id: owner_uuid})
            if (owner) {
                //Get all owner companies ids
                const companies = await companyModel.find({ ownerId: owner_uuid }, '_id');
                let companyIds = [];
                companies.length != 0 ? companyIds = companies.map((company) => company._id) : [];

                //Get All categories by company ids
                const c_categories = await categoryProductModel.find({companyId : {$in : companyIds}}, '_id');
                let categoryIds = [];
                c_categories.length != 0 ? categoryIds = c_categories.map((category) => category._id) : [];

                //get all products
                const products = await productModel.find({ categoryProductId: {$in: categoryIds} });
                res.status(201).json({
                    status: 201,
                    message: "Owner Products found successfully  !",
                    data: products
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

async function getProduct(req, res) {
    try {
        const product_uuid = req.params.product_uuid;
        const validId = validateId(product_uuid);
        if (validId) {
            const product = await productModel.findById(product_uuid);
            if (product) {
                res.status(201).json({
                    status: 201,
                    message: "All Products of this category !",
                    data: product
                });
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
    catch (e) {
        res.status(500).json({
            status: 500,
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }
}

module.exports = {
    getProducts: getProducts,
    getAllProductsByOwner : getAllProductsByOwner,
    getProduct: getProduct
}