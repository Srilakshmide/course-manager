'use client'

import { useEffect, useState } from 'react'
import CreateCourseForm from '../../components/CreateCourseForm'
import Link from 'next/link'

export default function CoursesPage() {
  // Courses list
  const [courses, setCourses] = useState([])

  // Editing state
  const [editId, setEditId] = useState(null)
  const [editCourse, setEditCourse] = useState({
    title: '',
    description: '',
    instructor: '',
    tags: ''
  })

  // Fetch courses
  async function fetchCourses() {
    const res = await fetch('/api/courses', {
      credentials: 'include'
    })
    const data = await res.json()
    setCourses(data)
  }

  // Delete course
  async function deleteCourse(id) {
    await fetch(`/api/courses/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    fetchCourses()
  }

  // Start editing
  function startEdit(course) {
    setEditId(course._id)
    setEditCourse({
      title: course.title,
      description: course.description || '',
      instructor: course.instructor || '',
      tags: course.tags?.join(',') || ''
    })
  }

  // Cancel editing
  function cancelEdit() {
    setEditId(null)
    setEditCourse({
      title: '',
      description: '',
      instructor: '',
      tags: ''
    })
  }

  // Save edit
  async function saveEdit(id) {
    await fetch(`/api/courses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        title: editCourse.title,
        description: editCourse.description,
        instructor: editCourse.instructor,
        tags: editCourse.tags
          .split(',')
          .map(t => t.trim())
          .filter(Boolean)
      })
    })

    setEditId(null)
    cancelEdit()
    fetchCourses()
  }

  // Initial load
  useEffect(() => {
    fetchCourses()
  }, [])

  // UI
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Courses</h1>

      {/* CREATE */}
      <CreateCourseForm onCreated={fetchCourses} />

      {/* READ + EDIT + DELETE */}
      {courses.map(course => (
        <div
          key={course._id}
          className="border p-3 mb-2 grid grid-cols-[1fr_auto] items-center gap-4"
        >
          {/* LEFT COLUMN */}
          <div className="min-w-0">
            {editId === course._id ? (
              <div className="space-y-2">
                <input
                  className="border p-2 w-full"
                  placeholder="Title"
                  value={editCourse.title}
                  onChange={e =>
                    setEditCourse({
                      ...editCourse,
                      title: e.target.value
                    })
                  }
                />

                <textarea
                  className="border p-2 w-full"
                  placeholder="Description"
                  value={editCourse.description}
                  onChange={e =>
                    setEditCourse({
                      ...editCourse,
                      description: e.target.value
                    })
                  }
                />

                <input
                  className="border p-2 w-full"
                  placeholder="Instructor"
                  value={editCourse.instructor}
                  onChange={e =>
                    setEditCourse({
                      ...editCourse,
                      instructor: e.target.value
                    })
                  }
                />

                <input
                  className="border p-2 w-full"
                  placeholder="Tags (comma separated)"
                  value={editCourse.tags}
                  onChange={e =>
                    setEditCourse({
                      ...editCourse,
                      tags: e.target.value
                    })
                  }
                />
              </div>
            ) : (
              <Link
                href={`/courses/${course.slug}`}
                className="text-lg truncate text-blue-600 hover:underline"
              >
                {course.title}
              </Link>
            )}
          </div>

          {/* RIGHT COLUMN: ACTIONS */}
          <div className="flex gap-2 whitespace-nowrap">
            {editId === course._id ? (
              <>
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded"
                  onClick={() => saveEdit(course._id)}
                >
                  Save
                </button>
                <button
                  className="px-3 py-1 bg-gray-500 text-white rounded"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                  onClick={() => startEdit(course)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded"
                  onClick={() => deleteCourse(course._id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
