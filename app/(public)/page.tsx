import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Brain, Lock, History, ArrowRight, Activity, Layers, StopCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LandingPage() {
    return (
        <main className="flex flex-col min-h-screen">
            <HeroSection />
            <ProblemSection />
            <DefinitionSection />
            <CoreConceptSection />
            <SpendingPowerSection />
            <SafetyRulesSection />
            <RiskStateSection />
            <DecisionMemorySection />
            <HiringSection />
            <TargetAudienceSection />
            <CTASection />
            <Footer />
        </main>
    );
}

// --- Section 1: Hero ---
function HeroSection() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center pt-24">
            <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in zoom-in duration-700">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    System Operational
                </div>
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white">
                    Axis
                </h1>
                <p className="text-xl md:text-2xl text-white/70 font-light tracking-tight">
                    Decision Authority Layer for Businesses
                </p>
                <p className="text-lg text-white/50 max-w-2xl mx-auto border-l-2 border-white/20 pl-4 py-2 italic font-serif">
                    &ldquo;Axis sits between intent and action to enforce financial survival.&rdquo;
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <Link href="/login">
                        <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 text-base h-12">
                            Enter Axis
                        </Button>
                    </Link>
                    <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white rounded-full px-8 text-base h-12">
                        Read How It Works <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}

// --- Section 2: The Problem ---
function ProblemSection() {
    return (
        <section className="py-24 px-6 border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto space-y-8 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white/90">
                    Why Businesses Actually Die
                </h2>
                <div className="space-y-6 text-lg text-white/60 leading-relaxed">
                    <p>
                        It is rarely a lack of ideas or product-market fit that kills a company in its growth phase.
                        It is the invisible accumulation of commitments.
                    </p>
                    <p>
                        Every SaaS subscription, every new hire, every vendor contract, and every "small" raise
                        compounds into a fixed-cost structure that outpaces reality.
                    </p>
                    <p className="text-white font-medium">
                        By the time the P&L arrives, the money is already gone.
                    </p>
                </div>
            </div>
        </section>
    );
}

// --- Section 3: Definition (Is / Is Not) ---
function DefinitionSection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                {/* Axis Is */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Axis Is</h3>
                    <div className="grid gap-4">
                        <DefinitionCard icon={ShieldCheck} title="A Decision Authority Layer" desc="It validates actions before they happen." />
                        <DefinitionCard icon={Lock} title="A Risk Enforcement Engine" desc="It blocks commitments that breach safety rules." />
                        <DefinitionCard icon={Layers} title="An Operating System" desc="It manages the state of your business risk." />
                        <DefinitionCard icon={History} title="Institutional Memory" desc="It remembers why you made every choice." />
                    </div>
                </div>

                {/* Axis Is Not */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-white/50 mb-6 border-b border-white/10 pb-4">Axis Is Not</h3>
                    <div className="grid gap-4 opacity-70">
                        <DefinitionCard icon={StopCircle} title="Budgeting Software" desc="We do not track categories; we track survival." />
                        <DefinitionCard icon={Activity} title="Forecasting" desc="We do not guess the future; we enforce the present." />
                        <DefinitionCard icon={Brain} title="AI Advice Chatbot" desc="We do not give generic advice; we enforce your rules." />
                        <DefinitionCard icon={Zap} title="Gamification" desc="There are no points, streaks, or confetti." />
                    </div>
                </div>
            </div>
        </section>
    );
}

function DefinitionCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-start gap-4 hover:bg-white/10 transition-colors">
            <div className="p-2 rounded-lg bg-white/5 text-white">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h4 className="font-semibold text-white">{title}</h4>
                <p className="text-sm text-white/60 mt-1">{desc}</p>
            </div>
        </div>
    )
}

// --- Section 4: Core Concept (Decision Object) ---
function CoreConceptSection() {
    return (
        <section className="py-24 px-6 border-y border-white/5 bg-white/[0.02]">
            <div className="max-w-4xl mx-auto text-center space-y-12">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-white">The Primitive: The Decision</h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        In Axis, you do not just &quot;spend money&quot;. You create a Decision Object.
                        This object captures intent, reversibility, and commitment before any action is taken.
                    </p>
                </div>

                {/* The Object Visualization */}
                <div className="max-w-md mx-auto bg-black border border-white/20 rounded-xl overflow-hidden shadow-2xl font-mono text-left relative group">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 blur-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-all duration-1000"></div>

                    <div className="relative bg-black p-6 space-y-4 z-10">
                        <div className="flex justify-between text-xs text-white/40 border-b border-white/10 pb-2">
                            <span>ID: dec_0921_alpha</span>
                            <span>STATUS: ACTIVE</span>
                        </div>
                        <div className="space-y-2">
                            <div className="text-xs text-emerald-500">INTENT</div>
                            <div className="text-white">Hire Senior Systems Architect</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div className="text-xs text-emerald-500">COMMITMENT</div>
                                <div className="text-white">$12,500 / mo</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-xs text-emerald-500">DURATION</div>
                                <div className="text-white">Indefinite</div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs text-emerald-500">ENFORCEMENT</div>
                            <div className="text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                Approved by Risk Engine
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- Section 5: Real Spending Power ---
function SpendingPowerSection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <h2 className="text-3xl font-bold tracking-tight text-white">Real Spending Power</h2>
                <p className="text-white/60 max-w-2xl mx-auto">
                    Your bank balance is a lie. It includes money already committed to next month's rent, reliable servers, and payroll.
                    Axis subtracts your obligations from your cash to show you the truth.
                </p>

                <div className="py-12">
                    <div className="text-6xl md:text-8xl font-bold tracking-tighter text-white tabular-nums">
                        $142,380
                    </div>
                    <div className="text-emerald-500 font-medium mt-4 tracking-wide uppercase text-sm">
                        True Available Capital
                    </div>
                </div>

                <p className="text-xs text-white/30 uppercase tracking-widest">
                    * This is not a forecast. This is algebra.
                </p>
            </div>
        </section>
    )
}

