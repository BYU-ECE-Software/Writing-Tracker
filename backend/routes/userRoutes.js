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

router.get('/',async (req,res)=>{
  try {
    
    const users = await User.find()
   // res.send('USERS')
    res.json(users)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})
router.post('/',async (req,res)=>{
  const user = new User({
      name: req.body.name,
      netId: req.body.netId,
      username: req.body.username,
      lab: req.body.lab,
      email: req.body.email,
      password: req.body.password,
    })
  try {
    const  newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
// router.delete("/profile", deleteUserProfile);

module.exports = router;
