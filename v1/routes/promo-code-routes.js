const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { getPromoCodes, getPromoCode } = require('../controllers/promo-code/getPromoCode');
const { createPromoCode } = require('../controllers/promo-code/createPromoCode');
const { updatePromoCode } = require('../controllers/promo-code/updatePromoCode');
const { deletePromoCode } = require('../controllers/promo-code/deletePromoCode');
const router = express.Router();

router.get('/promo-codes', requireAuth, getPromoCodes); //get all promoCodes
router.get('/promo-code/:code_uuid/:user_uuid', requireAuth, getPromoCode); //get promoCode
router.post('/promo-code/create', requireAuth, createPromoCode); //create promocode
router.put('/promo-code/modify/:code_uuid', requireAuth, updatePromoCode); //create promocode
router.delete('/promo-code/delete/:code_uuid/:user_uuid', requireAuth, deletePromoCode); //create promocode


module.exports = router;