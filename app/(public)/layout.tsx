import React from 'react';
import { AxisBackground } from '@/components/ui/axis-background';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* Global 3D Background - Fixed to viewport for consistent parallax-like feel (though R3F is handling movement) */}
            <div className="fixed inset-0 z-0">
                <AxisBackground />
            </div>

            {/* Content Layer - consistent z-index */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
