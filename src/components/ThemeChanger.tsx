import React, { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

const ThemeChanger: React.FC<{ variant?: 'default' | 'icon' }> = ({ variant = 'default' }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light')

  const updateMetaThemeColor = (isDark: boolean) => {
    const themeColor = document.querySelector('meta[name="theme-color"]')
    if (themeColor) {
      themeColor.setAttribute('content', isDark ? '#202020' : '#C9CDD1')
    }
  }

  const setTheme = (theme: Theme, save: boolean = true) => {
    document.documentElement.classList.toggle('dark-theme', theme === 'dark')

    if (save) {
      localStorage.setItem('theme', theme)
    }

    setCurrentTheme(theme)
    updateMetaThemeColor(theme === 'dark')
    document.dispatchEvent(new Event('themeChanged'))
  }

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    let initialTheme: Theme = 'light'
    if (savedTheme === 'dark') {
      initialTheme = 'dark'
    } else if (savedTheme === 'light') {
      initialTheme = 'light'
    } else {
      initialTheme = prefersDark ? 'dark' : 'light'
    }

    setCurrentTheme(initialTheme)
    document.documentElement.classList.toggle('dark-theme', initialTheme === 'dark')
    updateMetaThemeColor(initialTheme === 'dark')

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light'
        setTheme(newTheme, false)
      }
    }

    darkModeMediaQuery.addEventListener('change', handleChange)
    return () => darkModeMediaQuery.removeEventListener('change', handleChange)
  }, [])

  if (variant === 'icon') {
    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-[var(--bg-secondary-hover)] text-[var(--text-primary)] transition-colors"
        aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
      >
        {currentTheme === 'light' ? (
          // Moon Icon (for Light Mode -> Dark Mode)
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        ) : (
          // Sun Icon (for Dark Mode -> Light Mode)
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        )}
      </button>
    )
  }

  return (
    <div className="theme-toggle flex overflow-hidden shadow-sm border border-dotted border-[var(--border-color)]">
      <button
        className={`toggle-option px-4 py-1.5 text-sm border-none cursor-pointer transition-colors min-w-[70px] text-center ${currentTheme === 'light' ? 'font-medium' : ''
          }`}
        onClick={() => setTheme('light')}
        aria-pressed={currentTheme === 'light'}
        style={{
          backgroundColor: document.documentElement.classList.contains('dark-theme')
            ? '#202020'
            : 'black',
          color: document.documentElement.classList.contains('dark-theme') ? '#e0e0e0' : '#c9cdd1',
        }}
      >
        Light
      </button>
      <button
        className={`toggle-option px-4 py-1.5 text-sm border-none cursor-pointer transition-colors min-w-[70px] text-center ${currentTheme === 'dark' ? 'font-medium' : ''
          }`}
        onClick={() => setTheme('dark')}
        aria-pressed={currentTheme === 'dark'}
        style={{
          backgroundColor: document.documentElement.classList.contains('dark-theme')
            ? 'black'
            : '#c9cdd1',
          color: document.documentElement.classList.contains('dark-theme') ? '#e0e0e0' : '#333',
        }}
      >
        Dark
      </button>
    </div>
  )
}

export default ThemeChanger
