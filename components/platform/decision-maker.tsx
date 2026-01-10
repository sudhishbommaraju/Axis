"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, RotateCcw, Activity } from "lucide-react";
import { FinancialSnapshot, DecisionLevers, Constraints, SimulationResult } from "@/lib/decision-engine/types";
import { simulateOption } from "@/lib/decision-engine/simulator";
import { cn } from "@/lib/utils";
import { InsightsPanel } from "./insights-panel";

// Default Constraints
const DEFAULT_CONSTRAINTS: Constraints = {
    minRunwayMonths: 6,
    riskTolerance: 'medium'
};

// Default Levers (Zero / Baseline)
const DEFAULT_LEVERS: DecisionLevers = {
    hiringDelta: 0,
    marketingSpendIncrease: 0,
    inventorySpendIncrease: 0,
    startDelayMonths: 0
};

export function DecisionMaker({ snapshot }: { snapshot: FinancialSnapshot }) {
    // State
    const [levers, setLevers] = useState<DecisionLevers>(DEFAULT_LEVERS);
    const [constraints, setConstraints] = useState<Constraints>(DEFAULT_CONSTRAINTS);
    const [isSimulating, setIsSimulating] = useState(false);
    const [results, setResults] = useState<{
        baseline: SimulationResult;
        stressedRevenue: SimulationResult;
        delayedGrowth: SimulationResult;
    } | null>(null);

    const handleRunSim = async () => {
        setIsSimulating(true);
        // Simulate computation delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 1. Baseline Simulation
        const baseline = simulateOption(snapshot, levers, constraints);

        // 2. Stressed Revenue Scenario (-20% Revenue)
        const stressedSnapshot = { ...snapshot, monthlyRevenue: snapshot.monthlyRevenue * 0.8 };
        const stressedRevenue = simulateOption(stressedSnapshot, levers, constraints);

        // 3. Delayed Growth Scenario (Start Delay + 3 months)
        // We modify the levers to delay the START of the changes, 
        // or we model it as "Start Delay" in the simulator if supported.
        // The simulator supports startDelayMonths. Let's add 3 to user input.
        const delayedLevers = { ...levers, startDelayMonths: levers.startDelayMonths + 3 };
        const delayedGrowth = simulateOption(snapshot, delayedLevers, constraints);

        setResults({ baseline, stressedRevenue, delayedGrowth });
        setIsSimulating(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT: Controls */}
            <div className="lg:col-span-1 space-y-6">
                <Card className="p-6 bg-neutral-900 border-white/10">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-500" />
                        Simulation Config
                    </h3>

                    <div className="space-y-6">
                        {/* Constraints Section */}
                        <div className="space-y-4 pt-0">
                            <Label className="text-xs uppercase text-neutral-500 font-bold tracking-wider">Constraints</Label>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-neutral-300">Min Runway Safety</span>
                                    <span className="font-mono text-emerald-400">{constraints.minRunwayMonths} Months</span>
                                </div>
                                <Input
                                    type="range" min="1" max="12" step="1"
                                    value={constraints.minRunwayMonths}
                                    onChange={(e) => setConstraints(c => ({ ...c, minRunwayMonths: parseInt(e.target.value) }))}
                                    className="accent-emerald-500 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="border-t border-white/5 mx-[-24px]" />

                        {/* Levers Section */}
                        <div className="space-y-4">
                            <Label className="text-xs uppercase text-neutral-500 font-bold tracking-wider">Decision Levers</Label>

                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <Label className="text-xs text-neutral-400">New Hires</Label>
                                    <Input
                                        type="number" min="0" max="50"
                                        className="font-mono bg-black/20 border-white/10 text-white"
                                        value={levers.hiringDelta}
                                        onChange={(e) => setLevers(l => ({ ...l, hiringDelta: parseInt(e.target.value) || 0 }))}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-xs text-neutral-400">Add'l Marketing ($/mo)</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">$</span>
                                        <Input
                                            type="number" min="0" step="1000"
                                            className="font-mono bg-black/20 border-white/10 text-white pl-6"
                                            value={levers.marketingSpendIncrease}
                                            onChange={(e) => setLevers(l => ({ ...l, marketingSpendIncrease: parseFloat(e.target.value) || 0 }))}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-xs text-neutral-400">Inventory Spend (One-time)</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">$</span>
                                        <Input
                                            type="number" min="0" step="1000"
                                            className="font-mono bg-black/20 border-white/10 text-white pl-6"
                                            value={levers.inventorySpendIncrease}
                                            onChange={(e) => setLevers(l => ({ ...l, inventorySpendIncrease: parseFloat(e.target.value) || 0 }))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleRunSim}
                            disabled={isSimulating}
                            className="w-full bg-white text-black hover:bg-neutral-200 mt-4 font-bold h-12"
                        >
                            {isSimulating ? "Running Models..." : "Run Simulation"}
                        </Button>
                    </div>
                </Card>
            </div>

            {/* RIGHT: Results & Insights */}
            <div className="lg:col-span-2 space-y-6">
                {!results ? (
                    <Card className="h-full bg-neutral-900/20 border-white/10 border-dashed flex items-center justify-center p-12">
                        <div className="text-center space-y-4 opacity-50">
                            <Activity className="w-16 h-16 mx-auto text-neutral-500" />
                            <p className="text-neutral-400">Configure inputs and run simulation to view risk analysis.</p>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Results Table */}
                        <Card className="overflow-hidden bg-neutral-900 border-white/10">
                            <div className="p-4 border-b border-white/10 bg-white/5">
                                <h4 className="font-bold text-white">Scenario Analysis</h4>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 text-neutral-400 uppercase text-[10px] font-bold tracking-wider">
                                        <tr>
                                            <th className="px-4 py-3">Scenario</th>
                                            <th className="px-4 py-3">Runway</th>
                                            <th className="px-4 py-3">Min Cash</th>
                                            <th className="px-4 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        <ResultRow name="Baseline" result={results.baseline} />
                                        <ResultRow name="Stressed (-20% Rev)" result={results.stressedRevenue} />
                                        <ResultRow name="Delayed (+3 Mo)" result={results.delayedGrowth} />
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        {/* Insights Panel */}
                        <InsightsPanel results={results} constraints={constraints} />
                    </div>
                )}
            </div>
        </div>
    );
}

function ResultRow({ name, result }: { name: string, result: SimulationResult }) {
    const isFeasible = result.status === 'FEASIBLE';
    const isRisky = result.status === 'RISKY';
    const isInfeasible = result.status === 'INFEASIBLE';

    return (
        <tr className="group hover:bg-white/5 transition-colors">
            <td className="px-4 py-3 font-medium text-white">{name}</td>
            <td className={cn("px-4 py-3 font-mono tabular-nums", isInfeasible ? "text-red-400 font-bold" : "text-neutral-300")}>
                {result.runwayMonths} Mo
            </td>
            <td className="px-4 py-3 font-mono tabular-nums text-neutral-300">
                ${Math.min(...result.monthlyData.map(m => m.cashEnd)).toLocaleString()}
            </td>
            <td className="px-4 py-3">
                <Badge variant="outline" className={cn(
                    "uppercase text-[10px] border-none bg-opacity-20",
                    isInfeasible ? "bg-red-500 text-red-400" :
                        isRisky ? "bg-amber-500 text-amber-400" :
                            "bg-emerald-500 text-emerald-400"
                )}>
                    {result.status}
                </Badge>
            </td>
        </tr>
    );
}
