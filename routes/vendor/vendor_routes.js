const express = require('express');
const router = express.Router();
const vendorControoler = require('../../controllers/vendor/vendor_controller');
const { verifyToken } = require("../../utility/verify_token");
const {body,validationResult } = require("express-validator");
const { verifyVendor } = require('../../utility/verify_role_vendor');
router.post('/register',body("email").isEmail().isLength({min:6,max:50}).withMessage("type valid email"),body("password").isString().isLength({min:8,max:30}).withMessage("type valid password"),body("phone").isMobilePhone().isLength({min:10,max:15}).withMessage("type valid phone number"),body("userName").isLength({min:6,max:30}).withMessage("type valid user name"),vendorControoler.registerFunc);
router.patch('/verifyAccount',body("verifyCode").isString().isLength({min:1,max:5}),verifyToken,verifyVendor,vendorControoler.confirmAccountFunc);
router.get('/vendorInfo',verifyToken,verifyVendor,vendorControoler.getVendorInfo);
router.patch('/resetPassword',body("resetPasswordCode").isString().isLength({min:1,max:5}),body('password').isString().isLength({min:8,max:30}),vendorControoler.resetPasswordFunc);

router.post('/login',body("email").isEmail().isLength({min:6,max:50}).withMessage("type valid email"),body("password").isString().isLength({min:8,max:30}).withMessage("type valid password"),vendorControoler.loginFunc);
  
router.post('/sendResetCode',vendorControoler.sendResetCodeFunc)
  module.exports = 
    router
  