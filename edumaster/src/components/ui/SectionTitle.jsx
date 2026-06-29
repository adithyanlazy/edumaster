import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollAnimation'

export default function SectionTitle({ badge, title, description, center = true, light = false }) {
  const ref = useScrollReveal()

  return (
    <div ref={ref} className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-16 md:mb-20`}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
            light
              ? 'bg-white/10 text-white/80 border border-white/20'
              : 'bg-royal-50 text-royal-500 border border-royal-100'
          }`}
        >
          {badge}
        </motion.span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6 ${
        light ? 'text-white' : 'gradient-text'
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg md:text-xl leading-relaxed ${
          light ? 'text-white/70' : 'text-gray-500'
        }`}>
          {description}
        </p>
      )}
    </div>
  )
}
