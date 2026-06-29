import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const API_URL = '/api'

const defaultContent = {
  hero: {
    badge: 'Trusted by 2000+ Students',
    title1: 'Your Dream',
    title2: 'Career',
    title3: 'Starts Here.',
    subtitle: 'Helping students get admission into top colleges across Kerala, Karnataka, and Tamil Nadu with expert guidance and personalised counselling.',
    cta1: 'Apply Now',
    cta2: 'Explore Courses',
    ratingText: 'Rated 4.9/5 by students',
  },
  about: {
    badge: 'About Us',
    title: 'Who We Are',
    description: 'EDU MASTER EDUCATIONAL CONSULTANCY helps students secure admissions in top colleges across South India.',
    stats: [
      { number: 500, suffix: '+', label: 'Students Guided' },
      { number: 50, suffix: '+', label: 'Partner Colleges' },
      { number: 3, suffix: '', label: 'States' },
      { number: 100, suffix: '%', label: 'Support' },
    ],
  },
  services: [
    { title: 'Admission Guidance', description: 'Expert guidance through the entire admission process.' },
    { title: 'Career Counselling', description: 'Personalized career assessments and path planning.' },
    { title: 'Documentation Support', description: 'Complete assistance with SOPs, LORs, and transcripts.' },
    { title: 'College Selection', description: 'Data-driven shortlisting of colleges that match your profile.' },
    { title: 'Scholarship Assistance', description: 'Identifying and applying for merit-based scholarships.' },
    { title: 'Education Loan Guidance', description: 'Navigate education loan options for the best rates.' },
    { title: 'Visa Assistance', description: 'End-to-end visa application support.' },
  ],
  testimonials: [
    { name: 'Priya Sharma', college: 'CMC Vellore', course: 'MBBS', review: 'EDU MASTER made my dream of becoming a doctor a reality.', rating: 5 },
    { name: 'Arjun Menon', college: 'MAHE Manipal', course: 'Engineering', review: 'The team understood my passion and shortlisted the perfect colleges.', rating: 5 },
    { name: 'Sneha Reddy', college: 'AVV Coimbatore', course: 'BSc Nursing', review: 'As a first-generation student, they held my hand through every step.', rating: 5 },
  ],
  contact: {
    phone: '+91 98765 43210',
    email: 'hello@edumaster.com',
    address: '123 Education Hub, MG Road, Kochi, Kerala 682016',
    whatsapp: '919876543210',
  },
  courses: [
    { title: 'MBBS', description: 'Bachelor of Medicine and Bachelor of Surgery.', gradient: 'from-rose-500 to-red-600', bg: 'from-red-50 to-rose-50', duration: '5.5 Years', degree: 'Undergraduate', icon: 'FiActivity' },
  ],
  universities: [
    { name: 'Christian Medical College', location: 'Vellore, Tamil Nadu', courses: ['MBBS', 'BSc Nursing', 'Pharmacy'], color: '#dc2626', abbr: 'CMC' },
  ],
  stats: [
    { number: 2000, suffix: '+', label: 'Students Placed', description: 'Across top universities worldwide' },
  ],
  whyChooseUs: [
    { icon: 'FiShield', title: 'Trusted Consultancy', description: 'Over 15 years of proven track record.', gradient: 'from-blue-500 to-indigo-600' },
  ],
  timeline: [
    { number: '01', title: 'Career Counselling', description: 'One-on-one counselling session.', icon: 'FiMessageCircle', gradient: 'from-blue-500 to-indigo-600', glow: 'rgba(99,102,241,0.3)' },
  ],
  faq: [
    { question: 'How can I apply?', answer: 'Fill out our contact form or call us.' },
  ],
  cta: {
    headline: 'Your Dream University is One Step Away',
    subheadline: 'Join 2000+ students who turned their academic dreams into reality.',
    primaryButton: 'Get Started Free',
    secondaryButton: 'Schedule a Call',
    badges: ['No credit card required', 'Free consultation'],
  },
  navbar: {
    brandName: 'EDU MASTER',
    subtitle: 'Educational Consultancy',
    phone: '+91 98765 43210',
    links: [
      { label: 'Home', href: '#hero' },
    ],
  },
  footer: {
    phone: '+91 98765 43210',
    email: 'hello@edumaster.com',
    address: '123 Education Hub, MG Road, Kochi, Kerala',
    tagline: 'Empowering students since 2008.',
    quickLinks: { Courses: [], Services: [] },
    socials: [
      { platform: 'Instagram', href: '#', color: '#E4405F' },
      { platform: 'Facebook', href: '#', color: '#1877F2' },
      { platform: 'LinkedIn', href: '#', color: '#0A66C2' },
    ],
  },
}

