const User = require("../models/User");

const Log = require("../models/Log");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.registerUser = async (req, res) => {
  try {
    const { name, netId, username, lab, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, netId, username, lab, email, password: hashedPassword });
    const newUser = await user.save();
    res.status(201).json({ message: "User registered", newUser });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === 11000) {
      // Duplicate key error
      return res
        .status(400)
        .json({ error: "Email, Net ID, or BYU ID already exists" });
    }
    res.status(500).json({ error: "Server error during registration" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { name, netId, username, lab, email, password } = req.body;
    const userId = req.user._id; // Assuming you have middleware to set req.user

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, username, email, password, netId, lab },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error during profile update" });
  }
};
