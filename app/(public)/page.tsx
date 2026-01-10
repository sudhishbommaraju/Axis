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
        <div className="relative min-h-screen w-full bg-black text-white overflow-x-hidden font-sans selection:bg-white/20 pb-0">

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
                                    asChild
                                    className="text-sm px-10 py-7 rounded-xl bg-white text-black border border-white/10 shadow-lg shadow-white/5 hover:bg-white/90 hover:scale-105 transition-all duration-300 font-bold text-lg"
                                >
                                    <Link href="/demo">
                                        Run Live Demo
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* 2. ABOUT AXIS SECTION */}
                    <div id="about">
                        <AboutSection />
                    </div>

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
