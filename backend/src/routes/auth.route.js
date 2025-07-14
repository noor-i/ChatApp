import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// If user wants to update their profile, first we would want to check if they are logged in.
// protectRoute implementation is in src > middleware > auth.middleware.js
router.put("/update-profile", protectRoute, updateProfile);

// Route to check if the user is authenticated (used by frontend to verify login status on page load/refresh)
// Returns user info if authenticated, or an error if not
router.get("/check", protectRoute, checkAuth);

export default router;
