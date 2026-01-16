import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { UserRole } from './db';

export type SessionUser = {
    id: string;
    role: UserRole;
    onboardingStatus: string;
};

export async function getSession(): Promise<SessionUser | null> {
    const cookieStore = await cookies();
    const userId = cookieStore.get('session_user_id')?.value;
    const role = cookieStore.get('session_role')?.value as UserRole | undefined;
    const onboardingStatus = cookieStore.get('onboarding_status')?.value || 'incomplete';

    if (!userId || !role) {
        return null;
    }

    return { id: userId, role, onboardingStatus };
}

export async function requireAuth(): Promise<SessionUser> {
    const session = await getSession();
    if (!session) {
        redirect('/login');
    }
    return session;
}

export async function requireRole(requiredRole: UserRole): Promise<SessionUser> {
    const session = await requireAuth();
    if (session.role !== requiredRole) {
        redirect('/unauthorized'); // Or some 403 page
    }
    return session;
}
