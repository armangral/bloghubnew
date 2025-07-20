import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError, AuthenticationError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";

// Helper function to create a consistent error response structure
const createErrorResponse = (message, errorCode = null, details = null) => {
  const response = {
    success: false,
    message,
  };

  if (errorCode) {
    response.error = errorCode;
  }

  // Always attach details if they exist. Crucial for validation feedback.
  if (details) {
    response.details = details;
  }

  return response;
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Something went wrong";
  let errorCode = null;
  let details = null;

  // Log the error for debugging purposes
  if (statusCode >= 500) {
    logger.error(`${err.name}: ${err.message}\n${err.stack}`);
  } else {
    logger.info(`Client error: ${statusCode} - ${message}`);
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    statusCode = 400; // Bad Request
    errorCode = "VALIDATION_ERROR";
    message = "One or more validation errors occurred.";
    details = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
  }
  // Handle Authentication errors
  else if (err instanceof AuthenticationError) {
    statusCode = 401; // Unauthorized
    errorCode = "AUTHENTICATION_ERROR";
    message = err.message; // Keep the original message like "Invalid email or password"
  }
  // Handle Prisma known request errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        statusCode = 409; // Conflict
        errorCode = "DUPLICATE_ENTRY";
        message = `The provided ${err.meta?.target?.join(
          ", "
        )} is already in use.`;
        break;
      case "P2025":
        statusCode = 404; // Not Found
        errorCode = "NOT_FOUND";
        message = "The requested resource could not be found.";
        break;
      case "P2003":
        statusCode = 400; // Bad Request
        errorCode = "FOREIGN_KEY_CONSTRAINT";
        message = "The operation failed due to a data relationship constraint.";
        break;
      default:
        statusCode = 500;
        errorCode = "DATABASE_ERROR";
        message = "A database error occurred.";
        break;
    }
  }
  // Handle custom application errors
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorCode = err.errorCode;
    details = err.details || null;
  }
  // Handle JWT errors
  else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    errorCode = "TOKEN_EXPIRED";
    message = "Your session has expired. Please log in again.";
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    errorCode = "INVALID_TOKEN";
    message = "The provided authentication token is invalid.";
  }

  // For generic 500 errors in production, hide specific details
  if (statusCode >= 500 && process.env.NODE_ENV === "production") {
    errorCode = "INTERNAL_SERVER_ERROR";
    message =
      "An unexpected error occurred on our end. Please try again later.";
  }

  const errorResponse = createErrorResponse(message, errorCode, details);

  // Only include the stack trace in development mode for server errors
  if (process.env.NODE_ENV !== "production" && statusCode >= 500) {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

// Middleware for routes that are not found
export const notFoundHandler = (req, res, next) => {
  const message = `The requested endpoint does not exist: ${req.method} ${req.originalUrl}`;
  logger.info(message);

  res.status(404).json({
    success: false,
    message: "The requested endpoint does not exist.",
    error: "ROUTE_NOT_FOUND",
  });
};
