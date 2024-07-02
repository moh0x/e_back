const { Vendor } = require('../models/vendor/vendor_model');
const verifyVendor=async (req, res, next)=> {
    var token = req.headers.token;
    const vendor = await Vendor.findOne({token:token});
    if (vendor) {
      next();
    } else {
      res.status(403).send({ "success": false, "message": "you don't have perrmision" })
    }
  }
  module.exports = {verifyVendor};