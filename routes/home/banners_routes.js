const express = require('express');
const router = express.Router();
const { verifyToken } = require("../../utility/verify_token");
const bannersController = require('../../controllers/home/banners_controllerl');
router.get('/getAllBanners',verifyToken,bannersController.getAllBanners);
module.exports = 
router