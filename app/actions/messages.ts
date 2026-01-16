'use server'

import { cookies } from 'next/headers'
import { db, Message } from '@/lib/db'
import { revalidatePath } from 'next/cache'

// Helper to generate ID
const generateId = () => Math.random().toString(36).substring(2, 15);

export interface ConversationContact {
    userId: string;
    name: string;
    lastMessage?: string;
    lastMessageTime?: string;
}

import { messageSchema } from '@/lib/validations';
import { requireAuth } from '@/lib/auth-guard';

// ... imports

export async function sendMessage(receiverId: string, content: string) {
    const session = await requireAuth();
    const senderId = session.id;

    const validated = messageSchema.safeParse({ content });
    if (!validated.success) return { error: "Message content invalid (max 1000 chars)" };

    const newMessage: Message = {
        id: generateId(),
        senderId,
        receiverId,
        content,
        timestamp: new Date().toISOString(),
        read: false
    };

    await db.messages.create(newMessage);

    // Revalidate the messages page so the UI updates
    revalidatePath('/platform/messages');
    return { success: true, message: newMessage };
}

export async function getMessages(otherUserId: string) {
    const session = await requireAuth();
    const currentUserId = session.id;

    return await db.messages.getConversation(currentUserId, otherUserId);
}

export async function getConversations(): Promise<ConversationContact[]> {
    const session = await requireAuth();
    const currentUserId = session.id;

    const contactIds = await db.messages.getRecentContacts(currentUserId);

    // Enrich with user details and last message
    // Optimized: Fetch all users in one go
    const users = await db.users.getMany(contactIds);
    const userMap = new Map(users.map(u => [u.id, u]));

    const conversations: ConversationContact[] = [];

    for (const contactId of contactIds) {
        const user = userMap.get(contactId);
        if (!user) continue;

        // Get last message for context (Still N+1 for messages, but this is harder to optimize without a real Join)
        // Optimization: We could fetch ALL messages for current user once and filter in memory, 
        // but let's stick to this as messages might be large.
        // Actually, `getRecentContacts` iterates all messages already.
        // Ideally we refactor `getRecentContacts` to return the last message too.
        // But for now, fixing the User Lookup N+1 is a big win.
        const msgs = await db.messages.getConversation(currentUserId, contactId);
        const lastMsg = msgs[msgs.length - 1];

        conversations.push({
            userId: user.id,
            name: user.name,
            lastMessage: lastMsg?.content || '',
            lastMessageTime: lastMsg?.timestamp || ''
        });
    }

    // Sort by last message time
    return conversations.sort((a, b) => new Date(b.lastMessageTime || 0).getTime() - new Date(a.lastMessageTime || 0).getTime());
}
