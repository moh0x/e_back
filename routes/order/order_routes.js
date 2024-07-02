const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/order/order_controller');
const { verifyToken } = require("../../utility/verify_token");
router.get('/myOrders',verifyToken,orderController.getMyOrders);
router.post('/addOrder',verifyToken,orderController.addOrder);
router.delete('/deleteOrder',verifyToken,orderController.deleteOrder);
  module.exports = 
    router