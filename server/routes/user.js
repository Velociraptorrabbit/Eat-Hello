const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const cookieController = require("../controllers/cookieController");

router.get("/", (req, res) => res.status(200).send("login route is working"));

router.post(
  "/",
  userController.getUser,
  userController.passwordCompare,
  cookieController.setSSIDCookie,
  (req, res) => {
    if (res.locals.pwResult) return res.status(200).send("success");
    else return res.send("Invalid Username or Password");
  }
);

router.get("/checkCookie", cookieController.checkCookie, (req, res) => {
  return res.status(200).send("success");
});

router.post("/signup", userController.createUser, (req, res) =>
  res.status(200).json(res.locals.id)
);

module.exports = router;
