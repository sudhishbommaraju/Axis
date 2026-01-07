import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Lock, Activity } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="w-full max-w-5xl mx-auto px-6 pb-32">

            {/* SECTION 1: HEADER / HERO (Text Priority) */}
            <header className="pt-32 pb-24 space-y-8">
                <div className="space-y-4">
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase">
                        Axis
                    </h1>
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white max-w-3xl leading-[1.1]">
                        Decision Authority Layer <br /> for Businesses.
                    </h2>
                </div>

                <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl leading-relaxed border-l-2 border-emerald-500/50 pl-6">
                    Axis sits between intent and action to enforce financial survival.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                    <Link href="/login">
                        <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-full h-12 px-8 text-base font-medium">
                            Enter Axis
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 rounded-full h-12 px-8 text-base font-medium">
                            Create Account
                        </Button>
                    </Link>
                </div>
            </header>

            {/* SECTION 2: PROBLEM STATEMENT */}
            <section className="py-24 border-t border-white/10 space-y-8">
                <h3 className="text-sm font-mono text-emerald-500 uppercase tracking-widest">The Problem</h3>
                <div className="space-y-6 max-w-2xl text-lg text-white/70 leading-relaxed">
                    <p>
                        Businesses rarely fail due to a lack of product-market fit in the growth phase.
                        They fail because commitments accumulate invisibly.
                    </p>
                    <p>
                        Subscriptions, hires, contracts, and "small" raises compound into a fixed-cost structure
                        that outpaces awareness. By the time the P&L arrives, the money is already gone.
                    </p>
                </div>
            </section>

            {/* SECTION 3: DEFINITION (Grid) */}
            <section className="py-24 border-t border-white/10">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white">Axis Is</h3>
                        <ul className="space-y-4 text-white/70">
                            <li className="flex gap-3 items-baseline">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 translate-y-0.5" />
                                <span>A Decision Authority Layer</span>
                            </li>
                            <li className="flex gap-3 items-baseline">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 translate-y-0.5" />
                                <span>A Financial Risk Enforcement Engine</span>
                            </li>
                            <li className="flex gap-3 items-baseline">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 translate-y-0.5" />
                                <span>Institutional Memory for Commitments</span>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white/50">Axis Is Not</h3>
                        <ul className="space-y-4 text-white/40">
                            <li className="flex gap-3 items-baseline">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20 translate-y-0.5" />
                                <span>Budgeting Software</span>
                            </li>
                            <li className="flex gap-3 items-baseline">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20 translate-y-0.5" />
                                <span>Forecasting / Simulations</span>
                            </li>
                            <li className="flex gap-3 items-baseline">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20 translate-y-0.5" />
                                <span>AI Advice Chatbot</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* SECTION 4: CORE LOGIC */}
            <section className="py-24 border-t border-white/10 space-y-12">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white">The Primitive: Decision Object</h3>
                        <p className="text-white/70 leading-relaxed">
                            In Axis, you do not "spend". You create a Decision.
                            This object captures intent, reversibility, and financial commitment
                            <em>before</em> any transaction occurs.
                        </p>
                    </div>

                    {/* Simple Visualization */}
                    <div className="p-6 rounded-lg border border-white/10 bg-white/5 font-mono text-sm space-y-3">
                        <div className="flex justify-between text-white/30 text-xs uppercase tracking-wider">
                            <span>Decision ID: DEC-1024</span>
                            <span className="text-emerald-500">Active</span>
                        </div>
                        <div className="text-white">Intent: Hire Senior Engineer</div>
                        <div className="text-white">Cost: $140,000 / yr</div>
                        <div className="flex gap-2 pt-2">
                            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">Approved</span>
                            <span className="px-2 py-1 bg-white/10 text-white/50 rounded text-xs">Reversible: No</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: REAL SPENDING POWER */}
            <section className="py-24 border-t border-white/10">
                <div className="max-w-2xl space-y-8">
                    <h3 className="text-sm font-mono text-emerald-500 uppercase tracking-widest">Logic, Not Forecasts</h3>
                    <h2 className="text-3xl font-bold text-white">Real Spending Power</h2>
                    <p className="text-white/70 text-lg">
                        Axis subtracts all recurring commitments, near-term obligations, and safety buffers
                        from your bank balance in real-time.
                    </p>

                    <div className="py-6">
                        <span className="text-6xl font-bold tracking-tighter text-white tabular-nums">$142,380</span>
                        <p className="text-sm text-white/40 mt-2 uppercase tracking-wider">True Available Capital</p>
                    </div>
                </div>
            </section>

            {/* SECTION 6: RISK STATES */}
            <section className="py-24 border-t border-white/10 space-y-12">
                <h3 className="text-2xl font-bold text-white">Structural Risk States</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 border border-white/10 rounded-lg space-y-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <h4 className="font-bold text-white">STABLE</h4>
                        <p className="text-sm text-white/60">Buffer full. Commitments low. Normal operations.</p>
                    </div>
                    <div className="p-6 border border-white/10 rounded-lg space-y-4">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <h4 className="font-bold text-white">TIGHT</h4>
                        <p className="text-sm text-white/60">Buffer compressing. Recurring spend restricted.</p>
                    </div>
                    <div className="p-6 border border-white/10 rounded-lg space-y-4">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <h4 className="font-bold text-white">FRAGILE</h4>
                        <p className="text-sm text-white/60">Buffer breached. Survival enforcement active.</p>
                    </div>
                </div>
            </section>

            {/* SECTION 7: HIRING */}
            <section className="py-24 border-t border-white/10">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Disciplined Hiring</h3>
                        <p className="text-white/70 leading-relaxed">
                            Jobs only exist on Axis if the capital is secured.
                            This prevents emotional hiring sprees and protects workers from joining insolvent companies.
                        </p>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="pt-24 pb-12 border-t border-white/10 text-white/40 text-sm flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-1">
                    <p className="text-white font-medium">Axis</p>
                    <p>Decision Authority Layer</p>
                </div>
                <div className="flex gap-8">
                    <Link href="#" className="hover:text-white">Product</Link>
                    <Link href="#" className="hover:text-white">Security</Link>
                    <Link href="#" className="hover:text-white">Login</Link>
                </div>
            </footer>

        </div>
    );
}
