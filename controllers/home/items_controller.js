const { Item } = require("../../models/home/items_model");
const httpsStatus = require('../../constants/https_status');
const getAllItems = async(req,res)=>{
    try {
     var token =  req.headers.token;
     const items = await Item.find();
     res.status(200).json({"status":httpsStatus.SUCCESS,"data":items});
    } catch (error){
     res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
    }
 }
 const getLikesItems = async(req,res)=>{
   try {
    var token =  req.headers.token;
    const limit = 15;
    const page = req.body.page || 1;
    const skip = (page - 1) * limit;
    const items = await Item.find({itemActive:true}).sort({itemLikesCount:-1}).limit(limit).skip(skip);
    res.status(200).json({"status":httpsStatus.SUCCESS,"data":items});
   } catch (error){
    res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
   }
}
const getCartItems = async(req,res)=>{
   try {
    var token =  req.headers.token;
    const limit = 15;
    const page = req.body.page || 1;
    const skip = (page - 1) * limit;
    const items = await Item.find({itemActive:true}).sort({itemCartCount:-1}).limit(limit).skip(skip);
    res.status(200).json({"status":httpsStatus.SUCCESS,"data":items});
   } catch (error){
    res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
   }
}
const getLatestItems = async(req,res)=>{
   try {
    var token =  req.headers.token;
    const limit = 15;
    const page = req.body.page || 1;
    const skip = (page - 1) * limit;
    const items = await Item.find({itemActive:true}).sort({itemDate:-1}).limit(limit).skip(skip);
    res.status(200).json({"status":httpsStatus.SUCCESS,"data":items});
   } catch (error){
    res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
   }
}
 const getSearchItems = async(req,res)=>{
   try {
      const limit = 15;
      const page = req.body.page || 1;
      const skip = (page - 1) * limit;
    var token =  req.headers.token;
    var textItem = req.body.textItem;
    const regex =new RegExp(textItem,'i');
    const items = await Item.find({
     $or:[
      {itemNameArabic:regex},{itemNameEnglish:regex}
     ],
     itemActive:true
    
    }).sort({itemDate:-1}).limit(limit).skip(skip);
    res.status(200).json({"status":httpsStatus.SUCCESS,"data":items});
   } catch (error){
    res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
   }
}
const getLatestItemsVerifyAdmin = async(req,res)=>{
   try {
    var token =  req.headers.token;
    const limit = 15;
    const page = req.body.page || 1;
    const skip = (page - 1) * limit;
    const items = await Item.find({itemActive:true}).sort({itemDate:-1}).limit(limit).skip(skip);
    res.status(200).json({"status":httpsStatus.SUCCESS,"data":items});
   } catch (error){
    res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
   }
}
const getLatestItemsNotVerifyAdmin = async(req,res)=>{
   try {
    var token =  req.headers.token;
    const limit = 15;
    const page = req.body.page || 1;
    const skip = (page - 1) * limit;
    const items = await Item.find({itemActive:false}).sort({itemDate:-1}).limit(limit).skip(skip);
    res.status(200).json({"status":httpsStatus.SUCCESS,"data":items});
   } catch (error){
    res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
   }
}
const changeItemStatusAdmin = async(req,res)=>{
   try {
      const itemId = req.body.itemId;
      const itemSer = await Item.findById(itemId);
    if (itemSer) {
      const active = itemSer.itemActive;
      const itemSerActive = !active;
    const item = await Item.findByIdAndUpdate(itemId,{
      $set:{
         itemActive:itemSerActive
      }
    });
    await item.save();
    const itemRet = await Item.findById(itemId);
    res.status(200).json({"status":httpsStatus.SUCCESS,"data":itemRet});
    } else {
      res.status(400).json({"status":httpsStatus.FAIL,"data":null,"message":"no item"});
    }
   } catch (error){
    res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
   }
}
const deleteItemAdmin = async(req,res)=>{
   try {
      const itemId = req.body.itemId;
      const itemSer = await Item.findById(itemId);
    if (itemSer) {
    const item = await Item.findByIdAndDelete(itemId);
    res.status(200).json({"status":httpsStatus.SUCCESS});
    } else {
      res.status(400).json({"status":httpsStatus.FAIL,"data":null,"message":"no item"});
    }
   } catch (error){
    res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
   }
}
 module.exports = {
    getAllItems,getSearchItems,getLikesItems,getCartItems,getLatestItems,deleteItemAdmin,changeItemStatusAdmin,getLatestItemsNotVerifyAdmin,getLatestItemsVerifyAdmin
   }
