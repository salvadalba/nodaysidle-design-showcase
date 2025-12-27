import rateLimit from 'express-rate-limit';

// Rate limit: 100 requests per minute per IP
export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests from this IP, please try again later.',
        details: {
          retryAfter: '60 seconds'
        }
      }
    });
  }
});

export default rateLimiter;
