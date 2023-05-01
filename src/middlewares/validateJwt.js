import jwt from "jsonwebtoken";
import Config from "../config";
import User from "../models/User";

export const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(403).json({ message: "No token provided" });

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, Config.SECRET_KEY);
    const user = await User.findById(decodedToken.id);

    if (!user) return res.status(404).json({ message: "Invalid token" });

    req.id = user._id
    req.email = user.email
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
