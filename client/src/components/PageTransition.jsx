import { useEffect, useState, useRef } from 'react';

/**
 * Page transition wrapper with fade and slide animations
 */
export function PageTransition({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    // Trigger animation on mount and when children change
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [children]);

  return (
    <div
      ref={contentRef}
      className={`
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      {children}
    </div>
  );
}

/**
 * Stagger children animation for lists
 */
export function StaggerChildren({ children, className = '' }) {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className="animate-fade-in"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'both'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/**
 * Scale animation on mount
 */
export function ScaleIn({ children, delay = 0 }) {
  const [isScaled, setIsScaled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsScaled(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`
        transition-all duration-500 ease-out
        ${isScaled ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `}
    >
      {children}
    </div>
  );
}

export default PageTransition;
