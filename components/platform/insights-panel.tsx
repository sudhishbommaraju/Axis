import { Card } from "@/components/ui/card";
import { Sparkles, AlertTriangle, ShieldCheck, XCircle } from "lucide-react";
import { SimulationResult, Constraints } from "@/lib/decision-engine/types";
import { cn } from "@/lib/utils";

export function InsightsPanel({
    results,
    constraints
}: {
    results: { baseline: SimulationResult; stressedRevenue: SimulationResult; delayedGrowth: SimulationResult },
    constraints: Constraints
}) {
    // Generate insights based on results
    const insights = [];

    // Insight 1: Baseline Viability
    if (results.baseline.status === 'INFEASIBLE') {
        insights.push({
            type: 'critical',
            text: `Baseline plan violates constraints. Runway drops to ${results.baseline.runwayMonths} months (Min: ${constraints.minRunwayMonths}).`,
            icon: XCircle
        });
    } else if (results.baseline.status === 'RISKY') {
        insights.push({
            type: 'warning',
            text: `Baseline is feasible but approaches limits. Lowest cash balance: $${Math.min(...results.baseline.monthlyData.map(m => m.cashEnd)).toLocaleString()}.`,
            icon: AlertTriangle
        });
    } else {
        insights.push({
            type: 'positive',
            text: `Baseline plan is solid. Maintains healthy buffer above ${constraints.minRunwayMonths}-month threshold.`,
            icon: ShieldCheck
        });
    }

    // Insight 2: Resilience (Stressed)
    if (results.stressedRevenue.status === 'INFEASIBLE') {
        insights.push({
            type: 'critical',
            text: `Plan is fragile: A 20% revenue drop causes failure in Month ${results.stressedRevenue.failureMonth || '?'}.`,
            icon: AlertTriangle
        });
    } else {
        insights.push({
            type: 'positive',
            text: `Plan is resilient: Can withstand a 20% revenue drop and still meet runway constraints.`,
            icon: ShieldCheck
        });
    }

    // Insight 3: Tradeoff (Delayed)
    const delayedCash = results.delayedGrowth.monthlyData[11].cashEnd;
    const baselineCash = results.baseline.monthlyData[11].cashEnd;
    const cashDiff = delayedCash - baselineCash;

    if (cashDiff > 0) {
        insights.push({
            type: 'neutral',
            text: `Delaying execution by 3 months preserves $${cashDiff.toLocaleString()} in Year 1 cash, but delays growth trajectory.`,
            icon: Sparkles
        });
    } else {
        insights.push({
            type: 'neutral',
            text: `Delaying execution generally conserves cash in the short term.`,
            icon: Sparkles
        });
    }

    return (
        <Card className="p-6 bg-neutral-900 border-white/10">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Axis Intelligence
            </h4>

            <div className="space-y-4">
                {insights.map((insight, idx) => (
                    <div key={idx} className={cn(
                        "p-4 rounded-lg border text-sm flex gap-3 items-start",
                        insight.type === 'critical' ? "bg-red-950/20 border-red-500/20 text-red-200" :
                            insight.type === 'warning' ? "bg-amber-950/20 border-amber-500/20 text-amber-200" :
                                insight.type === 'positive' ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-200" :
                                    "bg-white/5 border-white/10 text-neutral-300"
                    )}>
                        <insight.icon className={cn(
                            "w-5 h-5 flex-shrink-0",
                            insight.type === 'critical' ? "text-red-500" :
                                insight.type === 'warning' ? "text-amber-500" :
                                    insight.type === 'positive' ? "text-emerald-500" :
                                        "text-neutral-500"
                        )} />
                        <p className="leading-relaxed">{insight.text}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
}