function Field({ label, value, onChange, type = 'text', multiline = false, placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-500 resize-none" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-500" />
      )}
    </div>
  )
}

function HeroEditor({ content, update }) {
  const s = content.hero
  return (
    <div className="space-y-4">
      <Field label="Badge Text" value={s.badge} onChange={(v) => update('hero.badge', v)} />
      <div className="grid grid-cols-3 gap-3">
        <Field label="Title Line 1" value={s.title1} onChange={(v) => update('hero.title1', v)} />
        <Field label="Title Line 2" value={s.title2} onChange={(v) => update('hero.title2', v)} />
        <Field label="Title Line 3" value={s.title3} onChange={(v) => update('hero.title3', v)} />
      </div>
      <Field label="Subtitle" value={s.subtitle} onChange={(v) => update('hero.subtitle', v)} multiline />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Primary CTA" value={s.cta1} onChange={(v) => update('hero.cta1', v)} />
        <Field label="Secondary CTA" value={s.cta2} onChange={(v) => update('hero.cta2', v)} />
      </div>
      <Field label="Rating Text" value={s.ratingText} onChange={(v) => update('hero.ratingText', v)} />
    </div>
  )
}

function AboutEditor({ content, update }) {
  const s = content.about
  return (
    <div className="space-y-4">
      <Field label="Badge" value={s.badge} onChange={(v) => update('about.badge', v)} />
      <Field label="Title" value={s.title} onChange={(v) => update('about.title', v)} />
      <Field label="Description" value={s.description} onChange={(v) => update('about.description', v)} multiline />
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">Statistics</h4>
        {s.stats.map((stat, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mb-2">
            <Field label="Number" value={String(stat.number)} onChange={(v) => update(`about.stats.${i}.number`, Number(v) || 0)} />
            <Field label="Suffix" value={stat.suffix} onChange={(v) => update(`about.stats.${i}.suffix`, v)} />
            <Field label="Label" value={stat.label} onChange={(v) => update(`about.stats.${i}.label`, v)} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ServicesEditor({ content, update }) {
  const items = content.services
  const add = () => update('services', [...items, { title: 'New Service', description: 'Description here' }])
  const remove = (i) => update('services', items.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-3">
      {items.map((s, i) => (
        <div key={i} className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Service {i + 1}</span>
            <button onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-300 transition-colors">Remove</button>
          </div>
          <Field label="Title" value={s.title} onChange={(v) => update(`services.${i}.title`, v)} />
          <Field label="Description" value={s.description} onChange={(v) => update(`services.${i}.description`, v)} multiline />
        </div>
      ))}
      <button onClick={add} className="w-full py-3 rounded-xl border-2 border-dashed border-slate-700 text-slate-500 text-sm font-medium hover:border-blue-500 hover:text-blue-400 transition-colors">+ Add Service</button>
    </div>
  )
}

function TestimonialsEditor({ content, update }) {
  const items = content.testimonials
  const add = () => update('testimonials', [...items, { name: 'New Student', college: 'College', course: 'Course', review: 'Review here', rating: 5 }])
  const remove = (i) => update('testimonials', items.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-3">
      {items.map((t, i) => (
        <div key={i} className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Testimonial {i + 1}</span>
            <button onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-300 transition-colors">Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Name" value={t.name} onChange={(v) => update(`testimonials.${i}.name`, v)} />
            <Field label="Course" value={t.course} onChange={(v) => update(`testimonials.${i}.course`, v)} />
          </div>
          <Field label="College" value={t.college} onChange={(v) => update(`testimonials.${i}.college`, v)} />
          <Field label="Review" value={t.review} onChange={(v) => update(`testimonials.${i}.review`, v)} multiline />
          <Field label="Rating (1-5)" value={String(t.rating)} onChange={(v) => update(`testimonials.${i}.rating`, Math.min(5, Math.max(1, Number(v) || 5)))} type="number" />
        </div>
      ))}
      <button onClick={add} className="w-full py-3 rounded-xl border-2 border-dashed border-slate-700 text-slate-500 text-sm font-medium hover:border-blue-500 hover:text-blue-400 transition-colors">+ Add Testimonial</button>
    </div>
  )
}

function ContactEditor({ content, update }) {
  const s = content.contact
  return (
    <div className="space-y-4">
      <Field label="Phone" value={s.phone} onChange={(v) => update('contact.phone', v)} />
      <Field label="Email" value={s.email} onChange={(v) => update('contact.email', v)} />
      <Field label="Address" value={s.address} onChange={(v) => update('contact.address', v)} multiline />
      <Field label="WhatsApp Number" value={s.whatsapp} onChange={(v) => update('contact.whatsapp', v)} placeholder="919876543210" />
    </div>
  )
}

function CoursesEditor({ content, update }) {
  const items = content.courses
  const add = () => update('courses', [...items, { title: 'New Course', description: 'Description', gradient: 'from-blue-500 to-blue-600', bg: 'from-blue-50 to-blue-50', duration: '4 Years', degree: 'Undergraduate', icon: 'FiActivity' }])
  const remove = (i) => update('courses', items.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-3">
      {items.map((c, i) => (
        <div key={i} className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Course {i + 1}</span>
            <button onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-300 transition-colors">Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Title" value={c.title} onChange={(v) => update(`courses.${i}.title`, v)} />
            <Field label="Duration" value={c.duration} onChange={(v) => update(`courses.${i}.duration`, v)} />
          </div>
          <Field label="Description" value={c.description} onChange={(v) => update(`courses.${i}.description`, v)} multiline />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Degree" value={c.degree} onChange={(v) => update(`courses.${i}.degree`, v)} />
            <Field label="Gradient" value={c.gradient} onChange={(v) => update(`courses.${i}.gradient`, v)} />
          </div>
        </div>
      ))}
      <button onClick={add} className="w-full py-3 rounded-xl border-2 border-dashed border-slate-700 text-slate-500 text-sm font-medium hover:border-blue-500 hover:text-blue-400 transition-colors">+ Add Course</button>
    </div>
  )
}

function ImageField({ value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    const form = new FormData()
    form.append('file', file)
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'x-admin-token': sessionStorage.getItem('em-token') || '' },
        body: form,
      })
      const data = await res.json()
      if (data.url) {
        onChange(data.url)
      } else {
        setError(data.error || 'Upload failed')
      }
    } catch (err) {
      setError('Server unreachable — is the backend running?')
    }
    setUploading(false)
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Cover Image</label>
      {value && (
        <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-700">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button onClick={() => onChange('')} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-400">✕</button>
        </div>
      )}
      <div className="flex gap-2">
        <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/50 border border-dashed border-slate-600 text-xs text-slate-400 hover:border-blue-500 hover:text-blue-400 cursor-pointer transition-colors">
          {uploading ? 'Uploading...' : '📁 Upload File'}
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
        </label>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste image URL..."
        className="w-full px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white text-xs outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
      />
    </div>
  )
}

function UniversitiesEditor({ content, update }) {
  const items = content.universities
  const add = () => update('universities', [...items, { name: 'New University', location: 'City, State', courses: ['MBBS'], color: '#3b82f6', abbr: 'NU', image: '' }])
  const remove = (i) => update('universities', items.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-3">
      {items.map((u, i) => (
        <div key={i} className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30 space-y-3">
          <div className="flex items-center gap-3">
            {u.image ? (
              <img src={u.image} alt={u.name} className="w-14 h-14 rounded-lg object-cover border border-slate-600" />
            ) : (
              <div className="w-14 h-14 rounded-lg bg-slate-700/50 border border-dashed border-slate-600 flex items-center justify-center">
                <span className="text-lg font-bold" style={{ color: u.color }}>{u.abbr}</span>
              </div>
            )}
            <div className="flex-1">
              <span className="text-xs font-bold text-slate-500">University {i + 1}</span>
              {u.name && <p className="text-sm text-white mt-0.5">{u.name}</p>}
            </div>
            <button onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-300 transition-colors">Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Name" value={u.name} onChange={(v) => update(`universities.${i}.name`, v)} />
            <Field label="Abbreviation" value={u.abbr} onChange={(v) => update(`universities.${i}.abbr`, v)} />
          </div>
          <Field label="Location" value={u.location} onChange={(v) => update(`universities.${i}.location`, v)} />
          <Field label="Color (hex)" value={u.color} onChange={(v) => update(`universities.${i}.color`, v)} />
          <Field label="Courses (comma-separated)" value={u.courses.join(', ')} onChange={(v) => update(`universities.${i}.courses`, v.split(',').map(s => s.trim()))} />
          <ImageField value={u.image || ''} onChange={(v) => update(`universities.${i}.image`, v)} />
        </div>
      ))}
      <button onClick={add} className="w-full py-3 rounded-xl border-2 border-dashed border-slate-700 text-slate-500 text-sm font-medium hover:border-blue-500 hover:text-blue-400 transition-colors">+ Add University</button>
    </div>
  )
}

function StatsEditor({ content, update }) {
  const items = content.stats
  const add = () => update('stats', [...items, { number: 0, suffix: '', label: 'New Stat', description: 'Description' }])
  const remove = (i) => update('stats', items.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-3">
      {items.map((s, i) => (
        <div key={i} className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Stat {i + 1}</span>
            <button onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-300 transition-colors">Remove</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Field label="Number" value={String(s.number)} onChange={(v) => update(`stats.${i}.number`, Number(v) || 0)} type="number" />
            <Field label="Suffix" value={s.suffix} onChange={(v) => update(`stats.${i}.suffix`, v)} />
            <Field label="Label" value={s.label} onChange={(v) => update(`stats.${i}.label`, v)} />
          </div>
          <Field label="Description" value={s.description} onChange={(v) => update(`stats.${i}.description`, v)} />
        </div>
      ))}
      <button onClick={add} className="w-full py-3 rounded-xl border-2 border-dashed border-slate-700 text-slate-500 text-sm font-medium hover:border-blue-500 hover:text-blue-400 transition-colors">+ Add Stat</button>
    </div>
  )
}

function WhyChooseUsEditor({ content, update }) {
  const items = content.whyChooseUs
  const add = () => update('whyChooseUs', [...items, { icon: 'FiStar', title: 'New Feature', description: 'Description', gradient: 'from-blue-500 to-indigo-600' }])
  const remove = (i) => update('whyChooseUs', items.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <div key={i} className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Feature {i + 1}</span>
            <button onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-300 transition-colors">Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Title" value={f.title} onChange={(v) => update(`whyChooseUs.${i}.title`, v)} />
            <Field label="Icon" value={f.icon} onChange={(v) => update(`whyChooseUs.${i}.icon`, v)} />
          </div>
          <Field label="Description" value={f.description} onChange={(v) => update(`whyChooseUs.${i}.description`, v)} multiline />
          <Field label="Gradient" value={f.gradient} onChange={(v) => update(`whyChooseUs.${i}.gradient`, v)} />
        </div>
      ))}
      <button onClick={add} className="w-full py-3 rounded-xl border-2 border-dashed border-slate-700 text-slate-500 text-sm font-medium hover:border-blue-500 hover:text-blue-400 transition-colors">+ Add Feature</button>
    </div>
  )
}

