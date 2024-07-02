const httpsStatus = require('../../constants/https_status');
const { Adress } = require('../../models/adress/adress_model');
const { Item } = require('../../models/home/items_model');
const { Order } = require('../../models/order/order_model');
const { User } = require('../../models/user_model');
const addOrder = async(req,res)=>{
    try {
     var token =  req.headers.token;
     const user = await User.findOne({token:token});
     const adresses = await Adress.find({adressUserId:user._id});
     const adressesIds = [];
  if (user.cart.length != 0 ) {
       
    for (let index = 0; index < adresses.length; index++) {
        adressesIds.unshift(adresses[index]['_id'].toString());    
     }
  if (adressesIds.includes(req.body.orderAdress)) {
    for (let index = 0; index < user.cart.length; index++) {
        const item = user.cart[index]['itemId'];
        const order = new Order({
            orderAdress:req.body.orderAdress,
            orderCount:user.cart[index]['count'],
            orderDetails:user.cart[index]['details'],
            orderFirstDate:Date.now(),
            orderlastDate:Date('0000000000'),
            orderStatusId:"first",
            orderUserId:user._id,
            orderProductId:item,
            orderShiping:user.cart[index]['count'] * 500
        });
        await order.save();
    }
    res.status(200).json({"status":httpsStatus.SUCCESS});
  } else {
    res.status(400).json({"status":httpsStatus.FAIL,"data":null});
  }
  } else {
    res.status(400).json({"status":httpsStatus.FAIL,"data":null});
  }
    } catch (error){
      console.log(error);
     res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
    }
 }
 const deleteOrder = async(req,res)=>{
    try {
     var token =  req.headers.token;
     const user = await User.findOne({token:token});
     const order = await Order.findById(req.body.orderId);
     if (order.orderUserId == user._id) {
       if (order.orderStatusId == "first") {
        const orderDelete = await Order.findByIdAndDelete(req.body.orderId);
     
        res.status(200).json({"status":httpsStatus.SUCCESS,"data":"success"});
       } else {
        res.status(400).json({"status":httpsStatus.FAIL,"data":null,"message":"you can delete order when status is first"}); 
       }
     } else {
        res.status(400).json({"status":httpsStatus.FAIL,"data":null,"message":"you don't have permission"}); 
     }
    } catch (error){
      console.log(error);
     res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
    }
 }
 const getMyOrders = async(req,res)=>{
   const limit = 15;
   const page = req.body.page || 1;
   const skip = (page - 1) * limit;
    try {
     var token =  req.headers.token;
     const user = await User.findOne({token:token});
     const orders = await Order.find({orderUserId:user._id},{orderUserId:false}).sort({orderFirstDate:-1}).limit(limit).skip(skip); 
     const orderRet = [];
     for (let index = 0; index < orders.length; index++) {
        const product = await Item.findById(orders[index].orderProductId);
        orderRet.unshift({
            "order":orders[index],
            "item":product
        });
     }
        res.status(200).json({"status":httpsStatus.SUCCESS,"data":orderRet}); 
    } catch (error){
      console.log(error);
     res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
    }
 }
 module.exports = {
    getMyOrders,addOrder,deleteOrder
   }