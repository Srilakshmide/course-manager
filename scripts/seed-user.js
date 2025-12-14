import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from '../models/User.js'

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('Set MONGODB_URI')
  process.exit(1)
}

async function seedUser() {
  await mongoose.connect(uri)

  const email = 'admin@example.com'
  const password = 'admin123'

  const existing = await User.findOne({ email })
  if (existing) {
    console.log('User already exists')
    process.exit(0)
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await User.create({
    email,
    passwordHash,
    role: 'admin'
  })

  console.log('✅ User created')
  console.log('Email:', email)
  console.log('Password:', password)

  await mongoose.disconnect()
}

seedUser()
