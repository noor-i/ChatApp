import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

//If user wants to update their profile, first we would want to check if they are logged in.
router.put("/update-profile", protectRoute, updateProfile);

export default router;
