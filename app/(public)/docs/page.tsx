"use client";

import React from 'react';
import { FileText, ChevronRight, BookOpen, Terminal, Code } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DocsPage() {
    return (
        <div className="relative min-h-screen w-full bg-black text-white pt-32 pb-24 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-emerald-500 mb-2">
                        <BookOpen className="w-6 h-6" />
                        <span className="text-sm font-bold uppercase tracking-widest">Documentation</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">System Architecture & Protocol</h1>
                    <p className="text-xl text-neutral-200 leading-relaxed max-w-2xl">
                        Detailed technical specifications for the Axis decision authority layer and its underlying invariant enforcement engine.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        {
                            title: "Quick Start",
                            description: "Integrate Axis into your existing high-load transactional systems.",
                            icon: <Terminal className="w-5 h-5 text-blue-500" />
                        },
                        {
                            title: "API Reference",
                            description: "Complete specification for invariant definitions and state transitions.",
                            icon: <Code className="w-5 h-5 text-purple-500" />
                        },
                        {
                            title: "Protocol Design",
                            description: "Deep dive into the deterministic engine and consensus mechanisms.",
                            icon: <FileText className="w-5 h-5 text-orange-500" />
                        }
                    ].map((item, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-neutral-200 mb-6 leading-relaxed">{item.description}</p>
                            <Button variant="link" className="text-emerald-500 p-0 h-auto font-semibold hover:text-emerald-400">
                                Explore Module <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="p-12 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 text-center space-y-6">
                    <h2 className="text-2xl font-bold text-white">Need Technical Support?</h2>
                    <p className="text-neutral-200 max-w-xl mx-auto">
                        Our engineering team is available for deep architectural reviews and custom invariant modeling.
                    </p>
                    <Link href="/contact" className="inline-block px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-white/90 transition-all">
                        Contact Engineering
                    </Link>
                </div>
            </div>
        </div>
    );
}
