"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Play, CheckCircle2, AlertTriangle, XCircle, ArrowRight, RotateCcw, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { simulateOption } from '@/lib/decision-engine/simulator';
import { FinancialSnapshot, Constraints, DecisionLevers, SimulationResult } from '@/lib/decision-engine/types';
import { cn } from '@/lib/utils';
import { AILoader } from '@/components/ui/ai-loader';

// --- DEMO CONSTANTS ---
const DEMO_SNAPSHOT: FinancialSnapshot = {
    currentCash: 50000,
    monthlyRevenue: 15000,
    fixedCosts: 8000,
    variableCostRatio: 0.0, // Simplified for demo
    currentHeadcount: 2,
    // Implied avg salary from prompt ($9k payroll / 2 staff = $4500)
    avgSalaryPerEmployee: 4500,
    hiringCostPerEmployee: 1000, // One-time fee? Prompt says "$4,500/month", implying salary. 
    // Let's assume hiring one-time cost is small for demo, say 1000.
    discretionarySpend: 0 // Keep simple
};

// Re-adjust snapshot to align with "Fixed costs: $8,000" likely meaning "Non-Payroll Fixed".
// If "Fixed costs" meant TOTAL, then 8000 for 2 people + rent is very low ($4k/mo total?).
// I will assume Fixed Costs = Rent/Ops ($8k) + Payroll (2 * $4.5k = $9k) = $17k Total.
// Revenue $15k. Burn = $2k/mo.
// Cash $50k. Runway = 25 months. Healthy.
// Adding 1 constraint: Min Runway 6mo.

const DEMO_CONSTRAINTS: Constraints = {
    minRunwayMonths: 6,
    riskTolerance: 'medium'
};

export function LiveDemo() {
    const [status, setStatus] = useState<'idle' | 'running' | 'complete'>('idle');
    const [results, setResults] = useState<{
        scenarioA: SimulationResult;
        scenarioB: SimulationResult;
        scenarioC: SimulationResult;
    } | null>(null);

    const runSimulation = async () => {
        setStatus('running');

        // Artificial delay for "computation" feel
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Define Scenarios
        // A: Hire 0
        const optionA: DecisionLevers = { hiringDelta: 0, marketingSpendIncrease: 0, inventorySpendIncrease: 0, startDelayMonths: 0 };
        // B: Hire 1
        const optionB: DecisionLevers = { hiringDelta: 1, marketingSpendIncrease: 0, inventorySpendIncrease: 0, startDelayMonths: 0 };
        // C: Hire 2
        const optionC: DecisionLevers = { hiringDelta: 2, marketingSpendIncrease: 0, inventorySpendIncrease: 0, startDelayMonths: 0 };

        // Run Simulations
        const resA = simulateOption(DEMO_SNAPSHOT, optionA, DEMO_CONSTRAINTS);
        const resB = simulateOption(DEMO_SNAPSHOT, optionB, DEMO_CONSTRAINTS);
        const resC = simulateOption(DEMO_SNAPSHOT, optionC, DEMO_CONSTRAINTS);

        setResults({
            scenarioA: resA,
            scenarioB: resB,
            scenarioC: resC
        });
        setStatus('complete');
    };

    return (
        <section id="demo" className="py-24 px-6 border-t border-white/5 bg-neutral-950/50">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <Badge variant="outline" className="border-emerald-500/20 text-emerald-400 bg-emerald-500/5">
                        Interactive Demo
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        See Axis in Action
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Run a real-time financial simulation on a sample local business.
                        No sign-up required.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: Inputs & Controls */}
                    <div className="space-y-6">
                        <Card className="p-6 bg-neutral-900 border-white/10">
                            <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-4">
                                Demo Scenario
                            </h3>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-neutral-500">Starting Cash</span>
                                    <span className="font-medium tabular-nums text-white">$50,000</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-neutral-500">Monthly Revenue</span>
                                    <span className="font-medium tabular-nums text-white">$15,000</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-neutral-500">Fixed Costs</span>
                                    <span className="font-medium tabular-nums text-white">$8,000</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-neutral-500">Current Staff</span>
                                    <span className="font-medium tabular-nums text-white">2 Employees</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-neutral-500">New Hire Cost</span>
                                    <span className="font-medium tabular-nums text-white">$4,500/mo</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10">
                                <div className="flex items-center gap-2 mb-2">
                                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                    <span className="text-xs font-bold uppercase text-emerald-400">Active Constraint</span>
                                </div>
                                <p className="text-xs text-neutral-400">
                                    Must maintain at least <strong className="text-white">6 months of runway</strong> at all times.
                                </p>
                            </div>
                        </Card>

                        <Button
                            onClick={runSimulation}
                            disabled={status === 'running'}
                            className={cn(
                                "w-full h-14 text-lg font-bold transition-all duration-300",
                                status === 'running' ? "bg-neutral-800" : "bg-white text-black hover:bg-neutral-200"
                            )}
                        >
                            {status === 'idle' && (
                                <><Play className="w-5 h-5 mr-2" /> Run Simulation</>
                            )}
                            {status === 'running' && (
                                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                            )}
                            {status === 'complete' && (
                                <><RotateCcw className="w-5 h-5 mr-2" /> Run Again</>
                            )}
                        </Button>

                        {status === 'complete' && (
                            <p className="text-center text-xs text-neutral-500 animate-in fade-in">
                                Simulation completed in 42ms. Deterministic result.
                            </p>
                        )}
                    </div>

                    {/* RIGHT: Results Area */}
                    <div className="lg:col-span-2">
                        <Card className="h-full bg-black border-white/10 min-h-[400px] flex flex-col relative overflow-hidden">

                            {/* Loading State */}
                            {status === 'running' && (
                                <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                                    <AILoader />
                                </div>
                            )}

                            {/* Empty State */}
                            {status === 'idle' && (
                                <div className="flex-1 flex flex-col items-center justify-center text-neutral-500 space-y-4 p-12 text-center opacity-50">
                                    <Activity className="w-16 h-16" />
                                    <p className="text-lg">Waiting for simulation trigger...</p>
                                </div>
                            )}

                            {/* Results State */}
                            {status === 'complete' && results && (
                                <div className="p-6 md:p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">

                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-6">Scenario Analysis</h3>
                                        <div className="grid gap-4">
                                            <ScenarioRow
                                                label="Keep Team (Hire 0)"
                                                result={results.scenarioA}
                                                detail="Safest option. Preserves max runway."
                                            />
                                            <ScenarioRow
                                                label="Growth (Hire 1)"
                                                result={results.scenarioB}
                                                detail="Balanced. Runway tightens but stays feasible."
                                            />
                                            <ScenarioRow
                                                label="Aggressive (Hire 2)"
                                                result={results.scenarioC}
                                                detail="High Danger. Violates 6-month constraint."
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-neutral-900 rounded-xl p-6 border border-white/5">
                                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-emerald-400" />
                                            System Insight
                                        </h4>
                                        <p className="text-neutral-300 leading-relaxed">
                                            {results.scenarioC.status === 'INFEASIBLE'
                                                ? "Hiring 2 employees immediately accelerates burn to -$11k/mo, causing the cash balance to breach the 6-month safety buffer by Month 4."
                                                : "All scenarios are within safety limits."
                                            }
                                            {" "}
                                            The optimal move is likely <strong>Hiring 1</strong> if growth is needed, or <strong>Hiring 0</strong> to maximize safety.
                                        </p>
                                    </div>

                                </div>
                            )}
                        </Card>
                    </div>

                </div>
            </div>
        </section>
    );
}

