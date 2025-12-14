'use client'

import { useState } from 'react'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    function isStrongPassword(password) {
        return (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password)
        )
    }

    async function handleRegister() {
        setError('')
        setSuccess(false)

        if (!isStrongPassword(password)) {
            setError(
                'Password must be at least 8 characters and include an uppercase letter, a number, and a special character'
            )
            return
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        let data = {}
        try {
            data = await res.json()
        } catch { }

        if (!res.ok) {
            setError(data.error || 'Registration failed')
            return
        }

        setSuccess(true)
    }


    return (
        <div className="max-w-md mx-auto mt-20 border p-6 rounded">
            <h1 className="text-2xl font-bold mb-4">Register</h1>

            {error && <p className="text-red-600 mb-3">{error}</p>}
            {success && (
                <p className="text-green-600 mb-3">
                    Registration successful. You can now log in.
                </p>
            )}

            <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full mb-3"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full mb-4"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <ul className="text-xs text-gray-600 mb-3 list-disc pl-5">
                <li>Minimum 8 characters</li>
                <li>At least 1 uppercase letter</li>
                <li>At least 1 number</li>
                <li>At least 1 special character</li>
            </ul>

            <button
                onClick={handleRegister}
                className="w-full bg-green-600 text-white py-2 rounded"
            >
                Register
            </button>

            <p className="text-sm text-center mt-4">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 underline">
                    Login
                </a>
            </p>
        </div>
    )
}
