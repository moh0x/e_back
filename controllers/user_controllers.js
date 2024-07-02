const { User } = require("../models/user_model");

const gen = require("@codedipper/random-code");
var jwt = require('jsonwebtoken');
const { CourierClient } = require("@trycourier/courier");
const bcrypt = require("bcryptjs");
const {body,validationResult } = require("express-validator");
const httpsStatus = require('../constants/https_status');
const getUserInfo = async(req,res)=>{
  try {
   const token = req.headers.token;
   const user = await User.findOne({token:token},{__v:false,password:false});  
       res.status(200).json({"status":httpsStatus.SUCCESS,"data":user});
   
  } catch (error) {
   res.status(400).json({"status":httpsStatus.ERROR,"message":"error"});
  }
}
const registerFunc = async(req,res)=>{
    try {
     const email = await User.findOne({email : req.body.email});
     const valid = validationResult (req)
    if (valid.isEmpty()) {
     if (!email) {
         const token = jwt.sign({ email: req.body.email,password:req.body.password }, 'shhhhh');
         const verifyCode = gen(5,"0123456789");
         var password =await  bcrypt.hash(req.body.password,10)
         const user =  new User({
             userName:req.body.userName,
             token:token,
             email:req.body.email,
             password:password,
             phone:req.body.phone,
             verifyCode:verifyCode,
     resetPasswordCode:0,
             
             isVerify:false,
     });
         await user.save();
         const newUser = await User.findOne({email : req.body.email},{__v:false,password:false});
       const courier = new CourierClient(
         { authorizationToken: "pk_prod_5T2N91YKAJ4FKGH0YAM3X4NKRB0V"});
 
       const { requestId } =  courier.send({
         message: {
           content: {
             title: "confirm your email",
             body: `your verification code is ${verifyCode}`
           },
           to: {
             email: `${newUser.email}`
           }
         }
       });
         res.status(200).json({"status":httpsStatus.SUCCESS,"data":newUser});
        } else {
         res.status(400).json({"status":httpsStatus.FAIL,"data":null,"message":"user already exist"});
        }
    }
    else {
     res.status(400).json({"status":httpsStatus.FAIL,"data":null,"message":"check your input"});
    }
    } catch (error) {
     res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
     
    }
 }
 const loginFunc = async(req,res)=>{
   
  try {
     const user = await User.findOne({email : req.body.email},{__v:false});
  const valid = validationResult (req);
  const passwordMatch = await bcrypt.compare(req.body.password,user.password);
  
if (valid.isEmpty()) {
 if (user) {
     if (passwordMatch == true) {
         if (user.isVerify) {
             const userRet = await User.findOne({email : req.body.email},{__v:false,password:false});
             res.status(200).json({"status":httpsStatus.SUCCESS,"data":userRet});
         } else {
             const userRet = await User.findOne({email : req.body.email},{__v:false,password:false});
             const verifyCode = gen(5,"0123456789");
            await User.findByIdAndUpdate(userRet._id,{
                 $set:{
                     verifyCode:verifyCode
                 }
             })
             
             const courier = new CourierClient(
                 { authorizationToken: "pk_prod_5T2N91YKAJ4FKGH0YAM3X4NKRB0V"});
               const { requestId } =  courier.send({
                 message: {
                   content: {
                     title: "confirm your email",
                     body: `your verification code is ${verifyCode}`
                   },
                   to: {
                     email: `${user.email}`
                   }
                 }
               });
               res.status(200).json({"status":httpsStatus.SUCCESS,"data":userRet});
         }
     } else {
         res.status(400).json({"status":httpsStatus.FAIL,"data":null,"message":"password not match"});
     }
    } else {
     res.status(400).json({"status":httpsStatus.FAIL,"data":null,"message":"there is no user with this email"});
    }
} else {
 res.status(400).json({"status":httpsStatus.FAIL,"data":null,"message":"check your input"});
}
  } catch (error) {
     res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
  }

}
const sendResetCodeFunc = async(req,res)=>{
  try {
   const user = await User.findOne({email:req.body.email},{__v:false,password:false});
   if (user) {
               const resetPasswordCode = gen(5,"0123456789");
           await    User.findByIdAndUpdate(user._id,{
                   $set:{
                       resetPasswordCode:resetPasswordCode
                   }
               });    
               const courier = new CourierClient(
                   { authorizationToken: "pk_prod_5T2N91YKAJ4FKGH0YAM3X4NKRB0V"});
                 const { requestId } =  courier.send({
                   message: {
                     content: {
                       title: "reset password",
                       body: `your reset code is ${resetPasswordCode}`
                     },
                     to: {
                       email: `${user.email}`
                     }
                   }
                 });
                
                 res.status(200).json({"status":httpsStatus.SUCCESS,"data":user});
   } else {
       res.status(400).json({"status":httpsStatus.FAIL,"data":null,"message":"we don't have user with this email"});
   }
  } catch (error) {
   res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
  }
}
const resetPasswordFunc = async(req,res)=>{
  try {     
      const email = req.body.email;
      const user = await User.findOne({email:email},{__v:false,password:false});
      const resetPasswordCode = req.body.resetPasswordCode;
      const password =await bcrypt.hash(req.body.password,10);
if (user) {
if (resetPasswordCode == user.resetPasswordCode && user.resetPasswordCode != 0 ) {
  await User.findByIdAndUpdate(user._id,{
      $set:{
          isVerify:true,
          verifyCode:0,
          resetPasswordCode:0,
          password:password
      }
  });
  res.status(200).json({"status":httpsStatus.SUCCESS,"data":user});
} else {
  res.status(400).json({"status":httpsStatus.FAIL,"data":null,"message":"verification code not match"});
}
} else {
  res.status(400).json({"status":httpsStatus.FAIL,"data":null,"message":"no user"});
}
 
  } catch (error) {
      res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
   
  }
}
const confirmAccountFunc = async(req,res)=>{
  try {     
      const token = req.headers.token;
      const user = await User.findOne({token:token},{__v:false,password:false});
      const verifyCode = req.body.verifyCode;
if (user) {
if (verifyCode == user.verifyCode && user.verifyCode != 0 ) {
  await User.findByIdAndUpdate(user._id,{
      $set:{
          isVerify:true,
          verifyCode:0,
          resetPasswordCode:0,
      }
  });
  res.status(200).json({"status":httpsStatus.SUCCESS,"data":user});;
} else {
  res.status(400).json({"status":httpsStatus.FAIL,"data":null,"message":"verification code not match"});
}
} else {
  res.status(400).json({"status":httpsStatus.FAIL,"data":null,"message":"no user"});
}
 
  } catch (error) {
      res.status(400).json({"status":httpsStatus.ERROR,"data":null,"message":"error"});
   
  }
}
 module.exports = {
  registerFunc,loginFunc,sendResetCodeFunc,resetPasswordFunc,confirmAccountFunc,getUserInfo
 }