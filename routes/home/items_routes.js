const express = require('express');
const router = express.Router();
const { verifyToken } = require("../../utility/verify_token");
const itemsControoler = require('../../controllers/home/items_controller');
const { verifyAdmin } = require('../../utility/verify_role_admin');
router.get('/getAllItems',verifyToken,itemsControoler.getAllItems);
router.get('/getSearchItem',verifyToken,itemsControoler.getSearchItems);
router.get('/getLikesItem',verifyToken,itemsControoler.getLikesItems);
router.get('/getCartItem',verifyToken,itemsControoler.getCartItems);
router.get('/getLatestItem',verifyToken,itemsControoler.getLatestItems);
router.get('/admin/getLatestItemItemsVerify',verifyToken,verifyAdmin,itemsControoler.getLatestItemsVerifyAdmin);
router.get('/admin/getLatestItemItemsNotVerify',verifyToken,verifyAdmin,itemsControoler.getLatestItemsNotVerifyAdmin);
router.delete('/admin/deleteItem',verifyToken,verifyAdmin,itemsControoler.deleteItemAdmin);
router.patch('/admin/changeStatusVerify',verifyToken,itemsControoler.changeItemStatusAdmin);
module.exports = 
router
