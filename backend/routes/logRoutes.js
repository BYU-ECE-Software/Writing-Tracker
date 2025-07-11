const express = require("express");
const jwt = require("jsonwebtoken"); // <--  Make sure this is imported

const {
  createLog,
  getUserLog,
  getAllLogs,
} = require("../controllers/logController");

const router = express.Router();

//  Middleware to authenticate using JWT
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret"); // 👈 Use env var
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

//  Routes
router.post("/log", authenticate, createLog);
router.get("/logs", getAllLogs);
// router.get("/logs/:id", getLogById);
// router.put("/logs/:id", updateLog);
// router.delete("/logs/:id", deleteLog);

module.exports = router;
