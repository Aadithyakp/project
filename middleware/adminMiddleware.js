const User = require("../models/userSchema");

module.exports = async (req, res, next) => {
  
  if (!req.session.userInfo?.userId) {
    return res.redirect("/login");
  } else {
    const user = await User.findById(req.session.userInfo?.userId);
    if (user.userType === "Admin") {
      next();
    } else {
      return res.redirect("/login");
    }
  }

};
