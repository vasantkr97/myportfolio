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
    <div className="experience-section relative pt-14" id="experience">
      <div className="experience-content">
        <div className="flex w-full justify-center">
          <Badge size="sm">My Experience:</Badge>
        </div>
        <ExperienceToggler />
      </div>

      <style>{`
        .experience-section {
          margin: 8rem auto 0;
          position: relative;
          will-change: transform;
        }

        .experience-content {
          position: relative;
          z-index: 1;
          will-change: opacity;
        }
      `}</style>
    </div>
  )
}

export default Experience
