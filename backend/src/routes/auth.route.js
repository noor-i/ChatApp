import express from "express";
import { rateLimit } from "express-rate-limit";
import {
  login,
  logout,
  signup,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { app } from "../lib/socket.js";

const router = express.Router();

const limiter = rateLimit({
  max: 5, // Requests allowed per timeframe (5 requests / minute)
  windowMs: 60 * 1000, // Timeframe in milliseconds (1 minute here)
  message: "Too many requests from this IP. Please try again later.",
});

router.post("/signup", limiter, signup);
router.post("/login", limiter, login);
router.post("/logout", logout);

// If user wants to update their profile, first we would want to check if they are logged in.
// protectRoute implementation is in src > middleware > auth.middleware.js
router.put("/update-profile", protectRoute, updateProfile);

// Route to check if the user is authenticated (used by frontend to verify login status on page load/refresh)
// Returns user info if authenticated, or an error if not
router.get("/check", protectRoute, checkAuth);

export default router;
