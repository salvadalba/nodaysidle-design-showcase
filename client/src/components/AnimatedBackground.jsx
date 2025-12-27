import { useEffect, useRef } from 'react';
import { useVibe } from './VibeProvider';

/**
 * Animated gradient background with subtle particle effects
 * The animation style changes based on the current vibe
 */
export function AnimatedBackground() {
  const { currentVibe, sliderPosition } = useVibe();
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Handle resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Initialize particles
    const particleCount = sliderPosition > 70 ? 100 : 50; // More particles for wild vibes
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, width, height);

      // Use current vibe colors
      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary').trim() || '#7c3aed';
      const accentColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-accent').trim() || '#c026d3';

      // Opacity based on slider position (more visible for wild vibes)
      const opacity = sliderPosition / 200 + 0.02;

      gradient.addColorStop(0, `${primaryColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, `${accentColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw particles
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      particlesRef.current = [];
    };
  }, [sliderPosition, currentVibe]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{
        opacity: Math.min(0.3, sliderPosition / 200) // More visible for wild vibes
      }}
    />
  );
}

export default AnimatedBackground;
