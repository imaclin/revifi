import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname
  const isLocalDev = hostname.includes('localhost') || hostname.includes('127.0.0.1')
  const isAdminSubdomain = hostname.startsWith('admin.')

  // In production: block /admin on the main domain (not admin subdomain)
  if (!isLocalDev && pathname.startsWith('/admin') && !isAdminSubdomain) {
    return NextResponse.rewrite(new URL('/not-found', request.url), { status: 404 })
  }

  // On admin subdomain: rewrite root to /admin dashboard
  if (isAdminSubdomain && pathname === '/') {
    return NextResponse.rewrite(new URL('/admin', request.url))
  }

  // On admin subdomain: allow admin, login, api routes; redirect everything else to main domain
  if (isAdminSubdomain && !pathname.startsWith('/admin') && !pathname.startsWith('/login') && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
    const mainDomain = hostname.replace('admin.', '')
    return NextResponse.redirect(new URL(`https://${mainDomain}${pathname}`, request.url))
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
