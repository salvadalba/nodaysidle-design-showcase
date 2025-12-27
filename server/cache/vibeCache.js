import { query } from '../db/index.js';
import logger from '../logger.js';

let cache = null;

/**
 * Initialize vibe cache by loading all vibes from database
 */
export async function init() {
  try {
    const result = await query(
      'SELECT * FROM vibe_configs ORDER BY slider_position'
    );
    cache = result.rows;
    logger.info('Vibe cache initialized', { count: cache.length });
  } catch (error) {
    logger.error('Failed to initialize vibe cache', { error: error.message });
    throw error;
  }
}

/**
 * Get all vibes from cache
 * @returns {Array} Array of vibe configs
 */
export function get() {
  return cache || [];
}

/**
 * Get vibe by slider position
 * @param {number} position - Slider position (0-100)
 * @returns {Object|null} Nearest vibe config
 */
export function getByPosition(position) {
  if (!cache || cache.length === 0) return null;

  // Find exact match
  const exact = cache.find(v => v.slider_position === position);
  if (exact) return exact;

  // Find nearest vibe
  let nearest = cache[0];
  let minDiff = Math.abs(position - cache[0].slider_position);

  for (const vibe of cache) {
    const diff = Math.abs(position - vibe.slider_position);
    if (diff < minDiff) {
      minDiff = diff;
      nearest = vibe;
    }
  }

  return nearest;
}

/**
 * Refresh cache by reloading from database
 */
export async function refresh() {
  cache = null;
  await init();
}

/**
 * Check if cache is initialized
 * @returns {boolean}
 */
export function isReady() {
  return cache !== null && cache.length > 0;
}

export default {
  init,
  get,
  getByPosition,
  refresh,
  isReady
};
