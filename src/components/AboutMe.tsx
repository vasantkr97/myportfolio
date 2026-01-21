import React, { useEffect } from 'react'
import Badge from './Badge'

interface AboutMeProps {
  className?: string
}

const AboutMe: React.FC<AboutMeProps> = ({ className = '' }) => {
  const introSection =
    "Hey there! I'm Vasanth, a FullStack Engineer who lives for the 'how' behind the scenes. While I build across the stack, my core passion lies in engineering robust backend systems that power seamless user experiences. I specialize in crafting low-latency APIs and resilient infrastructures that can handle mission-critical workloads."
  const skillsSection =
    "I leverage tools like Node.js and Python to bring systems to life, but my foundation is built on Data Structures and Algorithms. I don't just write code; I optimize it. Whether it's designing distributed architectures or fine-tuning database queries, I use DSA principles to ensure every solution is scalable, efficient, and performance-ready."
  const interestsSection = ""
  const valuesSection = ""

  useEffect(() => {
    const initAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      const aboutSections = [
        '.about-title-section',
        '.about-content-section',
        '.about-education-section',
        '.about-cta-section',
      ]

      aboutSections.forEach((section, index) => {
        gsap.set(section, { opacity: 0 })

        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(section, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: 'power3.out',
            })

            if (section === '.about-education-section') {
              gsap.to('.education-title', {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: index * 0.1 + 0.2,
                ease: 'power2.out',
              })

              gsap.to('.education-period', {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: index * 0.1 + 0.3,
                ease: 'power2.out',
              })

              gsap.to('.education-desc', {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: index * 0.1 + 0.4,
                ease: 'power2.out',
              })

              gsap.to('.education-highlight', {
                opacity: 0.5,
                scale: 1,
                duration: 0.7,
                delay: index * 0.1 + 0.3,
                ease: 'back.out(1.2)',
              })
            }
          },
        })
      })
    }

    initAnimations()
  }, [])

  return (
    <div className={`about-me-container relative ${className}`}>
      <div className="border border-dotted border-[var(--border-color)] p-3 sm:p-4 md:p-5 relative about-content-wrapper bg-[var(--card-bg)] rounded-xl">
        <div className="size-4 bg-[var(--border-color)] absolute -top-2 -left-2"></div>

        {/* Header */}
        <div className="about-title-section flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4 border-b border-[var(--border-color)] pb-3 sm:pb-4 border-dotted">
          <Badge size="sm" className="w-fit">
            <span className="text-xs font-bold uppercase">About Me</span>
          </Badge>
          <h2 className="text-xl sm:text-2xl font-semibold about-title leading-none">
            Behind the Code
          </h2>
        </div>

        {/* Bio Section */}
        <div className="about-content-section mb-4 pb-4 border-b border-[var(--border-color)] border-dotted">
          <div className="space-y-2 bio-wrapper">
            <p className="text-sm text-[var(--text-secondary)] about-bio">
              {introSection}
            </p>
            <p className="text-sm text-[var(--text-secondary)] about-bio">
              {skillsSection}
            </p>
            <p className="text-sm text-[var(--text-secondary)] about-bio">
              {interestsSection}
            </p>
            <p className="text-sm text-[var(--text-secondary)] about-bio">
              {valuesSection}
            </p>
          </div>
        </div>

        {/* Education Section */}
        <div className="about-education-section mb-4 pb-4 border-b border-[var(--border-color)] border-dotted">
          <div className="flex items-center gap-2 mb-3">
            <Badge size="sm">
              <span className="text-xs font-bold uppercase">Education</span>
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-3 education-content">
              <h3 className="text-lg sm:text-xl font-medium education-title">
                B.Eng in Computer Science with AI Specialization
              </h3>
              <p className="text-xs sm:text-sm mt-1 text-[var(--text-secondary)] education-period">
                Sathyabama University, Chennai · 2020 - 2024
              </p>
              <p className="text-xs sm:text-sm mt-2 education-desc text-[var(--text-secondary)]">
                Diving deeper into the "why" behind code while building real projects. I'm
                especially into algorithms and data structures—the secret recipes that make
                good software great!
              </p>
            </div>
            <div className="md:col-span-2 flex items-center justify-center md:justify-end education-visual">
              <span className="text-5xl sm:text-6xl font-bold text-white opacity-[0.4] education-highlight">
                B.Eng
              </span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="about-cta-section">
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:vasantkr97@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md hover:bg-[var(--accent-primary)] hover:text-black hover:border-[var(--accent-primary)] transition-all duration-300 text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>Say Hello</span>
            </a>
            <a
              href="https://linkedin.com/in/vasantkr97"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md hover:bg-[var(--accent-primary)] hover:text-black hover:border-[var(--accent-primary)] transition-all duration-300 text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>Connect</span>
            </a>
            <a
              href="https://github.com/vasantkr97"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md hover:bg-[var(--accent-primary)] hover:text-black hover:border-[var(--accent-primary)] transition-all duration-300 text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>Let's Talk Tech</span>
            </a>
          </div>
        </div>
      </div>
      <div className="size-4 bg-[var(--border-color)] absolute -bottom-2 -right-2 z-10"></div>
      <style>{`
        .about-me-container {
          perspective: 1000px;
        }

        .about-title-section,
        .about-content-section,
        .about-education-section,
        .about-cta-section {
          opacity: 0;
          transform: translateY(20px);
        }

        .education-title,
        .education-period,
        .education-desc {
          opacity: 0;
          transform: translateY(15px);
        }

        .education-highlight {
          opacity: 0;
          transform: scale(0.9);
        }
      `}</style>
    </div>
  )
}

export default AboutMe
