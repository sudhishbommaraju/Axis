import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const role = request.cookies.get('session_role')?.value;
    const path = request.nextUrl.pathname;

    // 1. Protected Routes Check
    if (path.startsWith('/platform')) {
        if (!role) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Role-based Access Control
        if (path.startsWith('/platform/owner') && role !== 'owner') {
            return NextResponse.redirect(new URL('/platform/403', request.url));
        }

        if (path.startsWith('/platform/decisions') && role !== 'customer') {
            // Assuming decisions is customer home
            return NextResponse.redirect(new URL('/platform/403', request.url));
        }
    }

    // 2. Onboarding Guard
    // If user is logged in but hasn't completed onboarding, force them there?
    // Or if they try to go to onboarding while completed, force them to dashboard?
    const onboardingStatus = request.cookies.get('onboarding_status')?.value;

    if (path.startsWith('/onboarding') && onboardingStatus === 'complete') {
        // Redirect to appropriate dashboard
        if (role === 'owner') return NextResponse.redirect(new URL('/platform/owner', request.url));
        if (role === 'customer') return NextResponse.redirect(new URL('/platform/decisions', request.url));
        if (role === 'applicant') return NextResponse.redirect(new URL('/applicant', request.url));
    }

    // 3. Public Auth Route Check (Smart Redirect)
    // If user is already logged in (has role) and tries to visit login or landing, send them to dashboard
    if (role && (path === '/login' || path === '/')) {
        if (role === 'owner') return NextResponse.redirect(new URL('/platform/owner', request.url));
        if (role === 'customer') return NextResponse.redirect(new URL('/platform/decisions', request.url));
        if (role === 'applicant') return NextResponse.redirect(new URL('/applicant', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login', '/platform/:path*', '/onboarding/:path*'],
}
