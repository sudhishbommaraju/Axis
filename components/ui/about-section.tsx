"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { ShieldCheck, Target, Zap, Search, Users } from 'lucide-react';

const principles = [
    {
        title: "Correctness over convenience",
        description: "System integrity is non-negotiable. We favor explicit manual verification over automated convenience if it preserves correctness.",
        icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />
    },
    {
        title: "Determinism over guesswork",
        description: "Every state transition must be reproducible. Chaos is simulated, not accidental.",
        icon: <Zap className="w-5 h-5 text-yellow-500" />
    },
    {
        title: "Explicit constraints",
        description: "Assumptions are the root of failure. Axis enforces invariants at the protocol level.",
        icon: <Target className="w-5 h-5 text-red-500" />
    },
    {
        title: "Defense-in-depth",
        description: "Multiple layers of verification ensure that even if one protocol fails, the system state remains valid.",
        icon: <Search className="w-5 h-5 text-blue-500" />
    },
    {
        title: "Explainability",
        description: "Audit trails are not just logs; they are human-readable narratives of system logic.",
        icon: <Users className="w-5 h-5 text-purple-500" />
    }
];

export function AboutSection() {
    return (
        <section id="about" className="relative w-full py-24 space-y-24 border-t border-white/5 bg-black/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6 space-y-16">

                {/* Step 1: Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            About Axis
                        </h2>
                        <div className="space-y-4 text-lg text-white leading-relaxed font-medium">
                            <p>
                                Axis is a systems platform designed to model, validate, and stress-test complex systems under real-world constraints. It acts as a decision authority layer, sitting between intent and execution to ensure that every action complies with defined system invariants.
                            </p>
                            <p>
                                In an era of rapid feature deployment, Axis prioritizes correctness, consistency, and resilience over speed. It is built for environments where failure is not an option and where &quot;eventual consistency&quot; is not enough.
                            </p>
                        </div>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/20 space-y-4">
                        <h3 className="text-xl font-bold text-white">Core Priority</h3>
                        <p className="text-white font-medium">
                            Axis operates on the principle that a system&apos;s strength is defined by its behavior under adversarial conditions. We don&apos;t just optimize for the happy path; we harden for the edge case.
                        </p>
                        <div className="pt-4 flex gap-4">
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-emerald-500">100%</span>
                                <span className="text-xs text-neutral-500 uppercase tracking-wider">Deterministic</span>
                            </div>
                            <div className="flex flex-col border-l border-white/10 pl-4">
                                <span className="text-2xl font-bold text-white">Invariant</span>
                                <span className="text-xs text-neutral-500 uppercase tracking-wider">Focused</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 2: What Axis Does */}
                <div className="space-y-8">
                    <div className="max-w-3xl">
                        <h3 className="text-2xl font-bold text-white">Capabilities</h3>
                        <p className="mt-2 text-white italic font-medium">&quot;Axis is a control and verification layer, not a dashboard.&quot;</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Process Simulation", desc: "Model financial, transactional, and operational processes with high fidelity." },
                            { title: "Invariant Enforcement", desc: "Hard-coding safety rules that cannot be bypassed by users or logic errors." },
                            { title: "Hostile Testing", desc: "Simulation of race conditions, concurrency, and invalid state injections." },
                            { title: "Deterministic Auditing", desc: "Complete traceability for every state change with zero guesswork." }
                        ].map((feature, i) => (
                            <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <h4 className="font-bold text-white mb-2">{feature.title}</h4>
                                <p className="text-sm text-white/90 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-3 pt-4">
                        <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium uppercase tracking-wider">Not Analytics</span>
                        <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium uppercase tracking-wider">Not Visualization Only</span>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium uppercase tracking-wider">Control Layer</span>
                    </div>
                </div>

                {/* Step 3: Why Axis Exists */}
                <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 space-y-8">
                    <div className="max-w-3xl space-y-4">
                        <h3 className="text-2xl font-bold text-white">Why Axis Exists</h3>
                        <p className="text-white text-lg font-medium">
                            Many system failures occur not because of obvious bugs, but because systems are never tested under real stress. Axis surfaces failure modes early — before they cause silent corruption or incidents.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest">Hostile Assumptions</h4>
                            <ul className="space-y-3">
                                {[
                                    "Requests arrive out of sequence",
                                    "Users will attempt forbidden states",
                                    "Inputs are malformed or malicious",
                                    "System operates under extreme saturation"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-neutral-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-black/40 p-6 rounded-xl border border-white/5 border-dashed">
                            <p className="text-sm text-neutral-400 italic leading-relaxed">
                                &quot;We assume the environment is hostile, the network is unreliable, and the clock is a liar. Axis builds confidence by proving resilience against these realities.&quot;
                            </p>
                        </div>
                    </div>
                </div>

                {/* Step 4: Design Principles */}
                <div className="space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <h3 className="text-2xl font-semibold text-white">Design Principles</h3>
                        <p className="text-neutral-400">The philosophical foundation of the Axis engine.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {principles.map((p, i) => (
                            <div key={i} className="space-y-3">
                                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                    {p.icon}
                                </div>
                                <h4 className="font-bold text-white">{p.title}</h4>
                                <p className="text-sm text-white/90 leading-relaxed font-medium">{p.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step 5: Who Axis Is For */}
                <div className="pt-16 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold text-white">Target Audience</h3>
                        <p className="text-neutral-400 leading-relaxed">
                            Axis is built for serious operators who need more than just monitoring. It is for those who need to guarantee system behavior.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            "Critical Systems Engineers",
                            "Financial Logic Developers",
                            "Compliance & Audit Teams",
                            "Scale & Concurrency Architects"
                        ].map((audience, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-sm font-medium text-neutral-300">{audience}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
