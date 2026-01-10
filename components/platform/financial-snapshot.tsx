"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RefreshCw, Save, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { FinancialSnapshot as SnapshotType } from "@/lib/decision-engine/types";

// Initial Mock Data
export const INITIAL_SNAPSHOT: SnapshotType = {
    currentCash: 195650, // Sum of mock bank accounts
    monthlyRevenue: 42000,
    fixedCosts: 18500,
    variableCostRatio: 0.15,
    currentHeadcount: 4,
    avgSalaryPerEmployee: 6500,
    hiringCostPerEmployee: 5000,
    discretionarySpend: 2000
};

export function FinancialSnapshot({ connected, onUpdate }: { connected: boolean, onUpdate?: (data: SnapshotType) => void }) {
    const [data, setData] = useState<SnapshotType>(INITIAL_SNAPSHOT);
    const [isEditing, setIsEditing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    // When bank connects, update cash automatically (Mock logic)
    useEffect(() => {
        if (connected) {
            setData(prev => ({ ...prev, currentCash: 195650 })); // Hardcoded sum of mock accounts
            setLastUpdated(new Date());
        }
    }, [connected]);

    const handleSave = () => {
        setIsEditing(false);
        setLastUpdated(new Date());
        if (onUpdate) onUpdate(data);
    };

    const handleChange = (field: keyof SnapshotType, value: string) => {
        const numValue = parseFloat(value) || 0;
        setData(prev => ({ ...prev, [field]: numValue }));
    };

    return (
        <Card className="p-6 bg-neutral-900 border-white/10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 text-emerald-500" />
                        Financial Snapshot
                    </h3>
                    <p className="text-sm text-neutral-400">Live operational metrics.</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Last Updated</p>
                    <p className="text-xs font-mono text-white">{lastUpdated.toLocaleTimeString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 overflow-y-auto pr-2 custom-scrollbar">
                <SnapshotField
                    label="Total Cash (Synced)"
                    value={data.currentCash}
                    isCurrency
                    readOnly={true} // Cash is always synced from bank
                    highlight
                />
                <SnapshotField
                    label="Monthly Revenue (Avg)"
                    value={data.monthlyRevenue}
                    onChange={(v) => handleChange('monthlyRevenue', v)}
                    isCurrency
                    readOnly={!isEditing}
                />
                <SnapshotField
                    label="Fixed Costs (Rent, Ops)"
                    value={data.fixedCosts}
                    onChange={(v) => handleChange('fixedCosts', v)}
                    isCurrency
                    readOnly={!isEditing}
                />
                <SnapshotField
                    label="Variable Cost Ratio"
                    value={data.variableCostRatio}
                    onChange={(v) => handleChange('variableCostRatio', v)}
                    isPercentage
                    readOnly={!isEditing}
                />
                <div className="col-span-full border-t border-white/5 pt-4 mt-2">
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Payroll & Hiring</p>
                </div>
                <SnapshotField
                    label="Current Headcount"
                    value={data.currentHeadcount}
                    onChange={(v) => handleChange('currentHeadcount', v)}
                    readOnly={!isEditing}
                />
                <SnapshotField
                    label="Avg Salary / Employee"
                    value={data.avgSalaryPerEmployee}
                    onChange={(v) => handleChange('avgSalaryPerEmployee', v)}
                    isCurrency
                    readOnly={!isEditing}
                />
                <SnapshotField
                    label="Hiring Cost (One-time)"
                    value={data.hiringCostPerEmployee}
                    onChange={(v) => handleChange('hiringCostPerEmployee', v)}
                    isCurrency
                    readOnly={!isEditing}
                />
                <SnapshotField
                    label="Discretionary Spend"
                    value={data.discretionarySpend}
                    onChange={(v) => handleChange('discretionarySpend', v)}
                    isCurrency
                    readOnly={!isEditing}
                />
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <AlertCircle className="w-4 h-4" />
                    <span>Values impact simulation outcomes.</span>
                </div>
                {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline" className="border-white/10 text-white hover:bg-white/10">
                        Edit Assumptions
                    </Button>
                ) : (
                    <Button onClick={handleSave} className="bg-emerald-500 text-black hover:bg-emerald-400 font-bold">
                        <Save className="w-4 h-4 mr-2" />
                        Apply Updates
                    </Button>
                )}
            </div>
        </Card>
    );
}

function SnapshotField({
    label,
    value,
    onChange,
    isCurrency,
    isPercentage,
    readOnly,
    highlight
}: {
    label: string,
    value: number,
    onChange?: (val: string) => void,
    isCurrency?: boolean,
    isPercentage?: boolean,
    readOnly?: boolean,
    highlight?: boolean
}) {
    return (
        <div className="space-y-2">
            <Label className={cn("text-xs uppercase tracking-wider font-bold", highlight ? "text-emerald-400" : "text-neutral-500")}>
                {label}
            </Label>
            <div className="relative">
                {isCurrency && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 font-mono text-sm">$</span>}
                <Input
                    type="number"
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    disabled={readOnly}
                    className={cn(
                        "font-mono text-sm bg-black/20 border-white/10 h-10 transition-all tabular-nums",
                        isCurrency ? "pl-7" : "",
                        readOnly ? "opacity-70 cursor-not-allowed border-transparent" : "focus:border-emerald-500/50 focus:ring-emerald-500/20",
                        highlight ? "text-emerald-400 font-bold text-lg" : "text-white"
                    )}
                />
                {isPercentage && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 font-mono text-sm">%</span>}
            </div>
        </div>
    );
}
