import React, { useEffect } from 'react'
import Badge from './Badge'

interface SkillsProps {
  className?: string
}

// Real logo icons using CDN images
const icons = {
  nodejs: <img src="https://cdn.simpleicons.org/nodedotjs/339933" alt="Node.js" className="w-4 h-4" />,
  typescript: <img src="https://cdn.simpleicons.org/typescript/3178C6" alt="TypeScript" className="w-4 h-4" />,
  python: <img src="https://cdn.simpleicons.org/python/3776AB" alt="Python" className="w-4 h-4" />,
  fastapi: <img src="https://cdn.simpleicons.org/fastapi/009688" alt="FastAPI" className="w-4 h-4" />,
  nestjs: <img src="https://cdn.simpleicons.org/nestjs/E0234E" alt="NestJS" className="w-4 h-4" />,
  mongodb: <img src="https://cdn.simpleicons.org/mongodb/47A248" alt="MongoDB" className="w-4 h-4" />,
  react: <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" className="w-4 h-4" />,
  vue: <img src="https://cdn.simpleicons.org/vuedotjs/4FC08D" alt="Vue" className="w-4 h-4" />,
  svelte: <img src="https://cdn.simpleicons.org/svelte/FF3E00" alt="Svelte" className="w-4 h-4" />,
  html: <img src="https://cdn.simpleicons.org/html5/E34F26" alt="HTML5" className="w-4 h-4" />,
  css: <img src="https://cdn.simpleicons.org/css3/1572B6" alt="CSS3" className="w-4 h-4" />,
  javascript: <img src="https://cdn.simpleicons.org/javascript/F7DF1E" alt="JavaScript" className="w-4 h-4" />,
  express: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" className="w-4 h-4" style={{ filter: 'invert(1) brightness(2)' }} />,
  websocket: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" alt="WebSocket" className="w-4 h-4" style={{ filter: 'invert(1) brightness(2)' }} />,
  redis: <img src="https://cdn.simpleicons.org/redis/DC382D" alt="Redis" className="w-4 h-4" />,
  postgresql: <img src="https://cdn.simpleicons.org/postgresql/4169E1" alt="PostgreSQL" className="w-4 h-4" />,
  prisma: <img src="https://cdn.simpleicons.org/prisma/2D3748" alt="Prisma" className="w-4 h-4" />,
  tailwind: <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="Tailwind CSS" className="w-4 h-4" />,
  postman: <img src="https://cdn.simpleicons.org/postman/FF6C37" alt="Postman" className="w-4 h-4" />,
  claude: <img src="/claude-color.svg" alt="Claude" className="w-4 h-4" />,
  gemini: <img src="/gemini-color.svg" alt="Gemini" className="w-4 h-4" />,
  openai: <img src="https://cdn.simpleicons.org/openai/412991" alt="OpenAI" className="w-4 h-4" />,
  nextjs: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-4 h-4" style={{ filter: 'invert(1) brightness(2)' }} />,
  vscode: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" className="w-4 h-4" />,
  git: <img src="https://cdn.simpleicons.org/git/F05032" alt="Git" className="w-4 h-4" />,
  vercel: <img src="https://cdn.simpleicons.org/vercel/000000" alt="Vercel" className="w-4 h-4 vercel-icon" />,
  dsa: <img src="https://cdn.simpleicons.org/leetcode/FFA116" alt="DSA" className="w-4 h-4" />,
}

const skillCategories = [
  {
    title: 'Backend & APIs',
    skills: [
      { name: 'Node.js', icon: icons.nodejs },
      { name: "Typescript", icon: icons.typescript },
      { name: 'Express.js', icon: icons.express },
      { name: "WebSocket", icon: icons.websocket },
      { name: "Redis", icon: icons.redis },
      { name: 'Python', icon: icons.python },
      { name: 'FastAPI', icon: icons.fastapi },
      { name: 'MongoDB', icon: icons.mongodb },
      { name: "PostgreSQL", icon: icons.postgresql },
      { name: "Prisma", icon: icons.prisma },
      { name: "DSA", icon: icons.dsa },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: icons.react },
      { name: 'Next.js', icon: icons.nextjs },
      { name: 'JavaScript', icon: icons.javascript },
      { name: "Tailwind CSS", icon: icons.tailwind },
    ],
  },
  {
    title: 'Dev Tools',
    skills: [
      { name: 'VS Code', icon: icons.vscode },
      { name: 'Git', icon: icons.git },
      { name: "Postman", icon: icons.postman },
      { name: 'Claude', icon: icons.claude },
      { name: 'Gemini', icon: icons.gemini },
      { name: 'Vercel', icon: icons.vercel },
    ],
  },
]