function TimelineEditor({ content, update }) {
  const items = content.timeline
  const add = () => update('timeline', [...items, { number: String(items.length + 1).padStart(2, '0'), title: 'New Step', description: 'Description', icon: 'FiCheckCircle', gradient: 'from-blue-500 to-indigo-600', glow: 'rgba(99,102,241,0.3)' }])
  const remove = (i) => update('timeline', items.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-3">
      {items.map((s, i) => (
        <div key={i} className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Step {s.number}</span>
            <button onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-300 transition-colors">Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Title" value={s.title} onChange={(v) => update(`timeline.${i}.title`, v)} />
            <Field label="Number" value={s.number} onChange={(v) => update(`timeline.${i}.number`, v)} />
          </div>
          <Field label="Description" value={s.description} onChange={(v) => update(`timeline.${i}.description`, v)} multiline />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Gradient" value={s.gradient} onChange={(v) => update(`timeline.${i}.gradient`, v)} />
            <Field label="Glow" value={s.glow} onChange={(v) => update(`timeline.${i}.glow`, v)} />
          </div>
        </div>
      ))}
      <button onClick={add} className="w-full py-3 rounded-xl border-2 border-dashed border-slate-700 text-slate-500 text-sm font-medium hover:border-blue-500 hover:text-blue-400 transition-colors">+ Add Step</button>
    </div>
  )
}

function FAQEditor({ content, update }) {
  const items = content.faq
  const add = () => update('faq', [...items, { question: 'New question?', answer: 'Answer here.' }])
  const remove = (i) => update('faq', items.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <div key={i} className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">FAQ {i + 1}</span>
            <button onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-300 transition-colors">Remove</button>
          </div>
          <Field label="Question" value={f.question} onChange={(v) => update(`faq.${i}.question`, v)} />
          <Field label="Answer" value={f.answer} onChange={(v) => update(`faq.${i}.answer`, v)} multiline />
        </div>
      ))}
      <button onClick={add} className="w-full py-3 rounded-xl border-2 border-dashed border-slate-700 text-slate-500 text-sm font-medium hover:border-blue-500 hover:text-blue-400 transition-colors">+ Add FAQ</button>
    </div>
  )
}

function CTAEditor({ content, update }) {
  const s = content.cta
  return (
    <div className="space-y-4">
      <Field label="Headline" value={s.headline} onChange={(v) => update('cta.headline', v)} />
      <Field label="Subheadline" value={s.subheadline} onChange={(v) => update('cta.subheadline', v)} multiline />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Primary Button" value={s.primaryButton} onChange={(v) => update('cta.primaryButton', v)} />
        <Field label="Secondary Button" value={s.secondaryButton} onChange={(v) => update('cta.secondaryButton', v)} />
      </div>
      <Field label="Badges (comma-separated)" value={(s.badges || []).join(', ')} onChange={(v) => update('cta.badges', v.split(',').map(s => s.trim()))} />
    </div>
  )
}

