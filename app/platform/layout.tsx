
import React from 'react';
import Link from 'next/link';

export default function PlatformLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/20">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="font-bold text-lg tracking-wider">AXIS</Link>
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
                            <Link href="/platform/decisions" className="text-white hover:text-white transition-colors">Decisions</Link>
                            <Link href="#" className="hover:text-white transition-colors">Live Monitor</Link>
                            <Link href="#" className="hover:text-white transition-colors">Settings</Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-10">
                {children}
            </main>
        </div>
    );
}
