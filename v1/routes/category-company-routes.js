const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { getCategories, getCategory, getCategoryByStatus } = require('../controllers/categories-companies/getCategory');
const { createCategory } = require('../controllers/categories-companies/createCategory');
const { updateCategory } = require('../controllers/categories-companies/updateCategory');
const { deleteCategory } = require('../controllers/categories-companies/deleteCategory');
const { uploadImages } = require('../controllers/categories-companies/uploadImages');
const router = express.Router();


router.get('/categories-companies', requireAuth, getCategories); //get all category companies
router.get('/category-company/:category_uuid', requireAuth, getCategory); //get category company
router.get('/category-company-status/:category_uuid', requireAuth, getCategoryByStatus); //get category company by status
router.post('/category-company/create', requireAuth, createCategory); //create new category company
router.put('/category-company/modify/:category_uuid', requireAuth, updateCategory); //edit category company
router.delete('/category-company/delete/:category_uuid', requireAuth, deleteCategory); //remove category company

router.post('/category-company/images/upload/:category_uuid/', requireAuth, uploadImages); //upload file

module.exports = router;