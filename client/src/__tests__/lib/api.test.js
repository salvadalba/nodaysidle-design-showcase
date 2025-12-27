import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  fetchProjects,
  fetchProjectById,
  fetchCaseStudies,
  fetchAbout,
  fetchVibes,
  clearCaches,
  clearVibeCache
} from '../../lib/api';

describe('API Client', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn()
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    clearCaches();
  });

  describe('fetchProjects', () => {
    it('should fetch projects from API', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ projects: [{ id: '1', title: 'Test' }] })
        })
      );

      const result = await fetchProjects();

      expect(result).toEqual([{ id: '1', title: 'Test' }]);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/projects')
      );
    });

    it('should cache results in memory', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ projects: [{ id: '1', title: 'Test' }] })
        })
      );

      await fetchProjects();
      await fetchProjects(); // Second call should use cache

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should handle errors gracefully', async () => {
      global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

      const result = await fetchProjects();

      expect(result).toEqual([]);
    });
  });

  describe('fetchProjectById', () => {
    it('should fetch single project by ID', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ id: '123', title: 'Test Project' })
        })
      );

      const result = await fetchProjectById('123');

      expect(result).toEqual({ id: '123', title: 'Test Project' });
    });

    it('should validate UUID format', async () => {
      const result = await fetchProjectById('invalid-uuid');

      expect(result).toBeNull();
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should return null on 404', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          json: () => Promise.resolve({ error: { message: 'Not found' } })
        })
      );

      const result = await fetchProjectById('00000000-0000-0000-0000-000000000000');

      expect(result).toBeNull();
    });
  });

  describe('fetchCaseStudies', () => {
    it('should fetch case studies', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ caseStudies: [{ id: '1', title: 'Case Study' }] })
        })
      );

      const result = await fetchCaseStudies();

      expect(result).toEqual([{ id: '1', title: 'Case Study' }]);
    });

    it('should cache results', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ caseStudies: [] })
        })
      );

      await fetchCaseStudies();
      await fetchCaseStudies();

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchAbout', () => {
    it('should fetch about content', async () => {
      const aboutData = { name: 'Test', bio: 'Test bio' };
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(aboutData)
        })
      );

      const result = await fetchAbout();

      expect(result).toEqual(aboutData);
    });

    it('should return empty object if no content', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({})
        })
      );

      const result = await fetchAbout();

      expect(result).toEqual({});
    });
  });

  describe('fetchVibes', () => {
    it('should fetch vibes from API', async () => {
      const vibesData = {
        vibes: [
          { id: '1', name: 'Corporate', slider_position: 0, config: {} },
          { id: '2', name: 'Wild', slider_position: 100, config: {} }
        ]
      };

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(vibesData)
        })
      );

      const result = await fetchVibes();

      expect(result).toEqual(vibesData.vibes);
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should use localStorage cache if valid', async () => {
      const cachedVibes = [{ id: '1', name: 'Corporate', slider_position: 0, config: {} }];
      const now = Date.now();

      localStorage.getItem
        .mockReturnValueOnce(JSON.stringify(cachedVibes)) // vibe cache
        .mockReturnValueOnce(now.toString()); // timestamp (within TTL)

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ vibes: [] })
        })
      );

      const result = await fetchVibes();

      expect(result).toEqual(cachedVibes);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should bypass expired cache', async () => {
      const oldCache = [{ id: '1', name: 'Old', slider_position: 0, config: {} }];
      const oldTimestamp = Date.now() - 4000000; // Over an hour ago

      localStorage.getItem
        .mockReturnValueOnce(JSON.stringify(oldCache)) // vibe cache
        .mockReturnValueOnce(oldTimestamp.toString()); // expired timestamp

      const newVibes = [{ id: '2', name: 'New', slider_position: 50, config: {} }];

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ vibes: newVibes })
        })
      );

      const result = await fetchVibes();

      expect(result).toEqual(newVibes);
      expect(global.fetch).toHaveBeenCalled();
    });

    it('should return stale cache on error', async () => {
      const staleVibes = [{ id: '1', name: 'Stale', slider_position: 0, config: {} }];

      localStorage.getItem
        .mockReturnValueOnce('') // empty cache (triggers fetch)
        .mockReturnValueOnce(JSON.stringify(staleVibes)); // stale cache returned

      global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

      const result = await fetchVibes();

      expect(result).toEqual(staleVibes);
    });
  });

  describe('clearCaches', () => {
    it('should clear in-memory caches', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ projects: [{ id: '1' }] })
        })
      );

      await fetchProjects();
      clearCaches();

      // Should fetch again after clearing cache
      await fetchProjects();

      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('clearVibeCache', () => {
    it('should clear localStorage vibe cache', () => {
      clearVibeCache();

      expect(localStorage.removeItem).toHaveBeenCalledWith('vibe_cache');
      expect(localStorage.removeItem).toHaveBeenCalledWith('vibe_cache_timestamp');
    });
  });
});
