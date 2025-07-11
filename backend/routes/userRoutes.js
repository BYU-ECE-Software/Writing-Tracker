const express = require("express");
const User = require('../models/User')

const {
  registerUser,
  //   loginUser,
  //   getUserProfile,
  updateUserProfile,
  //   deleteUserProfile,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
// router.delete("/profile", deleteUserProfile);

module.exports = router;
