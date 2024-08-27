const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { getCategories, getCategory, getAllCompaniesCategoriesByOwner } = require('../controllers/categories-products/getCategory');
const { createCategory } = require('../controllers/categories-products/createCategory');
const { updateCategory } = require('../controllers/categories-products/updateCategory');
const { deleteCategory } = require('../controllers/categories-products/deleteCategory');
const { uploadImages } = require('../controllers/categories-products/uploadImages');
const router = express.Router();

router.get('/categories-products/:company_uuid',  getCategories); //get all category products
router.get('/category-product/:category_uuid',  getCategory); //get category product
router.get('/categories-products/owner/:owner_uuid', requireAuth, getAllCompaniesCategoriesByOwner); //get categories products by owner
router.post('/category-product/create', requireAuth, createCategory); //create new category product
router.put('/category-product/modify/:category_uuid', requireAuth, updateCategory); //edit category product
router.delete('/category-product/delete/:category_uuid/:user_uuid', requireAuth, deleteCategory); //remove category product
router.post('/category-product/images/upload/:category_uuid', requireAuth, uploadImages); //upload file

module.exports = router;