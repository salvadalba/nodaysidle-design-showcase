import express from 'express';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const app = express();

// Simple CORS for Vercel
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use(express.json());

// Database connection
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all projects
app.get('/api/projects', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects ORDER BY featured DESC, created_at DESC');
        res.json({ projects: result.rows });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// Get single project
app.get('/api/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});

// Get vibes
app.get('/api/vibes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM vibe_configs ORDER BY slider_position ASC');
        res.json({ vibes: result.rows });
    } catch (error) {
        console.error('Error fetching vibes:', error);
        res.status(500).json({ error: 'Failed to fetch vibes' });
    }
});

// Get about
app.get('/api/about', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM about_content LIMIT 1');
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'About content not found' });
        }
        const about = result.rows[0];
        // Parse JSON fields
        about.skills = typeof about.skills === 'string' ? JSON.parse(about.skills) : about.skills;
        about.experience = typeof about.experience === 'string' ? JSON.parse(about.experience) : about.experience;
        about.social_links = typeof about.social_links === 'string' ? JSON.parse(about.social_links) : about.social_links;
        res.json(about);
    } catch (error) {
        console.error('Error fetching about:', error);
        res.status(500).json({ error: 'Failed to fetch about content' });
    }
});

// Get case studies
app.get('/api/case-studies', async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT cs.*, p.title as project_title 
      FROM case_studies cs 
      LEFT JOIN projects p ON cs.project_id = p.id 
      ORDER BY cs.order_index ASC
    `);
        res.json({ caseStudies: result.rows });
    } catch (error) {
        console.error('Error fetching case studies:', error);
        res.status(500).json({ error: 'Failed to fetch case studies' });
    }
});

// Catch-all for undefined API routes
app.all('/api/*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
});

export default app;
