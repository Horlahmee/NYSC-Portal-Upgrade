import { NextRequest, NextResponse } from 'next/server'

// Routes that require authentication
const PROTECTED_PREFIXES = ['/dashboard', '/payment', '/course-correction', '/lga-clearance']

// Routes that authenticated users should not visit (auth pages)
const AUTH_ROUTES = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Access token is stored in localStorage (client-only), so we rely on the
  // cookie-based refresh token as a lightweight "is logged in" signal.
  // The actual token validation happens on the API for every request.
  const hasRefreshCookie = request.cookies.has('refresh_token')

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))

  if (isProtected && !hasRefreshCookie) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && hasRefreshCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/payment/:path*',
    '/course-correction/:path*',
    '/lga-clearance/:path*',
    '/login',
    '/register',
  ],
}
