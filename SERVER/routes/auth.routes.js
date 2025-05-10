import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { generateToken } from "../config/jwt.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/refresh", protect, (req, res) => {
  const token = generateToken(req.user._id);

  res.status(200).json({
    success: true,
    token,
    expiresIn: process.env.JWT_EXPIRE,
  });
});

export default router;
