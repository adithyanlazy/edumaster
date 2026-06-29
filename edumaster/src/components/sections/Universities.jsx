import { useRef, useState, useEffect } from 'react'
import useContent from '../../hooks/useContent'

function LogoCarousel({ logoCarousel }) {
  const doubled = [...logoCarousel, ...logoCarousel]
  return (
    <div className="relative overflow-hidden mb-16 md:mb-20">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-50 dark:from-[#161b26] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-50 dark:from-[#161b26] to-transparent z-10 pointer-events-none" />
      <div className="flex gap-6 animate-[scroll_30s_linear_infinite]" style={{ width: 'max-content' }}>
        {doubled.map((logo, i) => (
          <div key={i} className="flex-shrink-0 w-32 h-16 rounded-2xl bg-white dark:bg-white/[0.04] border border-surface-200 dark:border-white/[0.06] shadow-sm flex items-center justify-center">
            <span className="text-sm font-bold tracking-wide" style={{ color: logo.color }}>{logo.abbr}</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  )
}

function UniversityCard({ uni, index, visible }) {
  return (
    <div
      className={`group premium-card rounded-2xl overflow-hidden transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: visible ? `${index * 80}ms` : '0ms' }}
    >
      <div className="relative h-40 bg-gradient-to-br from-surface-100 dark:from-white/[0.04] to-surface-50 dark:to-white/[0.02] flex items-center justify-center overflow-hidden">
        {uni.image ? (
          <>
            <img src={uni.image} alt={uni.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div
              className="absolute bottom-3 left-3 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm"
              style={{ background: `${uni.color}dd`, border: `2px solid ${uni.color}` }}
            >
              <span className="text-sm font-extrabold text-white">{uni.abbr}</span>
            </div>
          </>
        ) : (
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${uni.color}15`, border: `2px solid ${uni.color}25` }}
          >
            <span className="text-2xl font-extrabold" style={{ color: uni.color }}>{uni.abbr}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full" style={{ background: uni.color }} />
          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{uni.location}</span>
        </div>
        <h3 className="text-base font-display font-bold text-navy-800 dark:text-white mb-3 group-hover:text-royal-600 transition-colors duration-300 leading-snug">
          {uni.name}
        </h3>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {uni.courses.map((course, j) => (
            <span key={j} className="px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400 text-[11px] font-medium">{course}</span>
          ))}
        </div>
        <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal-500 group-hover:text-royal-600 transition-colors duration-300">
          View Details
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function Universities() {
  const universities = useContent('universities')
  const logoCarousel = useContent('logoCarousel')
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.05 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="universities" className="py-24 md:py-32 bg-white dark:bg-[#161b26] relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-royal-50/40 dark:bg-royal-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-royal-100/30 dark:bg-royal-400/5 rounded-full blur-[60px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <span className="inline-flex items-center gap-2 bg-royal-50 dark:bg-royal-500/10 border border-royal-100 dark:border-royal-500/20 rounded-full px-5 py-2.5 mb-6">
            <span className="w-2 h-2 bg-royal-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-royal-600 dark:text-royal-400">Partner Universities</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold leading-tight mb-6">
            Trusted by <span className="gradient-text">Top Institutions</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            We have partnerships with leading medical, engineering, and management colleges across Kerala, Karnataka, and Tamil Nadu.
          </p>
        </div>

        <LogoCarousel logoCarousel={logoCarousel} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni, i) => (
            <UniversityCard key={i} uni={uni} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
