
"use client";

import React from 'react';
import { SimulationResult } from '@/lib/decision-engine/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';

interface OutcomeVisualizerProps {
    result: SimulationResult | null;
}

export function OutcomeVisualizer({ result }: OutcomeVisualizerProps) {
    if (!result) {
        return (
            <Card className="bg-neutral-900 border-white/10 text-white h-full flex items-center justify-center">
                <p className="text-neutral-500 text-sm">Select an option to view detailed projection.</p>
            </Card>
        );
    }

    const data = result.monthlyData.map(m => ({
        month: `M${m.monthIndex}`,
        Cash: m.cashEnd,
        Burn: m.netBurn,
        Violation: m.isViolation ? m.cashEnd : null
    }));

    return (
        <Card className="bg-neutral-900 border-white/10 text-white h-full">
            <CardHeader>
                <CardTitle className="text-lg font-medium">3. Outcome Projection</CardTitle>
                <CardDescription className="text-neutral-400">
                    {result.status === 'INFEASIBLE'
                        ? <span className="text-red-400">Warning: Constraint Violation Detected</span>
                        : "Projected Cash Flow (18 Months)"}
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} />
                        <YAxis stroke="#666" fontSize={12} tickLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value: number | undefined) => [`$${(value || 0).toLocaleString()}`, '']}
                        />
                        <ReferenceLine y={0} stroke="red" strokeDasharray="3 3" />
                        <Line
                            type="monotone"
                            dataKey="Cash"
                            stroke={result.status === 'INFEASIBLE' ? "#ef4444" : "#10b981"}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>

                <div className="mt-4 p-4 bg-black/20 rounded border border-white/5 text-sm">
                    <div className="flex justify-between border-b border-white/5 pb-2 mb-2">
                        <span className="text-neutral-400">Metric</span>
                        <span className="tabular-nums font-medium text-neutral-300">Value</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-neutral-400">Final Headcount</span>
                        <span className="tabular-nums font-medium">{result.monthlyData[result.monthlyData.length - 1].headcount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-neutral-400">Avg Net Burn</span>
                        <span className="tabular-nums font-medium text-red-400">${Math.round(result.monthlyData.reduce((acc, curr) => acc + curr.netBurn, 0) / result.monthlyData.length).toLocaleString()}/mo</span>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}
