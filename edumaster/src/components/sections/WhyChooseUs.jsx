import { useState, useEffect, useRef } from 'react'
import {
  FiShield, FiAward, FiDollarSign, FiEye,
  FiStar, FiHeadphones,
} from 'react-icons/fi'
import useContent from '../../hooks/useContent'

const iconMap = { FiShield, FiAward, FiDollarSign, FiEye, FiStar, FiHeadphones }

export default function WhyChooseUs() {
  const features = useContent('whyChooseUs')
  const [headerVisible, setHeaderVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          if (e.target === headerRef.current) setHeaderVisible(true)
          if (e.target === cardsRef.current) setCardsVisible(true)
          if (e.target === ctaRef.current) setCtaVisible(true)
        })
      },
      { threshold: 0.1 }
    )
    if (headerRef.current) obs.observe(headerRef.current)
    if (cardsRef.current) obs.observe(cardsRef.current)
    if (ctaRef.current) obs.observe(ctaRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="why-us" className="py-24 md:py-32 bg-surface-50 dark:bg-[#0f1117] relative overflow-hidden">
      <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-royal-50/40 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-royal-100/30 rounded-full blur-[70px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 md:mb-20 opacity-0 translate-y-5 ${headerVisible ? '!opacity-100 !translate-y-0' : ''} transition-all duration-700 ease-out`}
        >
          <span className="inline-flex items-center gap-2 bg-royal-50 border border-royal-100 rounded-full px-5 py-2.5 mb-6">
            <span className="w-2 h-2 bg-royal-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-royal-600">Why Choose Us</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold leading-tight mb-6">
            Why Students Trust <span className="gradient-text">EDU MASTER</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            We do not just fill applications — we build futures. Here is what makes us the preferred choice for thousands of students.
          </p>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || FiShield
            return (
              <div
                key={i}
                className={`premium-card rounded-2xl p-7 opacity-0 translate-y-5 ${cardsVisible ? '!opacity-100 !translate-y-0' : ''} transition-all duration-500`}
                style={{ transitionDelay: cardsVisible ? `${i * 80}ms` : '0ms' }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-md mb-5`}>
                  <Icon className="text-white text-lg" />
                </div>
                <h3 className="text-lg font-display font-bold text-navy-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        <div
          ref={ctaRef}
          className={`mt-16 md:mt-20 opacity-0 translate-y-5 ${ctaVisible ? '!opacity-100 !translate-y-0' : ''} transition-all duration-700 ease-out`}
        >
          <div className="bg-gradient-to-r from-royal-500 via-royal-600 to-royal-500 rounded-[2rem] p-10 md:p-14 text-white text-center shadow-glow-royal">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Book a free consultation and discover how EDU MASTER can transform your academic future.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-royal-600 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Book Free Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
