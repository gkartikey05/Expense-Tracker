class ErrorResponse extends Error {
  /**
   * Create custom ErrorResponse
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Distinguish expected errors
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Create a bad request (400) error
   * @param {string} message - Error message
   * @returns {ErrorResponse}
   */
  static badRequest(message = "Bad Request") {
    return new ErrorResponse(message, 400);
  }

  /**
   * Create an unauthorized (401) error
   * @param {string} message - Error message
   * @returns {ErrorResponse}
   */
  static unauthorized(message = "Unauthorized") {
    return new ErrorResponse(message, 401);
  }

  /**
   * Create a not found (404) error
   * @param {string} message - Error message
   * @returns {ErrorResponse}
   */
  static notFound(message = "Not Found") {
    return new ErrorResponse(message, 404);
  }

  /**
   * Create a server error (500)
   * @param {string} message - Error message
   * @returns {ErrorResponse}
   */
  static serverError(message = "Server Error") {
    return new ErrorResponse(message, 500);
  }
}

export default ErrorResponse;
