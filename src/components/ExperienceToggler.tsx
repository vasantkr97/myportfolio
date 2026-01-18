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
    <div className="w-full">
      <div className="relative group transition-all duration-500">

        <div className="">
          {/* Duration badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full mb-3">
            <svg className="w-3.5 h-3.5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-medium text-[var(--text-secondary)]">{experience.duration}</span>
          </div>

          {/* Main content */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8">
            {/* Left side - Title and description */}
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-[var(--text-primary)] mb-1 transition-colors">
                {experience.title}
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] font-medium mb-3">
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
          <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-[10px] sm:text-xs text-[var(--text-secondary)]">
              Open for new opportunities and collaborations
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceToggler
