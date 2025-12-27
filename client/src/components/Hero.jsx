import { useEffect, useState, useRef } from 'react';

/**
 * Animated hero section with text reveal and interactive elements
 */
export function Hero({ title, subtitle, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Split title into words for staggered animation
  const words = title?.split(' ') || [];

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center py-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-pulse" />
      </div>

      <div className="container">
        <div className="max-w-4xl">
          {/* Animated title */}
          <h1 className="text-h1 md:text-h1 lg:text-[5rem] font-bold mb-6 leading-tight">
            {words.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="inline-block mr-4"
                style={{
                  animation: `revealWord 0.6s ease-out ${wordIndex * 0.1}s both`
                }}
              >
                {word.split('').map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className="inline-block"
                    style={{
                      animation: `revealChar 0.4s ease-out ${(wordIndex * 0.1) + (charIndex * 0.03)}s both`
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* Fade in subtitle */}
          <p
            className={`
              text-h3 text-text/80 mb-8
              transition-all duration-700 delay-500
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            {subtitle}
          </p>

          {/* CTA buttons with stagger */}
          <div
            className={`
              flex flex-wrap gap-4
              transition-all duration-700 delay-700
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            {children}
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes revealWord {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes revealChar {
          from {
            opacity: 0;
            transform: translateY(10px) rotateX(90deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }
      `}</style>
    </section>
  );
}

/**
 * Typing animation for dynamic text
 */
export function TypingText({ texts, speed = 100, delay = 2000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentFullText = texts[currentIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < currentFullText.length) {
            setCurrentText(currentFullText.slice(0, currentText.length + 1));
          } else {
            // Finished typing, wait before deleting
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentFullText.slice(0, currentText.length - 1));
          } else {
            // Move to next text
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts, speed, delay]);

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-accent">
      {currentText}
      <span
        className={`
          inline-block w-0.5 h-6 bg-accent ml-1 align-middle
          transition-opacity duration-100
          ${showCursor ? 'opacity-100' : 'opacity-0'}
        `}
      />
    </span>
  );
}

export default Hero;
