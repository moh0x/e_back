const mongoose = require("mongoose");
const categoriesSchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30
    },
    categoryDescArabic:{
        type:String,
        required:true,
        minLength:6,
        maxLength:300
       },
       categoryDescEnglish:{
        type:String,
        required:true,
        minLength:6,
        maxLength:300
       },
       categoryImage:{
        type:String,
        required:true,
        minLength:6,
        maxLength:200
       },
       categoryDate:{
        type:Date,
        required:true,
       default:Date.now()
       },
   
});
const Category = mongoose.model("Category",categoriesSchema);
module.exports = {Category};