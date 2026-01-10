"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scene } from '@/components/ui/hero-section';
import { ShieldCheck, Lock, Activity } from 'lucide-react';
import { AboutSection } from '@/components/ui/about-section';
import { AxisSimulator } from '@/components/ui/axis-simulator';
import { motion } from 'framer-motion';

export default function LandingPage() {
    return (
        <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-white/20 pb-0">

            {/* 3D Scene Background */}
            <div className='absolute inset-0 z-0 pointer-events-none'>
                <Scene />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-start min-h-screen">
                <div className="w-full max-w-6xl">

                    {/* 1. HERO SECTION */}
                    <section className="flex flex-col items-center text-center space-y-10 pt-24 pb-32 px-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <Badge variant="secondary" className="backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20 px-4 py-2 rounded-full font-medium">
                            ✨ v1.0 System Operational
                        </Badge>

                        <div className="space-y-6 flex items-center justify-center flex-col">
                            <h1 className="text-5xl md:text-8xl font-bold tracking-tight max-w-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 leading-tight">
                                Axis Decision Authority
                            </h1>
                            <p className="text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed font-medium">
                                A system built for correctness, constraints, and resilience. <br className="hidden md:block" />
                                Axis sits between intent and execution to ensure every action complies with your system invariants.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 items-center pt-8">
                                <Button
                                    onClick={() => document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="text-sm px-10 py-7 rounded-xl bg-white text-black border border-white/10 shadow-lg shadow-white/5 hover:bg-white/90 hover:scale-105 transition-all duration-300 font-bold text-lg"
                                >
                                    Run Live Demo
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="text-sm px-10 py-7 rounded-xl bg-transparent text-white border border-white/20 shadow-none hover:bg-white/10 transition-all duration-300 font-semibold text-lg"
                                >
                                    <Link href="/signup">
                                        Create Account
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* 2. ABOUT AXIS SECTION */}
                    <div id="about">
                        <AboutSection />
                    </div>

                    {/* 3. AXIS SIMULATOR SECTION */}
                    <section id="simulator" className="relative w-full py-32 space-y-16 px-6 border-t border-white/5">
                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                                See Axis in Action
                            </h2>
                            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                                This live demo shows how Axis prevents invalid system states under concurrency.
                                Watch as it evaluates instructions against hard-coded invariants in real-time.
                            </p>
                        </div>

                        <div className="w-full animation-delay-500 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                            <AxisSimulator />
                        </div>

                        {/* 4. CONVERSION / TRUST CTA */}
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
                    </section>

                    {/* Footer */}
                    <footer className="py-24 border-t border-white/5 mx-6 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-neutral-500">
                        <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
                            <p className="font-bold text-white tracking-widest uppercase text-xs">Axis Systems</p>
                            <p>&copy; 2024 Axis Systems Inc. All rights reserved.</p>
                            <p className="text-[10px] text-neutral-600 font-mono italic mt-1">SYS_VER: 1.0.8_ALPHA_RELIABILITY_SYNC</p>
                        </div>
                        <div className="flex gap-8 text-neutral-400 font-medium">
                            <Link href="/login" className="hover:text-white transition-colors">Admin Login</Link>
                            <Link href="/security" className="hover:text-white transition-colors">Security</Link>
                            <Link href="#" className="hover:text-white transition-colors">Docs</Link>
                            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        </div>
                    </footer>

                </div>
            </div>
        </div>
    );
}
