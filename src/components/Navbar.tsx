import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Animate navbar on mount
    const initNavbar = async () => {
      const { gsap } = await import('gsap')
      const navbar = document.getElementById('main-navbar')
      if (navbar) {
        gsap.to(navbar, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.5,
        })
      }
    }
    initNavbar()

    // Scroll handler
    let prevScrollPos = window.scrollY
    let ticking = false
    const navbar = document.getElementById('main-navbar')
    navbar?.classList.add('border-transparent')

    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrollingUp = prevScrollPos > currentScrollPos

      if (currentScrollPos > 100) {
        navbar?.classList.remove('border-transparent')
      } else {
        navbar?.classList.add('border-transparent')
      }

      if (!isScrollingUp && currentScrollPos > 100) {
        navbar?.classList.add('-translate-y-full')
      } else {
        navbar?.classList.remove('-translate-y-full')
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
          <div></div>
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
          </ul>
          <div></div>
        </nav>
      </div>

      {/* Main Navigation Bar */}
      <nav
        id="main-navbar"
        className="sticky top-0 left-0 right-0 z-50 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] bg-opacity-80 backdrop-blur-sm h-16 ease-in-out transition-transform duration-300"
        style={{ opacity: 0, transform: 'translateY(-20px)' }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 xl:px-8 h-full flex items-center justify-between">
          <Link
            to="/"
            id="logo-link"
            onClick={handleLogoClick}
            className="font-medium text-xl text-[var(--text-primary)] flex items-center"
          >
            <span className="text-[var(--text-primary)] font-bold text-xl">VK</span>
            <span className="text-[var(--accent-primary)] font-bold text-3xl">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:ml-8">
            <ul className="flex list-none gap-8 p-0 m-0">
              <li>
                <Link
                  to="/"
                  className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] py-2 text-base font-normal"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] py-2 text-base font-normal"
                >
                  About Me
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] py-2 text-base font-normal"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] py-2 text-base font-normal"
                >
                  Skills
                </a>
              </li>
              <li>
                <Link
                  to="/socials"
                  className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] py-2 text-base font-normal"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-4">
            <button
              className="menu-toggle text-sm font-medium bg-transparent border-none cursor-pointer text-[var(--text-primary)]"
              aria-label="Toggle Menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-sidebar"
              onClick={handleMenuToggle}
            >
              <span className="toggle-text">{isMenuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
