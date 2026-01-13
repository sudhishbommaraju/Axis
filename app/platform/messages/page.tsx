import { getConversations } from '@/app/actions/messages';
import { getPublicProfile } from '@/app/actions/profile';
import { MessagesView } from '@/components/platform/messages-view';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function MessagesPage({ searchParams }: { searchParams: { to?: string } }) {
    const cookieStore = await cookies();
    const currentUserId = cookieStore.get('session_user_id')?.value;

    if (!currentUserId) {
        redirect('/login');
    }

    const conversations = await getConversations();

    let initialActiveId = searchParams.to;
    let initialActiveName = undefined;

    if (initialActiveId) {
        // Fetch name if we have a "to" param
        const profile = await getPublicProfile(initialActiveId);
        if (profile) {
            initialActiveName = profile.name;
        }
    }

    return (
        <div className="pb-20 pt-4">
            <MessagesView
                initialConversations={conversations}
                initialActiveId={initialActiveId}
                initialActiveName={initialActiveName}
                currentUserId={currentUserId}
            />
        </div>
    );
}
