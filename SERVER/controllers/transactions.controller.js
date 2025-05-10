import Transaction from "../models/Transaction.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { verifyToken } from "../config/jwt.js";

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Private
export const verifyTransactionOwnership = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);

    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: decoded.id,
    });

    if (!transaction) {
      return next(new ErrorResponse("Not authorized", 401));
    }

    req.transaction = transaction;
    next();
  } catch (err) {
    return next(new ErrorResponse("Invalid token", 401));
  }
};

export const getTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    throw ErrorResponse.notFound("Transaction not found");
  }

  if (transaction.user.toString() !== req.user.id) {
    throw ErrorResponse.unauthorized(
      "Not authorized to access this transaction"
    );
  }

  res.status(200).json({
    success: true,
    data: transaction,
  });
});

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Private
export const addTransaction = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const transaction = await Transaction.create(req.body);

  res.status(201).json({
    success: true,
    data: transaction,
  });
});

// @desc    Update transaction
// @route   PUT /api/v1/transactions/:id
// @access  Private
export const updateTransaction = asyncHandler(async (req, res, next) => {
  let transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(
      new ErrorResponse(
        `Transaction not found with id of ${req.params.id}`,
        404
      )
    );
  }

  // Make sure user owns the transaction
  if (transaction.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this transaction`, 401)
    );
  }

  transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: transaction,
  });
});

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Private
export const deleteTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(
      new ErrorResponse(
        `Transaction not found with id of ${req.params.id}`,
        404
      )
    );
  }

  // Make sure user owns the transaction
  if (transaction.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this transaction`, 401)
    );
  }

  await transaction.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
