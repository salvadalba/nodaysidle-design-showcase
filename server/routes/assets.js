import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Serve static files from public/assets directory
const assetsPath = path.join(__dirname, '../public/assets');

// Set cache headers (1 day)
const maxAge = 24 * 60 * 60 * 1000;

// MIME types for common image formats
const mimeTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

router.use(express.static(assetsPath, {
  maxAge,
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = mimeTypes[ext];
    if (mimeType) {
      res.setHeader('Content-Type', mimeType);
    }
    res.setHeader('Cache-Control', `public, max-age=${maxAge / 1000}`);
  }
}));

export default router;
