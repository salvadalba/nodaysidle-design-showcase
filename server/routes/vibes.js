import express from 'express';
import vibeCache from '../cache/vibeCache.js';
import logger from '../logger.js';

const router = express.Router();

/**
 * GET /api/vibes
 * Get all vibe configurations
 */
router.get('/', async (req, res, next) => {
  try {
    // Load from cache (or query DB if cache is empty)
    let vibes = vibeCache.get();

    if (!vibes || vibes.length === 0) {
      await vibeCache.init();
      vibes = vibeCache.get();
    }

    res.status(200).json({
      vibes
    });

    logger.info('Vibes fetched', {
      requestId: req.id,
      count: vibes.length,
      fromCache: vibeCache.isReady()
    });
  } catch (error) {
    next(error);
  }
});

export default router;
