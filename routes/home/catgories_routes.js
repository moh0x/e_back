const express = require('express');
const router = express.Router();
const { verifyToken } = require("../../utility/verify_token");
const categoriesControoler = require('../../controllers/home/categories_controller');
router.get('/getAllCategories',verifyToken,categoriesControoler.getAllCategories);
module.exports = 
router