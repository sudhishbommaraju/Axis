"use client"

import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
                <p className="text-xs font-mono uppercase tracking-widest text-emerald-500/80 animate-pulse">Initializing Axis Protocol...</p>
            </div>
        </div>
    )
}
