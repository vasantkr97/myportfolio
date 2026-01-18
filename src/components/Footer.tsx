import React, { useEffect } from 'react'
import { socials } from '../lib/socials'
import { GithubIcon, TwitterIcon, LinkedInIcon } from './icons'

const DocumentIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
)

const Footer: React.FC = () => {
    useEffect(() => {
        const initAnimations = async () => {
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')

            gsap.registerPlugin(ScrollTrigger)

            const footerSection = document.querySelector('.footer-section')
            if (!footerSection) return

            gsap.fromTo(
                '.footer-content',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: footerSection,
                        start: 'top 90%',
                    },
                }
            )
        }

        initAnimations()
    }, [])

    const socialLinks = [
        { name: 'Twitter', icon: <TwitterIcon className="w-5 h-5" />, url: socials.twitter },
        { name: 'GitHub', icon: <GithubIcon className="w-5 h-5" />, url: socials.github },
        { name: 'Resume', icon: <DocumentIcon className="w-5 h-5" />, url: socials.resume },
        { name: 'LinkedIn', icon: <LinkedInIcon className="w-5 h-5" />, url: socials.linkedIn },
    ]

    return (
        <footer className="footer-section w-[90%] xs:w-[85%] sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[60%] 2xl:w-[55%] mx-auto mb-8 mt-8">
            <div className="footer-content border border-[var(--border-color)] p-4 sm:p-5 text-center bg-[var(--card-bg)]/30 backdrop-blur-sm relative">
                <div className="size-4 bg-[var(--border-color)] absolute -top-2 -left-2"></div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Let's Connect</h2>
                <p className="text-[var(--text-secondary)] mb-4 text-base sm:text-lg">
                    Feel free to reach out through any of these platforms
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md hover:bg-[var(--accent-primary)] hover:text-black hover:border-[var(--accent-primary)] transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            {link.icon}
                            <span className="font-medium">{link.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer
