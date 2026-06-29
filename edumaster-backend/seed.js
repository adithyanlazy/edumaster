import 'dotenv/config'
import mongoose from 'mongoose'
import SiteContent from './models/SiteContent.js'

const seedData = {
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
    highlights: [
      { icon: 'FiShield', title: 'Trusted Guidance', description: 'Over a decade of helping students make the right academic decisions with confidence.', gradient: 'from-blue-500 to-indigo-600' },
      { icon: 'FiUsers', title: 'Experienced Counsellors', description: 'Our team includes former admissions officers and career experts from top institutions.', gradient: 'from-emerald-400 to-teal-500' },
      { icon: 'FiTrendingUp', title: 'Career Support', description: 'From course selection to placement assistance — we support your entire career journey.', gradient: 'from-violet-400 to-purple-500' },
      { icon: 'FiHeadphones', title: 'Admission Assistance', description: 'Complete end-to-end support for applications, documentation, and university follow-ups.', gradient: 'from-amber-400 to-orange-500' },
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
    { title: 'MBBS', description: 'Bachelor of Medicine and Bachelor of Surgery — the most sought-after medical degree for aspiring doctors.', gradient: 'from-rose-500 to-red-600', bg: 'from-red-50 to-rose-50', duration: '5.5 Years', degree: 'Undergraduate', icon: 'FiActivity' },
    { title: 'BDS', description: 'Bachelor of Dental Surgery — specialize in oral healthcare and become a qualified dental professional.', gradient: 'from-sky-500 to-blue-600', bg: 'from-blue-50 to-sky-50', duration: '5 Years', degree: 'Undergraduate', icon: 'FiSmile' },
    { title: 'BSc Nursing', description: 'Build a rewarding career in healthcare with comprehensive nursing education and clinical training.', gradient: 'from-pink-500 to-fuchsia-600', bg: 'from-fuchsia-50 to-pink-50', duration: '4 Years', degree: 'Undergraduate', icon: 'FiHeart' },
    { title: 'GNM', description: 'General Nursing and Midwifery — gain hands-on nursing skills for hospitals, clinics, and community health.', gradient: 'from-amber-500 to-orange-600', bg: 'from-orange-50 to-amber-50', duration: '3 Years', degree: 'Diploma', icon: 'FiStar' },
    { title: 'Pharmacy', description: 'Study pharmaceutical sciences and open doors to careers in drug development, research, and healthcare.', gradient: 'from-emerald-500 to-teal-600', bg: 'from-teal-50 to-emerald-50', duration: '4 Years', degree: 'Undergraduate', icon: 'FiTrendingUp' },
    { title: 'Allied Health Sciences', description: 'Explore lab technology, radiology, physiotherapy, and other critical healthcare support disciplines.', gradient: 'from-violet-500 to-purple-600', bg: 'from-purple-50 to-violet-50', duration: '3-4 Years', degree: 'Undergraduate', icon: 'FiLayers' },
    { title: 'Engineering', description: 'From computer science to mechanical — build technical expertise at top engineering institutions.', gradient: 'from-cyan-500 to-sky-600', bg: 'from-sky-50 to-cyan-50', duration: '4 Years', degree: 'Undergraduate', icon: 'FiCpu' },
    { title: 'MBA', description: 'Master of Business Administration — develop leadership skills and accelerate your corporate career.', gradient: 'from-indigo-500 to-blue-600', bg: 'from-blue-50 to-indigo-50', duration: '2 Years', degree: 'Postgraduate', icon: 'FiBriefcase' },
  ],
  universities: [
    { name: 'Christian Medical College', location: 'Vellore, Tamil Nadu', courses: ['MBBS', 'BSc Nursing', 'Pharmacy'], color: '#dc2626', abbr: 'CMC' },
    { name: 'Manipal Academy of Higher Education', location: 'Manipal, Karnataka', courses: ['MBBS', 'Engineering', 'MBA'], color: '#2563eb', abbr: 'MAHE' },
    { name: 'Amrita Vishwa Vidyapeetham', location: 'Coimbatore, Tamil Nadu', courses: ['MBBS', 'Engineering', 'BSc Nursing'], color: '#d97706', abbr: 'AVV' },
    { name: 'Sri Ramachandra University', location: 'Chennai, Tamil Nadu', courses: ['MBBS', 'BDS', 'Pharmacy'], color: '#059669', abbr: 'SRU' },
    { name: 'JSS Medical College', location: 'Mysuru, Karnataka', courses: ['MBBS', 'Allied Health', 'GNM'], color: '#7c3aed', abbr: 'JSS' },
    { name: 'Kasturba Medical College', location: 'Mangalore, Karnataka', courses: ['MBBS', 'BDS', 'BSc Nursing'], color: '#0891b2', abbr: 'KMC' },
  ],
  logoCarousel: [
    { abbr: 'CMC', color: '#dc2626' }, { abbr: 'MAHE', color: '#2563eb' },
    { abbr: 'AVV', color: '#d97706' }, { abbr: 'SRU', color: '#059669' },
    { abbr: 'JSS', color: '#7c3aed' }, { abbr: 'KMC', color: '#0891b2' },
    { abbr: 'SDU', color: '#ea580c' }, { abbr: 'AIMS', color: '#0d9488' },
    { abbr: 'SJMC', color: '#4f46e5' }, { abbr: 'MIMS', color: '#be185d' },
    { abbr: 'KIMS', color: '#1d4ed8' }, { abbr: 'AIMS', color: '#b45309' },
  ],
  stats: [
    { number: 2000, suffix: '+', label: 'Students Placed', description: 'Across top universities worldwide' },
    { number: 50, suffix: '+', label: 'Partner Universities', description: 'In 25+ countries' },
    { number: 98, suffix: '%', label: 'Success Rate', description: 'Admission acceptance rate' },
    { number: 15, suffix: '+', label: 'Years Experience', description: 'Of educational excellence' },
  ],
  whyChooseUs: [
    { icon: 'FiShield', title: 'Trusted Consultancy', description: 'Over 15 years of proven track record helping students get into their dream colleges.', gradient: 'from-blue-500 to-indigo-600' },
    { icon: 'FiAward', title: 'Expert Guidance', description: 'Our counsellors include former admissions officers and industry veterans from top institutions.', gradient: 'from-emerald-400 to-teal-500' },
    { icon: 'FiDollarSign', title: 'Affordable', description: 'Premium guidance at transparent, student-friendly pricing with no hidden charges.', gradient: 'from-amber-400 to-orange-500' },
    { icon: 'FiEye', title: 'Transparent Process', description: 'Complete visibility into every step — from application status to admission decisions.', gradient: 'from-violet-400 to-purple-500' },
    { icon: 'FiStar', title: 'Best Colleges', description: 'Direct partnerships with 50+ top-ranked medical, engineering, and management institutions.', gradient: 'from-rose-400 to-pink-500' },
    { icon: 'FiHeadphones', title: '24/7 Support', description: 'Round-the-clock assistance via phone, chat, and email — we are always here for you.', gradient: 'from-cyan-400 to-sky-500' },
  ],
  timeline: [
    { number: '01', title: 'Career Counselling', description: 'Understand your strengths, interests, and goals with a one-on-one counselling session.', icon: 'FiMessageCircle', gradient: 'from-blue-500 to-indigo-600', glow: 'rgba(99,102,241,0.3)' },
    { number: '02', title: 'Choose Course', description: 'Select the right course based on your career aspirations and academic profile.', icon: 'FiBookOpen', gradient: 'from-emerald-400 to-teal-500', glow: 'rgba(20,184,166,0.3)' },
    { number: '03', title: 'Choose College', description: 'Shortlist top colleges that match your course, location, and budget preferences.', icon: 'FiHome', gradient: 'from-violet-400 to-purple-500', glow: 'rgba(139,92,246,0.3)' },
    { number: '04', title: 'Documentation', description: 'Prepare and submit all required documents, SOPs, and application forms.', icon: 'FiFileText', gradient: 'from-amber-400 to-orange-500', glow: 'rgba(249,115,22,0.3)' },
    { number: '05', title: 'Admission Confirmation', description: 'Receive your admission offer and complete the seat booking process.', icon: 'FiCheckCircle', gradient: 'from-rose-400 to-pink-500', glow: 'rgba(244,63,94,0.3)' },
    { number: '06', title: 'Join College', description: 'Step into your new campus with confidence — your dream journey begins.', icon: 'FiArrowRightCircle', gradient: 'from-cyan-400 to-sky-500', glow: 'rgba(6,182,212,0.3)' },
  ],
  faq: [
    { question: 'How can I apply?', answer: 'Getting started is simple. Fill out our contact form or call us directly for a free consultation. Our counsellors will assess your academic profile, discuss your career goals, and guide you through the entire application process — from shortlisting colleges to submitting documents.' },
    { question: 'Which states do you serve?', answer: 'We specialise in admissions across South India — primarily Kerala, Karnataka, and Tamil Nadu. We have partnerships with over 50 top-ranked institutions in these states including medical colleges, engineering institutions, nursing schools, and management institutes.' },
    { question: 'Do you provide scholarships?', answer: 'Yes, we actively help students identify and apply for merit-based scholarships, government grants, and financial aid programmes. Our team stays updated on the latest scholarship opportunities and will match you with options that fit your academic profile and financial needs.' },
    { question: 'What documents are required?', answer: 'Typically, you will need your 10th and 12th mark sheets, entrance exam scorecards (NEET, KCET, etc.), transfer certificate, conduct certificate, passport-size photographs, and Aadhaar card. Specific colleges may have additional requirements — our team will provide a tailored checklist during your counselling session.' },
    { question: 'Can you help choose a college?', answer: 'Absolutely. College selection is one of our core strengths. We use a data-driven approach considering your entrance scores, budget, preferred location, course specialisation, and career goals to shortlist the best-fit institutions. We also arrange campus visits and connect you with current students for first-hand insights.' },
    { question: 'How long does the admission process take?', answer: 'The timeline varies by course and institution. For medical courses, the process typically takes 2-3 months aligned with counselling schedules. For engineering and management, it can be faster — usually 4-6 weeks from application to confirmation. We keep you updated at every stage.' },
    { question: 'Is there a fee for the initial consultation?', answer: 'Your first consultation is completely free. We believe in building trust through transparency. During this session, we assess your profile, discuss your options, and outline a clear roadmap — with no obligations whatsoever.' },
  ],
  cta: {
    headline: 'Your Dream University is One Step Away',
    subheadline: 'Join 2000+ students who turned their academic dreams into reality. Book your free consultation today.',
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
      { label: 'About', href: '#about' },
      { label: 'Courses', href: '#courses' },
      { label: 'Universities', href: '#universities' },
      { label: 'Services', href: '#services' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  footer: {
    phone: '+91 98765 43210',
    email: 'hello@edumaster.com',
    address: '123 Education Hub, MG Road, Kochi, Kerala',
    tagline: 'Empowering students to achieve academic excellence through personalized guidance and expert counselling since 2008.',
    quickLinks: {
      Courses: [
        { label: 'MBBS', href: '#courses' },
        { label: 'BDS', href: '#courses' },
        { label: 'BSc Nursing', href: '#courses' },
        { label: 'Engineering', href: '#courses' },
        { label: 'MBA', href: '#courses' },
        { label: 'Pharmacy', href: '#courses' },
      ],
      Services: [
        { label: 'Admission Guidance', href: '#services' },
        { label: 'Career Counselling', href: '#services' },
        { label: 'Documentation Support', href: '#services' },
        { label: 'Scholarship Assistance', href: '#services' },
        { label: 'Visa Assistance', href: '#services' },
      ],
    },
    socials: [
      { platform: 'Instagram', href: '#', color: '#E4405F' },
      { platform: 'Facebook', href: '#', color: '#1877F2' },
      { platform: 'LinkedIn', href: '#', color: '#0A66C2' },
    ],
  },
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')

    for (const [section, data] of Object.entries(seedData)) {
      await SiteContent.findOneAndUpdate(
        { section },
        { data },
        { upsert: true }
      )
      console.log(`Seeded: ${section}`)
    }

    console.log('Seed complete!')
    process.exit(0)
  } catch (err) {
    console.error('Seed error:', err)
    process.exit(1)
  }
}

seed()
