import React, { useEffect } from 'react'
import Badge from './Badge'
import { socials } from '../lib/socials'

const Footer: React.FC = () => {
    useEffect(() => {
        const initAnimations = async () => {
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')

            gsap.registerPlugin(ScrollTrigger)

            const footerSection = document.querySelector('.footer-section')
            const footerContainer = document.querySelector('.footer-container')
            if (!footerSection || !footerContainer) return

            gsap.set('.footer-scroll-reveal', {
                opacity: 0,
                scale: 0.85,
            })

            ScrollTrigger.create({
                trigger: footerSection,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    gsap.set(footerContainer, {
                        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                        opacity: 1,
                        visibility: 'visible',
                    })

                    gsap.to('.footer-container', {
                        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                        duration: 1.2,
                        ease: 'expo.inOut',
                    })

                    const elements = document.querySelectorAll('.footer-scroll-reveal')
                    elements.forEach((element) => {
                        const delay = element.getAttribute('data-delay')
                            ? parseFloat(element.getAttribute('data-delay')!)
                            : 0

                        gsap.to(element, {
                            opacity: 1,
                            scale: 1,
                            duration: 1.2,
                            delay: delay,
                            ease: 'back.out(1.5)',
                            clearProps: 'transform',
                        })
                    })
                },
            })
        }

        initAnimations()
    }, [])

    return (
        <footer id="footer" className="footer-section mt-20 mb-2">
            <div className="footer-container w-[95%] xs:w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] 2xl:w-[65%] mx-auto border border-[var(--border-color)] opacity-0 invisible footer-scroll-reveal">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 footer-grid">
                    <div
                        className="footer-col p-4 sm:p-6 lg:p-8 border-b border-[var(--border-color)] sm:border-b lg:border-b-0 footer-scroll-reveal"
                        data-delay="0.1"
                    >
                        <h2 className="footer-heading text-base sm:text-lg lg:text-xl font-medium mb-3 sm:mb-4">
                            Vasanth Kumar
                        </h2>
                        <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4 footer-links">
                            <a href="/about" className="footer-link text-sm sm:text-base hover:text-[var(--accent-primary)]">
                                About me
                            </a>
                            <a href="/experience" className="footer-link text-sm sm:text-base hover:text-[var(--accent-primary)]">
                                Experience
                            </a>
                            <a href="/blogs" className="footer-link text-sm sm:text-base hover:text-[var(--accent-primary)]">
                                Blogs
                            </a>
                        </div>
                    </div>

                    <div
                        className="footer-col p-4 sm:p-6 lg:p-8 border-b border-[var(--border-color)] lg:border-b-0 footer-scroll-reveal"
                        data-delay="0.2"
                    >
                        <h2 className="footer-heading text-base sm:text-lg lg:text-xl mb-3 sm:mb-4">
                            Contact & Socials
                        </h2>
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-2 gap-y-2 sm:gap-y-3 lg:gap-y-4 footer-links">
                            <a
                                href={socials.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-link text-sm sm:text-base hover:text-[var(--accent-primary)]"
                            >
                                LinkedIn
                            </a>
                           
                            <a
                                href={socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-link text-sm sm:text-base hover:text-[var(--accent-primary)]"
                            >
                                GitHub
                            </a>
                            <a
                                href={socials.mail}
                                className="footer-link text-sm sm:text-base hover:text-[var(--accent-primary)]"
                            >
                                Mail
                            </a>
                            <a
                                href={socials.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-link text-sm sm:text-base hover:text-[var(--accent-primary)]"
                            >
                                X [Twitter]
                            </a>
                        </div>
                    </div>

                    <div
                        className="footer-col border-b border-[var(--border-color)] lg:border-b-0 footer-scroll-reveal"
                        data-delay="0.3"
                    >
                        <div className="p-4 sm:p-6 lg:p-8">
                            <p className="footer-desc text-sm sm:text-base">Open Source on Github</p>
                            <div className="mt-3 sm:mt-4 flex flex-col gap-2 sm:gap-3">
                                <a
                                    href="https://github.com/vasantkr97/portfolio"
                                    className="footer-join-link text-xs sm:text-sm text-[var(--accent-primary)] font-medium group flex items-center"
                                >
                                    <span>Check Out</span>
                                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                                </a>
                            </div>
                        </div>
                        <div className="border-t border-[var(--border-color)] p-4 sm:p-6 lg:p-8">
                            <div className="flex flex-col gap-2 sm:gap-3">
                                <h3 className="text-sm sm:text-base lg:text-lg font-medium">Contribute</h3>
                                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-2">
                                    Want to contribute to for my projects?
                                </p>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                    <a
                                        href="https://github.com/vasantkr97/portfolio/fork"
                                        className="footer-link-subtle text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                    >
                                        Fork my repos
                                    </a>
                                    <a
                                        href="https://github.com/vasantkr97/portfolio/issues/new"
                                        className="footer-join-link text-xs sm:text-sm text-[var(--accent-primary)] font-medium group flex items-center"
                                    >
                                        <span>Create Issue</span>
                                        <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="footer-copyright border-t border-[var(--border-color)] flex flex-col sm:grid sm:grid-cols-12 footer-scroll-reveal"
                    data-delay="0.4"
                >
                    <div className="sm:col-span-4 md:col-span-3 lg:col-span-3 sm:pt-1 pt-2 border-b sm:border-b-0 border-[var(--border-color)] pb-2 sm:pb-0 p-3">
                        <span className="text-xs sm:text-sm text-[var(--text-secondary)]">Available for work</span>
                    </div>
                    <div className="sm:col-span-8 md:col-span-9 lg:col-span-9 sm:border-l p-2 sm:p-3 lg:p-4 border-[var(--border-color)] flex items-center justify-between w-full">
                        {/* <span className="footer-copyright-text text-xs sm:text-sm whitespace-nowrap">
                            © Vasanth Kumar
                        </span> */}
                        {/* <a
                            href="https://vasantkr97.github.io"
                            className="footer-website-link text-xs sm:text-sm flex items-center group whitespace-nowrap"
                        >
                            <span className="mr-1">vasantkr97.github.io</span>
                        </a> */}
                    </div>
                </div>
            </div>

            <style>{`
        .footer-section {
          position: relative;
          will-change: transform;
        }

        .footer-container {
          will-change: transform, clip-path, opacity, visibility;
        }

        .footer-scroll-reveal {
          will-change: transform, opacity;
          transition: box-shadow 0.3s ease-in-out;
        }

        .footer-col {
          position: relative;
          overflow: hidden;
          will-change: transform;
        }

        .footer-col:hover::after {
          opacity: 1;
        }

        .footer-col::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(var(--accent-primary-rgb, 0, 0, 204), 0.3),
            transparent
          );
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }

        @media (min-width: 1024px) {
          .footer-col:not(:last-child) {
            border-right: 1px solid var(--border-color);
          }
        }
      `}</style>
        </footer>
    )
}

export default Footer
