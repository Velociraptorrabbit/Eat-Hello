const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const userController = {};

// userController.readParams = (req, res, next) => {
//   const { username, password } = req.body;
//   res.locals = { username, password };
//   //console.log('locals in readParams are un,pw', res.locals.username , res.locals.password);
//   return next();
// };

userController.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.locals.id = newUser._id;
    return next();
  } catch (err) {
    return res.send("User already exists");
  }
};

userController.getUser = async (req, res, next) => {
  const { username, password } = req.body;
  const result = await User.findOne({ username }, (err, user) => {
    if (!user || err) {
      console.log("user not found");
      return res.send("Invalid Username or Password");
    }
  });
  console.log("result", result);
  res.locals.password = password;
  res.locals.dbPassword = result.password;
  res.locals.db_id = result._id;
  return next();
};

userController.getFoodHistory = async (req, res, next) => {
  const { username } = req.body;
  const result = await User.findOne({ username }, (err, username) => {
    if (!username || err) {
      console.log("user not found");
      res.redirect("/api/signup");
    }
  });
  console.log("result", result);
  res.locals.history = result.history;
  return next();
};

userController.updatePizzaHistory = async (req, res, next) => {
  const pizza = "Pizza";
  const { username } = res.locals;
  await User.findOneAndUpdate(
    { username },
    { $push: { history: pizza } },
    (err, data) => {
      if (err) {
        console.log("err: ", err);
        return next(err);
      } else {
        return next();
      }
    }
  );
};

userController.passwordCompare = async (req, res, next) => {
  //res.locals.password = req.query.password
  const { password, dbPassword } = res.locals;
  const passwordCompare = await bcrypt.compare(password, dbPassword);
  res.locals.pwResult = passwordCompare;
  return next();
};

/**
 * to access the user's data after the user logs in and in order to acess the user's location,
 * prefer cousine and food/ answer the user got from the past
 */
userController.profileData = (req, res, next) => {
  // write code here
};

module.exports = userController;
