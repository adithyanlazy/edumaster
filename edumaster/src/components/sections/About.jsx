import { useState, useEffect, useRef } from 'react'
import { FiShield, FiUsers, FiTrendingUp, FiHeadphones } from 'react-icons/fi'
import useContent from '../../hooks/useContent'

const highlights = [
  { icon: FiShield, title: 'Trusted Guidance', description: 'Over a decade of helping students make the right academic decisions with confidence.', gradient: 'from-blue-500 to-indigo-600' },
  { icon: FiUsers, title: 'Experienced Counsellors', description: 'Our team includes former admissions officers and career experts from top institutions.', gradient: 'from-emerald-400 to-teal-500' },
  { icon: FiTrendingUp, title: 'Career Support', description: 'From course selection to placement assistance — we support your entire career journey.', gradient: 'from-violet-400 to-purple-500' },
  { icon: FiHeadphones, title: 'Admission Assistance', description: 'Complete end-to-end support for applications, documentation, and university follow-ups.', gradient: 'from-amber-400 to-orange-500' },
]

const stats = [
  { number: 500, suffix: '+', label: 'Students Guided', description: 'And counting every day' },
  { number: 50, suffix: '+', label: 'Partner Colleges', description: 'Across South India' },
  { number: 3, suffix: '', label: 'States', description: 'Kerala, Karnataka, Tamil Nadu' },
  { number: 100, suffix: '%', label: 'Support', description: 'Dedicated to your success' },
]

function CountUp({ end, active }) {
  const [value, setValue] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    if (!active) return
    let start = null
    const tick = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 2000, 1)
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * end))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [active, end])

  return <span className="tabular-nums">{value}</span>
}

export default function About() {
  const content = useContent('about')
  const [headerVisible, setHeaderVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headerRef.current) setHeaderVisible(true)
            if (entry.target === cardsRef.current) setCardsVisible(true)
            if (entry.target === statsRef.current) setStatsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (headerRef.current) observer.observe(headerRef.current)
    if (cardsRef.current) observer.observe(cardsRef.current)
    if (statsRef.current) observer.observe(statsRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-20 md:py-28 lg:py-32 bg-surface-50 dark:bg-[#0f1117] dark:bg-[#0f1117] relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-royal-100/30 dark:bg-royal-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-royal-50/40 dark:bg-royal-400/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-14 md:mb-18 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <span className="inline-flex items-center gap-2 bg-royal-50 dark:bg-royal-500/10 border border-royal-100 dark:border-royal-500/20 rounded-full px-5 py-2.5 mb-6">
            <span className="w-2 h-2 bg-royal-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-royal-600 dark:text-royal-400">{content.badge}</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold leading-tight mb-6">
            <span className="gradient-text">{content.title}</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            {content.description}
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 md:mb-20">
          {highlights.map((item, i) => (
            <div
              key={i}
              className={`group premium-card rounded-3xl p-7 transition-all duration-500 ${
                cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: cardsVisible ? `${i * 80}ms` : '0ms' }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                <item.icon className="text-white text-xl" />
              </div>
              <h3 className="text-lg font-display font-bold text-navy-800 dark:text-white mb-2 group-hover:text-royal-600 dark:group-hover:text-royal-400 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div
          ref={statsRef}
          className={`transition-all duration-700 ease-out ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="premium-card rounded-[2rem] p-8 md:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {content.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-display font-extrabold gradient-text mb-2">
                    <CountUp end={stat.number} active={statsVisible} />{stat.suffix}
                  </div>
                  <div className="text-sm font-semibold text-navy-800 dark:text-white mb-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
