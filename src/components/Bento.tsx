import React, { useEffect, useRef } from 'react'
import Badge from './Badge'
import DiscordStatusCompact from './DiscordStatusCompact'

const skillIcons = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Svelte', icon: '🔶' },
    { name: 'Astro', icon: '🚀' },
    { name: 'Node.js', icon: '💎' },
    { name: 'Python', icon: '🐍' },
    { name: 'Tailwind', icon: '🎨' },
    { name: 'GraphQL', icon: '◈' },
    { name: 'MongoDB', icon: '🍃' },
]

const Marquee: React.FC = () => {
    return (
        <div className="marquee-container overflow-hidden py-2">
            <div className="marquee-track flex gap-6 animate-marquee whitespace-nowrap">
                {[...skillIcons, ...skillIcons].map((skill, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1 border border-[var(--border-color)] text-sm"
                    >
                        <span>{skill.icon}</span>
                        <span>{skill.name}</span>
                    </div>
                ))}
            </div>

            <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    )
}

const Bento: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const initAnimations = async () => {
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')

            gsap.registerPlugin(ScrollTrigger)

            const bentoContainer = containerRef.current
            if (!bentoContainer) return

            gsap.set('.bento-scroll-reveal', {
                opacity: 0,
                scale: 0.95,
                y: 20,
            })

            ScrollTrigger.create({
                trigger: bentoContainer,
                start: 'top 80%',
                once: true,
                onEnter: () => {
                    gsap.set(bentoContainer, {
                        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                        opacity: 1,
                        visibility: 'visible',
                    })

                    gsap.to(bentoContainer, {
                        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                        duration: 1.4,
                        ease: 'power3.inOut',
                    })

                    const elements = document.querySelectorAll('.bento-scroll-reveal')
                    elements.forEach((element, index) => {
                        gsap.to(element, {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            duration: 1.0,
                            delay: 0.2 + index * 0.1,
                            ease: 'power3.out',
                        })
                    })
                },
            })
        }

        setTimeout(initAnimations, 100)
    }, [])

    return (
        <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto mt-[50px] sm:mt-[100px] md:mt-[120px]">
            <div
                ref={containerRef}
                className="p-4 sm:p-6 lg:p-12 border border-[var(--border-color)] bento-wrapper opacity-0 invisible bento-container"
            >
                <div className="bento-grid grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[3fr_2fr]">
                    {/* Skills/Marquee Card */}
                    <div className="bento-item bento-skills bento-scroll-reveal">
                        <div className="h-full w-full relative flex flex-col gap-2 sm:gap-0 overflow-hidden hero-skills-section border border-[var(--border-color)]">
                            <div className="p-4 pb-1.5">
                                <Badge size="sm">
                                    <span className="whitespace-nowrap uppercase text-xs">
                                        Okay so I am familiar with:
                                    </span>
                                </Badge>
                            </div>
                            <div className="relative mb-2">
                                <Marquee />
                                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[var(--bg-secondary)]"></div>
                                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[var(--bg-secondary)]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Discord Activity Card */}
                    <div className="bento-item bento-discord bento-scroll-reveal min-h-[200px] border border-[var(--border-color)] p-4 flex flex-col justify-center">
                        <Badge size="sm" className="mb-4">
                            <span className="uppercase text-xs">Discord Status</span>
                        </Badge>
                        <DiscordStatusCompact userId="743173584935190620" />
                    </div>
                </div>
            </div>

            <style>{`
        .bento-container {
          will-change: transform, clip-path, opacity, visibility;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .bento-scroll-reveal {
          will-change: transform, opacity;
          transition: box-shadow 0.3s ease-in-out;
          transform-style: preserve-3d;
          position: relative;
          overflow: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .bento-container {
            opacity: 1;
            visibility: visible;
            clip-path: none;
          }

          .bento-scroll-reveal {
            opacity: 1;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
        </div>
    )
}

export default Bento
