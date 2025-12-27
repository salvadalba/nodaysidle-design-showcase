import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

/**
 * Enhanced Project Card with hover animations and visual effects
 */
export function ProjectCard({ project }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Lazy load animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div
        className={`
          card relative overflow-hidden transition-all duration-500
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          ${isHovered ? 'scale-[1.02] shadow-2xl' : 'scale-100'}
        `}
      >
        {/* Shimmer effect on hover */}
        <div
          className={`
            absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
            transition-transform duration-700
            ${isHovered ? 'translate-x-full' : '-translate-x-full'}
          `}
          style={{ transform: 'skewX(-20deg)' }}
        />

        {/* Image container with zoom effect */}
        {project.thumbnail_url && (
          <div className="aspect-video rounded-vibe mb-4 overflow-hidden relative bg-accent/20">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <img
              src={project.thumbnail_url}
              alt={project.title}
              className={`
                w-full h-full object-cover transition-transform duration-700
                ${isHovered ? 'scale-110' : 'scale-100'}
              `}
              loading="lazy"
            />

            {/* Play/View indicator on hover */}
            <div
              className={`
                absolute inset-0 flex items-center justify-center
                transition-all duration-300
                ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
              `}
            >
              <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-h3 font-semibold text-primary group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-small text-text/70 line-clamp-2">
            {project.description}
          </p>

          {/* Tags with hover animation */}
          <div className="flex flex-wrap gap-2">
            {project.tags?.slice(0, 3).map((tag, index) => (
              <span
                key={tag}
                className={`
                  text-small px-3 py-1 rounded-full transition-all duration-300
                  ${isHovered ? 'bg-primary text-white translate-y-0' : 'bg-accent/20 text-accent'}
                  hover:bg-accent hover:text-white
                `}
                style={{
                  transitionDelay: isHovered ? `${index * 50}ms` : '0ms'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          {/* External Links */}
          <div className="flex gap-2 mt-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-small px-3 py-1 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Code
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-small px-3 py-1 bg-accent text-white rounded-full hover:bg-primary transition-colors flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Demo
              </a>
            )}
          </div>

          {/* Arrow indicator on hover */}
          <div
            className={`
              flex items-center gap-2 text-accent text-small font-medium
              transition-all duration-300
              ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-[-8px] opacity-0'}
            `}
          >
            View Project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>

        {/* Border glow effect */}
        <div
          className={`
            absolute inset-0 rounded-vibe opacity-0 transition-opacity duration-500
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            background: 'linear-gradient(45deg, var(--color-primary), var(--color-accent))',
            filter: 'blur(20px)',
            zIndex: -1
          }}
        />
      </div>
    </Link>
  );
}

export default ProjectCard;
