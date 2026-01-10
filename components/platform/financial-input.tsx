
"use client";

import React from 'react';
import { Constraints, FinancialSnapshot } from '@/lib/decision-engine/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FinancialInputPanelProps {
    snapshot: FinancialSnapshot;
    constraints: Constraints;
    onSnapshotChange: (s: FinancialSnapshot) => void;
    onConstraintsChange: (c: Constraints) => void;
}

export function FinancialInputPanel({ snapshot, constraints, onSnapshotChange, onConstraintsChange }: FinancialInputPanelProps) {

    // Helper to update snapshot numbers
    const updateSnapshot = (key: keyof FinancialSnapshot, value: string) => {
        const num = parseFloat(value);
        if (!isNaN(num) && num >= 0) {
            onSnapshotChange({ ...snapshot, [key]: num });
        }
    };

    return (
        <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
                <CardTitle className="text-lg font-medium">1. Financial Snapshot & Constraints</CardTitle>
                <CardDescription className="text-neutral-400">Read-only connection to your books (Simulated)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

                {/* Cash & Revenue */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Current Cash ($)</Label>
                        <Input
                            type="number"
                            value={snapshot.currentCash}
                            onChange={(e) => updateSnapshot('currentCash', e.target.value)}
                            className="bg-neutral-950 border-neutral-800"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Monthly Revenue ($)</Label>
                        <Input
                            type="number"
                            value={snapshot.monthlyRevenue}
                            onChange={(e) => updateSnapshot('monthlyRevenue', e.target.value)}
                            className="bg-neutral-950 border-neutral-800"
                        />
                    </div>
                </div>

                {/* Costs */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Fixed Costs ($)</Label>
                        <Input
                            type="number"
                            value={snapshot.fixedCosts}
                            onChange={(e) => updateSnapshot('fixedCosts', e.target.value)}
                            className="bg-neutral-950 border-neutral-800"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Discretionary Spend ($)</Label>
                        <Input
                            type="number"
                            value={snapshot.discretionarySpend}
                            onChange={(e) => updateSnapshot('discretionarySpend', e.target.value)}
                            className="bg-neutral-950 border-neutral-800"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Current Headcount</Label>
                        <Input
                            type="number"
                            value={snapshot.currentHeadcount}
                            onChange={(e) => updateSnapshot('currentHeadcount', e.target.value)}
                            className="bg-neutral-950 border-neutral-800"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Avg Salary ($/mo)</Label>
                        <Input
                            type="number"
                            value={snapshot.avgSalaryPerEmployee}
                            onChange={(e) => updateSnapshot('avgSalaryPerEmployee', e.target.value)}
                            className="bg-neutral-950 border-neutral-800"
                        />
                    </div>
                </div>

                <div className="border-t border-white/5 my-4 pt-4 space-y-4">
                    <h3 className="text-sm font-semibold text-neutral-300">Constraints</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Min. Runway (Months)</Label>
                            <Input
                                type="number"
                                value={constraints.minRunwayMonths}
                                onChange={(e) => {
                                    const num = parseFloat(e.target.value);
                                    if (!isNaN(num) && num > 0) onConstraintsChange({ ...constraints, minRunwayMonths: num });
                                }}
                                className="bg-neutral-950 border-neutral-800"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Risk Tolerance</Label>
                            <Select
                                value={constraints.riskTolerance}
                                onValueChange={(val: 'low' | 'medium' | 'high') => onConstraintsChange({ ...constraints, riskTolerance: val })}
                            >
                                <SelectTrigger className="bg-neutral-950 border-neutral-800">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                    <SelectItem value="low">Low (Conservative)</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High (Aggressive)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}
