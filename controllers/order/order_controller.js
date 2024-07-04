const httpsStatus = require('../../constants/https_status');
const { Adress } = require('../../models/adress/adress_model');
const { Deliviry } = require('../../models/deliviry/deliviry_model');
const { Item } = require('../../models/home/items_model');
const { Order } = require('../../models/order/order_model');
const { User } = require('../../models/user_model');
const { Vendor } = require('../../models/vendor/vendor_model');
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
        const product = await Item.findById(item);
        const order = new Order({
            orderAdress:req.body.orderAdress,
            orderCount:user.cart[index]['count'],
            orderDetails:user.cart[index]['details'],
            orderFirstDate:Date.now(),
            orderlastDate:Date('0000000000'),
            orderPrice:product.itemDisCount == 0 ? product.itemPrice * user.cart[index]['count'] : product.itemNewPrice * user.cart[index]['count'],
            orderStatusId:"order by user",
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
 const getMySummary = async(req,res)=>{
   try {
    var token =  req.headers.token;
    const deliviries = await Deliviry.find({isAgree:true}); 
    const vendors = await Vendor.find({isAgree:true}); 
    var orderRet = [];
    var all = 0;
    var sales = 0 ;
    var shipping = 0;
    var myFreeShipping = 0;
    var myFreesales = 0;
    var shippingMoney = 0;
    var salesMoney = 0;
    var myAllFree = 0;
    var allMoney = 0;
    for (let index = 0; index < deliviries.length; index++) {
        shipping = shipping + deliviries[index].shipping;
        myFreeShipping = myFreeShipping + deliviries[index].shippingTax;
        shippingMoney = shippingMoney + deliviries[index].myFreeShipping        
    }
    for (let index = 0; index < vendors.length; index++) {
      sales = sales + vendors[index].sales;
      myFreesales = myFreesales + vendors[index].salesTax;
      salesMoney = salesMoney + vendors[index].myFreeSales        
  }
    all = sales + shipping;
    allMoney = salesMoney - shippingMoney;
    myAllFree = myFreesales + myFreeShipping
       res.status(200).json({"status":httpsStatus.SUCCESS,"data":{
        "all":all,
        "sales":sales,
        "shipping":shipping,
        "salesMoney":salesMoney,
        "shippingMoney":shippingMoney,
        "allMoney":allMoney,
        "myFreeSales":myFreesales,
        "myFreeShipping":myFreeShipping,
        "myAllFree":myAllFree

       }}); 
   } catch (error){
     console.log(error);
    res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
   }

  }
  const getDelivirySummary = async(req,res)=>{
    try {
     var token =  req.headers.token;
     const deliviry = await Deliviry.findOne({token:token});
     const orders = await Order.find({orderStatusId:"finished",orderDeliviryId:deliviry.id}); 
     var orderRet = [];
     var shipping = 0;
     var myFreeShipping = 0;
     var shippingTax = 0;
     for (let index = 0; index < orders.length; index++) {
         shipping = shipping + orders[index].orderShiping       
     }
    shippingTax = shipping * (14/100);
    myFreeShipping = shipping - shippingTax;
        res.status(200).json({"status":httpsStatus.SUCCESS,"data":{
         "myEarn":shipping,
         "myTax":shippingTax,
         "myFreeEarn":myFreeShipping
 
        }}); 
    } catch (error){
      console.log(error);
     res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
    }}

 module.exports = {
    getMyOrders,addOrder,deleteOrder,getDelivirySummary,getMySummary
   }
