const errorHandler = (err, req, res, next) => {
  // Log for development
  console.error(err.stack.red);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    err = ErrorResponse.notFound("Resource not found");
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

export default errorHandler;