function NavbarEditor({ content, update }) {
  const s = content.navbar
  const addLink = () => update('navbar.links', [...s.links, { label: 'New Link', href: '#section' }])
  const removeLink = (i) => update('navbar.links', s.links.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Brand Name" value={s.brandName} onChange={(v) => update('navbar.brandName', v)} />
        <Field label="Subtitle" value={s.subtitle} onChange={(v) => update('navbar.subtitle', v)} />
      </div>
      <Field label="Phone" value={s.phone} onChange={(v) => update('navbar.phone', v)} />
      <div>
        <h4 className="text-sm font-semibold text-slate-300 mb-3">Navigation Links</h4>
        {s.links.map((link, i) => (
          <div key={i} className="grid grid-cols-5 gap-2 mb-2 items-end">
            <div className="col-span-2"><Field label="Label" value={link.label} onChange={(v) => update(`navbar.links.${i}.label`, v)} /></div>
            <div className="col-span-2"><Field label="Href" value={link.href} onChange={(v) => update(`navbar.links.${i}.href`, v)} /></div>
            <button onClick={() => removeLink(i)} className="text-xs text-red-400 hover:text-red-300 pb-3">Remove</button>
          </div>
        ))}
        <button onClick={addLink} className="w-full py-2 rounded-xl border-2 border-dashed border-slate-700 text-slate-500 text-xs font-medium hover:border-blue-500 hover:text-blue-400 transition-colors mt-2">+ Add Link</button>
      </div>
    </div>
  )
}

function FooterEditor({ content, update }) {
  const s = content.footer
  const socials = s.socials || []
  const addSocial = () => update('footer.socials', [...socials, { platform: 'Instagram', href: '#', color: '#E4405F' }])
  const removeSocial = (i) => update('footer.socials', socials.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Phone" value={s.phone} onChange={(v) => update('footer.phone', v)} />
        <Field label="Email" value={s.email} onChange={(v) => update('footer.email', v)} />
      </div>
      <Field label="Address" value={s.address} onChange={(v) => update('footer.address', v)} />
      <Field label="Tagline" value={s.tagline} onChange={(v) => update('footer.tagline', v)} multiline />
      <div>
        <h4 className="text-sm font-semibold text-slate-300 mb-3">Social Links</h4>
        {socials.map((social, i) => (
          <div key={i} className="grid grid-cols-5 gap-2 mb-2 items-end">
            <div className="col-span-2">
              <Field label="Platform" value={social.platform} onChange={(v) => update(`footer.socials.${i}.platform`, v)} />
            </div>
            <div className="col-span-2">
              <Field label="URL" value={social.href} onChange={(v) => update(`footer.socials.${i}.href`, v)} placeholder="https://instagram.com/..." />
            </div>
            <button onClick={() => removeSocial(i)} className="text-xs text-red-400 hover:text-red-300 pb-3">Remove</button>
          </div>
        ))}
        <button onClick={addSocial} className="w-full py-2 rounded-xl border-2 border-dashed border-slate-700 text-slate-500 text-xs font-medium hover:border-blue-500 hover:text-blue-400 transition-colors mt-2">+ Add Social Link</button>
      </div>
    </div>
  )
}

