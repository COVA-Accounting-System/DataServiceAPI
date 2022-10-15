import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "No token provided" });

    const userId = jwt.verify(token, process.env.SECRET);
    if (!userId)
      return res.status(400).json({ message: "Token is not correct" });
    req.userId = userId.id;
    next();
  } catch (err) {
    res.status(400).json({ message: "Unauthorized!" });
  }
};
