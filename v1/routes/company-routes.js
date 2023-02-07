const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { getCompanies, getCompany} = require('../controllers/companies/getCompany');
const { createCompany } = require('../controllers/companies/createCompany');
const { updateComapny, changeStatus } = require('../controllers/companies/updateCompany');
const { deleteCompany } = require('../controllers/companies/deleteCompany');
const { uploadFiles } = require('../controllers/companies/uploadFiles');
const router = express.Router();

router.get('/companies', requireAuth, getCompanies); //get all companies
router.get('/company/:company_uuid', requireAuth, getCompany); //get company
router.post('/company/create', requireAuth, createCompany); //create new company
router.put('/company/modify/:company_uuid', requireAuth, updateComapny); //edit company
router.delete('/company/delete/:company_uuid', requireAuth, deleteCompany); //remove company
router.put('/company/modifystatus/:company_uuid', requireAuth, changeStatus); //edit company
router.post('/company/files/upload/:company_uuid/', requireAuth, uploadFiles); //upload file


module.exports = router;