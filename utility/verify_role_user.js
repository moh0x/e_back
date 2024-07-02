const { User } = require('../models/user_model');
const verifyUser =async (req, res, next)=> {
    var token = req.headers.token;
    const user = await User.findOne({token:token});
    if (user) {
      next();
    } else {
      res.status(403).send({ "success": false, "message": "you don't have perrmision" })
    }
  }
  module.exports = {verifyUser};