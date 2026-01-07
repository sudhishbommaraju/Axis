"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scene } from '@/components/ui/hero-section';
import { ShieldCheck, Lock, Layers, History, ArrowRight, StopCircle, Activity, Brain, Zap } from 'lucide-react';
import { cn } from '@/lib/utils'; // Ensure cn is imported if used, though strict DemoOne didn't use it in map

const features = [
    {
        icon: ShieldCheck,
        title: "Decision Authority",
        description: "Validates actions before they happen. Not after.",
    },
    {
        icon: Lock,
        title: "Risk Engine",
        description: "Blocks commitments that breach safety rules.",
    },
    {
        icon: Layers,
        title: "Operating System",
        description: "Manages the state of your business risk structure.",
    },
    {
        icon: History,
        title: "Institutional Memory",
        description: "A permanent ledger of intent and outcome.",
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
            <div className="relative z-10 flex flex-col items-center justify-center p-8 pt-32 pb-24 min-h-screen">
                <div className="w-full max-w-6xl space-y-16">

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

                    {/* Features Grid (Glassmorphism) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full animate-in fade-in zoom-in duration-1000 delay-300 fill-mode-forwards opacity-0" style={{ animationFillMode: 'forwards' }}>
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 h-48 flex flex-col justify-between items-start hover:bg-white/10 transition-colors duration-300 group"
                            >
                                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors text-white">
                                    <feature.icon size={20} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-base font-medium text-white">{feature.title}</h3>
                                    <p className="text-sm text-neutral-400 leading-snug">{feature.description}</p>
                                </div>
                            </div>
                        ))}
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
            <section className="grid md:grid-cols-2 gap-16 items-center">
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

            {/* Spending Power */}
            <section className="text-center space-y-12">
                <div className="space-y-6">
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 px-4 py-1">
                        Core Logic
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                        Real Spending Power
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                        Your bank balance is a lie. Axis subtracts obligations from cash to show the truth.
                    </p>
                </div>
                <div className="inline-block p-12 rounded-[2.5rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-md">
                    <span className="text-6xl md:text-8xl font-bold tracking-tighter text-white tabular-nums block">
                        $142,380
                    </span>
                    <span className="text-sm text-emerald-400 uppercase tracking-widest mt-4 block">
                        True Available Capital
                    </span>
                </div>
            </section>

            {/* Risk States */}
            <section className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-semibold text-white">Risk States</h2>
                        <p className="text-neutral-400">Three structural modes of operation.</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    <RiskCard title="Stable" color="bg-emerald-500" desc="Buffer full. Normal ops." />
                    <RiskCard title="Tight" color="bg-yellow-500" desc="Buffer compressing. Scrutiny up." />
                    <RiskCard title="Fragile" color="bg-red-500" desc="Buffer breached. Survival mode." />
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

function RiskCard({ title, color, desc }: { title: string, color: string, desc: string }) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className={cn("w-2 h-2 rounded-full mb-4", color)} />
            <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
            <p className="text-sm text-neutral-400">{desc}</p>
        </div>
    );
}
