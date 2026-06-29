import { useState, useEffect, useRef } from 'react'
import {
  FiBookOpen, FiHeart, FiFileText, FiHome,
  FiDollarSign, FiCreditCard, FiSend,
} from 'react-icons/fi'
import useContent from '../../hooks/useContent'

const serviceMeta = [
  { icon: FiBookOpen, gradient: 'from-blue-500 to-indigo-600', tag: null },
  { icon: FiHeart, gradient: 'from-emerald-400 to-teal-500', tag: null },
  { icon: FiFileText, gradient: 'from-violet-400 to-purple-500', tag: null },
  { icon: FiHome, gradient: 'from-amber-400 to-orange-500', tag: 'Popular' },
  { icon: FiDollarSign, gradient: 'from-rose-400 to-pink-500', tag: null },
  { icon: FiCreditCard, gradient: 'from-cyan-400 to-sky-500', tag: null },
  { icon: FiSend, gradient: 'from-fuchsia-400 to-purple-500', tag: 'Optional' },
]

const fallbackGradient = 'from-gray-400 to-gray-500'

export default function Services() {
  const content = useContent('services')
  const [visible, setVisible] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.05 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="services" className="py-20 md:py-28 lg:py-32 bg-white dark:bg-[#161b26] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-royal-50/40 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-royal-100/30 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div
          ref={containerRef}
          className={`text-center max-w-3xl mx-auto mb-14 md:mb-18 transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <span className="inline-flex items-center gap-2 bg-royal-50 border border-royal-100 rounded-full px-5 py-2.5 mb-6">
            <span className="w-2 h-2 bg-royal-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-royal-600">Our Services</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold leading-tight mb-6">
            Everything You Need to <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Comprehensive services designed to guide you at every step — from the first inquiry to your first day on campus.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {content.map((service, i) => {
            const meta = serviceMeta[i] || { icon: FiBookOpen, gradient: fallbackGradient, tag: null }
            return (
            <div
              key={i}
              className={`group premium-card rounded-2xl p-6 transition-all duration-500 cursor-pointer ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: visible ? `${i * 50}ms` : '0ms' }}
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center shadow-md`}>
                  <meta.icon className="text-white text-lg" />
                </div>
                {meta.tag && (
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                    meta.tag === 'Popular'
                      ? 'bg-amber-50 text-amber-600 border border-amber-200/60'
                      : 'bg-surface-100 text-gray-400 border border-surface-200'
                  }`}>
                    {meta.tag}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-display font-bold text-navy-800 dark:text-white mb-2 group-hover:text-royal-600 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{service.description}</p>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
