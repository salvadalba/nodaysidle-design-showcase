import express from 'express';
import dotenv from 'dotenv';
import logger from './logger.js';
import vibeCache from './cache/vibeCache.js';
import cors from './middleware/cors.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { csp } from './middleware/csp.js';
import { requestId } from './middleware/requestId.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Import routes
import projectsRouter from './routes/projects.js';
import caseStudiesRouter from './routes/case-studies.js';
import aboutRouter from './routes/about.js';
import vibesRouter from './routes/vibes.js';
import assetsRouter from './routes/assets.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(requestId);
app.use(requestLogger);
app.use(cors);
app.use(rateLimiter);
app.use(csp);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/projects', projectsRouter);
app.use('/api/case-studies', caseStudiesRouter);
app.use('/api/about', aboutRouter);
app.use('/api/vibes', vibesRouter);
app.use('/api/assets', assetsRouter);

// 404 handler for undefined routes
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Initialize vibe cache and start server
async function start() {
  try {
    // Initialize vibe cache
    await vibeCache.init();
    logger.info('Vibe cache initialized successfully');

    // Start server
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`CORS origin: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    });
  } catch (error) {
    logger.error('Failed to start server', { error: error.message });
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

start();
