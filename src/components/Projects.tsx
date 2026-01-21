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

  status: project.status,
  projectPage: `/projects/${project.slug}`,
  github:
    project.githubOwner && project.githubRepo
      ? `https://github.com/${project.githubOwner}/${project.githubRepo}`
      : '#',
  liveUrl: project.liveUrl,
  technologies: project.technologies,
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
      className={`projects-section my-8 sm:my-10 md:my-14 opacity-0 relative scroll-reveal ${className}`}
      id="projects"
    >
      <div className="projects-section-container mx-auto">
        <div className="projects-heading-container flex flex-col gap-2 mb-4">
          <Badge size="sm">Projects</Badge>
          <div className="flex items-center justify-between gap-4 my-2">
            <div className="projects-subheading text-xl sm:text-2xl md:text-3xl font-semibold">
              What I've Built
            </div>
            <a
              href="https://github.com/vasantkr97"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md hover:bg-[var(--accent-primary)] hover:text-black hover:border-[var(--accent-primary)] transition-all duration-300 text-xs font-medium whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>View GitHub</span>
            </a>
          </div>
        </div>

        <div className="projects-grid flex flex-col gap-3">
          {displayProjects.map((project, index) => (
            <div key={index} className="project-item w-full" data-index={index}>
              <div className="project-card-wrapper group w-full">
                <div className="project-card w-full border border-dotted border-gray-700 hover:border-gray-500 overflow-hidden relative bg-[var(--card-bg)] rounded-xl transition-all duration-300">
                  <div className="project-card-content relative grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-3 p-2.5">
                    {/* Purple Glow Effect */}
                    <div className="absolute top-10 left-10 w-1/3 h-2/3 bg-gray-600/20 blur-[100px] pointer-events-none rounded-full"></div>

                    {/* Left: Image Section */}
                    <div className="project-image-section relative z-10 w-full group perspective-1000 h-32 sm:h-40 lg:h-full">
                      <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-800/50 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>

                    {/* Right: Content Section */}
                    <div className="project-info-section relative z-10 flex flex-col h-full justify-between">
                      {/* Header: Title & Buttons */}
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] tracking-tight leading-tight">
                            {project.projectPage ? (
                              <Link to={project.projectPage} className="hover:text-[var(--accent-primary)] transition-colors">
                                {project.title}
                              </Link>
                            ) : (
                              project.title
                            )}
                          </h3>
                        </div>

                        <div className="flex items-center gap-1.5 self-start sm:self-auto">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-gray-700 bg-black/20 text-gray-300 text-[10px] font-medium hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                          </a>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-gray-700 bg-black/20 text-gray-300 text-[10px] font-medium hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                              Live
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      {project.description === 'Coming Soon' ? (
                        <div className="relative w-full py-4 rounded-lg border border-dashed border-gray-700/50 bg-gray-900/30 flex items-center justify-center group/coming-soon overflow-hidden mb-2">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/10 to-transparent translate-x-[-100%] group-hover/coming-soon:translate-x-[100%] transition-transform duration-1000"></div>
                          <span className="text-[var(--text-secondary)] font-mono text-xs tracking-widest uppercase group-hover/coming-soon:text-[var(--accent-primary)] transition-colors duration-300">
                            Coming Soon
                          </span>
                        </div>
                      ) : (
                        <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed mb-2 line-clamp-2 sm:line-clamp-3">
                          {project.description}
                        </p>
                      )}

                      {/* Technologies */}
                      <div className="mt-1">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies?.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="inline-flex items-center px-1.5 py-0.5 border border-gray-800 bg-[var(--code-bg)] rounded text-[10px] font-medium text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-black hover:border-[var(--accent-primary)] transition-all duration-300 cursor-default"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Projects CTA */}
        <div className="flex justify-center mt-8 px-4 sm:px-0">
          <a
            href="https://github.com/vasantkr97?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full hover:bg-[var(--accent-primary)] hover:text-black hover:border-[var(--accent-primary)] transition-all duration-300 text-sm font-medium group"
          >
            <span className="hidden sm:inline">View More Projects on GitHub</span>
            <span className="sm:hidden">View More Projects</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        .projects-section {
          /* specific component styles if needed */
        }
      `}</style>
    </section>
  )
}

export default Projects
