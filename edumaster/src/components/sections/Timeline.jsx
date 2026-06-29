import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  FiMessageCircle, FiBookOpen, FiHome,
  FiFileText, FiCheckCircle, FiArrowRightCircle,
} from 'react-icons/fi'
import useContent from '../../hooks/useContent'

const iconMap = { FiMessageCircle, FiBookOpen, FiHome, FiFileText, FiCheckCircle, FiArrowRightCircle }

function AnimatedLine({ progress }) {
  return (
    <div className="absolute left-6 md:left-1/2 md:-translate-x-[1px] top-0 bottom-0 w-[2px]">
      <div className="w-full h-full bg-surface-200 rounded-full" />
      <motion.div
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-royal-400 to-royal-600 rounded-full origin-top"
        style={{ scaleY: progress }}
      />
    </div>
  )
}

function StepCard({ step, index, isLeft }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = iconMap[step.icon] || FiMessageCircle

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
      <div className={`hidden md:block md:w-1/2 ${isLeft ? 'md:pl-12' : 'md:pr-12 md:text-right'}`} />

      <motion.div
        className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full blur-lg"
            style={{ background: step.glow, opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <div className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
            style={{ boxShadow: `0 6px 20px -3px ${step.glow}` }}
          >
            <Icon className="text-white text-lg" />
          </div>
        </div>
      </motion.div>

      <div className={`flex-1 pl-16 md:pl-0 ${isLeft ? 'md:w-1/2 md:pr-12 md:pl-0 md:text-right' : 'md:w-1/2 md:pl-12'}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="group relative"
        >
          <div className="relative premium-card rounded-2xl p-6 group-hover:shadow-soft-lg transition-all duration-500">
            <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
              <span className="text-xs font-bold text-royal-400 tracking-widest">STEP {step.number}</span>
            </div>

            <h3 className="text-lg font-display font-bold text-navy-800 dark:text-white mb-2 group-hover:text-royal-600 transition-colors duration-300">
              {step.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function StepCardMobile({ step, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = iconMap[step.icon] || FiMessageCircle

  return (
    <motion.div
      ref={ref}
      className="relative flex items-start gap-5"
    >
      <motion.div
        className="relative z-10 flex-shrink-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15, type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
          style={{ boxShadow: `0 6px 16px -3px ${step.glow}` }}
        >
          <Icon className="text-white text-base" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 pb-8"
      >
        <span className="text-[10px] font-bold text-royal-400 tracking-widest">STEP {step.number}</span>
        <h3 className="text-base font-display font-bold text-navy-800 dark:text-white mt-1 mb-1.5">{step.title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
      </motion.div>
    </motion.div>
  )
}

const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Timeline() {
  const steps = useContent('timeline')
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.8], [0, 1])
  const decorY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section id="timeline" ref={sectionRef} className="py-24 md:py-32 bg-white dark:bg-[#161b26] relative overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-50/50 rounded-full blur-[130px]"
        style={{ y: decorY }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-royal-100/30 rounded-full blur-[100px]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
      />

      <div className="relative z-10 max-w-5xl mx-auto section-padding">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-royal-50 border border-royal-100 rounded-full px-5 py-2.5 mb-6"
          >
            <span className="w-2 h-2 bg-royal-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-royal-600">How It Works</span>
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold leading-tight mb-6"
          >
            Your Path to{' '}
            <span className="gradient-text">Success</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed"
          >
            A simple, transparent 6-step process that takes you from career exploration to college campus.
          </motion.p>
        </motion.div>

        <div ref={lineRef} className="relative hidden md:block">
          <AnimatedLine progress={lineProgress} />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <StepCard key={i} step={step} index={i} isLeft={i % 2 === 0} />
            ))}
          </div>
        </div>

        <div className="md:hidden relative">
          <div className="absolute left-[21px] top-0 bottom-0 w-[2px] bg-surface-200 rounded-full" />
          <motion.div
            className="absolute left-[21px] top-0 w-[2px] bg-gradient-to-b from-royal-400 to-royal-600 rounded-full origin-top"
            style={{ scaleY: lineProgress }}
          />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <StepCardMobile key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
