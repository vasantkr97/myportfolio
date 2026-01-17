import React from 'react'

const ExperienceToggler: React.FC = () => {
  const experience = {
    title: 'Freelance Developer',
    role: 'Fullstack Developer',
    company: 'Self-Employed',
    duration: '2025',
    description:
      "Building full-stack applications and AI-powered tools for clients worldwide. Specializing in modern web technologies, microservices architecture, and workflow automation. Every project is an opportunity to solve real problems with elegant code.",
    highlights: [
      'Full-stack Web Applications',
      'AI-Powered Tools',
      'Microservices Architecture',
      'Workflow Automation',
    ],
  }

  return (
    <div className="w-[95%] sm:w-[90%] mx-auto mt-6 sm:mt-8">
      <div className="experience-card relative overflow-hidden border border-[var(--border-color)] bg-[var(--card-bg)] group transition-all duration-500">
        
        {/* Status indicator */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              {/* <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-75"></span> */}
              {/* <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-primary)]"></span> */}
            </span>
            {/* <span className="text-xs text-[var(--accent-primary)] font-medium tracking-wide">AVAILABLE</span> */}
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          {/* Duration badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full mb-6">
            <svg className="w-3.5 h-3.5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-medium text-[var(--text-secondary)]">{experience.duration}</span>
          </div>

          {/* Main content */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">
            {/* Left side - Title and description */}
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2 transition-colors">
                {experience.title}
              </h2>
              <p className="text-sm sm:text-base text-[var(--accent-primary)] font-medium mb-4">
                {experience.role} • {experience.company}
              </p>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                {experience.description}
              </p>
            </div>

            {/* Right side - Highlights */}
            <div className="md:w-64 flex-shrink-0">
              <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
                Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {experience.highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-full hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors cursor-default"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom section with CTA */}
          <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Open for new opportunities and collaborations
            </p>
            {/* <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent-primary)] text-white text-sm font-medium rounded hover:bg-opacity-90 transition-all group/btn"
            >
              <span>Let's Work Together</span>
              <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceToggler
