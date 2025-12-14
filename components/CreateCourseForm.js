'use client'
import { useState } from 'react'

export default function CreateCourseForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')

  async function submit(e) {
    e.preventDefault()

    await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug })
    })

    setTitle('')
    setSlug('')
    onCreated()
  }

  return (
    <form onSubmit={submit} className="mb-6">
      <input
        className="border p-2 mr-2"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        className="border p-2 mr-2"
        placeholder="Slug"
        value={slug}
        onChange={e => setSlug(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2">
        Create
      </button>
    </form>
  )
}
