import { connectMongo } from '../../../lib/mongodb'
import Course from '../../../models/Course'
import Link from 'next/link'

export default async function CourseDetailPage({ params }) {
  await connectMongo()

  const { slug } = await params

  // Fetch course by slug for detail page
  const course = await Course.findOne({ slug, published: true }).lean()

  if (!course) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-xl font-bold">Course not found</h1>
        <Link href="/courses" className="text-blue-600 underline">
          Back to courses
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">
        {course.title}
      </h1>

      <p className="text-gray-700 mb-6">
        {course.description || 'No description available.'}
      </p>

      <div className="mb-4">
        <strong>Instructor:</strong>{' '}
        {course.instructor || 'Not specified'}
      </div>

      {course.tags?.length > 0 && (
        <div className="mb-6">
          <strong>Tags:</strong>
          <div className="flex gap-2 mt-2">
            {course.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-200 rounded text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <Link
        href="/courses"
        className="inline-block mt-6 text-blue-600 underline"
      >
        ← Back to Courses
      </Link>
    </div>
  )
}
