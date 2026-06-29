import { useState, useRef, useEffect } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock, FiCheck, FiLoader } from 'react-icons/fi'
import useContent from '../../hooks/useContent'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const courseList = ['MBBS', 'BDS', 'BSc Nursing', 'GNM', 'Pharmacy', 'Allied Health Sciences', 'Engineering', 'MBA']

function FloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[{ x: '5%', y: '20%', color: '#3b82f6' }, { x: '92%', y: '30%', color: '#10b981' }, { x: '88%', y: '70%', color: '#8b5cf6' }, { x: '8%', y: '75%', color: '#f43f5e' }].map((item, i) => (
        <div key={i} className="absolute w-3 h-3 rounded-full opacity-10" style={{ left: item.x, top: item.y, background: item.color }} />
      ))}
    </div>
  )
}

function SubmitButton({ state }) {
  return (
    <button
      type="submit"
      disabled={state === 'loading'}
      className={`relative w-full py-4 rounded-2xl font-semibold text-[15px] overflow-hidden transition-all duration-500 ${
        state === 'success'
          ? 'bg-emerald-500 text-white'
          : state === 'loading'
          ? 'bg-royal-400 text-white cursor-wait'
          : 'bg-royal-500 text-white shadow-lg shadow-royal-500/25 hover:bg-royal-600 active:scale-[0.98]'
      }`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {state === 'loading' ? <><FiLoader className="text-lg animate-spin" /> Sending...</> :
         state === 'success' ? <><FiCheck className="text-lg" /> Message Sent!</> :
         <>Send Message <FiSend className="text-lg" /></>}
      </span>
    </button>
  )
}

export default function Contact() {
  const content = useContent('contact')
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: '', message: '' })
  const [submitState, setSubmitState] = useState('idle')
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitState('loading')
    try {
      await fetch(`${API_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch {}
    setSubmitState('success')
    setForm({ name: '', phone: '', email: '', course: '', message: '' })
    setTimeout(() => setSubmitState('idle'), 3000)
  }

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.05 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" className="py-24 md:py-32 bg-white dark:bg-[#161b26] relative overflow-hidden transition-colors duration-500">
      <FloatingIcons />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-royal-50/40 dark:bg-royal-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-royal-100/30 dark:bg-royal-400/5 rounded-full blur-[60px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className={`text-center max-w-3xl mx-auto mb-16 md:mb-20 transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <span className="inline-flex items-center gap-2 bg-royal-50 dark:bg-royal-500/10 border border-royal-100 dark:border-royal-500/20 rounded-full px-5 py-2.5 mb-6">
            <span className="w-2 h-2 bg-royal-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-royal-600 dark:text-royal-400">Get in Touch</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold leading-tight mb-6">
            Let&apos;s Build Your <span className="gradient-text">Future Together</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Have questions? Ready to start? Reach out and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          <div className={`lg:col-span-2 space-y-5 transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
          }`}>
            {[
              { icon: FiMapPin, label: 'Office Address', value: content.address, href: null, color: '#3b82f6' },
              { icon: FiPhone, label: 'Phone', value: content.phone, href: `tel:${content.phone.replace(/\s/g, '')}`, color: '#10b981' },
              { icon: FiMail, label: 'Email', value: content.email, href: `mailto:${content.email}`, color: '#8b5cf6' },
              { icon: FiClock, label: 'Working Hours', value: 'Mon — Sat: 9:00 AM — 6:00 PM', href: null, color: '#f59e0b' },
            ].map((info, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-50 dark:hover:bg-white/[0.03] transition-all duration-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: visible ? `${i * 80}ms` : '0ms' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110" style={{ background: `${info.color}12` }}>
                  <info.icon style={{ color: info.color }} className="text-lg" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-0.5">{info.label}</div>
                  {info.href ? (
                    <a href={info.href} className="text-sm font-semibold text-navy-800 dark:text-white hover:text-royal-500 transition-colors leading-snug block">{info.value}</a>
                  ) : (
                    <div className="text-sm font-semibold text-navy-800 dark:text-white leading-snug">{info.value}</div>
                  )}
                </div>
              </div>
            ))}

            <a href={`https://wa.me/${content.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl bg-[#25D366]/10 dark:bg-[#25D366]/[0.06] border border-[#25D366]/20 dark:border-[#25D366]/15 hover:bg-[#25D366]/15 transition-colors duration-300 group">
              <div className="w-11 h-11 rounded-xl bg-[#25D366]/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-400 dark:text-gray-500 font-medium">Chat on</div>
                <div className="text-sm font-semibold text-[#25D366]">WhatsApp</div>
              </div>
            </a>

          </div>

          <div className={`lg:col-span-3 transition-all duration-700 ease-out delay-150 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
          }`}>
            <form onSubmit={handleSubmit} className="premium-card rounded-[1.6rem] p-7 md:p-9">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Full Name</label>
                  <input type="text" required value={form.name} onChange={handleChange('name')} className="w-full px-4 py-3.5 rounded-xl border border-surface-200 dark:border-white/10 focus:border-royal-400 focus:ring-2 focus:ring-royal-100 outline-none transition-all duration-300 text-sm bg-white/80 dark:bg-white/[0.06] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Phone</label>
                  <input type="tel" required value={form.phone} onChange={handleChange('phone')} className="w-full px-4 py-3.5 rounded-xl border border-surface-200 dark:border-white/10 focus:border-royal-400 focus:ring-2 focus:ring-royal-100 outline-none transition-all duration-300 text-sm bg-white/80 dark:bg-white/[0.06] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Email</label>
                  <input type="email" required value={form.email} onChange={handleChange('email')} className="w-full px-4 py-3.5 rounded-xl border border-surface-200 dark:border-white/10 focus:border-royal-400 focus:ring-2 focus:ring-royal-100 outline-none transition-all duration-300 text-sm bg-white/80 dark:bg-white/[0.06] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Course</label>
                  <select required value={form.course} onChange={handleChange('course')} className="w-full px-4 py-3.5 rounded-xl border border-surface-200 dark:border-white/10 focus:border-royal-400 focus:ring-2 focus:ring-royal-100 outline-none transition-all duration-300 text-sm bg-white/80 dark:bg-white/[0.06] dark:text-white dark:[color-scheme:dark] appearance-none">
                    <option value="">Select course</option>
                    {courseList.map((c) => <option key={c} value={c} className="dark:bg-slate-800 dark:text-white">{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Message</label>
                <textarea rows={4} value={form.message} onChange={handleChange('message')} className="w-full px-4 py-3.5 rounded-xl border border-surface-200 dark:border-white/10 focus:border-royal-400 focus:ring-2 focus:ring-royal-100 outline-none transition-all duration-300 text-sm resize-none bg-white/80 dark:bg-white/[0.06] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500" placeholder="Tell us about your academic goals..." />
              </div>
              <SubmitButton state={submitState} />
              <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">We typically respond within <span className="font-semibold text-gray-500 dark:text-gray-400">24 hours</span></p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
