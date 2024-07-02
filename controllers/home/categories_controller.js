const { Category } = require("../../models/home/categories_model");
const httpsStatus = require('../../constants/https_status');
const getAllCategories = async(req,res)=>{
    try {
      const limit = 15;
      const page = req.body.page || 1;
      const skip = (page - 1) * limit;
     var token =  req.headers.token;
     const categories = await Category.find().sort({categoryDate:-1}).limit(limit).skip(skip);
     res.status(200).json({"status":httpsStatus.SUCCESS,"data":categories});
    } catch (error){
     res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
    }
 }
 module.exports = {
   getAllCategories
   }