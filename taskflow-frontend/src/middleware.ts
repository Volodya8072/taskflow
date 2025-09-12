import { NextRequest, NextResponse } from 'next/server'
import { DASHBOARD_PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-token.service'

export function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request
  const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value

  const isAuthPage = nextUrl.pathname.startsWith('/auth')
  const isDashboardPage = nextUrl.pathname.startsWith('/i')
  const isRoot = nextUrl.pathname === '/'

  if (isAuthPage && accessToken) {
    return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url))
  }

  if (!isAuthPage && !accessToken) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (isRoot) {
    return NextResponse.redirect(new URL(isAuthPage ? '/auth' : DASHBOARD_PAGES.HOME, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/auth', '/i/:path*'],
}
