import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { connectMongo } from '../../../../lib/mongodb'
import User from '../../../../models/User'

function isStrongPassword(password) {
  const minLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password)

  return minLength && hasUppercase && hasNumber && hasSpecialChar
}


export async function POST(req) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      )
    }

    if (!isStrongPassword(password)) {
      return NextResponse.json(
        {
          error:
            'Password must be at least 8 characters and include an uppercase letter, a number, and a special character'
        },
        { status: 400 }
      )
    }

    await connectMongo()

    const existing = await User.findOne({ email })
    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered. Please login.' },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 10)

    await User.create({ email, passwordHash })

    // SUCCESS RESPONSE (IMPORTANT)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Register error:', err)

    // Duplicate email error
    if (err.code === 11000) {
      return NextResponse.json(
        { error: 'Email already registered. Please login.' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }

}
