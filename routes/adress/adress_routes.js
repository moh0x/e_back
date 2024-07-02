const express = require('express');
const router = express.Router();
const adressController = require('../../controllers/adress/adress_controller');
const { verifyToken } = require("../../utility/verify_token");
router.get('/myAdreses',verifyToken,adressController.getMyAdresses);
router.post('/addAdress',verifyToken,adressController.addAdress);
router.delete('/deleteAdress',verifyToken,adressController.deleteAdress);
  module.exports = 
    router