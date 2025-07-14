const User = require('../models/User')
const express = require("express");
const { registerUser, updateUserProfile, getUserProfile } = require("../controllers/userController");
const authenticate = require("../middleware/authenticate"); // Create this if you haven't yet

// const {
//   registerUser,
//   //   loginUser,
//   //   getUserProfile,
//   updateUserProfile,
//   //   deleteUserProfile,
// } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.get("/profile", authenticate, getUserProfile);
router.put("/profile", authenticate, updateUserProfile);
// router.delete("/profile", deleteUserProfile);

module.exports = router;
