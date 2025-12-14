import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function requireAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    throw new Error('UNAUTHORIZED')
  }

  return jwt.verify(token, process.env.JWT_SECRET)
}
