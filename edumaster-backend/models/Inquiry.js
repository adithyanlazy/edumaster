import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  course: { type: String, required: true },
  message: { type: String, default: '' },
}, { timestamps: true })

export default mongoose.model('Inquiry', inquirySchema)
