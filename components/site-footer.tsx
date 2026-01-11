
"use client";

import Link from 'next/link';

export function SiteFooter() {
    return (
        <footer className="py-24 border-t border-white/5 mx-6 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-neutral-500 bg-black">
            <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
                <p className="font-bold text-white tracking-widest uppercase text-xs">Axis Systems</p>
                <p>&copy; 2024 Axis Systems Inc. All rights reserved.</p>
                <p className="text-[10px] text-neutral-600 font-mono italic mt-1">SYS_VER: 1.0.9_STABLE</p>
            </div>
            <div className="flex gap-8 text-neutral-400 font-medium">
                <Link href="/login" className="hover:text-white transition-colors">Admin Login</Link>
                <Link href="/security" className="hover:text-white transition-colors">Security</Link>
                <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
        </footer>
    );
}
