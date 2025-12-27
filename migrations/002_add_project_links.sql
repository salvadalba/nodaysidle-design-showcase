-- Migration: Add external link columns to projects table
-- Created: 2024-12-27

ALTER TABLE projects ADD COLUMN IF NOT EXISTS github_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS live_url TEXT;
