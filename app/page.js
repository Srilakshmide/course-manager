import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Welcome to Course Manager
      </h1>

      <p className="text-lg md:text-xl text-gray-700 mb-6">
        This application helps you manage courses efficiently.
        You can create, edit, and delete courses, all in one place.
      </p>

      <div className="flex justify-center">
        <img
          src="/images/png-clipart-pedagogy-massive-open-online-course-education-university-student-student-computer-network-angle.png"
          alt="Online Education"
          width="550"
          className="h-auto rounded shadow mx-auto"
        />
      </div>

      <div className="flex justify-center mt-6">
        <Link
          href="/courses"
          className="px-4 py-2 bg-sky-600 text-white rounded"
        >
          View Courses
        </Link>
      </div>

    </div>
  )
}
