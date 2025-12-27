import crypto from 'crypto';

/**
 * Add unique request ID to each request and include it in response headers
 */
export function requestId(req, res, next) {
  const id = crypto.randomUUID();
  req.id = id;
  res.setHeader('X-Request-ID', id);
  next();
}

export default requestId;
