import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Badge from '../components/Badge'
import ThemeChanger from '../components/ThemeChanger'
import { projects, type Project } from '../lib/projects'

const ProjectsList: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Projects - Vasanth Kumar</title>
                <meta name="description" content="Explore my projects and open source contributions." />
            </Helmet>

            <Navbar />

            <main className="w-[95%] xs:w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] 2xl:w-[65%] mx-auto mt-24 mb-16">
                <div className="mb-12">
                    <Badge size="sm" className="mb-4">Projects</Badge>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
                        My Work
                    </h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl">
                        A collection of projects I've built, from developer tools to full-stack applications.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card flex flex-col border border-[var(--border-color)] hover:border-[var(--accent-primary)] overflow-hidden bg-[var(--card-bg)] group transition-colors">
                            <div className="relative overflow-hidden aspect-video">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Project'
                                    }}
                                />
                                <div className="absolute top-2 left-2">
                                    <Badge size="sm" text={project.status} />
                                </div>
                            </div>
                            <div className="p-4 sm:p-5 flex flex-col flex-1">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="text-xs px-2 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="text-base sm:text-lg font-medium mb-2 group-hover:text-[var(--accent-primary)]">
                                    <Link to={`/projects/${project.slug}`}>
                                        {project.title}
                                    </Link>
                                </h2>
                                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4 line-clamp-3 flex-1">
                                    {project.description}
                                </p>
                                <div className="flex gap-3 flex-wrap text-xs">
                                    {project.githubOwner && project.githubRepo && (
                                        <a
                                            href={`https://github.com/${project.githubOwner}/${project.githubRepo}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                                        >
                                            GitHub →
                                        </a>
                                    )}
                                    {project.npm && (
                                        <a
                                            href={project.npm}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                                        >
                                            NPM →
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                                        >
                                            Demo →
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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

export default ProjectsList
