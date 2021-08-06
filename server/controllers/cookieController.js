const cookieController = {};
const User = require("../models/userModel");

/**
 * setCookie - set a cookie with a random number
 */
// cookieController.setCookie = (req, res, next) => {
//   const num = Math.floor(Math.random() * 100);
//   res.cookie("Codesmith", "hi");
//   //   res.cookie("secret", num);

//   return next();
// };

/**
 * setSSIDCookie - store the user id in a cookie
 */
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie("ssid", res.locals.db_id);
  return next();
};

cookieController.checkCookie = async (req, res, next) => {
  const ssid = req.cookies.ssid;
  const result = await User.findOne({ _id: ssid }, (err, user) => {
    if (!user || err) {
      console.log("user not found");
    } else {
      return next();
    }
  });
};

module.exports = cookieController;
