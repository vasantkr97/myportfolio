import React, { useEffect } from 'react'
import Badge from './Badge'

interface AboutMeProps {
  className?: string
}

const AboutMe: React.FC<AboutMeProps> = ({ className = '' }) => {
  const introSection =
    "Hey there! I'm Vasanth, a FullStack Engineer who lives for the 'how' behind the scenes. While I build across the stack, my core passion lies in engineering robust backend systems that power seamless user experiences. I specialize in crafting low-latency APIs and resilient infrastructures that can handle mission-critical workloads."
  const skillsSection =
    "From designing distributed architectures to optimizing database performance, I focus on the scalability and reliability of software. I leverage tools like React, Node.js, and Python to bring complex systems to life, while exploring the potential of AI to build smarter applications."
  const interestsSection =
    "I'm fascinated by high-availability systems and seamless deployment workflows. Exploring how to maintain sub-second response times at scale is what keeps me coding."
  const valuesSection =
    "I believe that great engineering is about making the invisible parts of an app move perfectly. My goal is to develop platforms that are as resilient as they are intuitive."

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
                opacity: 0.15,
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
      <div className="border border-[var(--border-color)] p-4 sm:p-6 md:p-12 relative about-title-section">
        <div className="size-4 bg-[var(--border-color)] absolute -top-2 -left-2"></div>
        <Badge size="sm" className="mb-4">
          <span className="text-xs font-bold uppercase">About Me</span>
        </Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold about-title">
          My Story
        </h2>
      </div>

      <div className="border border-[var(--border-color)] border-t-0 p-4 sm:p-6 md:p-12 about-content-section">
        <div className="space-y-6 bio-wrapper">
          <p className="text-sm sm:text-md md:text-lg text-[var(--text-secondary)] about-bio">
            {introSection}
          </p>
          <p className="text-sm sm:text-md md:text-lg text-[var(--text-secondary)] about-bio">
            {skillsSection}
          </p>
          <p className="text-sm sm:text-md md:text-lg text-[var(--text-secondary)] about-bio">
            {interestsSection}
          </p>
          <p className="text-sm sm:text-md md:text-lg text-[var(--text-secondary)] about-bio">
            {valuesSection}
          </p>
        </div>
      </div>

      <div className="border border-[var(--border-color)] border-t-0 p-4 sm:p-6 md:p-12 about-education-section">
        <div className="flex items-center gap-2 mb-6">
          <Badge size="sm">
            <span className="text-xs font-bold uppercase">Education</span>
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-3 education-content">
            <h3 className="text-xl sm:text-2xl font-medium education-title">
              B.Eng in Computer Science with AI Specialization
            </h3>
            <p className="text-sm sm:text-base mt-2 text-[var(--text-secondary)] education-period">
              Sathyabama University, Chennai, Tamil Nadu · 2020 - 2024
            </p>
            <p className="text-sm sm:text-base mt-4 education-desc text-[var(--text-secondary)]">
              Diving deeper into the "why" behind code while building real projects. I'm
              especially into algorithms and data structures—the secret recipes that make
              good software great!
            </p>
          </div>
          <div className="md:col-span-2 flex items-center justify-center md:justify-end education-visual">
            <span className="text-6xl sm:text-7xl font-bold text-[var(--accent-primary)] opacity-[0.15] education-highlight">
              B.Eng
            </span>
          </div>
        </div>
      </div>

      <div className="border border-[var(--border-color)] border-t-0 px-4 sm:px-6 md:px-10 p-4 sm:py-6 flex flex-col items-start gap-4 about-cta-section">
        <h3 className="text-xl font-medium">Ready to Build Something Amazing?</h3>
        <p className="text-sm sm:text-base text-[var(--text-secondary)]">
          Whether it's a bold startup idea or a complex engineering challenge — I'm all ears. Let's turn your vision into reality.
        </p>
        <a
          href="mailto:vasantkr97@gmail.com"
          className="inline-flex items-center justify-center px-6 py-3 mt-2 border border-[var(--border-color)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
        >
          Say Hello 👋
        </a>
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
