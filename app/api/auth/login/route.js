import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { connectMongo } from '../../../../lib/mongodb'
import User from '../../../../models/User'

export async function POST(req) {
  const { email, password } = await req.json()

  await connectMongo()

  const user = await User.findOne({ email })
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // CREATE JWT
  const token = jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  return NextResponse.json({ token })
}
