import React from 'react';
import { AxisBackground } from '@/components/ui/axis-background';
import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

interface AuthShellProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    footer?: React.ReactNode;
}

export function AuthShell({ children, title, subtitle, footer }: AuthShellProps) {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden font-sans">
            {/* 3D Background */}
            <AxisBackground />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-md p-6">
                <div className="flex flex-col items-center mb-8 space-y-2 text-center">
                    <div className="p-3 rounded-full bg-white/10 border border-white/10 mb-2">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
                    <p className="text-white/60 text-sm">{subtitle}</p>
                </div>

                {/* Glassmorphic Form Card */}
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
                    {children}
                </div>

                {footer && (
                    <div className="mt-6 text-center text-sm text-white/40">
                        {footer}
                    </div>
                )}
            </div>

            <div className="absolute bottom-6 text-xs text-white/20">
                Axis Decision Authority Layer v0.1.0
            </div>
        </div>
    );
}
