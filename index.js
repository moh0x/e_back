const express = require("express");

const port = 8000;
const app = express();
const mongoose = require("mongoose");

var cors = require('cors');
app.use(cors());
app.use(express.json());
const userRoute = require('./routes/user_routes');
const categoryRoute = require('./routes/home/catgories_routes');
const bannerRoute = require('./routes/home/banners_routes');
const itemRoute = require('./routes/home/items_routes');
const favoriteRoute = require('./routes/favorites/favorites_routes');
const cartRoute = require('./routes/cart/cart_routes');
const adressRoute = require('./routes/adress/adress_routes');
const orderRoute = require('./routes/order/order_routes');
const adminRoute = require('./routes/admin/admin_routes');
const deliviryRoute = require('./routes/deliviry/deliviry_routes');
const vendorRoute = require('./routes/vendor/vendor_routes');
app.use('/api/users/',userRoute);
app.use('/api/home/categories',categoryRoute);
app.use('/api/home/items',itemRoute);
app.use('/api/home/banners',bannerRoute);
app.use('/api/favorites',favoriteRoute);
app.use('/api/carts',cartRoute);
app.use('/api/adress',adressRoute);
app.use('/api/order',orderRoute);
app.use('/api/admin',adminRoute);
app.use('/api/deliviry',deliviryRoute);
app.use('/api/vendor',vendorRoute);
app.listen(port);
 mongoose.connect("mongodb+srv://mihoyahou:YzFN4ccF8u7HkKHi@cluster0.jjdh5dp.mongodb.net/");
/*
      1) Install Courier SDK: npm install @trycourier/courier
      2) Make sure you allow ES module imports: Add "type": "module" to package.json file
      
      ; */
