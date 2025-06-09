const express = require("express");
const {
  loginController,
  signupController,
} = require("../controller/user.controller.js");
const router = express.Router();
router.get("/signup", signupController);
router.get("/login", loginController);
export default router;
