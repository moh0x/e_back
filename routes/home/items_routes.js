const express = require('express');
const router = express.Router();
const { verifyToken } = require("../../utility/verify_token");
const itemsControoler = require('../../controllers/home/items_controller');
router.get('/getAllItems',verifyToken,itemsControoler.getAllItems);
router.get('/getSearchItem',verifyToken,itemsControoler.getSearchItems);
router.get('/getLikesItem',verifyToken,itemsControoler.getLikesItems);
router.get('/getCartItem',verifyToken,itemsControoler.getCartItems);
router.get('/getLatestItem',verifyToken,itemsControoler.getLatestItems);
module.exports = 
router
