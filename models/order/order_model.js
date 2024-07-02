const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    orderAdress:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30
    },
    orderFirstDate:{
        type:Date,
        required:true,
    },
    orderlastDate:{
        type:Date,
        required:true,
    },
    orderCount:{
        type:Number,
        required:true,
        minLength:1,
        maxLength:10
    },
    orderDetails:{
        type:String,
        required:true,
        minLength:3,
        maxLength:100
    },
    orderUserId:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30
    },
    orderStatusId:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30
    },
    orderProductId:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30
    },
    orderShiping:{
        type:Number,
        required:true,
    },
   
});
const Order = mongoose.model("Order",orderSchema);
module.exports = {Order};