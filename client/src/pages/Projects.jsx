import { useEffect, useState } from 'react';
import { fetchProjects } from '../lib/api';
import { ProjectCard } from '../components/ProjectCard';
import { AnimateOnView } from '../components/ScrollProgress';

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  // Get all unique tags
  const allTags = Array.from(
    new Set(projects.flatMap(p => p.tags || []))
  ).sort();

  // Filter projects by selected tags
  const filteredProjects = projects.filter(project => {
    if (selectedTags.length === 0) return true;
    return selectedTags.some(tag => project.tags?.includes(tag));
  });

  // Toggle tag selection
  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="py-12">
      <div className="container">
        <AnimateOnView animation="fade-up">
          <h1 className="text-h1 mb-4 text-primary">Projects</h1>
          <p className="text-h3 text-text mb-8">
            A collection of work spanning different styles and approaches.
          </p>
        </AnimateOnView>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <AnimateOnView animation="fade-up" delay={100}>
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTags([])}
                  className={`px-4 py-2 rounded-full text-small transition-all hover:scale-105 ${
                    selectedTags.length === 0
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-accent/20 text-accent hover:bg-accent/30'
                  }`}
                >
                  All
                </button>
                {allTags.map((tag, index) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-small transition-all hover:scale-105 ${
                      selectedTags.includes(tag)
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-accent/20 text-accent hover:bg-accent/30'
                    }`}
                    style={{ transitionDelay: `${index * 30}ms` }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </AnimateOnView>
        )}

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-80 bg-accent/20 rounded-vibe animate-pulse"
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <AnimateOnView animation="fade-up">
            <p className="text-text text-center py-12">
              No projects match the selected filters.
            </p>
          </AnimateOnView>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <AnimateOnView
                key={project.id}
                animation="fade-up"
                delay={index * 80}
              >
                <ProjectCard project={project} />
              </AnimateOnView>
            ))}
          </div>
        )}

        {/* Results Count */}
        {!loading && (
          <AnimateOnView animation="fade-up">
            <p className="text-small text-text/50 mt-6 text-center">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </AnimateOnView>
        )}
      </div>
    </div>
  );
}

export default Projects;
