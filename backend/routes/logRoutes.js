const express = require("express");
const jwt = require("jsonwebtoken"); // <--  Make sure this is imported

const {
  createLog,
  getUserLog,
  getAllLogs,
} = require("../controllers/logController");

const router = express.Router();

//  Middleware to authenticate using JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.userId }; 
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};


//  Routes
router.post("/log", authenticate, createLog);
router.get("/logs", getAllLogs);
// router.get("/logs/:id", getLogById);
// router.put("/logs/:id", updateLog);
// router.delete("/logs/:id", deleteLog);

module.exports = router;
