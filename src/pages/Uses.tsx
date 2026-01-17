import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Badge from '../components/Badge'
import ThemeChanger from '../components/ThemeChanger'

const usesData = {
  development: [
    { name: 'VS Code', description: 'My primary code editor with Vim keybindings' },
    { name: 'Warp', description: 'Modern terminal with AI integration' },
    { name: 'Cursor', description: 'AI-powered code editor for pair programming' },
    { name: 'GitHub Copilot', description: 'AI pair programmer' },
    { name: 'Claude', description: 'AI assistant for complex problems' },
  ],
  hardware: [
    { name: 'MacBook Pro M2', description: 'Primary development machine' },
    { name: 'Dell UltraSharp 27"', description: 'External monitor for productivity' },
    { name: 'Keychron K2', description: 'Mechanical keyboard with brown switches' },
  ],
  productivity: [
    { name: 'Notion', description: 'Notes, docs, and project management' },
    { name: 'Figma', description: 'Design and prototyping' },
    { name: 'Linear', description: 'Issue tracking and project management' },
  ],
  stack: [
    { name: 'React / Next.js', description: 'Frontend framework' },
    { name: 'SvelteKit', description: 'Full-stack framework' },
    { name: 'TypeScript', description: 'Type-safe JavaScript' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS' },
    { name: 'Node.js', description: 'Server-side JavaScript' },
    { name: 'PostgreSQL', description: 'Primary database' },
  ],
}

const Uses: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Uses - Vasanth Kumar</title>
        <meta name="description" content="Tools, software, and hardware I use daily." />
      </Helmet>

      <Navbar />

      <main className="w-[95%] xs:w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] 2xl:w-[65%] mx-auto mt-24 mb-16">
        <div className="mb-12">
          <Badge size="sm" className="mb-4">Uses</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
            My Setup
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl">
            A collection of hardware, software, and tools I use daily for development and productivity.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6 border-b border-[var(--border-color)] pb-2">
              Development
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {usesData.development.map((item, index) => (
                <div key={index} className="border border-[var(--border-color)] p-4">
                  <h3 className="font-medium mb-1">{item.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 border-b border-[var(--border-color)] pb-2">
              Hardware
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {usesData.hardware.map((item, index) => (
                <div key={index} className="border border-[var(--border-color)] p-4">
                  <h3 className="font-medium mb-1">{item.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 border-b border-[var(--border-color)] pb-2">
              Productivity
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {usesData.productivity.map((item, index) => (
                <div key={index} className="border border-[var(--border-color)] p-4">
                  <h3 className="font-medium mb-1">{item.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 border-b border-[var(--border-color)] pb-2">
              Tech Stack
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {usesData.stack.map((item, index) => (
                <div key={index} className="border border-[var(--border-color)] p-4">
                  <h3 className="font-medium mb-1">{item.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />

      <div className="sticky bottom-8 right-8 z-50">
        <div className="flex justify-end sm:pr-8 pr-5">
          <ThemeChanger />
        </div>
      </div>
    </>
  )
}

export default Uses
