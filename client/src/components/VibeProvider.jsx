import { createContext, useContext, useEffect, useMemo } from 'react';
import { useVibeState } from '../hooks/useVibeState';
import { applyTheme } from '../lib/vibeUtils';
import { AnimatedBackground } from './AnimatedBackground';
import { CustomCursor } from './CustomCursor';
import { ScrollProgress } from './ScrollProgress';

const VibeContext = createContext(null);

/**
 * Provider component that wraps the app with vibe state management
 */
export function VibeProvider({ children }) {
  const { sliderPosition, setSliderPosition, currentVibe, vibes, loading } = useVibeState();

  // Apply theme when current vibe changes
  useEffect(() => {
    if (currentVibe?.config) {
      applyTheme(currentVibe.config);
    }
  }, [currentVibe]);

  // Preload adjacent vibe configs
  useEffect(() => {
    if (!vibes.length) return;

    // Preload vibes within ±10 positions
    const minPos = Math.max(0, sliderPosition - 10);
    const maxPos = Math.min(100, sliderPosition + 10);

    // Find vibes in range (already loaded from API, but could preload fonts/images)
    const adjacentVibes = vibes.filter(
      v => v.slider_position >= minPos && v.slider_position <= maxPos
    );

    // Could preload fonts or other assets here
    if (adjacentVibes.length > 0 && adjacentVibes[0].config?.typography?.font_family) {
      const font = adjacentVibes[0].config.typography.font_family;
      document.body.style.fontFamily = font;
    }
  }, [sliderPosition, vibes]);

  const contextValue = useMemo(() => ({
    sliderPosition,
    setSliderPosition,
    currentVibe,
    vibes,
    loading
  }), [sliderPosition, setSliderPosition, currentVibe, vibes, loading]);

  return (
    <VibeContext.Provider value={contextValue}>
      <AnimatedBackground />
      <ScrollProgress />
      <CustomCursor />
      {children}
    </VibeContext.Provider>
  );
}

/**
 * Hook to access vibe context
 * @returns {Object} Vibe context value
 */
export function useVibe() {
  const context = useContext(VibeContext);
  if (!context) {
    throw new Error('useVibe must be used within VibeProvider');
  }
  return context;
}

export default VibeProvider;
