/**
 * Wraps async functions to handle errors and pass them to Express error handler
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Wrapped middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    // Log error for development
    if (process.env.NODE_ENV === "development") {
      console.error("[AsyncHandler]", err);
    }

    // Handle mongoose validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return next(new ErrorResponse(messages.join(", "), 400));
    }

    // Handle mongoose duplicate field errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return next(new ErrorResponse(`${field} already exists`, 400));
    }

    // Handle JWT errors
    if (err.name === "JsonWebTokenError") {
      return next(new ErrorResponse("Invalid token", 401));
    }

    if (err.name === "TokenExpiredError") {
      return next(new ErrorResponse("Token expired", 401));
    }

    // Pass to default error handler
    next(err);
  });
};

export default asyncHandler;
