import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import contentRoutes from './routes/content.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet())
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }))
app.use(express.json({ limit: '2mb' }))

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 })
app.use('/api', limiter)

app.use('/uploads', express.static(join(__dirname, 'uploads')))

app.use('/api', contentRoutes)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  })
