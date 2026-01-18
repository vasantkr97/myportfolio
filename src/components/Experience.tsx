import React, { useEffect } from 'react'
import Badge from './Badge'
import ExperienceToggler from './ExperienceToggler'

interface ExperienceProps {
  title?: string
}

const Experience: React.FC<ExperienceProps> = ({ title = 'VIBE JOURNEY:' }) => {
  useEffect(() => {
    const initAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      const experienceSection = document.querySelector('.experience-section')
      if (!experienceSection) return

      gsap.set('.experience-content', { opacity: 0, y: 30 })

      const experienceTl = gsap.timeline({
        scrollTrigger: {
          trigger: experienceSection,
          start: 'top 75%',
          end: 'top 50%',
          toggleActions: 'play none none none',
        },
      })

      experienceTl.to('.experience-content', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
      })
    }

    initAnimations()
  }, [])

  return (
    <div className="experience-section relative experience-container" id="experience">
      <div className="border border-[var(--border-color)] p-3 sm:p-5 md:p-6 relative experience-content-wrapper bg-[var(--card-bg)]/30 backdrop-blur-sm">
        <div className="size-4 bg-[var(--border-color)] absolute -top-2 -left-2"></div>

        <div className="experience-header mb-3 sm:mb-4 border-b border-[var(--border-color)] pb-3 sm:pb-4 border-dashed">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3">
            <Badge size="sm" className="w-fit">
              <span className="text-xs font-bold uppercase">Journey</span>
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold experience-title leading-none">
              My Experience
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:vasantkr97@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md hover:bg-[var(--accent-primary)] hover:text-black hover:border-[var(--accent-primary)] transition-all duration-300 text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Hire Me</span>
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
              <span>View Profile</span>
            </a>
          </div>
        </div>

        <div className="experience-content">
          <ExperienceToggler />
        </div>
      </div>

      <style>{`
        .experience-section {
          /* margin: 8rem auto 0; */ /* Removed large margin */
          position: relative;
          will-change: transform;
        }

        .experience-content {
          position: relative;
          z-index: 1;
          /* will-change: opacity; */
        }
      `}</style>
    </div>
  )
}

export default Experience

