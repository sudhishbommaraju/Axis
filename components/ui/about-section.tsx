"use client";

import React from 'react';
import { ShieldCheck, Target, Zap, TrendingDown, Users, BrainCircuit } from 'lucide-react';

const principles = [
    {
        title: "Constraints over guesswork",
        description: "Assumptions kill businesses. Axis enforces financial constraints to reveal what is actually possible.",
        icon: <Target className="w-5 h-5 text-red-500" />
    },
    {
        title: "Simulation over intuition",
        description: "Don't guess if you can afford it. Simulate the cash flow impact before committing a single dollar.",
        icon: <Zap className="w-5 h-5 text-yellow-500" />
    },
    {
        title: "Explainability",
        description: "No black box AI advice. Just clear, deterministic cause-and-effect showing why a decision passes or fails.",
        icon: <BrainCircuit className="w-5 h-5 text-blue-500" />
    },
    {
        title: "Risk Visibility",
        description: "See the cliff before you fall off it. We model infinite downside scenarios so you don't have to live them.",
        icon: <TrendingDown className="w-5 h-5 text-orange-500" />
    },
    {
        title: "Decision Support",
        description: "We don't replace the owner. We give the owner the flashlight to see in the dark.",
        icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />
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
                                Axis is a decision intelligence and risk simulation platform built specifically for local business owners. It sits between your ambition and your bank account, helping you understand which growth decisions are safe, which are risky, and which are impossible.
                            </p>
                            <p>
                                Too many good businesses fail because risks are invisible until it&apos;s too late. Axis changes that by simulating the financial impact of your decisions—hiring, marketing, expanding—before you sign the contract.
                            </p>
                        </div>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/20 space-y-4">
                        <h3 className="text-xl font-bold text-white">The Axis Promise</h3>
                        <p className="text-white font-medium">
                            We don&apos;t predict the future. We reveal the constraints of the present so you can survive the future.
                        </p>
                        <div className="pt-4 flex gap-4">
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-emerald-500">Zero</span>
                                <span className="text-xs text-neutral-500 uppercase tracking-wider">Hallucinations</span>
                            </div>
                            <div className="flex flex-col border-l border-white/10 pl-4">
                                <span className="text-2xl font-bold text-white">100%</span>
                                <span className="text-xs text-neutral-500 uppercase tracking-wider">Deterministic</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 2: What Axis Does */}
                <div className="space-y-8">
                    <div className="max-w-3xl">
                        <h3 className="text-2xl font-bold text-white">What Axis Does</h3>
                        <p className="mt-2 text-white italic font-medium">&quot;Simulate risk. Reveal tradeoffs. Enforce survival.&quot;</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Financial Snapshots", desc: "Connects to your real books (simulated) to establish a baseline of truth." },
                            { title: "Hiring Simulations", desc: "Test if you can truly afford that new employee, factoring in taxes, delays, and ramp-up." },
                            { title: "Runway Stress Tests", desc: "See exactly how long you survive under different burn rates and revenue drops." },
                            { title: "Tradeoff Analysis", desc: "Compare options side-by-side: Aggressive growth vs. Safe stability." }
                        ].map((feature, i) => (
                            <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <h4 className="font-bold text-white mb-2">{feature.title}</h4>
                                <p className="text-sm text-white/90 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step 3: Why Axis Exists */}
                <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 space-y-8">
                    <div className="max-w-3xl space-y-4">
                        <h3 className="text-2xl font-bold text-white">Why Axis Exists</h3>
                        <p className="text-white text-lg font-medium">
                            Local business decisions fail not because owners are careless, but because cash flow risks are complex and non-intuitive. Axis makes these risks visible instantly.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest">We Reveal The Hidden Costs</h4>
                            <ul className="space-y-3">
                                {[
                                    "Hidden payroll burdens & taxes",
                                    "Revenue lag from new marketing",
                                    "Compound burn rates",
                                    "The true cost of low runway"
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
                                &quot;Axis isn&apos;t here to tell you &apos;Good job&apos;. It&apos;s here to tell you &apos;You will run out of cash in 4 months if you hire Bob&apos;. That is actionable intelligence.&quot;
                            </p>
                        </div>
                    </div>
                </div>

                {/* Step 4: Design Principles */}
                <div className="space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <h3 className="text-2xl font-semibold text-white">Our Principles</h3>
                        <p className="text-neutral-400">Built for clarity in a world of noise.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
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
                        <h3 className="text-2xl font-semibold text-white">Who Use Axis?</h3>
                        <p className="text-neutral-400 leading-relaxed">
                            Axis is for decision-makers who want sleep at night. It&apos;s for owners who refuse to gamble with their employees&apos; livelihoods.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            "Local Business Owners",
                            "Founders Managing Runway",
                            "Operations Managers",
                            "Fiscal Conservatives"
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
