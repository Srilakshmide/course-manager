import { NextResponse } from 'next/server'

export function proxy(req) {
    const { pathname } = req.nextUrl

    // NEVER block API routes
    if (pathname.startsWith('/api')) {
        return NextResponse.next()
    }

    // ONLY guard page navigation (GET requests)
    if (req.method !== 'GET') {
        return NextResponse.next()
    }

    const token = req.cookies.get('token')?.value

    // Not logged in → allow only /login
    if (!token) {
        if (pathname === '/login' || pathname === '/register') {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/login', req.url))
    }

    // Logged in → block /login
    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next|favicon.ico).*)'],
}
