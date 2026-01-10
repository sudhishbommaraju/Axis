"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BankConnection } from "@/components/platform/bank-connection";
import { FinancialSnapshot, INITIAL_SNAPSHOT } from "@/components/platform/financial-snapshot";
import { DecisionMaker } from "@/components/platform/decision-maker";
import { FinancialSnapshot as SnapshotType } from "@/lib/decision-engine/types";

export default function OwnerDashboard() {
    const [bankConnected, setBankConnected] = useState(false);
    const [snapshot, setSnapshot] = useState<SnapshotType>(INITIAL_SNAPSHOT);

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Control Center</h1>
                    <p className="text-neutral-400">Financial Authority & System Invariants</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 border border-emerald-500/20 bg-emerald-500/5 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest font-bold">System Nominal</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1. Bank Connection (Read Only) */}
                <div className="w-full">
                    <BankConnection onConnect={() => setBankConnected(true)} />
                </div>

                {/* 2. Financial Snapshot (Editable if Owner) */}
                <div className="w-full h-full">
                    <FinancialSnapshot connected={bankConnected} onUpdate={setSnapshot} />
                </div>
            </div>

            {/* 3. Decision Maker & Simulator */}
            <div className="w-full">
                <DecisionMaker snapshot={snapshot} />
            </div>
        </div>
    );
}
