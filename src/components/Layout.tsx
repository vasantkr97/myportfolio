import React, { ReactNode, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  ogImage?: string
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Vasanth Kumar - Software Engineer Portfolio',
  description = 'Portfolio of Vasanth Kumar, a software engineer specializing in web development, React, Next.js, Svelte, and modern JavaScript frameworks.',
  ogImage = '/images/og.webp',
}) => {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default
      const lenis = new Lenis({})

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    }

    initLenis()
  }, [])

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="author" content="Vasanth Kumar" />
        <link rel="sitemap" href="/sitemap.xml" />
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="Vasanth Kumar's Blog RSS Feed" />
      </Helmet>

      <div className="page-layout">
        {children}
      </div>
    </>
  )
}

export default Layout
