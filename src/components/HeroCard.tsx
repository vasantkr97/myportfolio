import React, { useEffect, useRef, useState } from 'react'
import { socials } from '../lib/socials'
import {
  GithubIcon,
  TwitterIcon,
  LinkedInIcon,
} from './icons/index'

const HeroCard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [time, setTime] = useState(() => {
    const now = new Date()
    const timeStr = now.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    return {
      formatted: timeStr,
      ms: now.getMilliseconds().toString().padStart(3, '0')
    }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      setTime({
        formatted: timeStr,
        ms: now.getMilliseconds().toString().padStart(3, '0')
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const initAnimations = async () => {
      const { gsap } = await import('gsap')

      gsap.set('.hero-container', { visibility: 'visible', opacity: 1 })

      const tl = gsap.timeline({
        delay: 0.2,
        defaults: { ease: 'power3.out', duration: 0.6 }
      })

      gsap.set(['.hero-greeting', '.hero-name-row', '.hero-location-row', '.hero-bio', '.hero-tech-line', '.hero-cta', '.hero-avatar-wrapper'], {
        opacity: 0,
        y: 15,
      })

      tl.to('.hero-greeting', { opacity: 1, y: 0 })
        .to('.hero-name-row', { opacity: 1, y: 0 }, '-=0.4')
        .to('.hero-avatar-wrapper', { opacity: 1, y: 0, scale: 1 }, '-=0.3')
        .to('.hero-location-row', { opacity: 1, y: 0 }, '-=0.3')
        .to('.hero-bio', { opacity: 1, y: 0 }, '-=0.2')
        .to('.hero-tech-line', { opacity: 1, y: 0 }, '-=0.3')
        .to('.hero-cta', { opacity: 1, y: 0, stagger: 0.1 }, '-=0.2')
    }

    setTimeout(initAnimations, 100)
  }, [])

  return (
    <div ref={containerRef} className="hero-container border border-dotted border-[var(--border-color)] p-3 sm:p-4 relative rounded-xl bg-[var(--card-bg)]">
      {/* Corner decorative element */}


      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        {/* Left Content */}
        <div className="flex-1 space-y-2">
          {/* Greeting */}


          {/* Name + Profile Picture Row (Mobile shows picture at the end, Desktop hides it) */}
          <div className="hero-name-row flex items-center justify-between lg:justify-start gap-3">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] font-display"
            >
              Vasanth Kumar
            </h1>
            {/* Mobile Profile Picture - Only visible on mobile, positioned at the end */}
            <div className="lg:hidden hero-avatar-wrapper flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg border-2 border-[#FFEF00] overflow-hidden bg-black flex items-center justify-center">
                <img src="/pic12.png" alt="Vasanth Kumar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Location & Status Badges */}
          <div className="hero-location-row flex flex-wrap items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 border border-[var(--border-color)] rounded px-3 py-1 text-[var(--text-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]"></span>
              <span className="font-medium text-xs">Bengaluru, India</span>
            </span>
            <span className="inline-flex items-center gap-1.5 border border-[var(--border-color)] rounded px-3 py-1 text-[var(--text-secondary)]">
              <span className="font-medium text-xs">currently @Super30</span>
            </span>
            <span className="inline-flex items-center gap-1.5 border border-[var(--border-color)] rounded px-3 py-1 text-[var(--text-secondary)]">
              <span className="font-medium tabular-nums text-xs">
                {time.formatted} IST
              </span>
            </span>
          </div>

          {/* Bio */}
          <p className="hero-bio text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed max-w-2xl pt-1">
            Hello! I'm a <span className="font-bold text-[var(--text-primary)]">FullStack Developer</span> passionate about building scalable, user-centric applications. With a focus on performance and clean architecture, I specialize in crafting robust solutions using
          </p>

          {/* Tech Stack Line */}
          <div className="hero-tech-line flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm sm:text-base text-[var(--text-secondary)]">
            <TechBadge icon="nodejs" label="Node.js" />
            <span>,</span>
            <TechBadge icon="typescript" label="TypeScript" />
            <span>,</span>
            <TechBadge icon="express" label="Express" />
            <span>,</span>
            <TechBadge icon="python" label="Python" />
            <span>, and</span>
            <TechBadge icon="react" label="React" />
            <span>, backed by structured data in</span>
            <TechBadge icon="postgresql" label="PostgreSQL" />
            <span>and</span>
            <TechBadge icon="mongodb" label="MongoDB" />

            <span>.</span>
          </div>


          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <a
              href={socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta inline-flex items-center gap-2 border border-[var(--border-color)] rounded-md px-3 py-1.5 text-sm font-medium hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors"
            >
              <TwitterIcon size="w-4 h-4" />
              <span>Twitter DM</span>
            </a>

            <span className="hero-cta text-[var(--text-secondary)] text-sm">OR</span>

            <a
              href={socials.mail}
              className="hero-cta inline-flex items-center gap-2 border border-[var(--border-color)] rounded-md px-3 py-1.5 text-sm font-medium hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email Me</span>
            </a>

            {/* Social Icons */}
            <a
              href={socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta w-8 h-8 flex items-center justify-center border border-[var(--border-color)] rounded-md hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon size="w-4 h-4" />
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta w-8 h-8 flex items-center justify-center border border-[var(--border-color)] rounded-md hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size="w-4 h-4" />
            </a>
            <a
              href={socials.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta w-8 h-8 flex items-center justify-center border border-[var(--border-color)] rounded-md hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Side - Avatar (Desktop Only) */}
        <div className="hidden lg:flex hero-avatar-wrapper flex-shrink-0 justify-center lg:justify-end">
          <div className="relative">
            {/* Avatar Box */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-32 md:h-32 rounded-lg border-2 border-[#FFEF00] overflow-hidden bg-black flex items-center justify-center">
              <img src="/pic12.png" alt="Vasanth Kumar" className="w-full h-full object-cover" />
            </div>

            {/* Ghost Emoji Sticker */}

          </div>
        </div>
      </div>

      <style>{`
        .hero-container {
          visibility: hidden;
          opacity: 0;
        }
        .hero-greeting,
        .hero-name-row,
        .hero-location-row,
        .hero-bio,
        .hero-tech-line,
        .hero-cta,
        .hero-avatar-wrapper {
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

// Tech Badge Component
const TechBadge: React.FC<{ icon: string; label: string }> = ({ icon, label }) => {
  const icons: Record<string, React.ReactNode> = {
    react: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#61DAFB]" fill="currentColor">
        <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85s-1.87-.85-1.87-1.85c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 012.4-.36c.48-.67.99-1.31 1.51-1.9z" />
      </svg>
    ),
    typescript: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#3178C6]" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
      </svg>
    ),
    express: (
      <span className="text-[10px] font-bold bg-[var(--text-secondary)] text-[var(--bg-primary)] px-1 rounded">ex</span>
    ),
    nodejs: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#68a063]" fill="currentColor">
        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
      </svg>
    ),
    mongodb: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#47A248]" fill="currentColor">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.105-1.478.634-2.878 1.303-4.322 1.136-.164 5.1-1.7 3.5-10.123z" />
      </svg>
    ),
    postgresql: (
      <img src="https://cdn.simpleicons.org/postgresql/4169E1" alt="PostgreSQL" className="w-4 h-4" />
    ),
    terminal: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M4.5 3C3.12 3 2 4.12 2 5.5v13C2 19.88 3.12 21 4.5 21h15c1.38 0 2.5-1.12 2.5-2.5v-13C22 4.12 20.88 3 19.5 3h-15zM6.5 7l4 4-4 4-1-1 3-3-3-3 1-1zm5 7h5v1h-5v-1z" />
      </svg>
    ),
    python: (
      <img src="https://cdn.simpleicons.org/python/3776AB" alt="Python" className="w-4 h-4" />
    ),
  }

  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap">
      {icons[icon]}
      <span className="text-[var(--text-primary)] font-medium">{label}</span>
    </span>
  )
}

export default HeroCard
