import React from 'react';

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30 flex flex-col">
            {/* Minimal Header */}
            <header className="h-16 flex items-center justify-center border-b border-white/10 bg-neutral-950/50">
                <span className="font-bold tracking-widest text-lg">AXIS // ONBOARDING</span>
            </header>

            {/* Content */}
            <main className="flex-1 w-full max-w-3xl mx-auto p-6 flex flex-col justify-center">
                {children}
            </main>
        </div>
    );
}
