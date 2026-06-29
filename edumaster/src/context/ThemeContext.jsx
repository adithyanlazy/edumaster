import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('edu-master-theme')
      if (saved) return saved
    }
    return 'system'
  })

  const [resolved, setResolved] = useState('light')

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    const apply = () => {
      const isDark = theme === 'dark' || (theme === 'system' && mq.matches)
      setResolved(isDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', isDark)
    }

    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])

  const toggle = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('edu-master-theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, resolved, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
