const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// In-memory caches
let projectsCache = null;
let caseStudiesCache = null;
let aboutCache = null;

/**
 * Make an API request with error handling
 * @param {string} endpoint - API endpoint path
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<any>} Response data
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

/**
 * Validate UUID v4 format
 * @param {string} id - ID to validate
 * @returns {boolean} True if valid UUID
 */
function isValidUUID(id) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

// ==================== Projects ====================

/**
 * Fetch all projects with caching
 * @returns {Promise<Project[]>} Array of projects
 */
export async function fetchProjects() {
  if (projectsCache) {
    return projectsCache;
  }

  try {
    const data = await apiRequest('/projects');
    projectsCache = data.projects || [];
    return projectsCache;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

/**
 * Fetch single project by ID
 * @param {string} id - Project UUID
 * @returns {Promise<Project|null>} Project object or null if not found
 */
export async function fetchProjectById(id) {
  if (!isValidUUID(id)) {
    console.warn('Invalid UUID format:', id);
    return null;
  }

  try {
    const data = await apiRequest(`/projects/${id}`);
    return data;
  } catch (error) {
    if (error.message.includes('404')) {
      return null;
    }
    throw error;
  }
}

// ==================== Case Studies ====================

/**
 * Fetch all case studies with caching
 * @returns {Promise<CaseStudy[]>} Array of case studies
 */
export async function fetchCaseStudies() {
  if (caseStudiesCache) {
    return caseStudiesCache;
  }

  try {
    const data = await apiRequest('/case-studies');
    caseStudiesCache = data.caseStudies || [];
    return caseStudiesCache;
  } catch (error) {
    console.error('Failed to fetch case studies:', error);
    return [];
  }
}

// ==================== About ====================

/**
 * Fetch about content with caching
 * @returns {Promise<About>} About content
 */
export async function fetchAbout() {
  if (aboutCache) {
    return aboutCache;
  }

  try {
    const data = await apiRequest('/about');
    aboutCache = data || {};
    return aboutCache;
  } catch (error) {
    console.error('Failed to fetch about content:', error);
    return {};
  }
}

// ==================== Vibes ====================

const VIBE_CACHE_KEY = 'vibe_cache';
const VIBE_CACHE_TIMESTAMP_KEY = 'vibe_cache_timestamp';
const VIBE_CACHE_TTL = 3600000; // 1 hour in milliseconds

/**
 * Fetch vibe configurations with localStorage caching (1 hour TTL)
 * @returns {Promise<VibeConfig[]>} Array of vibe configs
 */
export async function fetchVibes() {
  // Check localStorage cache
  const cachedTimestamp = localStorage.getItem(VIBE_CACHE_TIMESTAMP_KEY);
  const now = Date.now();

  if (cachedTimestamp && (now - parseInt(cachedTimestamp)) < VIBE_CACHE_TTL) {
    const cached = localStorage.getItem(VIBE_CACHE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.warn('Failed to parse cached vibes:', e);
      }
    }
  }

  // Fetch from API
  try {
    const data = await apiRequest('/vibes');
    const vibes = data.vibes || [];

    // Store in localStorage
    localStorage.setItem(VIBE_CACHE_KEY, JSON.stringify(vibes));
    localStorage.setItem(VIBE_CACHE_TIMESTAMP_KEY, now.toString());

    return vibes;
  } catch (error) {
    console.error('Failed to fetch vibes:', error);

    // Return stale cache if available
    const staleCache = localStorage.getItem(VIBE_CACHE_KEY);
    if (staleCache) {
      try {
        return JSON.parse(staleCache);
      } catch (e) {
        console.warn('Failed to parse stale cache:', e);
      }
    }

    return [];
  }
}

// ==================== Clear Caches ====================

/**
 * Clear all in-memory caches
 */
export function clearCaches() {
  projectsCache = null;
  caseStudiesCache = null;
  aboutCache = null;
}

/**
 * Clear vibe localStorage cache
 */
export function clearVibeCache() {
  localStorage.removeItem(VIBE_CACHE_KEY);
  localStorage.removeItem(VIBE_CACHE_TIMESTAMP_KEY);
}
