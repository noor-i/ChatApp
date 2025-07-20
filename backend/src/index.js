import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

// Allows you to extract json data out of body
app.use(express.json());
// Allows you to parse the cookie to grab value of token
app.use(cookieParser());

// Mounts all authentication-related endpoints under /api/auth (e.g., /api/auth/signup, /api/auth/login)
app.use("/api/auth", authRoutes);
// Mounts all messaging-related endpoints under /api/message (e.g., /api/message/send/:id, /api/message/:id)
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log("server is running on PORT: " + PORT);
  connectDB();
});
