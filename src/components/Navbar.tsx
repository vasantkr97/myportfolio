import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeChanger from './ThemeChanger'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const location = useLocation()

  useEffect(() => {
    // Animate navbar on mount
    const initNavbar = async () => {
      const { gsap } = await import('gsap')
      const navbar = document.getElementById('main-navbar')
      if (navbar) {
        gsap.set(navbar, { y: -20, opacity: 0 })
        gsap.to(navbar, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.5,
          onComplete: () => {
             // Clear transform style so Tailwind classes (which rely on CSS variables) can take over for scroll interactions
             gsap.set(navbar, { clearProps: 'transform' }) 
          }
        })
      }
    }
    initNavbar()

    // Scroll handler
    let prevScrollPos = window.scrollY
    let ticking = false
    const navbar = document.getElementById('main-navbar')
    // navbar?.classList.add('border-transparent') // Removed transparent logic for always-visible pill

    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrollingUp = prevScrollPos > currentScrollPos

      // For the floating pill, we might want it to always be visible or auto-hide
      // Let's keep the auto-hide behavior but without the border manipulation since it always has a border now
      if (!isScrollingUp && currentScrollPos > 100) {
        navbar?.classList.add('-translate-y-[200%]') // Hide completely
      } else {
        navbar?.classList.remove('-translate-y-[200%]')
      }

      prevScrollPos = currentScrollPos
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openSidebarMenu = () => {
    const scrollPos = window.scrollY
    setScrollY(scrollPos)
    setIsMenuOpen(true)
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPos}px`
    document.body.style.width = '100%'
    document.body.style.overflowY = 'scroll'
  }

  const closeSidebarMenu = () => {
    setIsMenuOpen(false)
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    document.body.style.overflowY = ''
    window.scrollTo(0, scrollY)
  }

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isMenuOpen) {
      closeSidebarMenu()
    } else {
      openSidebarMenu()
    }
  }

  const handleLinkClick = () => {
    closeSidebarMenu()
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/' || location.pathname === '') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeSidebarMenu()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  return (
    <>
      {/* Mobile Navigation Sidebar */}
      <div
        id="mobile-sidebar"
        className={`fixed inset-0 h-full w-full z-[40] bg-[var(--bg-secondary)] ease-in-out overflow-y-auto p-4 flex flex-col transition-all duration-300 ${isMenuOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible translate-y-8'
          }`}
      >
        <nav className="flex flex-col justify-between h-full">
          <div className="flex justify-end p-2">
             <button
              onClick={handleMenuToggle}
              className="text-[var(--text-primary)] focus:outline-none"
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <ul className="list-none p-0 m-0">
            <li className="mb-6">
              <Link
                to="/"
                onClick={handleLinkClick}
                className="text-3xl font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
              >
                Home
              </Link>
            </li>
            <li className="mb-6">
              <a
                href="#about"
                onClick={handleLinkClick}
                className="text-3xl font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
              >
                About Me
              </a>
            </li>
            <li className="mb-6">
              <a
                href="#projects"
                onClick={handleLinkClick}
                className="text-3xl font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
              >
                Projects
              </a>
            </li>
            <li className="mb-6">
              <a
                href="#skills"
                onClick={handleLinkClick}
                className="text-3xl font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
              >
                Skills
              </a>
            </li>
            <li className="mb-6">
              <Link
                to="/socials"
                onClick={handleLinkClick}
                className="text-3xl font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
              >
                Contact
              </Link>
            </li>
             <li className="mb-6 flex">
              <ThemeChanger variant="icon" />
            </li>
          </ul>
          <div></div>
        </nav>
      </div>

      {/* Main Navigation Bar */}
      <nav
        id="main-navbar"
        className="fixed top-4 left-0 right-0 mx-auto z-50 bg-[var(--bg-secondary)]/60 border border-[var(--border-color)]/50 backdrop-blur-xl rounded-full px-5 py-2.5 shadow-md ease-in-out transition-transform duration-500 w-fit max-w-[95vw]"
        style={{ opacity: 0, transform: 'translateY(-20px)' }}
      >
        <div className="flex items-center gap-6">
          <Link
            to="/"
            id="logo-link"
            onClick={handleLogoClick}
            className="font-medium text-xl text-[var(--text-primary)] flex items-center gap-2 group"
          >
             <div className="relative">
                <img src="/pic12.png" alt="Vasanth Kumar" className="w-7 h-7 rounded-full object-cover border border-[var(--accent-primary)] transition-transform duration-300 group-hover:scale-110" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <ul className="flex items-center list-none gap-5 p-0 m-0">
              <li>
                <Link
                  to="/"
                  className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] text-sm font-medium transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] text-sm font-medium transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] text-sm font-medium transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] text-sm font-medium transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <Link
                  to="/socials"
                  className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] text-sm font-medium transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li className="flex items-center pl-2 border-l border-[var(--border-color)]">
                 <ThemeChanger variant="icon" />
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-2">
            <button
              className="menu-toggle overflow-hidden w-8 h-8 flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
              aria-label="Toggle Menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-sidebar"
              onClick={handleMenuToggle}
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
