import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.User || mongoose.model('User', UserSchema)