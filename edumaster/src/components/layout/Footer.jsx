import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiInstagram, FiLinkedin, FiPhone,
  FiMail, FiMapPin, FiArrowRight, FiCheck,
} from 'react-icons/fi'
import useContent from '../../hooks/useContent'
import { useTheme } from '../../context/ThemeContext'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const socialIcons = { Instagram: FiInstagram, Facebook: null, LinkedIn: FiLinkedin }

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    try {
      await fetch(`${API_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } catch {}
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full px-5 py-3.5 pr-12 rounded-xl bg-white/[0.07] border border-white/10 text-sm text-white placeholder:text-white/30 outline-none focus:border-royal-400 focus:ring-1 focus:ring-royal-400/30 transition-all duration-300"
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-royal-500 flex items-center justify-center hover:bg-royal-400 transition-colors duration-300"
      >
        {submitted ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}>
            <FiCheck className="text-white text-sm" />
          </motion.div>
        ) : (
          <FiArrowRight className="text-white text-sm" />
        )}
      </motion.button>
    </form>
  )
}

function AnimatedGradientLine() {
  return (
    <div className="relative h-[2px] mb-12 md:mb-16 overflow-hidden rounded-full">
      <div className="absolute inset-0 bg-white/5" />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent, #3457D5, #8b5cf6, #06b6d4, #3457D5, transparent)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

const footerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const colVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function Footer() {
  const footer = useContent('footer')
  const { resolved } = useTheme()
  const isDark = resolved === 'dark'

  return (
    <footer className="bg-gradient-to-b from-[#0d1225] to-[#0a0e1a] dark:from-[#080b12] dark:to-[#050709] text-white pt-20 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-royal-500/5 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-56 h-56 bg-royal-400/5 rounded-full blur-[50px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14"
        >
          <motion.div variants={colVariants} className="lg:col-span-4">
            <a href="#hero" className="flex items-center gap-3 mb-6 group">
              <img
                src={isDark ? '/logo-dark.png' : '/logo-bright.png'}
                alt="EDU MASTER Logo"
                className="h-14 w-auto group-hover:scale-105 transition-all duration-300"
                loading="lazy"
              />
            </a>

            <p className="text-white/45 text-sm leading-relaxed max-w-xs mb-7">
              {footer.tagline}
            </p>

            <div className="flex gap-2.5 mb-8">
              {footer.socials.map((social) => {
                const IconComp = social.platform === 'Facebook' ? FacebookIcon : (socialIcons[social.platform] || FiInstagram)
                return (
                  <motion.a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.12, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center hover:bg-white/10 transition-all duration-300 group"
                    style={{ '--hover-color': social.color }}
                    aria-label={social.platform}
                  >
                    <IconComp className="text-white/50 text-lg group-hover:text-white transition-colors duration-300" />
                  </motion.a>
                )
              })}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/40">
                <FiPhone className="text-royal-400 text-base" />
                <a href={`tel:${footer.phone.replace(/\s/g, '')}`} className="hover:text-white/70 transition-colors">{footer.phone}</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/40">
                <FiMail className="text-royal-400 text-base" />
                <a href={`mailto:${footer.email}`} className="hover:text-white/70 transition-colors">{footer.email}</a>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/40">
                <FiMapPin className="text-royal-400 text-base mt-0.5" />
                <span>{footer.address}</span>
              </div>
            </div>
          </motion.div>

          {Object.entries(footer.quickLinks).map(([title, links], i) => (
            <motion.div key={title} variants={colVariants} className="lg:col-span-2">
              <h4 className="font-display font-bold text-sm mb-5 text-white/80">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-royal-500/0 group-hover:bg-royal-400 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div variants={colVariants} className="lg:col-span-4">
            <h4 className="font-display font-bold text-sm mb-5 text-white/80">Stay Updated</h4>
            <p className="text-sm text-white/40 mb-5 leading-relaxed">
              Get the latest updates on admissions, scholarships, and educational opportunities.
            </p>
            <NewsletterForm />

            <div className="mt-8 p-5 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-emerald-400/80">Quick Enquiry</span>
              </div>
              <p className="text-xs text-white/35 leading-relaxed">
                Talk to our counsellor directly. Call now for instant guidance.
              </p>
              <motion.a
                href={`tel:${footer.phone.replace(/\s/g, '')}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-royal-500/15 text-royal-300 text-xs font-semibold hover:bg-royal-500/25 transition-colors duration-300"
              >
                <FiPhone className="text-sm" />
                Call Now
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <AnimatedGradientLine />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} EDU MASTER Educational Consultancy. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/25">
            <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/50 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