function InquiriesEditor() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/inquiries`)
      .then((res) => res.json())
      .then(setInquiries)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const remove = async (id) => {
    if (!confirm('Delete this inquiry?')) return
    try {
      await fetch(`${API_URL}/inquiries/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': sessionStorage.getItem('em-token') || '' },
      })
      setInquiries((prev) => prev.filter((inq) => inq._id !== id))
    } catch {}
  }

  if (loading) {
    return <div className="text-center py-8 text-slate-400 text-sm">Loading inquiries...</div>
  }

  if (inquiries.length === 0) {
    return <div className="text-center py-12 text-slate-500 text-sm">No inquiries yet. They will appear here when clients submit the contact form.</div>
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-slate-500">{inquiries.length} total inquiry{inquiries.length !== 1 ? 'ies' : ''}</span>
      </div>
      {inquiries.map((inq) => (
        <div key={inq._id} className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{inq.name}</p>
              <p className="text-xs text-slate-400">{inq.course}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-600">{new Date(inq.createdAt).toLocaleDateString()}</span>
              <button onClick={() => remove(inq._id)} className="text-xs text-red-400 hover:text-red-300 transition-colors">Delete</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div><span className="text-slate-500">Phone: </span><span className="text-slate-300">{inq.phone}</span></div>
            <div><span className="text-slate-500">Email: </span><span className="text-slate-300">{inq.email}</span></div>
          </div>
          {inq.message && (
            <p className="text-xs text-slate-400 bg-slate-900/40 rounded-lg p-3 leading-relaxed">{inq.message}</p>
          )}
        </div>
      ))}
    </div>
  )
}

const sections = [
  { id: 'hero', label: 'Hero Section', icon: '🏠' },
  { id: 'about', label: 'About Section', icon: 'ℹ️' },
  { id: 'services', label: 'Services', icon: '📚' },
  { id: 'testimonials', label: 'Testimonials', icon: '💬' },
  { id: 'contact', label: 'Contact Info', icon: '📞' },
  { id: 'courses', label: 'Courses', icon: '🎓' },
  { id: 'universities', label: 'Universities', icon: '🏛️' },
  { id: 'inquiries', label: 'Client Enquiries', icon: '📬' },
  { id: 'stats', label: 'Stats', icon: '📊' },
  { id: 'whyChooseUs', label: 'Why Choose Us', icon: '⭐' },
  { id: 'timeline', label: 'Timeline', icon: '📋' },
  { id: 'faq', label: 'FAQ', icon: '❓' },
  { id: 'cta', label: 'CTA Banner', icon: '📢' },
  { id: 'navbar', label: 'Navbar', icon: '🧭' },
  { id: 'footer', label: 'Footer', icon: '📎' },
]

const editors = {
  hero: HeroEditor, about: AboutEditor, services: ServicesEditor,
  testimonials: TestimonialsEditor, contact: ContactEditor,
  courses: CoursesEditor, universities: UniversitiesEditor, stats: StatsEditor,
  whyChooseUs: WhyChooseUsEditor, timeline: TimelineEditor, faq: FAQEditor,
  cta: CTAEditor, navbar: NavbarEditor, footer: FooterEditor,
  inquiries: InquiriesEditor,
}

