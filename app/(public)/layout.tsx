import React from 'react';
import { AxisBackground } from '@/components/ui/axis-background';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className="bg-black min-h-screen text-white antialiased selection:bg-emerald-500/30 selection:text-emerald-200">

                {/* Layer 0: Global Background (Fixed, Passive) */}
                <AxisBackground className="fixed inset-0 z-0 pointer-events-none opacity-20" />

                {/* Layer 1: Content (Relative, Interactive) */}
                <main className="relative z-10 w-full min-h-screen flex flex-col">
                    {children}
                </main>

            </body>
        </html>
    );
}
