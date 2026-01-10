"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Lock } from 'lucide-react';
import { AxisSimulator } from '@/components/ui/axis-simulator';

export default function DemoPage() {
    return (
        <div className="relative min-h-screen w-full bg-black text-white selection:bg-white/20">
            <div className="relative z-10 flex flex-col items-center justify-start min-h-screen pt-24 pb-32">
                <div className="w-full max-w-6xl px-6">

                    {/* Simulator Section */}
                    <div id="simulator" className="relative w-full space-y-16">
                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                                See Axis in Action
                            </h2>
                            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                                This live demo shows how Axis prevents invalid system states under concurrency.
                                Watch as it evaluates instructions against hard-coded invariants in real-time.
                            </p>
                        </div>

                        <div className="w-full animate-in fade-in slide-in-from-bottom-10 duration-1000">
                            <AxisSimulator />
                        </div>

                        {/* Conversion / Trust CTA */}
                        <div className="max-w-4xl mx-auto pt-24 text-center">
                            <div className="p-12 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 via-neutral-900/50 to-transparent border border-white/10 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                <div className="relative z-10 space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                            Model Your Own System with Axis
                                        </h3>
                                        <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed font-medium">
                                            The live demo shows a fixed scenario. <br className="hidden md:block" />
                                            Create an account to define your own systems, constraints, and stress tests.
                                        </p>
                                    </div>

                                    <Button
                                        asChild
                                        className="h-14 px-12 rounded-2xl bg-emerald-500 text-black hover:bg-emerald-400 hover:scale-105 transition-all duration-300 font-bold text-lg shadow-[0_20px_40px_rgba(16,185,129,0.2)]"
                                    >
                                        <Link href="/signup">
                                            Create Account
                                        </Link>
                                    </Button>

                                    <div className="flex items-center justify-center gap-6 pt-4">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Enterprise Ready</span>
                                        </div>
                                        <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                                            <Lock className="w-4 h-4 text-emerald-500" />
                                            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Immutable Logs</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer / Back */}
                    <div className="mt-24 text-center">
                        <Link href="/" className="text-neutral-500 hover:text-white transition-colors flex items-center justify-center gap-2 group">
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Landing Page
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
