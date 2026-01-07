"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scene } from '@/components/ui/hero-section';
import { BentoGrid, BentoItem } from '@/components/ui/bento-grid';
import { ShieldCheck, Lock, Layers, History, TrendingUp, Activity, Database, AlertOctagon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Axis-specific Bento Items
const axisFeatures: BentoItem[] = [
    {
        title: "Real Spending Power",
        meta: "Live Calculation",
        description: "Your bank balance minus commitments, safety buffers, and near-term payables. The only number that matters.",
        icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
        status: "Core Logic",
        tags: ["Finance", "Safety", "Real-time"],
        colSpan: 2,
        hasPersistentHover: true,
    },
    {
        title: "Risk State Machine",
        meta: "Automated",
        description: "Dynamically switches between Stable, Tight, and Fragile modes based on runway.",
        icon: <Activity className="w-5 h-5 text-yellow-500" />,
        status: "Active",
        tags: ["Protection", "Governance"],
    },
    {
        title: "Decision Memory",
        meta: "Immutable",
        description: "A permanent ledger of every hiring decision, subscription, and contract ever approved.",
        icon: <Database className="w-5 h-5 text-purple-500" />,
        tags: ["Audit", "History"],
        colSpan: 2,
    },
    {
        title: "Safety Rules",
        meta: "Hard Blocking",
        description: "Prevents making commitments that would breach your defined survival buffer.",
        icon: <ShieldCheck className="w-5 h-5 text-red-500" />,
        status: "Enforced",
        tags: ["Compliance", "Invariants"],
    },
];

export default function LandingPage() {
    return (
        <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-white/20">

            {/* 3D Scene Background - Absolute, behind everything */}
            <div className='absolute inset-0 z-0'>
                <Scene />
            </div>

            {/* Main Content - Relative z-10 for interaction */}
            <div className="relative z-10 flex flex-col items-center justify-start p-8 pt-32 pb-24 min-h-screen">
                <div className="w-full max-w-6xl space-y-24">

                    {/* Hero Section */}
                    <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <Badge variant="secondary" className="backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20 px-4 py-2 rounded-full font-medium">
                            ✨ v1.0 System Operational
                        </Badge>

                        <div className="space-y-6 flex items-center justify-center flex-col">
                            <h1 className="text-4xl md:text-7xl font-semibold tracking-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                                Decision Authority Layer <br /> for Businesses
                            </h1>
                            <p className="text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed">
                                Axis sits between intent and action to enforce financial survival. <br className="hidden md:block" />
                                Designed for serious operators who value reality over forecasts.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 items-center pt-4">
                                <Link href="/login">
                                    <Button className="text-sm px-8 py-6 rounded-xl bg-white text-black border border-white/10 shadow-lg shadow-white/5 hover:bg-white/90 hover:scale-105 transition-all duration-300 font-semibold text-base">
                                        Enter Axis
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button className="text-sm px-8 py-6 rounded-xl bg-transparent text-white border border-white/20 shadow-none hover:bg-white/10 transition-all duration-300 font-medium text-base">
                                        Create Account
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Bento Grid Section */}
                    <div className="w-full flex justify-center animate-in fade-in zoom-in duration-1000 delay-300 fill-mode-forwards opacity-0" style={{ animationFillMode: 'forwards' }}>
                        <BentoGrid items={axisFeatures} />
                    </div>

                </div>
            </div>

            {/* Continuation of Axis Content (Styled to match new aesthetic) */}
            <BottomSections />

        </div>
    );
}

function BottomSections() {
    return (
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-24 space-y-32">

            {/* The Problem */}
            <section className="grid md:grid-cols-2 gap-16 items-center border-t border-white/10 pt-24">
                <div className="space-y-6">
                    <h2 className="text-3xl font-semibold tracking-tight text-white">Why Businesses Die</h2>
                    <p className="text-neutral-400 text-lg leading-relaxed">
                        It isn't lack of vision. It's the invisible accumulation of commitments.
                        Subscriptions, hires, and contracts compound into a fixed-cost structure that outpaces reality.
                        By the time the P&L arrives, the money is gone.
                    </p>
                </div>
                <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-neutral-500 font-mono text-sm">
                        [ P&L Lag: -30 Days ] <br />
                        [ Cash Burn: Accelerating ] <br />
                        [ Runway: &lt; 3 Months ]
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="pt-24 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-500">
                <p>&copy; 2024 Axis Systems Inc.</p>
                <div className="flex gap-6 text-neutral-400">
                    <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                    <Link href="#" className="hover:text-white transition-colors">Security</Link>
                </div>
            </footer>
        </div>
    )
}
