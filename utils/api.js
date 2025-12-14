export async function fetchCourses() {
  const res = await fetch('/api/courses')
  return res.json()
}