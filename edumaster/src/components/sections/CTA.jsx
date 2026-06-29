import { useState, useEffect, useRef } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import useContent from '../../hooks/useContent'

export default function CTA() {
  const cta = useContent('cta')
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
    <section className="py-24 md:py-32 bg-white dark:bg-[#161b26] relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div
          ref={ref}
          className={`relative bg-gradient-to-br from-[#141b2f] via-[#0d1225] to-[#141b2f] rounded-[2rem] p-10 md:p-16 lg:p-20 text-white overflow-hidden transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-royal-400/15 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-royal-500/10 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
              {cta.headline}
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-lg leading-relaxed">
              {cta.subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white text-navy-800 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {cta.primaryButton}
                <HiArrowRight className="text-lg" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-white/20 text-white/80 px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {cta.secondaryButton}
              </a>
            </div>
            {cta.badges && (
              <div className="mt-10 flex items-center gap-6 text-sm text-white/40">
                {cta.badges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    {badge}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
