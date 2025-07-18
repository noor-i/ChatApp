import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// For fetching users on the sidebar
router.get("/user", protectRoute, getUsersForSidebar);

export default router;
