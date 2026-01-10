
"use client";

import React, { useState, useEffect } from 'react';
import { FinancialSnapshot, Constraints, SimulationResult } from '@/lib/decision-engine/types';
import { generateOptions } from '@/lib/decision-engine/generator';
import { simulateOption } from '@/lib/decision-engine/simulator';
import { FinancialInputPanel } from '@/components/platform/financial-input';
import { DecisionTable } from '@/components/platform/decision-table';
import { OutcomeVisualizer } from '@/components/platform/outcome-visualizer';

// Initial Mock Data
const INITIAL_SNAPSHOT: FinancialSnapshot = {
    currentCash: 125000,
    monthlyRevenue: 45000,
    fixedCosts: 12000,
    variableCostRatio: 0.15,
    currentHeadcount: 4,
    avgSalaryPerEmployee: 6500,
    hiringCostPerEmployee: 5000,
    discretionarySpend: 8000,
};

const INITIAL_CONSTRAINTS: Constraints = {
    minRunwayMonths: 6,
    riskTolerance: 'medium'
};

export default function DecisionsPage() {
    const [snapshot, setSnapshot] = useState<FinancialSnapshot>(INITIAL_SNAPSHOT);
    const [constraints, setConstraints] = useState<Constraints>(INITIAL_CONSTRAINTS);

    const [rawSelection, setRawSelection] = useState<SimulationResult | null>(null);

    // Re-run simulation whenever inputs change
    const results = React.useMemo(() => {
        const options = generateOptions(snapshot);
        return options.map(opt => simulateOption(snapshot, opt, constraints));
    }, [snapshot, constraints]);

    // Derived selection: Use raw selection if valid, otherwise default to first result
    const selectedResult = (rawSelection && results.includes(rawSelection)) ? rawSelection : (results[0] || null);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Decision Intelligence</h1>
                <p className="text-neutral-400 mt-2">Evaluate your next moves against real constraints.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[800px]">
                {/* Left Column: Inputs (4 cols) */}
                <div className="lg:col-span-4 h-full overflow-y-auto pr-2">
                    <FinancialInputPanel
                        snapshot={snapshot}
                        constraints={constraints}
                        onSnapshotChange={setSnapshot}
                        onConstraintsChange={setConstraints}
                    />
                </div>

                {/* Middle Column: Decision Options (4 cols) */}
                <div className="lg:col-span-4 h-full overflow-y-auto pr-2">
                    <DecisionTable
                        results={results}
                        selectedResult={selectedResult}
                        onSelect={setRawSelection}
                    />
                </div>

                {/* Right Column: Visualization (4 cols) */}
                <div className="lg:col-span-4 h-full">
                    <OutcomeVisualizer result={selectedResult} />
                </div>
            </div>
        </div>
    );
}
