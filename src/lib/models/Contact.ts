import mongoose from 'mongoose'

export interface IContact extends mongoose.Document {
  name: string
  email: string
  company: string
  phone?: string
  service: string
  budget?: string
  timeline?: string
  message?: string
  submittedAt: Date
  ipAddress?: string
  userAgent?: string
  processed: boolean
}

const ContactSchema = new mongoose.Schema<IContact>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    trim: true,
    maxlength: [200, 'Company name cannot exceed 200 characters']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  service: {
    type: String,
    required: [true, 'Service selection is required'],
    enum: ['pilot', 'sdr', 'consultation', 'free-consultation']
  },
  budget: {
    type: String,
    enum: ['under-5k', '5k-15k', '15k-30k', '30k-plus', '']
  },
  timeline: {
    type: String,
    enum: ['immediate', '1-month', '3-months', '6-months', 'exploring', '']
  },
  message: {
    type: String,
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  },
  processed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Create indexes for better query performance
ContactSchema.index({ email: 1, submittedAt: -1 })
ContactSchema.index({ processed: 1 })

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema) 