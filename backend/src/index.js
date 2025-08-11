import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;

// Allows you to extract json data out of body (increase limit for large files)
app.use(express.json({ limit: "10mb" }));
// If you use urlencoded for forms, also increase its limit:
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Allows you to parse the cookie to grab value of token
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Mounts all authentication-related endpoints under /api/auth (e.g., /api/auth/signup, /api/auth/login)
app.use("/api/auth", authRoutes);
// Mounts all messaging-related endpoints under /api/message (e.g., /api/message/send/:id, /api/message/:id)
app.use("/api/message", messageRoutes);

server.listen(PORT, () => {
  console.log("server is running on PORT: " + PORT);
  connectDB();
});
