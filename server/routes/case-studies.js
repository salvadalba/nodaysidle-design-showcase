import express from 'express';
import { query } from '../db/index.js';
import logger from '../logger.js';

const router = express.Router();

/**
 * GET /api/case-studies
 * Get all case studies ordered by order_index
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await query(
      `SELECT cs.*, p.title as project_title, p.thumbnail_url as project_thumbnail
       FROM case_studies cs
       LEFT JOIN projects p ON cs.project_id = p.id
       ORDER BY cs.order_index ASC`
    );

    res.status(200).json({
      caseStudies: result.rows
    });

    logger.info('Case studies fetched', {
      requestId: req.id,
      count: result.rowCount
    });
  } catch (error) {
    next(error);
  }
});

export default router;
