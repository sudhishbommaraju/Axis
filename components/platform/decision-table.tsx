
"use client";

import React from 'react';
import { SimulationResult } from '@/lib/decision-engine/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DecisionTableProps {
    results: SimulationResult[];
    selectedResult: SimulationResult | null;
    onSelect: (result: SimulationResult) => void;
}

export function DecisionTable({ results, selectedResult, onSelect }: DecisionTableProps) {
    return (
        <Card className="bg-neutral-900 border-white/10 text-white h-full">
            <CardHeader>
                <CardTitle className="text-lg font-medium">2. Decision Options</CardTitle>
                <CardDescription className="text-neutral-400">Generated based on your constraints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {results.map((res, idx) => {
                    const isSelected = selectedResult === res;
                    const isFeasible = res.status === 'FEASIBLE';
                    const isRisky = res.status === 'RISKY';

                    return (
                        <div
                            key={idx}
                            onClick={() => onSelect(res)}
                            className={cn(
                                "p-4 rounded-lg border cursor-pointer transition-all hover:bg-white/5",
                                isSelected ? "border-white/40 bg-white/5" : "border-white/5 bg-neutral-950/50"
                            )}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm">
                                    {idx === 0 ? "Option A: Do Nothing" : `Option ${String.fromCharCode(65 + idx)}`}
                                </span>
                                <Badge variant={isFeasible ? "default" : isRisky ? "secondary" : "destructive"} className="uppercase text-[10px]">
                                    {res.status}
                                </Badge>
                            </div>

                            <div className="text-xs text-neutral-400 space-y-1">
                                {res.option.hiringDelta > 0 && <div>• Hire {res.option.hiringDelta} Employee(s)</div>}
                                {res.option.marketingSpendIncrease > 0 && <div>• Increase Marketing {(res.option.marketingSpendIncrease * 100).toFixed(0)}%</div>}
                                {res.option.hiringDelta === 0 && res.option.marketingSpendIncrease === 0 && <div>• Maintain current operations</div>}
                            </div>

                            <div className="mt-3 flex items-center gap-2 text-xs">
                                {isFeasible && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                                {isRisky && <AlertTriangle className="w-3 h-3 text-amber-500" />}
                                {!isFeasible && !isRisky && <AlertCircle className="w-3 h-3 text-red-500" />}

                                <span className={cn(
                                    "tabular-nums font-medium",
                                    isFeasible ? "text-emerald-400" : isRisky ? "text-amber-400" : "text-red-400"
                                )}>
                                    {res.runwayMonths >= 99 ? "∞" : res.runwayMonths} Mo Runway
                                </span>
                            </div>

                            {res.primaryRiskFactor && (
                                <div className="mt-2 text-[10px] text-red-400 bg-red-950/20 px-2 py-1 rounded inline-block">
                                    Risk: {res.primaryRiskFactor}
                                </div>
                            )}
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
