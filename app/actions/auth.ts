'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type UserRole = 'owner' | 'customer' | 'applicant'

export async function login(role: UserRole) {
    const cookieStore = await cookies()

    // Set Role Cookie
    cookieStore.set('session_role', role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'lax'
    })

    // Set Onboarding Status to Incomplete initially
    cookieStore.set('onboarding_status', 'incomplete', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax'
    })

    // Redirect to Onboarding Flow
    redirect('/onboarding')
}

export async function completeOnboarding(role: UserRole) {
    const cookieStore = await cookies()

    // Mark as complete
    cookieStore.set('onboarding_status', 'complete', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax'
    })

    // Redirect to Dashboard based on Role
    if (role === 'owner') {
        redirect('/platform/owner')
    } else if (role === 'customer') {
        redirect('/platform/decisions')
    } else {
        redirect('/') // Applicant portal (todo)
    }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('session_role')
    redirect('/')
}

export async function getRole(): Promise<UserRole | undefined> {
    const cookieStore = await cookies()
    const role = cookieStore.get('session_role')
    return role?.value as UserRole | undefined
}
