'use server'

import { cookies } from 'next/headers'
import { db, UserRole } from '@/lib/db'

export interface PublicProfile {
    id: string;
    name: string;
    role: UserRole;
    joinedAt: string;
    businessName?: string; // From onboarding data
    industry?: string;    // From onboarding data
    bio?: string;         // From onboarding data
    isOwnProfile: boolean;
    visitCount?: number;  // Only visible if isOwnProfile
}

import { getSession } from '@/lib/auth-guard';

export async function getPublicProfile(targetUserId: string): Promise<PublicProfile | null> {
    const targetUser = await db.users.findById(targetUserId);
    if (!targetUser) return null;

    // Get current session to check identity
    const session = await getSession();
    const currentUserId = session?.id;
    const isOwnProfile = currentUserId === targetUserId;

    // Increment visit count if viewed by someone else AND authenticated
    if (currentUserId && !isOwnProfile) {
        // optimistically increment (fire and forget to not slow down response too much)
        await db.users.incrementVisits(targetUserId);
    }

    // Fetch onboarding data for rich profile info
    const onboarding = await db.onboarding.getByUserId(targetUserId);
    const data = onboarding?.data || {};

    return {
        id: targetUser.id,
        name: targetUser.name,
        role: targetUser.role,
        joinedAt: targetUser.createdAt,
        businessName: data.businessName || undefined,
        industry: data.industry || undefined,
        bio: data.bio || undefined,
        isOwnProfile,
        visitCount: isOwnProfile ? (targetUser.visitCount || 0) : undefined
    };
}
