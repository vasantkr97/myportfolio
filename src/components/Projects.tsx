import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Badge from './Badge'
import { projects } from '../lib/projects'

interface ProjectsProps {
  className?: string
}

const displayProjects = projects.map((project) => ({
  title: project.title,
  description: project.description,
  image: project.image,
  tags: project.tags,
  status: project.status,
  projectPage: `/projects/${project.slug}`,
  github:
    project.githubOwner && project.githubRepo
      ? `https://github.com/${project.githubOwner}/${project.githubRepo}`
      : '#',
  npm: project.npm,
  demo: project.demo || '#',
}))

const Projects: React.FC<ProjectsProps> = ({ className = '' }) => {
  useEffect(() => {
    const initAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      const projectsSection = document.getElementById('projects')
      if (projectsSection) {
        gsap.fromTo(
          projectsSection,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            scrollTrigger: {
              trigger: projectsSection,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
              once: true,
            },
          }
        )

        gsap.fromTo(
          '.project-item',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: '.projects-grid',
              start: 'top 85%',
              end: 'bottom 70%',
              scrub: 1,
              once: true,
            },
          }
        )
      }
    }

    initAnimations()
  }, [])

  return (
    <section
      className={`projects-section my-16 sm:my-24 md:my-32 opacity-0 relative scroll-reveal ${className}`}
      id="projects"
    >
      <div className="projects-section-container mx-auto">
        <div className="projects-heading-container flex flex-col gap-2 sm:gap-4 mb-6 sm:mb-8 md:mb-8">
          <Badge size="sm">Projects</Badge>
          <div className="flex items-center justify-between my-6">
            <div className="projects-subheading text-base sm:text-xl md:text-3xl">
              What I've Built
            </div>
            <a
              href="https://github.com/vasantkr97"
              target="_blank"
              rel="noopener noreferrer"
              className="all-projects-link border p-2 px-4 border-[var(--border-color)] text-xs sm:text-base text-[var(--text-secondary)] font-medium hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]"
            >
              View GitHub
            </a>
          </div>
        </div>

        <div className="projects-grid grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3">
          {displayProjects.map((project, index) => (
            <div key={index} className="project-item h-full flex flex-col" data-index={index}>
              <div className="project-card-wrapper group h-full flex flex-col">
                <div className="project-card flex flex-col h-full border border-[var(--border-color)] group-hover:border-[var(--accent-primary)] overflow-hidden relative bg-[var(--card-bg)]">
                  <div className="project-card-image-container relative overflow-hidden w-full aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-card-image w-full h-full object-cover transition-transform duration-600 ease-in-out group-hover:scale-105"
                    />
                  </div>
                  <div className="project-card-content p-4 sm:p-5 relative flex flex-col flex-1">
                    <div className="project-card-tags flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs px-2 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="project-card-title text-base sm:text-lg mb-2 sm:mb-3 font-medium group-hover:text-[var(--accent-primary)] line-clamp-2 leading-tight">
                      {project.projectPage ? (
                        <Link to={project.projectPage} className="hover:underline">
                          {project.title}
                        </Link>
                      ) : (
                        project.title
                      )}
                    </h3>
                    <p className="project-card-description text-xs sm:text-sm text-[var(--text-secondary)] mb-4 sm:mb-6 leading-relaxed line-clamp-4">
                      {project.description}
                    </p>
                    <div className="mt-auto">
                      <div className="project-card-links flex justify-between items-center mt-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] flex items-center gap-1"
                          title="View on GitHub"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          GitHub
                        </a>
                        <Badge size="sm" text={project.status.toUpperCase()} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .projects-section {
          will-change: transform;
        }

        .project-item {
          height: 100%;
          will-change: auto;
          transition: opacity 0.3s ease-in-out;
          display: flex;
          flex-direction: column;
        }

        .project-card-wrapper {
          transform: translateY(0);
          transition: transform 0.3s ease-in-out;
          will-change: transform;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .project-card {
          background-color: var(--card-bg);
          border-color: var(--border-color);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .project-card-content {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </section>
  )
}

export default Projects
