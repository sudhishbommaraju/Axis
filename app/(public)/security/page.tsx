"use client";

import React from 'react';
import { ShieldAlert, Fingerprint, Lock, ShieldCheck, Search, Activity } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SiteFooter } from '@/components/site-footer';

export default function SecurityPage() {
    return (
        <div className="relative min-h-screen w-full bg-black text-white pt-32 pb-0 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-emerald-500 mb-2">
                        <Lock className="w-6 h-6" />
                        <span className="text-sm font-bold uppercase tracking-widest">Trust & Safety</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">Security Protocol</h1>
                    <p className="text-xl text-neutral-200 leading-relaxed max-w-2xl">
                        Axis is built on a foundation of military-grade security and cryptographically verifiable audit trails.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        {
                            title: "Encryption at Rest",
                            description: "All system state and ledger data is encrypted using AES-256-GCM.",
                            icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />
                        },
                        {
                            title: "Hostile Audit",
                            description: "Continuous autonomous stress testing and vulnerability scanning.",
                            icon: <Search className="w-5 h-5 text-blue-500" />
                        },
                        {
                            title: "Access Control",
                            description: "Multi-factor authentication and role-based access for all operations.",
                            icon: <Fingerprint className="w-5 h-5 text-purple-500" />
                        },
                        {
                            title: "Real-time Monitoring",
                            description: "Instant alerts and automated response for suspicious state transitions.",
                            icon: <Activity className="w-5 h-5 text-orange-500" />
                        }
                    ].map((item, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-neutral-200 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>

                <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-center gap-6 mb-24">
                    <ShieldAlert className="w-12 h-12 text-red-500 shrink-0" />
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-white">Vulnerability Disclosure</h3>
                        <p className="text-neutral-300">
                            Found a security issue? Report it to our team at <span className="text-white font-mono">security@axis.systems</span>.
                        </p>
                    </div>
                </div>
            </div>
            <SiteFooter />
        </div>
    );
}
