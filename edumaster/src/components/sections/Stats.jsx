import { useState, useEffect, useRef } from 'react'
import AnimatedCounter from '../ui/AnimatedCounter'
import useContent from '../../hooks/useContent'

export default function Stats() {
  const stats = useContent('stats')
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-[#141b2f] to-[#0d1225] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-royal-500/10 rounded-full blur-[60px]" />
        <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-royal-400/10 rounded-full blur-[50px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center transition-all duration-600 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: visible ? `${i * 100}ms` : '0ms' }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2">
                <AnimatedCounter end={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-white/90 font-semibold text-sm mb-1">{stat.label}</div>
              <div className="text-white/40 text-xs">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
