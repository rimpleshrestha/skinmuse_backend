const express = require("express");
const {
  loginController,
  signupController,
} = require("../controller/user.controller.js");

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);

module.exports = router;
