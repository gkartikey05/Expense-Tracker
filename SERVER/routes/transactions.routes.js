import express from "express";
import {
  getTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactions.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

// Protect all routes
router.use(protect);

router.get("/", asyncHandler(getTransaction));
router.post("/", asyncHandler(addTransaction));

router.put("/:id", updateTransaction); // PUT /api/v1/transactions/:id
router.delete("/:id", deleteTransaction); // DELETE /api/v1/transactions/:id

export default router;
