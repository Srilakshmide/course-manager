import { NextResponse } from 'next/server'
import { connectMongo } from '../../../../lib/mongodb'
import Course from '../../../../models/Course'
import { cookies } from 'next/headers'


export async function PATCH(req, context) {
  const { params } = context
  const { id } = await params

  await connectMongo()
  const body = await req.json()

  await Course.findByIdAndUpdate(id, body, { new: true })

  return NextResponse.json({ ok: true })
}

export async function PUT(req, context) {
  await connectMongo()

  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await context.params
  const body = await req.json()

  await Course.findByIdAndUpdate(id, body)

  return NextResponse.json({ ok: true })
}

export async function DELETE(req, context) {
  await connectMongo()

  // Await cookies (Next.js 16)
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Await params (Next.js 16)
  const { id } = await context.params

  await Course.findByIdAndDelete(id)

  return NextResponse.json({ ok: true })
}
