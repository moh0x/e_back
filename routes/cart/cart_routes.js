const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/cart/cart_controller');
const { verifyToken } = require("../../utility/verify_token");
router.patch('/changeCart',verifyToken,cartController.changeItemCart);
router.get('/myCart',verifyToken,cartController.getUserCart);
  module.exports = 
    router