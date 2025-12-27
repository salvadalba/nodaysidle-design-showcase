import { useState, useRef, useCallback, useEffect } from 'react';
import { useVibe } from './VibeProvider';

/**
 * Debounce hook for 16ms threshold (~60fps)
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 */
function useDebounce(func, delay = 16) {
  const timeoutRef = useRef(null);
  const isPendingRef = useRef(false);

  return useCallback((...args) => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    isPendingRef.current = true;

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      func(...args);
      isPendingRef.current = false;
    }, delay);
  }, [func, delay]);
}

/**
 * VibeSlider component - range input that controls the theme
 */
export function VibeSlider() {
  const { sliderPosition, setSliderPosition, currentVibe } = useVibe();
  const [localValue, setLocalValue] = useState(sliderPosition);
  const startTimeRef = useRef(null);

  // Sync local value with slider position
  useEffect(() => {
    setLocalValue(sliderPosition);
  }, [sliderPosition]);

  // Debounced update function
  const debouncedUpdate = useDebounce((value) => {
    if (startTimeRef.current) {
      const latency = Date.now() - startTimeRef.current;
      if (latency > 100) {
        console.warn(`Laggy slider interaction: ${latency}ms`);
      }
      startTimeRef.current = null;
    }
    setSliderPosition(value);
  }, 16);

  // Handle input change
  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLocalValue(value);

    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }

    debouncedUpdate(value);
  };

  return (
    <div className="vibe-slider-container">
      <label htmlFor="vibe-slider" className="sr-only">
        Theme vibe slider
      </label>

      <div className="flex items-center gap-4">
        <span className="text-sm text-accent font-medium">Corporate</span>

        <input
          id="vibe-slider"
          type="range"
          min="0"
          max="100"
          value={localValue}
          onChange={handleChange}
          aria-label="Theme vibe slider"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={localValue}
          aria-valuetext={currentVibe?.name || 'Loading...'}
          className="flex-1 h-2 bg-secondary/30 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          style={{
            background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-secondary) ${localValue}%, var(--color-secondary) ${localValue}%, var(--color-secondary) 100%)`
          }}
        />

        <span className="text-sm text-accent font-medium">Wild</span>
      </div>

      <div className="mt-2 text-center">
        <span className="text-sm font-medium text-primary">
          {currentVibe?.name || 'Loading...'}
        </span>
        <span className="text-sm text-text ml-2">
          ({localValue})
        </span>
      </div>
    </div>
  );
}

export default VibeSlider;
