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

export async function sendMessage(receiverId: string, content: string) {
    const cookieStore = await cookies();
    const senderId = cookieStore.get('session_user_id')?.value;

    if (!senderId) return { error: "Not authenticated" };
    if (!content.trim()) return { error: "Empty message" };

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
    const cookieStore = await cookies();
    const currentUserId = cookieStore.get('session_user_id')?.value;
    if (!currentUserId) return [];

    return await db.messages.getConversation(currentUserId, otherUserId);
}

export async function getConversations(): Promise<ConversationContact[]> {
    const cookieStore = await cookies();
    const currentUserId = cookieStore.get('session_user_id')?.value;
    if (!currentUserId) return [];

    const contactIds = await db.messages.getRecentContacts(currentUserId);

    // Enrich with user details and last message
    const conversations: ConversationContact[] = [];

    for (const contactId of contactIds) {
        const user = await db.users.findById(contactId);
        if (!user) continue;

        // Get last message for context
        const msgs = await db.messages.getConversation(currentUserId, contactId);
        const lastMsg = msgs[msgs.length - 1];

        conversations.push({
            userId: user.id,
            name: user.name, // In real app, might want business name too
            lastMessage: lastMsg?.content || '',
            lastMessageTime: lastMsg?.timestamp || ''
        });
    }

    // Sort by last message time
    return conversations.sort((a, b) => new Date(b.lastMessageTime || 0).getTime() - new Date(a.lastMessageTime || 0).getTime());
}
