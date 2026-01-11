
"use client";

import React from 'react';
import { Scale, FileText, CheckCircle2 } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-32">
            <div className="max-w-4xl mx-auto px-6 pb-24 space-y-12 animate-in fade-in duration-700">

                <div className="space-y-4 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-400">
                        <Scale className="w-3 h-3" />
                        <span>LEGAL_PROTOCOL_V1</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Terms of Service</h1>
                    <p className="text-xl text-neutral-400 max-w-2xl">
                        Governing protocols for the Axis Decision Authority Layer.
                    </p>
                </div>

                <div className="space-y-8">
                    {[
                        {
                            title: "1. Service Usage",
                            content: "Axis provides decision intelligence and invariant enforcement services. Usage is subject to strict rate limits and fair use policies."
                        },
                        {
                            title: "2. Data Sovereignty",
                            content: "You retain full ownership of your decision models and financial data. Axis operates on a zero-knowledge basis where mathematically possible."
                        },
                        {
                            title: "3. Liability Limitations",
                            content: "While Axis enforces system correctness, ultimate financial liability for automated decisions remains with the operator."
                        }
                    ].map((section, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                {section.title}
                            </h3>
                            <p className="text-neutral-300 leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-emerald-500 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                    <CheckCircle2 className="w-5 h-5" />
                    <p>By using Axis, you cryptographically sign and acknowledge these terms.</p>
                </div>
            </div>
            <SiteFooter />
        </div>
    );
}
