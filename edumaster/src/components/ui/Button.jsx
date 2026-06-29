import { motion } from 'framer-motion'
import { useState, useRef } from 'react'

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const [ripples, setRipples] = useState([])
  const btnRef = useRef(null)

  const handleClick = (e) => {
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples(prev => [...prev, { x, y, id }])
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600)
    props.onClick?.(e)
  }

  const base = 'relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-300 active:scale-95 cursor-pointer'
  const variants = {
    primary: 'bg-royal-500 text-white px-8 py-4 hover:bg-royal-600 hover:shadow-lg hover:shadow-royal-500/25',
    secondary: 'border-2 border-royal-500 text-royal-500 px-8 py-4 hover:bg-royal-500 hover:text-white',
    ghost: 'text-royal-500 px-6 py-3 hover:bg-royal-50',
    white: 'bg-white text-royal-500 px-8 py-4 hover:bg-surface-100 hover:shadow-lg',
  }

  return (
    <motion.button
      ref={btnRef}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {ripples.map(r => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: r.x - 10,
            top: r.y - 10,
            width: 20,
            height: 20,
            animation: 'ripple-expand 0.6s ease-out forwards',
          }}
        />
      ))}
      {children}
    </motion.button>
  )
}
