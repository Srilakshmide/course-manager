import { NextResponse } from 'next/server'
import { connectMongo } from '../../../lib/mongodb'
import Course from '../../../models/Course'

export async function GET() {
  await connectMongo()
  const courses = await Course.find({}).lean()

  const data = courses.map(c => ({
    ...c,
    _id: c._id.toString(),
    instructor: c.instructor?.toString() || null,
    createdAt: c.createdAt?.toISOString()
  }))

  return NextResponse.json(data)
}

export async function POST(req) {
  await connectMongo()
  const body = await req.json()

  if (!body.title || !body.slug) {
    return NextResponse.json(
      { error: 'title and slug required' },
      { status: 400 }
    )
  }

  const course = await Course.create(body)
  return NextResponse.json({ id: course._id.toString() })
}
