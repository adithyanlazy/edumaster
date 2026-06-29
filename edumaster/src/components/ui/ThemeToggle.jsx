import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi'

const options = [
  { value: 'light', icon: FiSun, label: 'Light' },
  { value: 'dark', icon: FiMoon, label: 'Dark' },
  { value: 'system', icon: FiMonitor, label: 'System' },
]

export default function ThemeToggle() {
  const { theme, resolved, toggle } = useTheme()
  const isDark = resolved === 'dark'
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = options.find((o) => o.value === theme)
  const Icon = current.icon

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
        style={{
          background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)',
          color: isDark ? 'rgba(255,255,255,0.8)' : '#374151',
        }}
        aria-label="Toggle theme"
      >
        <Icon className="text-lg" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-40 rounded-xl bg-white border border-surface-200 shadow-soft-xl overflow-hidden z-50"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { toggle(opt.value); setOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  theme === opt.value
                    ? 'bg-royal-50 text-royal-600'
                    : 'text-gray-600 hover:bg-surface-50'
                }`}
              >
                <opt.icon className="text-base" />
                {opt.label}
                {theme === opt.value && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-royal-500" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
