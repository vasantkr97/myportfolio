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
  express: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" className="w-4 h-4" />,
  websocket: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" alt="WebSocket" className="w-4 h-4" />,
  redis: <img src="https://cdn.simpleicons.org/redis/DC382D" alt="Redis" className="w-4 h-4" />,
  postgresql: <img src="https://cdn.simpleicons.org/postgresql/4169E1" alt="PostgreSQL" className="w-4 h-4" />,
  prisma: <img src="https://cdn.simpleicons.org/prisma/2D3748" alt="Prisma" className="w-4 h-4" />,
  tailwind: <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="Tailwind CSS" className="w-4 h-4" />,
  postman: <img src="https://cdn.simpleicons.org/postman/FF6C37" alt="Postman" className="w-4 h-4" />,
  claude: <img src="/claude-color.svg" alt="Claude" className="w-4 h-4" />,
  gemini: <img src="/gemini-color.svg" alt="Gemini" className="w-4 h-4" />,
  openai: <img src="https://cdn.simpleicons.org/openai/412991" alt="OpenAI" className="w-4 h-4" />,
  nextjs: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-4 h-4" />,
  vscode: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" className="w-4 h-4" />,
  git: <img src="https://cdn.simpleicons.org/git/F05032" alt="Git" className="w-4 h-4" />,
  vercel: <img src="https://cdn.simpleicons.org/vercel/000000" alt="Vercel" className="w-4 h-4" />,
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
      { name: 'NestJS', icon: icons.nestjs },
      { name: 'MongoDB', icon: icons.mongodb },
      { name: "PostgreSQL", icon: icons.postgresql },
      { name: "Prisma", icon: icons.prisma },
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
    title: 'AI & Dev Tools',
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
      <div className="border border-[var(--border-color)] p-4 sm:p-6 md:p-12 relative skills-title-section">
        <div className="size-4 bg-[var(--border-color)] absolute -top-2 -left-2"></div>
        <Badge size="sm" className="mb-4">
          <span className="text-xs font-bold uppercase">Technical Skills</span>
        </Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold skills-title">
          My Toolkit
        </h2>
      </div>

      <div className="border border-[var(--border-color)] border-t-0 p-4 sm:p-6 md:p-12 skills-content-section">
        <div className="space-y-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="skill-category" data-category={categoryIndex}>
              <h3 className="text-lg font-semibold mb-4 category-title text-[var(--text-primary)]">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-6 items-center">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="skill-pill inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] text-sm font-medium hover:bg-[var(--accent-primary)] hover:text-white transition-colors cursor-pointer"
                    data-skill={skillIndex}
                  >
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-[var(--border-color)] border-t-0 px-4 sm:px-6 md:px-10 p-4 sm:py-6 flex flex-col items-start gap-4 skills-cta-section">
        <h3 className="text-xl font-medium">Always Learning, Always Growing</h3>
        <p className="text-sm sm:text-base text-[var(--text-secondary)]">
          Technology evolves fast, and so do I! Currently exploring new AI frameworks and
          diving deeper into system design. What's next on your tech wishlist?
        </p>
        <a
          href="mailto:vasantkr97@gmail.com"
          className="inline-flex items-center justify-center px-6 py-3 mt-2 border border-[var(--border-color)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
        >
          Let's Talk Tech 💻
        </a>
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
