import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import useContent from '../../hooks/useContent'

const gradients = ['from-blue-500 to-indigo-600', 'from-emerald-400 to-teal-500', 'from-violet-400 to-purple-500', 'from-amber-400 to-orange-500', 'from-rose-400 to-pink-500', 'from-cyan-400 to-sky-500']
const accents = ['#4f46e5', '#10b981', '#8b5cf6', '#f59e0b', '#f43f5e', '#06b6d4']

function enrichTestimonial(t, i) {
  const g = gradients[i % gradients.length]
  const accent = accents[i % accents.length]
  return { ...t, initials: t.name.split(' ').map(w => w[0]).join(''), gradient: g, accent }
}

function StarRating({ rating, accent }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar key={i} className="w-4 h-4" style={{ color: i < rating ? accent : '#e5e7eb', fill: i < rating ? accent : 'none' }} />
      ))}
    </div>
  )
}

function TestimonialCard({ t, isActive }) {
  return (
    <div className={`relative flex-shrink-0 w-[340px] md:w-[420px] snap-center`}>
      <div className={`relative h-full premium-card rounded-[1.6rem] p-7 md:p-8 transition-all duration-500 ${isActive ? 'ring-2 ring-royal-200 shadow-glow-royal' : ''}`}>
        <StarRating rating={t.rating} accent={t.accent} />
        <p className="text-gray-600 text-sm leading-relaxed mt-5 mb-7 min-h-[100px]">
          &ldquo;{t.review}&rdquo;
        </p>
        <div className="flex items-center gap-4 pt-5 border-t border-surface-100">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-md"
            style={{ background: `linear-gradient(135deg, ${t.gradient.includes('blue') ? '#3b82f6,#4f46e5' : t.gradient.includes('emerald') ? '#34d399,#14b8a6' : t.gradient.includes('violet') ? '#a78bfa,#8b5cf6' : t.gradient.includes('amber') ? '#fbbf24,#f97316' : t.gradient.includes('rose') ? '#fb7185,#ec4899' : '#22d3ee,#0ea5e9'})` }}>
            {t.initials}
          </div>
          <div className="min-w-0">
            <div className="font-display font-bold text-navy-800 text-sm truncate">{t.name}</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 truncate">{t.college}</div>
            <div className="text-[11px] font-semibold mt-0.5" style={{ color: t.accent }}>{t.course}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const content = useContent('testimonials')
  const testimonials = content.map(enrichTestimonial)
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef(null)
  const intervalRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const containerRef = useRef(null)

  const scrollTo = useCallback((index) => {
    if (!scrollRef.current) return
    const card = scrollRef.current.children[index]
    if (!card) return
    const container = scrollRef.current
    const left = card.offsetLeft - container.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2
    container.scrollTo({ left, behavior: 'smooth' })
    setActive(index)
  }, [])

  const next = useCallback(() => setActive((p) => (p + 1) % testimonials.length), [])
  const prev = useCallback(() => setActive((p) => (p - 1 + testimonials.length) % testimonials.length), [])

  useEffect(() => { scrollTo(active) }, [active, scrollTo])
  useEffect(() => {
    if (isPaused) return
    intervalRef.current = setInterval(next, 4000)
    return () => clearInterval(intervalRef.current)
  }, [isPaused, next])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.05 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-surface-50 dark:bg-[#0f1117] relative overflow-hidden">
      <div className="absolute top-10 left-0 w-[400px] h-[400px] bg-royal-50/40 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-royal-100/30 rounded-full blur-[60px] pointer-events-none" />

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className={`text-center max-w-3xl mx-auto mb-14 md:mb-18 transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <span className="inline-flex items-center gap-2 bg-royal-50 border border-royal-100 rounded-full px-5 py-2.5 mb-6">
            <span className="w-2 h-2 bg-royal-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-royal-600">Testimonials</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold leading-tight mb-6">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Real stories from students who turned their academic dreams into reality with EDU MASTER.
          </p>
        </div>

        <div
          className={`transition-all duration-700 ease-out delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex-shrink-0 w-[calc(50vw-220px)] md:w-8" />
            {testimonials.map((t, i) => (
              <div key={i} onClick={() => setActive(i)} className="cursor-pointer">
                <TestimonialCard t={t} isActive={i === active} />
              </div>
            ))}
            <div className="flex-shrink-0 w-[calc(50vw-220px)] md:w-8" />
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button onClick={prev} className="w-11 h-11 rounded-2xl bg-white border border-surface-200 flex items-center justify-center hover:border-royal-300 hover:bg-royal-50 shadow-md transition-all duration-300" aria-label="Previous">
              <FiChevronLeft className="text-xl text-navy-800" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'bg-royal-500 w-8' : 'bg-surface-300 w-2 hover:bg-surface-400'}`}
                  aria-label={`Go to ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-11 h-11 rounded-2xl bg-royal-500 text-white flex items-center justify-center hover:bg-royal-600 shadow-md shadow-royal-500/25 transition-all duration-300" aria-label="Next">
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
