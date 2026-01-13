'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { db, UserRole } from '@/lib/db'
import { sendVerificationEmail } from '@/lib/email'

// Simple ID generator without crypto dependency to prevent runtime issues
const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export async function signup(formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const role = formData.get('role') as UserRole;

        console.log(`[SIGNUP] Attempting signup for ${email} as ${role}`);

        if (!email || !password || !role) {
            return { error: "Missing required fields" };
        }

        const existingUser = await db.users.findByEmail(email);
        if (existingUser) {
            console.log(`[SIGNUP] User already exists: ${email}`);
            return { error: "User already exists" };
        }

        // Create User
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Send Email (Async, don't block too long but wait to ensure it works)
        await sendVerificationEmail(email, verificationCode);

        // Keep log as backup for dev/if API key missing
        console.log(`[EMAIL BACKUP] Code for ${email}: ${verificationCode}`);

        const newUser = await db.users.create({
            id: generateId(),
            email,
            passwordHash: password, // In real app, hash this
            name,
            role,
            onboardingStatus: 'incomplete', // Ensure this matches DB schema
            emailVerified: false,
            verificationCode,
            createdAt: new Date().toISOString()
        });

        console.log(`[SIGNUP] User created successfully: ${newUser.id}`);

        // Create Session
        const cookieStore = await cookies();
        cookieStore.set('session_role', role, { httpOnly: true, path: '/' });

        // Return success check instead of throwing
        return { success: true, email };

    } catch (error: any) {
        console.error("SIGNUP ERROR:", error);
        // Return the actual error message or a fallback
        return { error: error.message || "An unexpected error occurred" };
    }
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
    try {
        const cookieStore = await cookies()
        const role = cookieStore.get('session_role')
        return role?.value as UserRole | undefined
    } catch (error) {
        // This handles cases where cookies() is called during static generation
        return undefined;
    }
}

export async function getUser() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('session_user_id')?.value;
    if (!userId) return null;
    // In efficient app, might use a cached session, but reading DB is fine for this scale
    // Implementation of readDb is lightweight json
    return null; // Todo: implement getUserById if needed
}
