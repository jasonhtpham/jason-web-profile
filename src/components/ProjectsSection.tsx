import { Code2, ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="glass-card rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-10">
            <Code2 size={32} className="text-sky-300" />
            <h2 className="text-3xl font-bold text-slate-100">Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border border-slate-800/80 rounded-xl p-6 transition-all bg-slate-950/40 hover:border-sky-400/50 hover:shadow-[0_0_24px_rgba(56,189,248,0.18)]"
              >
                {project.image_url && (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg mb-4 border border-slate-800/80"
                  />
                )}

                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-semibold text-slate-100">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="data-chip text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-slate-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="data-chip text-sm px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-400">
                    {project.start_date} - {project.end_date}
                  </span>
                  <div className="flex gap-3 ml-auto">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-sky-300 transition-colors"
                        title="View on GitHub"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-sky-300 transition-colors"
                        title="Visit project"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
