import { Link } from 'react-router-dom';
import { VibeSlider } from './VibeSlider';

export function Header() {
  return (
    <header className="border-b border-accent/20 backdrop-blur-md bg-background/80 sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Site Title */}
          <Link to="/" className="text-h2 font-bold text-primary hover:text-accent transition-colors">
            NO<span className="text-accent">DAYS</span>IDLE
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-body font-medium text-text hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/projects"
              className="text-body font-medium text-text hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <Link
              to="/about"
              className="text-body font-medium text-text hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>
        </div>

        {/* Vibe Slider */}
        <div className="mt-4">
          <VibeSlider />
        </div>
      </div>
    </header>
  );
}

export default Header;
