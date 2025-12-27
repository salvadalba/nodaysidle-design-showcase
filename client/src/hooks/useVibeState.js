import { useState, useEffect, useMemo } from 'react';
import { fetchVibes } from '../lib/api';
import { getVibeConfig } from '../lib/vibeUtils';

/**
 * Hook for managing vibe slider state and deriving current vibe
 * @returns {Object} Vibe state object
 */
export function useVibeState() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [vibes, setVibes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vibes on mount
  useEffect(() => {
    async function loadVibes() {
      try {
        const data = await fetchVibes();
        setVibes(data);
      } catch (error) {
        console.error('Failed to load vibes:', error);
      } finally {
        setLoading(false);
      }
    }

    loadVibes();
  }, []);

  // Derive current vibe from slider position
  const currentVibe = useMemo(() => {
    return getVibeConfig(sliderPosition, vibes);
  }, [sliderPosition, vibes]);

  // Safe setter that clamps to 0-100
  const setSliderPositionClamped = (position) => {
    const clamped = Math.max(0, Math.min(100, position));
    if (clamped !== position) {
      console.warn(`Slider position ${position} clamped to ${clamped}`);
    }
    setSliderPosition(clamped);
  };

  return {
    sliderPosition,
    setSliderPosition: setSliderPositionClamped,
    currentVibe,
    vibes,
    loading
  };
}

export default useVibeState;
