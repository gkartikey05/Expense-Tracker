import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new AppError("Unauthenticated, please login first", 400));
  }

  const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = userDetails;

  next();
};
