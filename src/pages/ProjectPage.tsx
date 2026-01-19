import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Badge from '../components/Badge'
import ThemeChanger from '../components/ThemeChanger'
import { getProjectBySlug } from '../lib/projects'

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : null

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] mx-auto mt-24 mb-16 text-center">
          <h1 className="text-3xl font-semibold mb-4">Project Not Found</h1>
          <p className="text-[var(--text-secondary)] mb-8">
            The project you're looking for doesn't exist.
          </p>
          <Link
            to="/projects"
            className="inline-block px-6 py-3 border border-[var(--border-color)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
          >
            Back to Projects
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{project.title} - Vasanth Kumar</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <Navbar />

      <main className="w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] mx-auto mt-24 mb-16">
        <Link
          to="/projects"
          className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] text-sm mb-6 inline-block"
        >
          ← Back to Projects
        </Link>

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge size="sm" text={project.status} />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-[var(--text-secondary)]">
              {project.description}
            </p>
          </header>

          <div className="mb-8">
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-video object-cover border border-[var(--border-color)]"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/1200x630?text=Project'
              }}
            />
          </div>

          {project.technologies && project.technologies.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm border border-[var(--border-color)] bg-[var(--bg-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Links</h2>
            <div className="flex flex-wrap gap-4">
              {project.githubOwner && project.githubRepo && (
                <a
                  href={`https://github.com/${project.githubOwner}/${project.githubRepo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-[var(--border-color)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
                >
                  View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Live View
                </a>
              )}
            </div>
          </section>
        </article>
      </main>

      <Footer />

      <div className="sticky bottom-8 right-8 z-50">
        <div className="flex justify-end sm:pr-8 pr-5">
          <ThemeChanger />
        </div>
      </div>
    </>
  )
}

export default ProjectPage
