import React, { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

const ThemeChanger: React.FC = () => {
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

  return (
    <div className="theme-toggle flex overflow-hidden shadow-sm border border-[var(--border-color)]">
      <button
        className={`toggle-option px-4 py-1.5 text-sm border-none cursor-pointer transition-colors min-w-[70px] text-center ${
          currentTheme === 'light' ? 'font-medium' : ''
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
        className={`toggle-option px-4 py-1.5 text-sm border-none cursor-pointer transition-colors min-w-[70px] text-center ${
          currentTheme === 'dark' ? 'font-medium' : ''
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