function LoginGate({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setChecking(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        sessionStorage.setItem('em-auth', '1')
        sessionStorage.setItem('em-token', password)
        onLogin()
      } else {
        setError('Wrong password')
      }
    } catch {
      setError('Server unreachable')
    }
    setChecking(false)
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 p-8 bg-[#1e293b] rounded-2xl border border-slate-700/50">
        <div className="text-center">
          <img src="/logo-dark.png" alt="EDU MASTER" className="h-14 w-auto mx-auto mb-3" />
          <h2 className="text-lg font-bold text-white">Admin Panel</h2>
          <p className="text-xs text-slate-400 mt-1">Enter password to continue</p>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-500"
        />
        {error && <p className="text-xs text-red-400 text-center">{error}</p>}
        <button
          type="submit"
          disabled={checking}
          className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors disabled:opacity-50"
        >
          {checking ? 'Checking...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default function AdminApp() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem('em-auth') === '1')
  const [content, setContent] = useState(defaultContent)
  const [activeSection, setActiveSection] = useState('hero')
  const [saved, setSaved] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/content`)
      .then((res) => res.json())
      .then((data) => {
        const merged = { ...defaultContent }
        for (const key of Object.keys(data)) {
          if (defaultContent[key]) {
            merged[key] = typeof defaultContent[key] === 'object' && !Array.isArray(defaultContent[key])
              ? { ...defaultContent[key], ...data[key] }
              : data[key]
          }
        }
        setContent(merged)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const update = useCallback((path, value) => {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev))
      const keys = path.split('.')
      let obj = next
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]]
      }
      obj[keys[keys.length - 1]] = value
      return next
    })
  }, [])

  const saveSection = useCallback(async (section) => {
    try {
      await fetch(`${API_URL}/content/${section}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': sessionStorage.getItem('em-token') || '',
        },
        body: JSON.stringify(content[section]),
      })
    } catch (err) {
      console.error('Save failed:', err)
    }
  }, [content])

  const handleSave = async () => {
    if (activeSection === 'inquiries') return
    setSaving(true)
    await saveSection(activeSection)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const reset = () => {
    if (confirm('Reset all content to defaults?')) {
      localStorage.removeItem('edu-master-admin-content')
      window.location.reload()
    }
  }

  const Editor = editors[activeSection]

  if (!authenticated) {
    return <LoginGate onLogin={() => setAuthenticated(true)} />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Loading content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0f172a] text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${darkMode ? 'bg-[#1e293b]/90 border-slate-700/50 backdrop-blur-xl' : 'bg-white/90 border-slate-200 backdrop-blur-xl'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={darkMode ? '/logo-dark.png' : '/logo-bright.png'}
              alt="EDU MASTER Logo"
              className="h-9 w-auto"
            />
            <div>
              <h1 className="text-sm font-bold text-white">Admin Panel</h1>
              <p className="text-[10px] text-slate-400">EDU MASTER Content Manager</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="http://localhost:3000" target="_blank" className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
              🌐 View Site
            </a>
            <button onClick={reset} className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1.5">
              🔄 Reset
            </button>
            <button onClick={handleSave} disabled={saving} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
              saved ? 'bg-emerald-500 text-white' : saving ? 'bg-slate-600 text-slate-300' : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}>
              {saved ? '✓ Saved' : saving ? 'Saving...' : '💾 Save'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3">
            <div className={`rounded-2xl border p-3 sticky top-20 transition-colors duration-300 ${darkMode ? 'bg-[#1e293b] border-slate-700/50' : 'bg-white border-slate-200'}`}>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-600/20 text-blue-400'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9 space-y-4">
            <div className={`rounded-2xl border p-6 transition-colors duration-300 ${darkMode ? 'bg-[#1e293b] border-slate-700/50' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">
                  {sections.find((s) => s.id === activeSection)?.icon}{' '}
                  {sections.find((s) => s.id === activeSection)?.label}
                </h2>
                <span className="text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full">
                  API-backed
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Editor content={content} update={update} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className={`rounded-2xl border p-5 transition-colors duration-300 ${darkMode ? 'bg-[#1e293b] border-slate-700/50' : 'bg-white border-slate-200'}`}>
              <h3 className="text-sm font-bold text-white mb-3">📊 Content Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-blue-400">{content.services?.length || 0}</div>
                  <div className="text-[10px] text-slate-500">Services</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-emerald-400">{content.testimonials?.length || 0}</div>
                  <div className="text-[10px] text-slate-500">Testimonials</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-amber-400">{content.courses?.length || 0}</div>
                  <div className="text-[10px] text-slate-500">Courses</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-rose-400">{sections.length}</div>
                  <div className="text-[10px] text-slate-500">Sections</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
