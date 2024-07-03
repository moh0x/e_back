const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/order/order_controller');
const { verifyToken } = require("../../utility/verify_token");
const { verifyAdmin } = require('../../utility/verify_role_admin');
router.get('/myOrders',verifyToken,orderController.getMyOrders);
router.get('/mySummary',verifyToken,verifyAdmin,orderController.getMySummary);
router.post('/addOrder',verifyToken,orderController.addOrder);
router.delete('/deleteOrder',verifyToken,orderController.deleteOrder);
  module.exports = 
    router
