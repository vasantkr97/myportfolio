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

                <div className="flex flex-col gap-6">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card w-full border border-dashed border-gray-700 hover:border-gray-500 overflow-hidden relative bg-[#0a0a0a] rounded-xl transition-all duration-300">
                           <div className="project-card-content relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 p-4 md:p-5">
                             {/* Purple Glow Effect */}
                             <div className="absolute top-10 left-10 w-1/3 h-2/3 bg-purple-600/20 blur-[100px] pointer-events-none rounded-full"></div>
                             
                             {/* Left: Image Section */}
                             <div className="project-image-section relative z-10 w-full group perspective-1000 h-48 md:h-64 lg:h-full">
                               <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-800/50 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
                                  <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover object-top min-h-[200px]"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Project'
                                    }}
                                  />
                               </div>
                             </div>

                             {/* Right: Content Section */}
                             <div className="project-info-section relative z-10 flex flex-col h-full">
                                {/* Header: Title & Buttons */}
                                <div className="flex flex-col xl:flex-row justify-between items-start gap-3 mb-2">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                                            <Link to={`/projects/${project.slug}`} className="hover:text-[var(--accent-primary)] transition-colors">
                                                {project.title}
                                            </Link>
                                        </h2>
                                        {/* Visual styling lock icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <a
                                            href={project.demo || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md hover:bg-[var(--accent-primary)] hover:text-black hover:border-[var(--accent-primary)] transition-all duration-300 text-xs font-semibold uppercase tracking-wider"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                            <span>Live</span>
                                        </a>
                                        {project.githubOwner && project.githubRepo && (
                                            <a
                                                href={`https://github.com/${project.githubOwner}/${project.githubRepo}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-3 py-1 rounded-md border border-gray-700 bg-black/20 text-gray-300 text-xs font-medium hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                                GitHub
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                <div className="mt-auto">
                                    <h4 className="text-white text-sm font-bold mb-3">Technologies Used:</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="inline-flex items-center px-2.5 py-1.5 border border-gray-800 bg-[#1a1a1a]/50 rounded-lg text-xs font-medium text-gray-400 hover:bg-[var(--accent-primary)] hover:text-black hover:border-[var(--accent-primary)] transition-all duration-300 cursor-default"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
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
