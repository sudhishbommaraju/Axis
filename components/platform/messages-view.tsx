'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ConversationContact, sendMessage, getMessages } from '@/app/actions/messages';
import { Button } from '@/components/ui/button'; // Assuming button exists
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageSquare, Video, Send, User, MoreVertical } from 'lucide-react';
import { Message } from '@/lib/db';
import { cn } from '@/lib/utils';

interface MessagesViewProps {
    initialConversations: ConversationContact[];
    initialActiveId?: string; // If valid ID passed via ?to=
    initialActiveName?: string; // Name if starting fresh
    currentUserId: string;
}

export function MessagesView({ initialConversations, initialActiveId, initialActiveName, currentUserId }: MessagesViewProps) {
    const router = useRouter();
    const [conversations, setConversations] = useState(initialConversations);
    const [activeId, setActiveId] = useState<string | undefined>(initialActiveId || initialConversations[0]?.userId);
    const [activeMessages, setActiveMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Derived state for display
    const activeContact = conversations.find(c => c.userId === activeId) ||
        (activeId ? { userId: activeId, name: initialActiveName || 'Unknown User' } as ConversationContact : null);

    // Fetch messages when active ID changes
    useEffect(() => {
        if (activeId) {
            getMessages(activeId).then(msgs => setActiveMessages(msgs));
        }
    }, [activeId]);

    const handleSend = async () => {
        if (!activeId || !inputText.trim()) return;

        const tempId = Math.random().toString();
        const optimisticMsg: Message = {
            id: tempId,
            senderId: currentUserId,
            receiverId: activeId,
            content: inputText,
            timestamp: new Date().toISOString(),
            read: false
        };

        // Optimistic update
        setActiveMessages(prev => [...prev, optimisticMsg]);
        setInputText('');

        await sendMessage(activeId, optimisticMsg.content);

        // Refresh real data in background
        const realMsgs = await getMessages(activeId);
        setActiveMessages(realMsgs);
        router.refresh(); // Refresh server stats if needed
    };

    const handleVideoCall = async () => {
        if (!activeId) return;

        // Generate a unique room name
        const roomName = `Axis_${[currentUserId, activeId].sort().join('_')}_${Date.now()}`;
        const meetUrl = `https://meet.jit.si/${roomName}`;

        const callMsg = `📞 Started a video call: ${meetUrl}`;

        // Send link as message
        await sendMessage(activeId, callMsg);

        // Open in new tab
        window.open(meetUrl, '_blank');

        // Refresh view
        const realMsgs = await getMessages(activeId);
        setActiveMessages(realMsgs);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-120px)] gap-6">

            {/* Sidebar List */}
            <Card className="bg-neutral-950 border-white/10 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-white/10 bg-black/40">
                    <h2 className="font-bold text-white flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2" /> Messages
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {conversations.length === 0 && !initialActiveId && (
                        <div className="text-center text-neutral-500 py-8 text-sm">
                            No messages yet.
                        </div>
                    )}

                    {/* If we are starting a new chat with someone not in list, show them as active tmp */}
                    {activeId && !conversations.find(c => c.userId === activeId) && (
                        <button
                            className="w-full text-left p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                        >
                            <div className="flex justify-between items-start">
                                <span className="font-medium text-white">{activeContact?.name}</span>
                            </div>
                            <p className="text-xs text-emerald-500 truncate mt-1">Starting new conversation...</p>
                        </button>
                    )}

                    {conversations.map(c => (
                        <button
                            key={c.userId}
                            onClick={() => setActiveId(c.userId)}
                            className={cn(
                                "w-full text-left p-3 rounded-lg transition-colors border",
                                activeId === c.userId
                                    ? "bg-emerald-500/10 border-emerald-500/20"
                                    : "bg-transparent border-transparent hover:bg-white/5"
                            )}
                        >
                            <div className="flex justify-between items-start">
                                <span className={cn("font-medium", activeId === c.userId ? "text-white" : "text-neutral-300")}>
                                    {c.name}
                                </span>
                                <span className="text-[10px] text-neutral-500">
                                    {c.lastMessageTime && new Date(c.lastMessageTime).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-xs text-neutral-500 truncate mt-1">
                                {c.lastMessage}
                            </p>
                        </button>
                    ))}
                </div>
            </Card>

            {/* Chat Area */}
            <Card className="md:col-span-2 bg-neutral-950 border-white/10 flex flex-col overflow-hidden relative">
                {!activeId ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-neutral-500">
                        <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                        <p>Select a conversation to start messaging</p>
                    </div>
                ) : (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold">
                                    {activeContact?.name.charAt(0)}
                                </div>
                                <span className="font-bold text-white">{activeContact?.name}</span>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="ghost" className="text-neutral-400 hover:text-white" onClick={handleVideoCall}>
                                    <Video className="w-4 h-4 mr-2" />
                                    Video Call
                                </Button>
                            </div>
                        </div>

                        {/* Messages Feed */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col-reverse">
                            {/* Flex col reverse to keep scroll at bottom naturally? No, standard is map regular and auto scroll. 
                                Let's use flex-col and map normal. */}
                            <div className="flex-1" />
                            {activeMessages.map((msg) => {
                                const isMe = msg.senderId === currentUserId;
                                return (
                                    <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                                        <div className={cn(
                                            "max-w-[70%] p-3 rounded-2xl text-sm",
                                            isMe
                                                ? "bg-emerald-500 text-black rounded-tr-none"
                                                : "bg-white/10 text-white rounded-tl-none"
                                        )}>
                                            {msg.content}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-black/40 border-t border-white/10">
                            <div className="flex gap-2">
                                <Input
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type a message..."
                                    className="bg-white/5 border-white/10 text-white"
                                />
                                <Button onClick={handleSend} className="bg-emerald-500 text-black hover:bg-emerald-400">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
}
