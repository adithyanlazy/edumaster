import { useEffect, useRef, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import useContent from '../../hooks/useContent'

function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.05,
    })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0 }}
          animate={{ y: [0, -80, -160], opacity: [0, p.opacity, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
    >
      <span className="text-white/40 text-xs font-medium tracking-widest uppercase">Scroll</span>
      <motion.div
        className="w-6 h-10 rounded-full border-2 border-white/25 flex justify-center pt-2"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="w-1 h-2.5 rounded-full bg-white/60"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 100, damping: 14 } },
}

export default function Hero() {
  const content = useContent('hero')
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const handleMouse = (e) => {
      const { innerWidth, innerHeight } = window
      mouseX.set((e.clientX / innerWidth - 0.5) * 2)
      mouseY.set((e.clientY / innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [mouseX, mouseY])

  return (
    <section id="hero" ref={sectionRef} className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ scale: imageScale }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            x: useTransform(springX, (v) => v * 6),
            y: useTransform(springY, (v) => v * 4),
          }}
        >
          <img
            src="/hero-students.png"
            alt="EDU MASTER students celebrating their academic success"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
        </motion.div>

        <div className="absolute inset-0 z-10"
          style={{ background: 'linear-gradient(90deg, rgba(8,18,45,0.92) 0%, rgba(8,18,45,0.75) 35%, rgba(8,18,45,0.45) 65%, rgba(8,18,45,0.20) 100%)' }}
        />
        <div className="absolute inset-0 z-10"
          style={{ background: 'linear-gradient(180deg, rgba(8,11,20,0.3) 0%, transparent 25%, transparent 75%, rgba(8,11,20,0.5) 100%)' }}
        />
        <div className="absolute inset-0 z-10 bg-blue-900/10" />

        <Particles />
      </motion.div>

      <motion.div
        className="relative z-30 h-full flex items-center pt-20 lg:pt-24"
        style={{ opacity: contentOpacity }}
      >
        <div className="section-padding w-full max-w-7xl mx-auto">
          <div className="max-w-[600px]">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2.5 bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] rounded-full px-5 py-2.5 mb-6 md:mb-8">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-white/80">{content.badge}</span>
                </div>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] xl:text-[5.5rem] font-display font-extrabold leading-[1.05] mb-5 md:mb-6 text-white"
              >
                {content.title1}
                <br />
                {content.title2}
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent">
                    {content.title3}
                  </span>
                  <motion.span
                    className="absolute -bottom-1 md:-bottom-2 left-0 h-[3px] bg-gradient-to-r from-blue-400 to-white/50 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ type: 'spring', stiffness: 100, damping: 14, delay: 0.75 }}
                className="text-base md:text-lg text-white/50 max-w-[480px] mb-8 md:mb-10 leading-relaxed"
              >
                {content.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ type: 'spring', stiffness: 100, damping: 14, delay: 0.9 }}
                className="flex flex-wrap gap-3 md:gap-4 mb-10 md:mb-14"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2.5 px-7 md:px-8 py-3.5 md:py-4 rounded-2xl bg-white text-royal-600 font-semibold text-[14px] md:text-[15px] shadow-lg shadow-black/20 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  {content.cta1}
                  <HiArrowRight className="text-lg" />
                </motion.a>
                <motion.a
                  href="#courses"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2.5 px-7 md:px-8 py-3.5 md:py-4 rounded-2xl border border-white/15 text-white/90 font-semibold text-[14px] md:text-[15px] hover:bg-white/[0.08] transition-all duration-300 cursor-pointer"
                >
                  {content.cta2}
                </motion.a>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-6 md:gap-8">
                <div className="flex -space-x-2.5">
                  {['linear-gradient(135deg, #5a7dff, #3457D5)', 'linear-gradient(135deg, #34b87a, #1e9c6a)', 'linear-gradient(135deg, #a855f7, #7c3aed)', 'linear-gradient(135deg, #f59e0b, #d97706)', 'linear-gradient(135deg, #ec4899, #db2777)'].map((g, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-[#0a1225] flex items-center justify-center text-white text-[10px] font-bold" style={{ background: g }}>
                      {['A', 'R', 'S', 'P', 'K'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-white/35">{content.ratingText}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <ScrollIndicator />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-50 dark:from-[#0f1117] to-transparent z-20 transition-colors duration-500" />
    </section>
  )
}
