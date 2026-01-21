import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import HeroCard from '../components/HeroCard'
import Experience from '../components/Experience'
import AboutMe from '../components/AboutMe'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Footer from '../components/Footer'
import Badge from '../components/Badge'
import LiveClock from '../components/LiveClock'

import GitHubActivity from '../components/GitHubActivity'

interface HomeProps {
    showLoader?: boolean
}

const Home: React.FC<HomeProps> = ({ showLoader = false }) => {
    useEffect(() => {
        const initAnimations = async () => {
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')
            const Lenis = (await import('lenis')).default

            gsap.registerPlugin(ScrollTrigger)

            // Create smoother scroll with Lenis
            const lenis = new Lenis({})

            lenis.on('scroll', () => {
                ScrollTrigger.update()
            })

            gsap.ticker.add((time) => {
                lenis.raf(time * 1000)
            })

            gsap.ticker.lagSmoothing(0)



            const badges = document.querySelectorAll('.hero-top-badges .badge')
            if (badges.length > 0) {
                gsap.set(badges, { visibility: 'hidden', opacity: 0 })
                gsap.set(badges[0], { x: -30, opacity: 0 })
                if (badges.length > 1) {
                    gsap.set(badges[badges.length - 1], { x: 30, opacity: 0 })
                }
                gsap.set(badges, { visibility: 'visible' })
                gsap.to(badges, {
                    x: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.1,
                    delay: 0.5,
                    ease: 'back.out(1.2)',
                })
            }

            // Animate borders
            gsap.set('.border-left, .border-right', {
                scaleY: 0,
                opacity: 0,
                visibility: 'hidden',
                transformOrigin: 'bottom',
            })

            gsap.set('.border-bottom', {
                scaleX: 0,
                opacity: 0,
                visibility: 'hidden',
                transformOrigin: 'right center',
            })

            const mainBorderTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#main-container',
                    start: 'center 75%',
                    end: 'center 40%',
                    scrub: 1.2,
                    toggleActions: 'play none none reverse',
                },
            })

            mainBorderTl
                .to('.border-left, .border-right', {
                    scaleY: 1,
                    opacity: 1,
                    visibility: 'visible',
                    duration: 0.25,
                    ease: 'power1.inOut',
                }, 0)
                .to('.border-bottom', {
                    scaleX: 1,
                    opacity: 1,
                    visibility: 'visible',
                    duration: 0.25,
                    ease: 'power1.inOut',
                }, 0.2)
        }

        setTimeout(initAnimations, 100)

        return () => {
            // Cleanup if needed
        }
    }, [])

    const pageTitle = 'Vasanth Software Engineer'
    const description =
        'Portfolio of Vasanth Kumar, a software engineer specializing in web development, React, Next.js, Svelte, and modern JavaScript frameworks.'

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/images/og.webp" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={description} />
            </Helmet>

            <div className="page-content relative z-0">
                <Navbar />

                {/* Hero Section */}
                <div className="w-[85%] xs:w-[80%] sm:w-[75%] md:w-[70%] lg:w-[65%] xl:w-[55%] 2xl:w-[50%] relative z-20 mx-auto mt-[140px] md:mt-[160px] lg:mt-[200px] mb-16 md:mb-20 lg:mb-24">
                    <div className="flex flex-row justify-between items-center gap-2 mb-4 px-2 sm:px-8 hero-top-badges">

                    </div>
                    <div
                        className="main-border-container bg-[var(--bg-secondary)] relative w-full rounded-xl overflow-hidden"
                        id="main-container"
                    >
                        <div className="animated-border border-right"></div>
                        <div className="animated-border border-bottom"></div>
                        <div className="animated-border border-left"></div>

                        <div className="hero-card">
                            <HeroCard />
                        </div>
                    </div>
                    <div className="github-activity relative mt-4 mb-6 border border-dotted border-[var(--border-color)] p-3 relative rounded-xl bg-[var(--card-bg)]">
                        <div className="size-4 bg-[var(--border-color)] absolute -top-2 -left-2"></div>
                        <GitHubActivity username="vasantkr97" title="GITHUB ACTIVITY" />
                    </div>
                </div>

                {/* About Me Section */}
                <div id="about" className="w-[85%] xs:w-[80%] sm:w-[75%] md:w-[70%] lg:w-[65%] xl:w-[55%] 2xl:w-[50%] mx-auto mb-8 md:mb-10 lg:mb-12">
                    <AboutMe />
                </div>

                {/* Projects Section */}
                <div className="w-[85%] xs:w-[80%] sm:w-[75%] md:w-[70%] lg:w-[65%] xl:w-[55%] 2xl:w-[50%] mx-auto mb-8 md:mb-10 lg:mb-12">
                    <Projects />
                </div>

                {/* Skills Section */}
                <div id="skills" className="w-[85%] xs:w-[80%] sm:w-[75%] md:w-[70%] lg:w-[65%] xl:w-[55%] 2xl:w-[50%] mx-auto mb-8 md:mb-10 lg:mb-12">
                    <Skills />
                </div>

                {/* Experience Section */}
                <div className="w-[85%] xs:w-[80%] sm:w-[75%] md:w-[70%] lg:w-[65%] xl:w-[55%] 2xl:w-[50%] mx-auto mb-8 md:mb-10 lg:mb-12">
                    <Experience />
                </div>

                {/* Blog Section - Removed for now */}


                <Footer />
            </div>

            {/* Theme changer */}


            <style>{`
        .main-border-container {
          position: relative;
        }

        .animated-border {
          position: absolute;
          /* background-color: var(--border-color); */
          z-index: 2;
          opacity: 0;
          visibility: hidden;
        }

        .border-right {
          top: 0;
          right: 0;
          width: 0px;
          height: 100%;
          border-right: 1px dotted var(--border-color);
          transform-origin: bottom !important;
        }

        .border-bottom {
          bottom: 0;
          right: 0;
          width: 100%;
          height: 0px;
          border-bottom: 1px dotted var(--border-color);
          transform-origin: right center !important;
        }

        .border-left {
          bottom: 0;
          left: 0;
          width: 0px;
          height: 100%;
          border-left: 1px dotted var(--border-color);
          transform-origin: bottom !important;
        }

        .hero-top-badges {
          opacity: 0;
          visibility: hidden;
        }
      `}</style>
        </>
    )
}

export default Home