// --- Section 6: Safety Rules ---
function SafetyRulesSection() {
    return (
        <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white">Invariants & Enforcement</h2>
                    <p className="text-white/60">
                        You define the rules of your survival. Axis enforces them without emotion.
                        If a decision violates a rule, it is blocked.
                    </p>
                    <ul className="space-y-4 pt-4">
                        <RuleItem text="Minimum Cash Buffer (e.g. 6 months)" />
                        <RuleItem text="Maximum Fixed Cost Growth Rate" />
                        <RuleItem text="Hiring Caps per Quarter" />
                        <RuleItem text="Debt-to-Income Ratios" />
                    </ul>
                </div>
                <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm font-mono flex items-center gap-4">
                        <StopCircle className="w-5 h-5" />
                        <span>BLOCKED: Hiring exceeds Q3 Cap.</span>
                    </div>
                    <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-sm font-mono flex items-center gap-4">
                        <Activity className="w-5 h-5" />
                        <span>WARNING: Buffer compression detected.</span>
                    </div>
                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-sm font-mono flex items-center gap-4">
                        <ShieldCheck className="w-5 h-5" />
                        <span>APPROVED: Valid operations expense.</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

function RuleItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-3 text-white/80">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            {text}
        </li>
    )
}

// --- Section 7: Risk States ---
function RiskStateSection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto text-center space-y-12">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-white">Structural Risk States</h2>
                    <p className="text-white/60">
                        The system operates in one of three modes depending on your financial structure.
                        No predictions. Just reality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <RiskCard title="STABLE" color="bg-emerald-500" desc="Buffer is full. Commitments are low. Decisions execute normally." />
                    <RiskCard title="TIGHT" color="bg-yellow-500" desc="Buffer is compressing. Recurring commitments restricted. Scrutiny increased." />
                    <RiskCard title="FRAGILE" color="bg-red-500" desc="Buffer breached. All non-essential spend blocked. Survival mode." />
                </div>
            </div>
        </section>
    )
}

function RiskCard({ title, color, desc }: { title: string, color: string, desc: string }) {
    return (
        <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-left space-y-4">
            <div className={cn("w-full h-1 rounded-full", color)} />
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
        </div>
    )
}

// --- Section 8: Memory ---
function DecisionMemorySection() {
    return (
        <section className="py-24 px-6 border-t border-white/5 bg-black/40">
            <div className="max-w-3xl mx-auto text-center space-y-6">
                <History className="w-12 h-12 text-white/20 mx-auto" />
                <h2 className="text-3xl font-bold text-white">Institutional Memory</h2>
                <p className="text-white/60 text-lg leading-relaxed">
                    Founders repeat mistakes because they forget the context of past decisions.
                    Axis creates a permanent, immutable ledger of every choice, every intent, and every outcome.
                    It is the black box flight recorder for your company.
                </p>
            </div>
        </section>
    )
}

// --- Section 9: Hiring ---
function HiringSection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-white">Disciplined Hiring</h2>
                    <p className="text-white/60">
                        Hiring is the most dangerous financial decision a company makes.
                        In Axis, you cannot open a role unless the cash is already secured.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-2">For Owners</h3>
                        <p className="text-white/60">
                            Prevents emotional hiring sprees. Forces you to confront the
                            long-term liability of a salary before you write the job description.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-2">For Workers</h3>
                        <p className="text-white/60">
                            No ghost jobs. No speculative listings. If a job is on Axis,
                            the money is in the bank to pay for it.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

// --- Section 10: Audience ---
function TargetAudienceSection() {
    return (
        <section className="py-24 px-6 border-b border-white/5">
            <div className="max-w-2xl mx-auto text-center space-y-6">
                <h2 className="text-2xl font-bold text-white">Who Axis Is For</h2>
                <p className="text-white/60 text-lg">
                    Axis is for serious operators, bootstrapped founders, and businesses
                    that value survival over growth theater.
                </p>
                <p className="text-white/40 font-mono text-sm pt-4">
                    AXIS IS NOT FOR EVERYONE.
                </p>
            </div>
        </section>
    )
}

// --- Section 11: CTA ---
function CTASection() {
    return (
        <section className="py-32 px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-10">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                    Enforce the rules that keep you alive.
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/login">
                        <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-12 h-14 text-lg">
                            Enter Axis
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button variant="outline" size="lg" className="rounded-full px-12 h-14 text-lg border-white/20 text-white hover:bg-white/10">
                            Create Account
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

// --- Footer ---
function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-white/5 bg-black/40 text-sm">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-white/40">
                <div className="flex flex-col items-center md:items-start gap-1">
                    <span className="text-white font-bold tracking-tight">Axis</span>
                    <span>Decision Authority Layer</span>
                </div>

                <div className="flex gap-6">
                    <Link href="#" className="hover:text-white transition-colors">Product</Link>
                    <Link href="#" className="hover:text-white transition-colors">Security</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                    <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                </div>

                <div>
                    &copy; {new Date().getFullYear()} Axis Systems Inc.
                </div>
            </div>
        </footer>
    )
}
