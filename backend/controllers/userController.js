const User = require("../models/User");

const Log = require("../models/Log");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (error) {
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
    const { name, username, netID, lab, email, password } = req.body;
    const userId = req.user._id; // Assuming you have middleware to set req.user

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, username, email, password, netID, lab },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error during profile update" });
  }
};
