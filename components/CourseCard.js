'use client'
import Link from 'next/link'

export default function CourseCard({ course }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{course.title || 'Untitled'}</h3>
      <p className="text-sm mt-2">{course.description || ''}</p>
      <div className="mt-3 flex justify-between items-center">
        <Link href={`/courses/${course.slug || ''}`} className="text-sm underline">View</Link>
        <span className="text-xs text-gray-500">{course.createdAt ? new Date(course.createdAt).toLocaleDateString() : ''}</span>
      </div>
    </div>
  )
}