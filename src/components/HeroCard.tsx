import React, { useEffect, useRef } from 'react'
import Badge from './Badge'
import SocialIcons from './SocialIcons'

const HeroCard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamic import for GSAP to avoid SSR issues
    const initAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      // Create main timeline for hero animations
      const mainTl = gsap.timeline({
        delay: 0.2,
        defaults: {
          ease: 'power3.out',
          duration: 0.7,
        },
        onStart: () => {
          gsap.set('.hero-container', {
            visibility: 'visible',
            opacity: 1,
          })
        },
      })

      gsap.set(
        ['.hero-title-section', '.hero-info-section', '.hero-skills-section'],
        {
          opacity: 0,
          y: 20,
        }
      )

      // Start by making container visible
      mainTl.to('.hero-container', {
        visibility: 'visible',
        opacity: 1,
        duration: 0.3,
      })

      // Animate title section
      mainTl
        .to('.hero-title-section', {
          opacity: 1,
          y: 0,
        })
        .to(
          '.hero-subtitle',
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
          },
          '-=0.3'
        )
        .to(
          '.hero-badges > *',
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.4,
          },
          '-=0.3'
        )

      // Animate info section
      mainTl
        .to(
          '.hero-info-section',
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.2'
        )
        .to(
          '.hero-image',
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
          },
          '-=0.6'
        )
        .to(
          '.hero-bio, .hero-bio-2, .hero-bio-3',
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.6,
          },
          '-=0.5'
        )

      // Animate skills section
      mainTl
        .to(
          '.hero-skills-section',
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          '-=0.3'
        )
        .to(
          '.social-icon-link',
          {
            opacity: 1,
            scale: 1,
            stagger: 0.05,
            duration: 0.4,
            ease: 'back.out(1.5)',
          },
          '-=0.4'
        )

      // Create scroll-based animations
      ScrollTrigger.create({
        trigger: '.hero-container',
        start: 'top top',
        end: 'bottom top-=300',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to('.hero-title-section', {
            y: progress * -25,
            duration: 0.1,
            ease: 'none',
          })
          gsap.to('.hero-info-section', {
            y: progress * -20,
            duration: 0.1,
            ease: 'none',
          })
          gsap.to('.hero-skills-section', {
            y: progress * -15,
            duration: 0.1,
            ease: 'none',
          })
        },
      })
    }

    // Small delay to ensure DOM is ready
    setTimeout(initAnimations, 100)
  }, [])

  return (
    <div ref={containerRef} className="hero-container relative group/hero">
      <div className="p-3 sm:p-4 md:p-8 lg:p-12 relative border border-[var(--border-color)] hero-title-section">
        <div className="size-4 bg-[var(--border-color)] absolute -top-2 -left-2"></div>
        <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold hero-title split-text sm:pb-2">
            FullStack Engineer
          </h1>
          <span className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] hero-subtitle">
            / Software Engineer
          </span>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-6 hero-badges">
          <Badge size="lg" text="I believe in tech you use" />
          <Badge size="lg" text="Bangalore, India">
            <div className="animate-pulse bg-[var(--accent-primary)] size-2 rounded-full"></div>
          </Badge>
        </div>
      </div>

      <div className="border border-[var(--border-color)] border-t-0 hero-info-section">
        <div className="grid grid-cols-1 sm:grid-cols-12 relative">
          <div className="sm:col-span-5 md:col-span-4 lg:col-span-3 xl:col-span-3 order-1">
            <div className="border-r border-[var(--border-color)] hero-image relative h-full min-h-[20em] overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)]">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 via-gray-400/10 to-gray-600/10" />

              {/* Floating orbs */}
              <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-gray-400/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-gray-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gray-300/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />

              {/* Code brackets decoration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl sm:text-7xl md:text-8xl font-mono text-[var(--text-primary)] opacity-10 select-none">
                  <span className="text-gray-400">&lt;</span>
                  <span className="text-gray-500">/</span>
                  <span className="text-gray-400">&gt;</span>
                </div>
              </div>

              {/* Initials overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl sm:text-5xl font-bold text-gray-400">
                  VK
                </span>
              </div>

              {/* Hover overlay */}
              <div className="bg-black/30 flex justify-center items-center absolute inset-0 backdrop-blur-[1px] font-medium text-white opacity-0 hero-image-overlay transition-opacity hover:opacity-100">
                <span className="text-lg">Vasanth K.</span>
              </div>
            </div>
          </div>
          <div className="sm:col-span-7 md:col-span-8 lg:col-span-9 xl:col-span-9 p-4 sm:p-5 md:p-6 lg:p-8 order-2 hero-content">
            <Badge size="sm">
              <span className="text-xs font-bold uppercase">Hello</span>
            </Badge>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-4 sm:mt-6 hero-name split-text">
              Vasanth Kumar Maneri
            </h2>
            <div className="bio-wrapper overflow-hidden mt-3 sm:mt-4">
              <p className="text-sm sm:text-base md:text-lg hero-bio leading-relaxed">
                I'm a FullStack Engineer with a strong backend lean, specialized in architecting 
                high-performance systems and scalable infrastructures. I thrive at the 
                intersection of complex server-side logic and modern frontend delivery. My focus 
                is on building resilient, distributed services that ensure high availability and 
                low-latency performance at scale.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-[var(--border-color)] border-t-0 px-3 sm:px-4 md:px-6 lg:px-10 py-3 sm:py-4 md:py-6 flex flex-col justify-between sm:flex-row gap-2 sm:gap-0 overflow-hidden hero-skills-section">
        <Badge size="sm">
          <span className="font-bold whitespace-nowrap text-xs px-2 sm:px-3 text-xs sm:text-sm uppercase">
            Connect with me
          </span>
        </Badge>
        <div className="social-icons-container flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 ml-0 sm:ml-4 mt-2 sm:mt-0">
          <SocialIcons size="lg" />
        </div>
      </div>

      <style>{`
        .hero-container {
          perspective: 1000px;
          visibility: hidden;
          opacity: 0;
        }

        .hero-title-section,
        .hero-info-section,
        .hero-skills-section {
          opacity: 0;
        }

        .hero-title,
        .hero-name {
          overflow: hidden;
        }

        .hero-image {
          overflow: hidden;
          clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
          transform: scale(0.95);
          min-height: 10rem;
          max-height: 100%;
          display: flex;
        }

        @media (min-width: 640px) {
          .hero-image {
            min-height: 10rem;
            max-height: 26rem;
          }
        }

        @media (min-width: 768px) {
          .hero-image {
            min-height: 10rem;
            max-height: 24rem;
          }
        }

        @media (min-width: 1280px) {
          .hero-image {
            max-height: 20rem;
          }
        }

        .bio-wrapper {
          overflow: hidden;
        }

        .hero-bio,
        .hero-bio-2,
        .hero-bio-3 {
          opacity: 0;
          transform: translateY(20px);
        }

        .social-icon-link {
          opacity: 0;
          transform: scale(0.8);
        }

        @media (max-width: 640px) {
          .hero-content,
          .hero-skills-section {
            padding: 1rem;
          }

          .hero-image {
            border-right: none;
            border-bottom: 1px solid var(--border-color);
          }
        }
      `}</style>
    </div>
  )
}

export default HeroCard
