import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_PREFIXES = ['/dashboard', '/payment', '/course-correction', '/lga-clearance']
const ADMIN_PREFIXES = ['/admin']
const AUTH_ROUTES = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasRefreshCookie = request.cookies.has('refresh_token')

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))
  const isAdmin = ADMIN_PREFIXES.some((p) => pathname.startsWith(p))
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r))

  // Unauthenticated → redirect to login
  if ((isProtected || isAdmin) && !hasRefreshCookie) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Authenticated on auth pages → redirect to dashboard
  if (isAuthRoute && hasRefreshCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Admin role check happens server-side in the API (RolesGuard).
  // The AuthHydrator in the admin layout will redirect non-admins client-side.

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/payment/:path*',
    '/course-correction/:path*',
    '/lga-clearance/:path*',
    '/admin/:path*',
    '/login',
    '/register',
  ],
}
