import { useEffect, useState } from 'react';
import { fetchAbout } from '../lib/api';

export function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAbout() {
      try {
        const data = await fetchAbout();
        setAbout(data);
      } catch (error) {
        console.error('Failed to load about content:', error);
      } finally {
        setLoading(false);
      }
    }
    loadAbout();
  }, []);

  if (loading) {
    return (
      <div className="py-12">
        <div className="container">
          <div className="animate-pulse space-y-8">
            <div className="h-16 bg-accent/20 rounded-vibe w-1/2" />
            <div className="h-64 bg-accent/20 rounded-vibe" />
          </div>
        </div>
      </div>
    );
  }

  if (!about || !about.name) {
    return (
      <div className="py-12">
        <div className="container text-center">
          <h1 className="text-h1 mb-4 text-primary">About</h1>
          <p className="text-text">About content not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 animate-fade-in">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h1 className="text-h1 mb-2 text-primary">{about.name}</h1>
          <p className="text-h3 text-accent mb-12">Designer & Developer</p>

          {/* Bio */}
          {about.bio && (
            <section className="card mb-12">
              <h2 className="text-h2 mb-4 text-primary">About Me</h2>
              <p className="text-body text-text leading-relaxed">
                {about.bio}
              </p>
            </section>
          )}

          {/* Skills */}
          {about.skills && about.skills.length > 0 && (
            <section className="card mb-12">
              <h2 className="text-h2 mb-6 text-primary">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {about.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-accent/20 text-accent rounded-full text-body"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {about.experience && about.experience.length > 0 && (
            <section className="card mb-12">
              <h2 className="text-h2 mb-6 text-primary">Experience</h2>
              <div className="space-y-8">
                {about.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-accent/30 pl-6 relative">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-accent rounded-full" />
                    <h3 className="text-h3 text-primary mb-1">{exp.title}</h3>
                    <p className="text-accent font-medium mb-2">{exp.company}</p>
                    <p className="text-small text-text/60 mb-3">{exp.period}</p>
                    {exp.description && (
                      <p className="text-body text-text">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Contact */}
          {about.social_links && (
            <section className="card">
              <h2 className="text-h2 mb-6 text-primary">Get In Touch</h2>
              <div className="flex flex-wrap gap-4">
                {about.social_links.email && (
                  <a
                    href={`mailto:${about.social_links.email}`}
                    className="btn-primary"
                  >
                    Email Me
                  </a>
                )}
                {about.social_links.github && (
                  <a
                    href={about.social_links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    GitHub
                  </a>
                )}
                {about.social_links.linkedin && (
                  <a
                    href={about.social_links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    LinkedIn
                  </a>
                )}
                {about.social_links.twitter && (
                  <a
                    href={about.social_links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    Twitter
                  </a>
                )}
                {about.social_links.dribbble && (
                  <a
                    href={about.social_links.dribbble}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    Dribbble
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default About;
