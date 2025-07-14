const User = require('../models/User')
const express = require("express");
const { registerUser, updateUserProfile, getUserProfile , deleteUserProfile } = require("../controllers/userController");
const authenticate = require("../middleware/authenticate"); // Create this if you haven't yet

const router = express.Router();

router.post("/register", registerUser);
router.get("/profile", authenticate, getUserProfile);
router.put("/profile", authenticate, updateUserProfile);
router.delete("/profile",authenticate, deleteUserProfile);

module.exports = router;
