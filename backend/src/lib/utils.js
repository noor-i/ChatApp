import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// This function generates a JWT token for a user and sets it as a cookie in the response
export const generateToken = (userId, res) => {
  // Create a JWT token containing the user's ID, signed with your secret, valid for 7 days
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Set the token as an HTTP-only cookie in the user's browser for authentication
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days (in milliseconds)
    httpOnly: true, // Cookie can't be accessed by JavaScript (helps prevent XSS attacks)
    sameSite: "strict", // Cookie only sent for same-site requests (helps prevent CSRF attacks)
    secure: process.env.NODE_ENV !== "development", // Cookie only sent over HTTPS in production
  });

  // Return the token  const token = jwt.sign({ userId }, secret, { expiresIn: "7d" });  const token = jwt.sign({ userId }, secret, { expiresIn: "7d" });
  return token;
};
