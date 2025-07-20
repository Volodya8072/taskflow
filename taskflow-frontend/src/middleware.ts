import { NextRequest, NextResponse } from 'next/server'

import { DASHBOARD_PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-token.service'

export function middleware(request: NextRequest) {
	const { url, cookies, nextUrl } = request

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	const isAuthPage = nextUrl.pathname.startsWith('/auth')
	const isDashboardPage = nextUrl.pathname.startsWith('/i')
	const isRootPage = nextUrl.pathname === '/'

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url))
	}

	if (isAuthPage) {
		return NextResponse.next()
	}

	if (isRootPage) {
		if (refreshToken) {
			return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url))
		} else {
			return NextResponse.redirect(new URL('/auth', request.url))
		}
	}

	if (isDashboardPage && !refreshToken) {
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	return NextResponse.next()
}
