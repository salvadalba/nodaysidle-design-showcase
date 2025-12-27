import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProjectById, fetchCaseStudies } from '../lib/api';

export function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [projectData, studiesData] = await Promise.all([
          fetchProjectById(id),
          fetchCaseStudies()
        ]);

        setProject(projectData);
        // Filter case studies for this project
        setCaseStudies(studiesData.filter(cs => cs.project_id === id));
      } catch (error) {
        console.error('Failed to load project:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="py-12">
        <div className="container">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-accent/20 rounded-vibe w-3/4" />
            <div className="h-6 bg-accent/20 rounded-vibe w-1/2" />
            <div className="h-96 bg-accent/20 rounded-vibe" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-12">
        <div className="container text-center">
          <h1 className="text-h1 mb-4 text-primary">Project Not Found</h1>
          <p className="text-text mb-8">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 animate-fade-in">
      <div className="container">
        {/* Back Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="text-accent hover:text-primary transition-colors mb-8 inline-flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </button>

        {/* Project Header */}
        <h1 className="text-h1 mb-4 text-primary">{project.title}</h1>
        <p className="text-h3 text-text mb-8">{project.description}</p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-small px-4 py-2 bg-accent/20 text-accent rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* External Links */}
        {(project.github_url || project.live_url) && (
          <div className="flex gap-4 mb-8">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        )}

        {/* Project Images */}
        {project.images && project.images.length > 0 && (
          <div className="space-y-8 mb-12">
            {project.images.map((image, index) => (
              <div key={index} className="rounded-vibe overflow-hidden">
                <img
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {/* Project Content */}
        {project.content && (
          <div className="card mb-12">
            <div className="prose prose-lg max-w-none text-text">
              {project.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Case Studies */}
        {caseStudies.length > 0 && (
          <section>
            <h2 className="text-h2 mb-8 text-primary">Case Studies</h2>
            <div className="space-y-8">
              {caseStudies.map(cs => (
                <div key={cs.id} className="card">
                  <h3 className="text-h3 mb-2 text-primary">{cs.title}</h3>
                  <p className="text-small text-text/70 mb-4">{cs.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-accent mb-2">Challenge</h4>
                      <p className="text-small text-text">{cs.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent mb-2">Solution</h4>
                      <p className="text-small text-text">{cs.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent mb-2">Results</h4>
                      <p className="text-small text-text">{cs.results}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;
