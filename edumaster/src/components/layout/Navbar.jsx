import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from '../ui/ThemeToggle'
import { useTheme } from '../../context/ThemeContext'
import useContent from '../../hooks/useContent'

function NavLink({ label, href, scrolled, isDark, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-4 py-2 text-sm font-medium transition-colors duration-300"
      style={{ color: isDark ? '#cbd5e1' : '#1e2844' }}
    >
      <span className="relative z-10">{label}</span>
      <AnimatePresence>
        {hovered && (
          <motion.span
            layoutId="nav-underline"
            className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-royal-500"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </AnimatePresence>
    </a>
  )
}

function HamburgerIcon({ isOpen }) {
  return (
    <div className="w-6 h-5 relative flex flex-col justify-between">
      <motion.span
        className="block h-0.5 w-full rounded-full origin-left"
        style={{ background: 'currentColor' }}
        animate={isOpen ? { rotate: 45, y: -1, width: '110%' } : { rotate: 0, y: 0, width: '100%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="block h-0.5 w-full rounded-full"
        style={{ background: 'currentColor' }}
        animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.span
        className="block h-0.5 w-full rounded-full origin-left"
        style={{ background: 'currentColor' }}
        animate={isOpen ? { rotate: -45, y: 1, width: '110%' } : { rotate: 0, y: 0, width: '100%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

export default function Navbar() {
  const navbar = useContent('navbar')
  const navLinks = navbar.links
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#hero')
  const { resolved } = useTheme()
  const isDark = resolved === 'dark'

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    navLinks.forEach((link) => {
      const el = document.querySelector(link.href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [navLinks])

  const closeMobile = () => setMobileOpen(false)

  const navBg = isDark ? 'rgba(15,17,23,0.95)' : 'rgba(255,255,255,0.95)'
  const navBorder = isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.04)'
  const navShadow = isDark
    ? '0 1px 3px rgba(0,0,0,0.2), 0 8px 32px rgba(0,0,0,0.15)'
    : '0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.04)'

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-royal-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>

      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          transform: 'translateY(0)',
          opacity: 1,
          transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        role="banner"
      >
        <nav
          aria-label="Main navigation"
          className="will-change-[background-color,box-shadow]"
          style={{
            backgroundColor: navBg,
            borderBottom: navBorder,
            boxShadow: navShadow,
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            transition: 'background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="max-w-7xl mx-auto section-padding flex items-center justify-between h-[60px] sm:h-[72px]">
            <a href="#hero" className="flex items-center gap-2 sm:gap-2.5 group relative z-10">
              <img
                src={isDark ? '/logo-dark.png' : '/logo-bright.png'}
                alt="EDU MASTER Logo"
                className="h-9 sm:h-12 w-auto transition-all duration-300 group-hover:scale-105"
              />
              <span
                className="font-display font-bold text-sm sm:text-lg tracking-wide transition-colors duration-300"
                style={{ color: isDark ? '#e2e8f0' : '#1e2844' }}
              >
                EDUMASTER
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  scrolled={scrolled}
                  isDark={isDark}
                />
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-2 relative z-10">
              <ThemeToggle />
              <a
                href="#contact"
                className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  background: '#3457D5',
                  color: '#ffffff',
                  boxShadow: '0 4px 15px rgba(52,87,213,0.3)',
                  transition: 'transform 0.2s',
                }}
              >
                Apply Now
              </a>
            </div>

            <div className="flex lg:hidden items-center gap-2 relative z-10">
              <a
                href={`tel:${navbar.phone.replace(/\s/g, '')}`}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500"
                aria-label="Call us"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <a
                href="#contact"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300"
                style={{
                  background: '#3457D5',
                  color: '#ffffff',
                  boxShadow: '0 2px 8px rgba(52,87,213,0.3)',
                }}
              >
                Apply Now
              </a>
            </div>

            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl relative z-10"
              style={{
                color: isDark ? '#e2e8f0' : '#1e2844',
                transition: 'color 0.3s',
              }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <HamburgerIcon isOpen={mobileOpen} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[55] bg-navy-900/60 lg:hidden"
              onClick={closeMobile}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[60] w-[min(85vw,360px)] bg-white dark:bg-[#161b26] shadow-2xl shadow-navy-900/20 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-[60px] sm:h-[72px] border-b border-surface-200 dark:border-white/10">
                <img
                  src={isDark ? '/logo-dark.png' : '/logo-bright.png'}
                  alt="EDU MASTER Logo"
                  className="h-11 sm:h-14 w-auto"
                />
                <ThemeToggle />
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4">
                <div className="flex flex-col gap-0.5">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      onClick={closeMobile}
                      className="relative px-4 py-3.5 rounded-2xl font-medium text-[15px] transition-colors duration-200 flex items-center gap-3 group"
                      style={{
                        color: activeSection === link.href ? '#3457D5' : (isDark ? '#cbd5e1' : '#374151'),
                        background: activeSection === link.href ? 'rgba(52,87,213,0.06)' : 'transparent',
                      }}
                    >
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 rounded-full bg-royal-500 transition-all duration-300 group-hover:h-5"
                        style={{ height: activeSection === link.href ? '20px' : '0px' }}
                      />
                      {link.label}
                    </motion.a>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="px-4 pb-6 pt-4 border-t border-surface-100 dark:border-white/10 space-y-3"
              >
                <a
                  href="#contact"
                  onClick={closeMobile}
                  className="block w-full py-3.5 rounded-2xl bg-royal-500 text-white text-center font-semibold text-sm shadow-lg shadow-royal-500/25 hover:bg-royal-600 active:scale-[0.97] transition-all duration-200"
                >
                  Apply Now
                </a>
                <div className="flex gap-2">
                  <a
                    href={`tel:${navbar.phone.replace(/\s/g, '')}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/10 text-emerald-500 text-sm font-semibold"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call
                  </a>
                  <a
                    href={`https://wa.me/91${navbar.phone.replace(/\s/g, '').replace('+91', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366]/10 text-[#25D366] text-sm font-semibold"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
                <p className="text-center text-xs text-gray-400">
                  Or call us at <a href={`tel:${navbar.phone.replace(/\s/g, '')}`} className="text-royal-500 font-medium">{navbar.phone}</a>
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
