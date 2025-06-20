const express = require("express");
const {
  loginController,
  signupController,
  deleteUserController,
  changePasswordController,
} = require("../controller/user.controller.js");
const { Authenticate } = require("../middleware/VerifyJWT.js");

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.put("/change-password", changePasswordController);
router.delete("/delete-user", Authenticate, deleteUserController);

module.exports = router;
