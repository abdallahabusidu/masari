import { ApiError } from "../utils/ApiError.js";
import { logger } from "../config/logger.js";
import { env } from "../config/env.js";

// 404 handler
export function notFoundHandler(_req, res) {
  res.status(404).json({ success: false, message: "Route not found" });
}

// Central error handler — the single place that shapes error responses.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  let status = err.statusCode || 500;
  let message = err.message || "Server error";
  let errors = err.errors;

  // Mongoose duplicate key
  if (err.code === 11000) {
    status = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `${field} already exists`;
  }
  // Mongoose validation
  if (err.name === "ValidationError") {
    status = 400;
    errors = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
    message = "Validation failed";
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    status = 400;
    message = `Invalid ${err.path}`;
  }

  if (status >= 500) logger.error(err);

  res.status(status).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
    ...(env.isProd ? {} : status >= 500 ? { stack: err.stack } : {}),
  });
}
