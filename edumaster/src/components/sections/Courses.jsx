import { useState, useEffect, useRef } from 'react'
import {
  FiActivity, FiSmile, FiHeart, FiStar,
  FiTrendingUp, FiLayers, FiCpu, FiBriefcase,
} from 'react-icons/fi'
import useContent from '../../hooks/useContent'

const iconMap = { FiActivity, FiSmile, FiHeart, FiStar, FiTrendingUp, FiLayers, FiCpu, FiBriefcase }

export default function Courses() {
  const courses = useContent('courses')
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
    <section id="courses" className="py-20 md:py-28 lg:py-32 bg-surface-50 dark:bg-[#0f1117] relative overflow-hidden">
      <div className="absolute top-10 left-0 w-[400px] h-[400px] bg-royal-50/40 rounded-full blur-[80px] pointer-events-none" />
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
            <span className="text-sm font-semibold text-royal-600">Our Courses</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold leading-tight mb-6">
            Explore Top <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            From medicine to management — find the perfect course that aligns with your passion and career goals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {courses.map((course, i) => {
            const Icon = iconMap[course.icon] || FiActivity
            return (
              <div
                key={i}
                className={`group premium-card rounded-2xl overflow-hidden transition-all duration-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: visible ? `${i * 50}ms` : '0ms' }}
              >
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center shadow-md`}>
                      <Icon className="text-white text-lg" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2.5 py-1 rounded-full bg-surface-100 text-gray-500 text-[11px] font-semibold">
                        {course.degree}
                      </span>
                      <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">{course.duration}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-display font-bold text-navy-800 dark:text-white mb-2 group-hover:text-royal-600 transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5">{course.description}</p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-royal-50 text-royal-600 text-sm font-semibold group-hover:bg-royal-500 group-hover:text-white transition-all duration-300"
                  >
                    Learn More
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
