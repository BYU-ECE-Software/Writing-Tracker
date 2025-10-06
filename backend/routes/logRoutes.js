import express from "express";
import jwt from "jsonwebtoken";
import {  
  createLog,
  getUserLog,
  getAllLogs,
} from "../controllers/logController.js";

const router = express.Router();

// ✅ Middleware to authenticate using JWT
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

//  ROUTES

// GET /api/logs — fetch logs for the authenticated user
router.get("/", authenticate, getUserLog);

// POST /api/logs/log — create a new log
router.post("/log", authenticate, createLog);

// (optional) GET /api/logs/all — fetch all logs (admin use)
router.get("/all", authenticate, getAllLogs);

export default router;
