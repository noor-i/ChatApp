import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const protectRoute = async (req, res, next) => {
  try {
    //Check if there is a token or not
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If decoded is a faulsy value, return error message
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // If decoded value is not faulsy, we can find the user in DB
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the user is authenticated, add user to the request and call the next function (updateProfile) in this case
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
