'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { db, UserRole } from '@/lib/db'
// Native UUID for lighter dependency
const generateId = () => crypto.randomUUID();

export async function signup(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as UserRole;

    if (!email || !password || !role) {
        throw new Error("Missing required fields");
    }

    const existingUser = await db.users.findByEmail(email);
    if (existingUser) {
        throw new Error("User already exists");
    }

    // Create User
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // MOCK EMAIL SENDING
    console.log(`\n\n[EMAIL MOCK] Verification code for ${email}: ${verificationCode}\n\n`);

    const newUser = await db.users.create({
        id: generateId(),
        email,
        passwordHash: password, // In real app, hash this
        name,
        role,
        onboardingStatus: 'incomplete',
        emailVerified: false,
        verificationCode,
        createdAt: new Date().toISOString()
    });

    // Create Session (but don't rely on it fully until verified)
    const cookieStore = await cookies();
    // We set role so they can verify, but onboarding check should block them if not verified
    cookieStore.set('session_role', role, { httpOnly: true, path: '/' });

    // Redirect to verification
    redirect(`/verify-email?email=${encodeURIComponent(email)}`);
}

export async function verifyEmail(email: string, code: string) {
    const user = await db.users.findByEmail(email);
    if (!user) {
        throw new Error("User not found");
    }

    if (user.verificationCode !== code) {
        throw new Error("Invalid verification code");
    }

    await db.users.update(user.id, {
        emailVerified: true,
        verificationCode: undefined
    });

    // Set full session
    const cookieStore = await cookies();
    cookieStore.set('session_user_id', user.id, { httpOnly: true, path: '/' });
    cookieStore.set('onboarding_status', 'incomplete', { httpOnly: true, path: '/' });
    cookieStore.set('session_role', user.role, { httpOnly: true, path: '/' });

    redirect('/onboarding');
}

export async function login(role: UserRole) {
    // Legacy support or dev login
    // converting to new storage if needed or just simple session
    const cookieStore = await cookies()
    cookieStore.set('session_role', role, { httpOnly: true, path: '/' })
    redirect('/onboarding')
}

export async function completeOnboarding(role: UserRole, data?: unknown) {
    const cookieStore = await cookies();
    const userId = cookieStore.get('session_user_id')?.value;

    if (!userId) {
        // Fallback for dev/existing flows without user ID
        // Just redirect if no user session
        console.warn("No user ID found during onboarding completion");
    } else {
        // Save structured data if provided
        if (data) {
            await db.onboarding.save({
                userId,
                role,
                data,
                updatedAt: new Date().toISOString()
            });
        }

        // Update User Status
        await db.users.update(userId, { onboardingStatus: 'complete' });
    }

    // Update Cookie
    cookieStore.set('onboarding_status', 'complete', { httpOnly: true, path: '/' });

    // Redirect
    if (role === 'owner') {
        redirect('/platform/owner');
    } else if (role === 'customer') {
        redirect('/platform/decisions');
    } else {
        redirect('/'); // Applicant
    }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('session_role')
    cookieStore.delete('session_user_id')
    cookieStore.delete('onboarding_status')
    redirect('/')
}

export async function getRole(): Promise<UserRole | undefined> {
    const cookieStore = await cookies()
    const role = cookieStore.get('session_role')
    return role?.value as UserRole | undefined
}

export async function getUser() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('session_user_id')?.value;
    if (!userId) return null;
    // In efficient app, might use a cached session, but reading DB is fine for this scale
    // Implementation of readDb is lightweight json
    return null; // Todo: implement getUserById if needed
}
