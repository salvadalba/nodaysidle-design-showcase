import logger from '../logger.js';

/**
 * Log all incoming requests with timing information
 */
export function requestLogger(req, res, next) {
  const startTime = Date.now();
  res.startTime = startTime;

  // Log request
  logger.info('Incoming request', {
    requestId: req.id,
    method: req.method,
    path: req.path,
    query: req.query,
    ip: req.ip
  });

  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logLevel = duration > 100 ? 'warn' : 'info';

    logger.log(logLevel, 'Request completed', {
      requestId: req.id,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      slow: duration > 100
    });
  });

  next();
}

export default requestLogger;
