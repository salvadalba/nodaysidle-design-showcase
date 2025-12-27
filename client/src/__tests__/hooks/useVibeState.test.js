import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useVibeState } from '../../hooks/useVibeState';

// Mock the API
vi.mock('../../lib/api', () => ({
  fetchVibes: vi.fn()
}));

import { fetchVibes } from '../../lib/api';

describe('useVibeState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default slider position of 50', () => {
    fetchVibes.mockResolvedValue([]);

    const { result } = renderHook(() => useVibeState());

    expect(result.current.sliderPosition).toBe(50);
  });

  it('should initialize with loading state true', () => {
    fetchVibes.mockResolvedValue([]);

    const { result } = renderHook(() => useVibeState());

    expect(result.current.loading).toBe(true);
  });

  it('should fetch vibes on mount', async () => {
    const mockVibes = [
      { id: '1', name: 'Corporate', slider_position: 0, config: {} },
      { id: '2', name: 'Wild', slider_position: 100, config: {} }
    ];
    fetchVibes.mockResolvedValue(mockVibes);

    const { result } = renderHook(() => useVibeState());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(fetchVibes).toHaveBeenCalledOnce();
    expect(result.current.vibes).toEqual(mockVibes);
  });

  it('should derive current vibe from slider position', async () => {
    const mockVibes = [
      { id: '1', name: 'Corporate', slider_position: 0, config: { colors: { primary: 'blue' } } },
      { id: '2', name: 'Balanced', slider_position: 50, config: { colors: { primary: 'purple' } } },
      { id: '3', name: 'Wild', slider_position: 100, config: { colors: { primary: 'green' } } }
    ];
    fetchVibes.mockResolvedValue(mockVibes);

    const { result } = renderHook(() => useVibeState());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // At position 50, should get Balanced vibe
    expect(result.current.currentVibe.name).toBe('Balanced');
  });

  it('should update slider position', async () => {
    fetchVibes.mockResolvedValue([]);

    const { result } = renderHook(() => useVibeState());

    act(() => {
      result.current.setSliderPosition(75);
    });

    expect(result.current.sliderPosition).toBe(75);
  });

  it('should clamp slider position to 0-100', async () => {
    fetchVibes.mockResolvedValue([]);

    const { result } = renderHook(() => useVibeState());

    // Test upper bound
    act(() => {
      result.current.setSliderPosition(150);
    });
    expect(result.current.sliderPosition).toBe(100);

    // Test lower bound
    act(() => {
      result.current.setSliderPosition(-50);
    });
    expect(result.current.sliderPosition).toBe(0);
  });

  it('should find nearest vibe for non-exact positions', async () => {
    const mockVibes = [
      { id: '1', name: 'Corporate', slider_position: 0, config: {} },
      { id: '2', name: 'Wild', slider_position: 100, config: {} }
    ];
    fetchVibes.mockResolvedValue(mockVibes);

    const { result } = renderHook(() => useVibeState());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Set position to 25 (closer to 0 than 100)
    act(() => {
      result.current.setSliderPosition(25);
    });

    // Should get Corporate (position 0) as it's closer
    expect(result.current.currentVibe.name).toBe('Corporate');

    // Set position to 75 (closer to 100 than 0)
    act(() => {
      result.current.setSliderPosition(75);
    });

    // Should get Wild (position 100)
    expect(result.current.currentVibe.name).toBe('Wild');
  });

  it('should handle empty vibes array gracefully', async () => {
    fetchVibes.mockResolvedValue([]);

    const { result } = renderHook(() => useVibeState());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.vibes).toEqual([]);
    expect(result.current.currentVibe).toBeNull();
  });

  it('should return to 0 for position <= 0', async () => {
    const mockVibes = [
      { id: '1', name: 'Corporate', slider_position: 0, config: {} },
      { id: '2', name: 'Wild', slider_position: 100, config: {} }
    ];
    fetchVibes.mockResolvedValue(mockVibes);

    const { result } = renderHook(() => useVibeState());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setSliderPosition(0);
    });

    expect(result.current.currentVibe.name).toBe('Corporate');
  });

  it('should return last vibe for position >= 100', async () => {
    const mockVibes = [
      { id: '1', name: 'Corporate', slider_position: 0, config: {} },
      { id: '2', name: 'Wild', slider_position: 100, config: {} }
    ];
    fetchVibes.mockResolvedValue(mockVibes);

    const { result } = renderHook(() => useVibeState());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setSliderPosition(100);
    });

    expect(result.current.currentVibe.name).toBe('Wild');
  });
});
