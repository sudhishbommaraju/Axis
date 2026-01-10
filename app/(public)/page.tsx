"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scene } from '@/components/ui/hero-section';
import { BentoGrid, BentoItem } from '@/components/ui/bento-grid';
import {
    ShieldCheck, Lock, Layers, History, TrendingUp, Activity, Database,
    AlertOctagon, Home, LogIn, UserPlus, FileText, Globe, Cpu, Network,
    Bell, Key, Fingerprint, BarChart3, Workflow, Briefcase, TrendingDown, Info
} from 'lucide-react';
import { AboutSection } from '@/components/ui/about-section';
import { cn } from '@/lib/utils';

// 1. Core Logic (The Brain)
const coreFeatures: BentoItem[] = [
    {
        title: "Real Spending Power",
        meta: "Live Calculation",
        description: "Your bank balance minus commitments, safety buffers, and near-term payables. The only number that matters.",
        icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
        status: "Core Logic",
        tags: ["Finance", "Safety"],
        colSpan: 2,
        hasPersistentHover: true,
    },
    {
        title: "Risk State Machine",
        meta: "Automated",
        description: "Dynamically switches between Stable, Tight, and Fragile modes based on runway.",
        icon: <Activity className="w-5 h-5 text-yellow-500" />,
        status: "Active",
        tags: ["Protection"],
    },
    {
        title: "Decision Memory",
        meta: "Immutable",
        description: "A permanent ledger of every hiring decision, subscription, and contract with 'why' and 'who'.",
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
        tags: ["Compliance"],
    },
];

// 2. Security & Operations (The Shield)
const securityFeatures: BentoItem[] = [
    {
        title: "Role-Based Access",
        description: "Granular permissions for Founders, CFOs, and Department Heads.",
        icon: <Key className="w-5 h-5 text-orange-500" />,
        tags: ["Security", "RBAC"],
    },
    {
        title: "Audit Trails",
        description: "Cryptographically verifiable logs of every user action and system change.",
        icon: <Fingerprint className="w-5 h-5 text-blue-500" />,
        colSpan: 1,
    },
    {
        title: "SSO & SAML",
        description: "Enterprise-grade identity integration for seamless onboarding.",
        icon: <Briefcase className="w-5 h-5 text-pink-500" />,
        tags: ["Enterprise"],
    },
];

// 3. Integrations & Intelligence (The Network)
const moduleFeatures: BentoItem[] = [
    {
        title: "AI Compliance",
        description: "Automated checks against employment law and tax jurisdiction for every hire.",
        icon: <Cpu className="w-5 h-5 text-sky-500" />,
        tags: ["Legal", "AI"],
        colSpan: 2,
    },
    {
        title: "Context-Aware Alerts",
        description: "Slack & Email notifications when risk states change or runway drops.",
        icon: <Bell className="w-5 h-5 text-yellow-500" />,
        tags: ["Notifications"],
    },
    {
        title: "Global Payroll Sync",
        description: "Connects with Deel, Rippling, and Gusto to enforce salary caps.",
        icon: <Globe className="w-5 h-5 text-indigo-500" />,
    },
    {
        title: "SaaS Vendor Network",
        description: "Pre-vetted integration with major providers for automated cost tracking.",
        icon: <Network className="w-5 h-5 text-teal-500" />,
        colSpan: 2,
    },
];


export default function LandingPage() {
    const router = useRouter();

    return (
        <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-white/20 pb-32">

            {/* 3D Scene Background - Absolute, behind everything */}
            <div className='absolute inset-0 z-0 pointer-events-none'>
                <Scene />
            </div>

            {/* Main Content - Relative z-10 for interaction */}
            <div className="relative z-10 flex flex-col items-center justify-start p-8 pt-10 pb-24 min-h-screen">
                <div className="w-full max-w-6xl space-y-10">

                    {/* Hero Section */}
                    <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <Badge variant="secondary" className="backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20 px-4 py-2 rounded-full font-medium">
                            ✨ v1.0 System Operational
                        </Badge>

                        <div className="space-y-4 flex items-center justify-center flex-col">
                            <h1 className="text-4xl md:text-7xl font-semibold tracking-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                                Decision Authority Layer <br /> for Businesses
                            </h1>
                            <p className="text-lg md:text-xl text-white max-w-2xl leading-relaxed font-medium">
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

                    {/* Section 1: Core Logic (Bento) */}
                    <div className="space-y-4">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold text-white">The Core Engine</h2>
                            <p className="text-white font-medium">Survival invariants enforced by code.</p>
                        </div>
                        <div className="w-full flex justify-center">
                            <BentoGrid items={coreFeatures} />
                        </div>
                    </div>

                    {/* Section 2: Security & Operations */}
                    <div className="space-y-4">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-semibold text-white">Security & Control</h2>
                            <p className="text-neutral-400">Military-grade governance for your capital.</p>
                        </div>
                        <div className="w-full flex justify-center">
                            <BentoGrid items={securityFeatures} />
                        </div>
                    </div>

                    {/* Section 3: Integrations (Bento) */}
                    <div className="space-y-4">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-semibold text-white">Intelligence Layer</h2>
                            <p className="text-neutral-400">Connected to your entire financial stack.</p>
                        </div>
                        <div className="w-full flex justify-center">
                            <BentoGrid items={moduleFeatures} />
                        </div>
                    </div>

                    {/* About Section */}
                    <AboutSection />

                </div>
            </div>

            {/* Continuation of Axis Content */}
            <BottomSections />

        </div>
    );
}

// 4. The Problem (Why Businesses Die)
const problemFeatures: BentoItem[] = [
    {
        title: "The Invisible Accumulation",
        description: "It isn't lack of vision. It's the invisible accumulation of commitments. Subscriptions, hires, and contracts compound into a fixed-cost structure that outpaces reality.",
        icon: <TrendingDown className="w-5 h-5 text-red-500" />,
        tags: ["Burn", "OpEx"],
        colSpan: 2,
    },
    {
        title: "Financial Lag",
        description: "By the time the P&L arrives, the money is gone. [Lag: -30 Days] [Runway: < 3 Months]",
        icon: <AlertOctagon className="w-5 h-5 text-orange-500" />,
        status: "Critical",
    },
];

function BottomSections() {
    return (
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-24 space-y-16">

            {/* The Problem (Converted to Bento) */}
            <div className="space-y-4 pt-10 border-t border-white/10">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-semibold text-white">Why Businesses Die</h2>
                    <p className="text-neutral-400">The math doesn't wait for your vision.</p>
                </div>
                <div className="w-full flex justify-center">
                    <BentoGrid items={problemFeatures} />
                </div>
            </div>

            {/* Footer */}
            <footer className="pt-24 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-500 pb-32">
                <div className="flex flex-col gap-1">
                    <p>&copy; 2024 Axis Systems Inc.</p>
                    <p className="text-[10px] text-neutral-600 font-mono italic">SYS_REF: {new Date().toISOString().split('T')[0]}_v1.0.4_FINAL</p>
                </div>
                <div className="flex gap-6 text-neutral-400">
                    <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                    <Link href="#" className="hover:text-white transition-colors">Security</Link>
                </div>
            </footer>
        </div>
    )
}
