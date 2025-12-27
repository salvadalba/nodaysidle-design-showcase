import express from 'express';
import { query } from '../db/index.js';
import { validateUuid } from '../middleware/validateUuid.js';
import logger from '../logger.js';

const router = express.Router();

/**
 * GET /api/projects
 * Get all projects
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await query(
      'SELECT id, title, description, thumbnail_url, images, tags, featured, created_at, updated_at FROM projects ORDER BY created_at DESC'
    );

    res.status(200).json({
      projects: result.rows
    });

    logger.info('Projects fetched', {
      requestId: req.id,
      count: result.rowCount
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/projects/:id
 * Get single project by ID
 */
router.get('/:id', validateUuid(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT * FROM projects WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Project not found',
          details: { id }
        }
      });
    }

    res.status(200).json(result.rows[0]);

    logger.info('Project fetched', {
      requestId: req.id,
      projectId: id
    });
  } catch (error) {
    next(error);
  }
});

export default router;
