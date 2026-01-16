'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { db, UserRole } from '@/lib/db'
// import { sendVerificationEmail } from '@/lib/email'

// Simple ID generator without crypto dependency to prevent runtime issues
const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

import { signupSchema, loginSchema } from '@/lib/validations';
import { checkRateLimit, AUTH_LIMIT } from '@/lib/rate-limit';

export async function signup(formData: FormData) {
    try {
        const email = formData.get('email') as string;

        // Rate limit by email to prevent spam for specific target
        if (email && !checkRateLimit(`signup:${email}`, AUTH_LIMIT)) {
            return { error: "Too many attempts. Please try again later." };
        }

        const rawData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            role: formData.get('role')
        };

        const validatedFields = signupSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { error: "Validation failed", details: validatedFields.error.flatten().fieldErrors };
        }

        const { name, email: validatedEmail, password, role } = validatedFields.data;

        console.log(`[SIGNUP] Attempting signup for ${validatedEmail} as ${role}`);

        const existingUser = await db.users.findByEmail(validatedEmail);
        if (existingUser) {
            console.log(`[SIGNUP] User already exists: ${validatedEmail}`);
            return { error: "User already exists" };
        }

        // Create User
        // SKIPPED: Verification Code Generation
        // SKIPPED: Email Sending

        const newUser = await db.users.create({
            id: generateId(),
            email: validatedEmail,
            passwordHash: password, // In real app, hash this
            name,
            role: role as UserRole,
            onboardingStatus: 'incomplete', // Ensure this matches DB schema
            emailVerified: true, // Auto-verify
            // verificationCode, // Removed
            createdAt: new Date().toISOString()
        });

        console.log(`[SIGNUP] User created successfully: ${newUser.id}`);

        // Create Full Session Immediately
        const cookieStore = await cookies();
        const cookieOptions = {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax' as const
        };

        cookieStore.set('session_role', role, cookieOptions);
        cookieStore.set('session_user_id', newUser.id, cookieOptions);
        cookieStore.set('onboarding_status', 'incomplete', cookieOptions);

        // Return success check instead of throwing
        return { success: true, email };

    } catch (error: any) {
        console.error("SIGNUP ERROR: [Redacted for security]");
        // Return a generic error to the client
        return { error: "An unexpected error occurred during signup." };
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



export async function login(formData: FormData) {
    const rawData = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    // 1. Rate Limit
    const email = rawData.email as string; // Check limits before validation parsing
    if (email && !checkRateLimit(`login:${email}`, AUTH_LIMIT)) {
        return { error: "Too many login attempts. Please try again later." };
    }

    const validatedFields = loginSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return { error: "Invalid input" };
    }

    const { email: validatedEmail, password } = validatedFields.data;

    const user = await db.users.findByEmail(validatedEmail);

    // Simple password check (in real app, use bcrypt.compare)
    if (!user || user.passwordHash !== password) {
        return { error: "Invalid email or password" };
    }

    // Set Session
    const cookieStore = await cookies();
    const cookieOptions = {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const
    };

    cookieStore.set('session_role', user.role, cookieOptions);
    cookieStore.set('session_user_id', user.id, cookieOptions);
    cookieStore.set('onboarding_status', user.onboardingStatus, cookieOptions);

    // Redirect based on role
    if (user.role === 'owner') {
        redirect('/platform/owner');
    } else if (user.role === 'customer') {
        redirect('/platform/decisions');
    } else {
        redirect('/applicant'); // Applicant/Default
    }
}

import { requireAuth } from '@/lib/auth-guard';

export async function completeOnboarding(role: UserRole, data?: unknown) {
    const session = await requireAuth();
    const userId = session.id;

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

    // Update Cookie
    const cookieStore = await cookies(); // Still need to update cookie
    cookieStore.set('onboarding_status', 'complete', { httpOnly: true, path: '/' });

    // Redirect
    if (role === 'owner') {
        redirect('/platform/owner');
    } else if (role === 'customer') {
        redirect('/platform/decisions');
    } else {
        redirect('/applicant'); // Applicant
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
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('session_user_id')?.value;
        if (!userId) return null;
        // In efficient app, might use a cached session, but reading DB is fine for this scale
        // Implementation of readDb is lightweight json
        return null; // Todo: implement getUserById if needed
    } catch (error) {
        return null;
    }
}
