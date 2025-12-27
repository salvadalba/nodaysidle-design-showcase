import { useEffect, useRef, useState } from 'react';
import { useVibe } from './VibeProvider';

/**
 * Custom cursor that changes behavior based on vibe slider position
 * - Corporate (0-25): Subtle dot cursor
 * - Balanced (25-75): Circle with trailing effect
 * - Wild (75-100): Colorful, particle-emitting cursor
 */
export function CustomCursor() {
  const { sliderPosition } = useVibe();
  const cursorRef = useRef(null);
  const trailRef = useRef([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Trail points
  const MAX_TRAIL = sliderPosition > 70 ? 20 : 10;

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Add trail point
      if (sliderPosition > 50) {
        trailRef.current.push({
          x: e.clientX,
          y: e.clientY,
          age: 0
        });

        // Remove old trail points
        if (trailRef.current.length > MAX_TRAIL) {
          trailRef.current.shift();
        }
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [sliderPosition]);

  // Animate trail
  useEffect(() => {
    let animationId;

    const animateTrail = () => {
      trailRef.current = trailRef.current.map(point => ({
        ...point,
        age: point.age + 1
      })).filter(point => point.age < 30); // Remove old points

      animationId = requestAnimationFrame(animateTrail);
    };

    if (sliderPosition > 50) {
      animateTrail();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [sliderPosition]);

  // Don't show custom cursor on touch devices
  const isTouch = 'ontouchstart' in window;
  if (isTouch || sliderPosition < 25) {
    return null;
  }

  const getCursorStyle = () => {
    const baseStyle = {
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 9999,
      mixBlendMode: 'difference'
    };

    if (sliderPosition < 50) {
      // Balanced: Simple circle
      return {
        ...baseStyle,
        left: position.x - 10,
        top: position.y - 10,
        width: isHovering ? 40 : 20,
        height: isHovering ? 40 : 20,
        borderRadius: '50%',
        backgroundColor: 'white',
        transition: 'all 0.15s ease-out'
      };
    } else {
      // Wild: Larger, more dynamic
      return {
        ...baseStyle,
        left: position.x - 15,
        top: position.y - 15,
        width: isHovering ? 60 : 30,
        height: isHovering ? 60 : 30,
        borderRadius: '50%',
        backgroundColor: sliderPosition > 80 ? 'var(--color-accent)' : 'white',
        transition: 'all 0.1s ease-out',
        boxShadow: sliderPosition > 80 ? '0 0 20px var(--color-accent)' : 'none'
      };
    }
  };

  return (
    <>
      {/* Main cursor */}
      <div ref={cursorRef} style={getCursorStyle()} />

      {/* Trail effect for wild vibes */}
      {sliderPosition > 50 && trailRef.current.map((point, index) => {
        const opacity = (1 - point.age / 30) * (sliderPosition / 100);
        const size = (1 - point.age / 30) * (sliderPosition > 80 ? 20 : 10);

        return (
          <div
            key={`${point.x}-${point.y}-${index}`}
            style={{
              position: 'fixed',
              left: point.x - size / 2,
              top: point.y - size / 2,
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: sliderPosition > 80 ? 'var(--color-accent)' : 'rgba(255,255,255,0.5)',
              opacity,
              pointerEvents: 'none',
              zIndex: 9998,
              mixBlendMode: 'difference'
            }}
          />
        );
      })}
    </>
  );
}

export default CustomCursor;
