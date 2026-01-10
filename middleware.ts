import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const roleCookie = request.cookies.get('session_role')
    const onboardingCookie = request.cookies.get('onboarding_status')

    const role = roleCookie?.value
    const onboardingStatus = onboardingCookie?.value

    // 1. Onboarding Jail Enforcement
    // If user is accessing platform routes but onboarding is incomplete -> Redirect to /onboarding
    if (path.startsWith('/platform') && role && onboardingStatus !== 'complete') {
        return NextResponse.redirect(new URL('/onboarding', request.url))
    }

    // If user is accessing /onboarding but onboarding IS complete -> Redirect to Dashboard
    if (path.startsWith('/onboarding') && role && onboardingStatus === 'complete') {
        if (role === 'owner') return NextResponse.redirect(new URL('/platform/owner', request.url))
        if (role === 'customer') return NextResponse.redirect(new URL('/platform/decisions', request.url))
        return NextResponse.redirect(new URL('/', request.url))
    }

    // 2. Protect Owner-Only Routes
    if (path.startsWith('/platform/owner')) {
        // If not logged in or not an owner, deny access
        if (role !== 'owner') {
            // Redirect to unauthorized page (or login)
            return NextResponse.redirect(new URL('/platform/unauthorized', request.url))
        }
    }

    // 3. Protect General Platform Routes
    // If accessing platform without any role cookie, redirect to login (root)
    if (path.startsWith('/platform') && !role) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        // Match all platform routes
        '/platform/:path*',
    ],
}
