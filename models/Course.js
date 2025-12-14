import mongoose from 'mongoose'

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  instructor: String,
  tags: [String],

  // ✅ ADD THIS
  published: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})


export default mongoose.models.Course || mongoose.model('Course', CourseSchema)