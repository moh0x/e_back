const httpsStatus = require('../../constants/https_status');
const {Banner} = require('../../models/home/banner_model');
const getAllBanners = async(req,res)=>{
    try {
     var token =  req.headers.token;
     const banners = await Banner.find();
     res.status(200).json({"status":httpsStatus.SUCCESS,"data":banners});
    } catch (error){
      console.log(error);
     res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
    }
 }
 module.exports = {
   getAllBanners
   }