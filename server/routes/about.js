import express from 'express';
import { query } from '../db/index.js';
import logger from '../logger.js';

const router = express.Router();

/**
 * GET /api/about
 * Get about content
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await query(
      'SELECT content FROM about_content ORDER BY updated_at DESC LIMIT 1'
    );

    if (result.rows.length === 0) {
      return res.status(200).json({});
    }

    res.status(200).json(result.rows[0].content);

    logger.info('About content fetched', {
      requestId: req.id
    });
  } catch (error) {
    next(error);
  }
});

export default router;
