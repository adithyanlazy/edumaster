import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiMinus } from 'react-icons/fi'
import useContent from '../../hooks/useContent'

function AccordionItem({ faq, index, isOpen, onToggle }) {
  return (
    <div className="group">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between gap-4 p-6 md:p-7 rounded-2xl text-left transition-all duration-300 ${
          isOpen
            ? 'bg-white shadow-soft-lg border border-royal-100/50'
            : 'bg-white/60 border border-surface-200/80 hover:bg-white hover:shadow-soft hover:border-surface-200'
        }`}
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${
            isOpen ? 'bg-royal-500 text-white shadow-md shadow-royal-500/25' : 'bg-surface-100 text-gray-400'
          }`}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <span className={`text-base md:text-lg font-display font-semibold transition-colors duration-300 ${
            isOpen ? 'text-royal-600' : 'text-navy-800'
          }`}>
            {faq.question}
          </span>
        </div>
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-royal-50 text-royal-500 rotate-180' : 'bg-surface-100 text-gray-400 rotate-0'
        }`}>
          {isOpen ? <FiMinus className="text-sm" /> : <FiPlus className="text-sm" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.25 } }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-7 pb-6 md:pb-7 pt-2">
              <div className="pl-13 md:pl-[52px]">
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-[15px] leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const faqs = useContent('faq')
  const [openIndex, setOpenIndex] = useState(0)
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
    <section id="faq" className="py-24 md:py-32 bg-surface-50 dark:bg-[#0f1117] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-royal-50/40 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-royal-100/30 rounded-full blur-[60px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto section-padding">
        <div className={`text-center mb-14 md:mb-18 transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <span className="inline-flex items-center gap-2 bg-royal-50 border border-royal-100 rounded-full px-5 py-2.5 mb-6">
            <span className="w-2 h-2 bg-royal-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-royal-600">FAQ</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold leading-tight mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our services, process, and how we can help you.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-700 ease-out delay-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <p className="text-gray-400 text-sm mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-royal-50 text-royal-600 font-semibold text-sm hover:bg-royal-100 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Contact Our Team
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
