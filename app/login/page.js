'use client'
import { useState } from 'react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function handleLogin() {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const data = await res.json()

        if (!res.ok) {
            setError(data.error || 'Login failed')
            return
        }

        // store token
        document.cookie = `token=${data.token}; path=/`

        // redirect
        window.location.href = '/'
    }

    return (
        <div className="max-w-md mx-auto mt-20 border p-6 rounded">
            <h1 className="text-2xl font-bold mb-4">Login</h1>

            {error && <p className="text-red-600 mb-3">{error}</p>}

            <input
                type="email"
                className="border p-2 w-full mb-3"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <input
                type="password"
                className="border p-2 w-full mb-4"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <button
                type="button"
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 rounded"
            >
                Login
            </button>
            <div className="mt-6 border-t pt-4 text-center">
                <p className="text-sm text-gray-600 mb-2">
                    Don’t have an account?
                </p>

                <a
                    href="/register"
                    className="inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                >
                    Register here
                </a>
            </div>
        </div>
    )
}