const Skills: React.FC<SkillsProps> = ({ className = '' }) => {
  useEffect(() => {
    const initAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      const skillsSections = [
        '.skills-title-section',
        '.skills-content-section',
        '.skills-cta-section',
      ]

      skillsSections.forEach((section, index) => {
        gsap.set(section, { opacity: 0, y: 30 })

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
          },
        })
      })

      const categories = document.querySelectorAll('.skill-category')
      categories.forEach((category, categoryIndex) => {
        gsap.set(category, { opacity: 0, y: 30 })

        ScrollTrigger.create({
          trigger: category,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(category, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: categoryIndex * 0.1,
              ease: 'power2.out',
            })

            const title = category.querySelector('.category-title')
            gsap.to(title, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: categoryIndex * 0.1 + 0.2,
              ease: 'power2.out',
            })

            const skillPills = category.querySelectorAll('.skill-pill')
            skillPills.forEach((pill, skillIndex) => {
              gsap.to(pill, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                delay: categoryIndex * 0.1 + 0.3 + skillIndex * 0.05,
                ease: 'back.out(1.2)',
              })
            })
          },
        })
      })
    }

    initAnimations()
  }, [])

  return (
    <div className={`skills-container relative ${className}`}>
      <div className="border border-dotted border-[var(--border-color)] p-3 sm:p-4 md:p-5 relative skills-content-wrapper bg-[var(--card-bg)] rounded-xl">
        <div className="size-4 bg-[var(--border-color)] absolute -top-2 -left-2"></div>

        {/* Header */}
        <div className="skills-title-section flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4 border-b border-[var(--border-color)] pb-3 sm:pb-4 border-dotted">
          <Badge size="sm" className="w-fit">
            <span className="text-xs font-bold uppercase">Technical Skills</span>
          </Badge>
          <h2 className="text-xl sm:text-2xl font-semibold skills-title leading-none">
            My Toolkit
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="skills-content-section mb-4 pb-4 border-b border-[var(--border-color)] border-dotted">
          <div className="space-y-3">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="skill-category" data-category={categoryIndex}>
                <h3 className="text-base font-semibold mb-2 category-title text-[var(--text-primary)]">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 items-center">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="skill-pill inline-flex items-center gap-1.5 px-2 py-1 border border-[var(--border-color)] rounded-md text-xs font-medium hover:bg-[var(--accent-primary)] hover:text-black transition-colors cursor-pointer"
                      data-skill={skillIndex}
                    >
                      <span className="skill-icon">{skill.icon}</span>
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="skills-cta-section flex flex-col items-start gap-1.5">
          <h3 className="text-base font-semibold">Always Learning, Always Growing</h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Technology evolves fast, and so do I! Currently exploring new AI frameworks and
            edge computing solutions.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md hover:bg-[var(--accent-primary)] hover:text-black hover:border-[var(--accent-primary)] transition-all duration-300 text-xs font-medium"
          >
            Let's Talk Tech
          </a>
        </div>
      </div>
      <div className="size-4 bg-[var(--border-color)] absolute -bottom-2 -right-2 z-10"></div>

      <style>{`
        .skills-container {
          perspective: 1000px;
        }

        .skills-title-section,
        .skills-content-section,
        .skills-cta-section {
          opacity: 0;
          transform: translateY(20px);
        }

        .skill-category {
          opacity: 0;
          transform: translateY(20px);
        }

        .category-title {
          opacity: 0;
          transform: translateY(10px);
        }
      `}</style>
    </div>
  )
}

export default Skills
