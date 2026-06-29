import { Router } from 'express'
import multer from 'multer'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join, extname } from 'path'
import { unlink } from 'fs/promises'
import SiteContent from '../models/SiteContent.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const storage = multer.diskStorage({
  destination: join(__dirname, '..', 'uploads'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, unique + extname(file.originalname))
  }
})
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/
    const ext = allowed.test(extname(file.originalname).replace('.', '').toLowerCase())
    const mime = allowed.test(file.mimetype)
    if (ext && mime) return cb(null, true)
    cb(new Error('Only image files are allowed'))
  }
})

const router = Router()

const requireAuth = (req, res, next) => {
  const token = req.headers['x-admin-token']
  if (token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

router.post('/upload', requireAuth, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  try {
    const originalPath = req.file.path
    const webpName = req.file.filename.replace(extname(req.file.filename), '.webp')
    const webpPath = join(__dirname, '..', 'uploads', webpName)
    await sharp(originalPath)
      .webp({ quality: 85 })
      .toFile(webpPath)
    await unlink(originalPath)
    res.json({ url: `/uploads/${webpName}` })
  } catch (err) {
    res.json({ url: `/uploads/${req.file.filename}` })
  }
})

router.get('/content', async (req, res) => {
  try {
    const docs = await SiteContent.find()
    const content = {}
    for (const doc of docs) {
      content[doc.section] = doc.data
    }
    res.json(content)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/content/:section', async (req, res) => {
  try {
    const doc = await SiteContent.findOne({ section: req.params.section })
    if (!doc) return res.status(404).json({ error: 'Section not found' })
    res.json(doc.data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/content/:section', requireAuth, async (req, res) => {
  try {
    const doc = await SiteContent.findOneAndUpdate(
      { section: req.params.section },
      { data: req.body },
      { upsert: true, new: true }
    )
    res.json(doc.data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/inquiries', async (req, res) => {
  try {
    const Inquiry = (await import('../models/Inquiry.js')).default
    const inquiry = await Inquiry.create(req.body)
    res.status(201).json(inquiry)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/inquiries', async (req, res) => {
  try {
    const Inquiry = (await import('../models/Inquiry.js')).default
    const inquiries = await Inquiry.find().sort({ createdAt: -1 })
    res.json(inquiries)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/inquiries/:id', requireAuth, async (req, res) => {
  try {
    const Inquiry = (await import('../models/Inquiry.js')).default
    await Inquiry.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/newsletter', async (req, res) => {
  try {
    const Newsletter = (await import('../models/Newsletter.js')).default
    const sub = await Newsletter.create(req.body)
    res.status(201).json(sub)
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Already subscribed' })
    res.status(500).json({ error: err.message })
  }
})

router.get('/newsletter', async (req, res) => {
  try {
    const Newsletter = (await import('../models/Newsletter.js')).default
    const subs = await Newsletter.find().sort({ createdAt: -1 })
    res.json(subs)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/auth/login', (req, res) => {
  const { password } = req.body
  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true })
  } else {
    res.status(401).json({ error: 'Invalid password' })
  }
})

export default router
