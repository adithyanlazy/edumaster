import { useEffect, useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'
import LoadingScreen from './components/ui/LoadingScreen'

const Hero = lazy(() => import('./components/sections/Hero'))
const About = lazy(() => import('./components/sections/About'))
const Courses = lazy(() => import('./components/sections/Courses'))
const Services = lazy(() => import('./components/sections/Services'))
const Universities = lazy(() => import('./components/sections/Universities'))
const Timeline = lazy(() => import('./components/sections/Timeline'))
const Stats = lazy(() => import('./components/sections/Stats'))
const WhyChooseUs = lazy(() => import('./components/sections/WhyChooseUs'))
const Testimonials = lazy(() => import('./components/sections/Testimonials'))
const FAQ = lazy(() => import('./components/sections/FAQ'))
const CTA = lazy(() => import('./components/sections/CTA'))
const Contact = lazy(() => import('./components/sections/Contact'))

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-surface-200 dark:border-surface-700 border-t-royal-500 rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-surface-50 dark:bg-[#0f1117] transition-colors duration-500">
        <AnimatePresence>
          {loading && <LoadingScreen key="loader" />}
        </AnimatePresence>
        <Navbar />
        <main id="main-content" className="relative">
          <AnimatePresence>
            {!loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Suspense fallback={<SectionLoader />}>
                  <Hero />
                  <About />
                  <Courses />
                  <Services />
                  <Universities />
                  <Timeline />
                  <Stats />
                  <WhyChooseUs />
                  <Testimonials />
                  <FAQ />
                  <CTA />
                  <Contact />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  )
}
