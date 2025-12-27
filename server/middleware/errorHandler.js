import logger from '../logger.js';

/**
 * Centralized error handling middleware
 * Returns consistent JSON error format
 */
export function errorHandler(err, req, res, next) {
  // Log error with request context
  logger.error('Error occurred', {
    requestId: req.id,
    method: req.method,
    path: req.path,
    query: req.query,
    error: {
      name: err.name,
      message: err.message,
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined
    }
  });

  // Map error types to HTTP status codes
  let statusCode = 500;
  let errorCode = 'INTERNAL_SERVER_ERROR';
  let message = 'An unexpected error occurred';

  if (err.code === 'INVALID_UUID') {
    statusCode = 400;
    errorCode = 'INVALID_UUID';
    message = err.message;
  } else if (err.code === '22P02') {
    // Invalid UUID from PostgreSQL
    statusCode = 400;
    errorCode = 'INVALID_UUID';
    message = 'Invalid UUID format';
  } else if (err.code === '23505') {
    // Unique violation
    statusCode = 409;
    errorCode = 'DUPLICATE_ENTRY';
    message = 'Resource already exists';
  } else if (err.code === '23503') {
    // Foreign key violation
    statusCode = 400;
    errorCode = 'INVALID_REFERENCE';
    message = 'Referenced resource does not exist';
  } else if (err.status === 404) {
    statusCode = 404;
    errorCode = 'NOT_FOUND';
    message = err.message || 'Resource not found';
  } else if (err.status === 400) {
    statusCode = 400;
    errorCode = 'BAD_REQUEST';
    message = err.message || 'Invalid request';
  }

  res.status(statusCode).json({
    error: {
      code: errorCode,
      message,
      details: process.env.NODE_ENV !== 'production' ? err.stack : undefined
    }
  });
}

/**
 * Handle 404 errors for undefined routes
 */
export function notFoundHandler(req, res) {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
      details: {
        method: req.method,
        path: req.path
      }
    }
  });
}

export default errorHandler;
