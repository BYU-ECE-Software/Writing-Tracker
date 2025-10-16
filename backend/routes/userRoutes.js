import express from "express";
import { registerUser, updateUserProfile, getUserProfile, deleteUserProfile } from "../controllers/userController.js";
import authenticate from "../middleware/authenticate.js"; // Create this if you haven't yet

const router = express.Router();

router.post("/register", registerUser);
router.get("/profile", authenticate, getUserProfile);
router.put("/profile", authenticate, updateUserProfile);
router.delete("/profile",authenticate, deleteUserProfile);

export default router;
