import '../styles/globals.css'
import LogoutButton from '../components/LogoutButton'

export const metadata = {
  title: 'Course Manager',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-slate-800 text-white p-4">
          <div className="container flex justify-between items-center">
            <h1 className="text-xl font-bold">Course Manager</h1>

            <nav className="flex items-center gap-4">
              <a href="/">Home</a>
              <a href="/courses">Courses</a>
              <LogoutButton /> {/* ✅ client component */}
            </nav>
          </div>
        </header>

        <main className="container py-8 flex-grow">
          {children}
        </main>

        <footer className="bg-gray-100 p-4 text-center text-sm text-gray-600">
          Built by Srilakshmi — Course Manager Scaffold <br />
          Github Profile — https://github.com/Srilakshmide <br />
          LinkedIn profile — www.linkedin.com/in/srilakshmi-durga-saladi-76013b261
        </footer>
      </body>
    </html>
  )
}
