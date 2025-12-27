import { useEffect, useState, useRef } from 'react';
import { useVibe } from './VibeProvider';

/**
 * Scroll progress bar at the top of the page
 */
export function ScrollProgress() {
  const { sliderPosition } = useVibe();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / windowHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-50"
      style={{
        background: 'rgba(255,255,255,0.1)'
      }}
    >
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(90deg, var(--color-primary), var(--color-accent))`,
          boxShadow: sliderPosition > 70 ? '0 0 10px var(--color-accent)' : 'none'
        }}
      />
    </div>
  );
}

/**
 * Hook to trigger animations when elements come into view
 */
export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return [ref, isInView];
}

/**
 * Component that animates when scrolled into view
 */
export function AnimateOnView({ children, animation = 'fade-up', delay = 0, className = '' }) {
  const [ref, isInView] = useInView();

  const animations = {
    'fade-up': 'translate-y-8 opacity-0',
    'fade-down': '-translate-y-8 opacity-0',
    'fade-left': '-translate-x-8 opacity-0',
    'fade-right': 'translate-x-8 opacity-0',
    'scale': 'scale-95 opacity-0',
    'none': ''
  };

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${isInView ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : animations[animation]}
        ${className}
      `}
      style={{
        transitionDelay: isInView ? `${delay}ms` : '0ms'
      }}
    >
      {children}
    </div>
  );
}

/**
 * Parallax scroll effect component
 */
export function Parallax({ children, speed = 0.5, className = '' }) {
  const [offsetY, setOffsetY] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * speed;
        setOffsetY(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          transform: `translateY(${offsetY}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default ScrollProgress;
