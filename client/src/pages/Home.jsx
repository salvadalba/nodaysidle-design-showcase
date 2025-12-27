import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProjects } from '../lib/api';
import { Hero } from '../components/Hero';
import { ProjectCard } from '../components/ProjectCard';
import { AnimateOnView, useInView } from '../components/ScrollProgress';
import { TypingText } from '../components/Hero';

export function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchProjects();
        // Show featured projects, or first 3 if none marked as featured
        const featured = data.filter(p => p.featured).slice(0, 3);
        setProjects(featured.length > 0 ? featured : data.slice(0, 3));
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <div>
      {/* Hero Section with Animated Text */}
      <Hero
        title="NODAYSIDLE"
        subtitle={
          <span>
            2 people, 1 entity. We build{' '}
            <span className="text-primary">AI-powered tools</span>,{' '}
            <span className="text-accent">generative art</span>, and
            innovative interfaces that push the boundaries of what's possible.
          </span>
        }
      >
        <Link to="/projects" className="btn-primary">
          Explore Projects
        </Link>
        <a
          href="https://0riginzero-8tngzswx9-nodaysidle.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Try Origin Zero
        </a>
      </Hero>

      {/* Featured Projects with Scroll Animations */}
      <section className="py-16">
        <div className="container">
          <AnimateOnView animation="fade-up">
            <h2 className="text-h2 mb-4 text-primary">What We've Built</h2>
            <p className="text-body text-text/70 mb-12">
              A selection of projects showcasing our range—from AI tools to generative art.
            </p>
          </AnimateOnView>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-80 bg-accent/20 rounded-vibe animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <p className="text-text text-center py-12">No projects to display yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <AnimateOnView
                  key={project.id}
                  animation="fade-up"
                  delay={index * 100}
                >
                  <ProjectCard project={project} />
                </AnimateOnView>
              ))}
            </div>
          )}

          <AnimateOnView animation="fade-up" delay={300}>
            <div className="mt-12 text-center">
              <Link to="/projects" className="btn-secondary">
                View All Projects
              </Link>
            </div>
          </AnimateOnView>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="py-20">
        <div className="container">
          <AnimateOnView animation="scale">
            <div className="card text-center p-12">
              <h2 className="text-h2 mb-4 text-primary">
                Ready to See Something Amazing?
              </h2>
              <p className="text-body text-text/70 mb-8">
                Try dragging the Vibe Slider above to watch this entire portfolio transform in real-time.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <span className="text-small text-accent">Corporate</span>
                <div className="w-32 h-2 bg-gradient-to-r from-primary to-accent rounded-full" />
                <span className="text-small text-accent">Experimental</span>
              </div>
            </div>
          </AnimateOnView>
        </div>
      </section>
    </div>
  );
}

export default Home;
