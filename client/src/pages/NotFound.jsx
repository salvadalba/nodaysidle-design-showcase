import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="py-24 text-center animate-fade-in">
      <div className="container">
        <h1 className="text-h1 mb-4 text-primary">404</h1>
        <p className="text-h3 text-text mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
