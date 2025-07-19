import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

// For fetching users on the sidebar
router.get("/user", protectRoute, getUsersForSidebar);

// the user id we would like to fetch our messages with
router.get("/:id", protectRoute, getMessages);

// Make sure we're authenticated before sending messages
router.post("/send/:id", protectRoute, sendMessage);

export default router;