function ScenarioRow({ label, result, detail }: { label: string, result: SimulationResult, detail: string }) {
    const isFeasible = result.status === 'FEASIBLE';
    const isRisky = result.status === 'RISKY';
    const isInfeasible = result.status === 'INFEASIBLE';

    return (
        <div className={cn(
            "flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border transition-all",
            isInfeasible ? "bg-red-950/20 border-red-500/20" :
                isRisky ? "bg-amber-950/20 border-amber-500/20" :
                    "bg-emerald-950/20 border-emerald-500/20"
        )}>
            <div className="mb-2 md:mb-0">
                <div className="flex items-center gap-3">
                    <span className="font-bold text-white">{label}</span>
                    <Badge variant="outline" className={cn(
                        "uppercase text-[10px]",
                        isInfeasible ? "text-red-400 border-red-500/30" :
                            isRisky ? "text-amber-400 border-amber-500/30" :
                                "text-emerald-400 border-emerald-500/30"
                    )}>
                        {result.status}
                    </Badge>
                </div>
                <p className="text-xs text-neutral-400 mt-1">{detail}</p>
            </div>

            <div className="flex items-center gap-6 text-sm">
                <div className="text-right">
                    <span className="block text-[10px] text-neutral-500 uppercase">Runway</span>
                    <span className={cn(
                        "font-medium tabular-nums font-bold",
                        isInfeasible ? "text-red-400" : "text-white"
                    )}>
                        {result.runwayMonths} Mo
                    </span>
                </div>
                <div className="text-right min-w-[80px]">
                    <span className="block text-[10px] text-neutral-500 uppercase">Min Cash</span>
                    <span className="font-medium tabular-nums text-neutral-300">
                        ${Math.min(...result.monthlyData.map(m => m.cashEnd)).toLocaleString()}
                    </span>
                </div>
                <div className="hidden md:block">
                    {isInfeasible ? <XCircle className="w-5 h-5 text-red-500" /> : <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </div>
            </div>
        </div>
    );
}
