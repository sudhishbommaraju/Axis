"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Link as LinkIcon, Lock, CheckCircle2, ShieldCheck, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for "Connect" flow
const MOCK_BANK_ACCOUNTS = [
    { id: 'acc_1', name: 'Mercury Operational Checking', mask: '•••• 4432', balance: 48500, status: 'active' },
    { id: 'acc_2', name: 'Chase Business Savings', mask: '•••• 8821', balance: 125000, status: 'active' },
    { id: 'acc_3', name: 'Brex Cash', mask: '•••• 1102', balance: 22150, status: 'active' },
];

export function BankConnection({ onConnect }: { onConnect?: (data: any) => void }) {
    const [status, setStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');

    const handleConnect = async () => {
        setStatus('connecting');
        // Simulate API delay for Plaid/Bank aggregation
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus('connected');
        if (onConnect) {
            onConnect(MOCK_BANK_ACCOUNTS);
        }
    };

    return (
        <Card className="p-6 bg-neutral-900 border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <LinkIcon className="w-5 h-5 text-emerald-500" />
                        Bank Connections
                    </h3>
                    <p className="text-sm text-neutral-400">Read-only financial data aggregation.</p>
                </div>
                <Badge variant={status === 'connected' ? 'outline' : 'secondary'} className={cn(
                    "uppercase tracking-wider font-mono text-[10px]",
                    status === 'connected' ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" : "text-neutral-500"
                )}>
                    {status === 'connected' ? 'Live Sync Active' : 'Disconnected'}
                </Badge>
            </div>

            {status === 'idle' && (
                <div className="flex flex-col items-center justify-center py-8 space-y-6 text-center border-2 border-dashed border-white/5 rounded-xl bg-black/20">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                        <Lock className="w-8 h-8 text-neutral-500" />
                    </div>
                    <div className="space-y-2 max-w-sm">
                        <h4 className="text-white font-medium">Connect Primary Accounts</h4>
                        <p className="text-xs text-neutral-500 leading-relaxed">
                            Axis uses a read-only token to fetch balances and transaction history.
                            <br />
                            <span className="text-neutral-400 font-bold">No write access or money movement permissions are granted.</span>
                        </p>
                    </div>
                    <Button onClick={handleConnect} className="bg-white text-black hover:bg-neutral-200 font-bold">
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Connect via SafeLink
                    </Button>
                </div>
            )}

            {status === 'connecting' && (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                    <p className="text-sm text-neutral-400 font-mono animate-pulse">ESTABLISHING SECURE TUNNEL...</p>
                </div>
            )}

            {status === 'connected' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="grid gap-3">
                        {MOCK_BANK_ACCOUNTS.map((acc) => (
                            <div key={acc.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center border border-white/10">
                                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{acc.name}</p>
                                        <p className="text-xs text-neutral-500 font-mono">{acc.mask}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-mono font-bold text-white tabular-nums">
                                        ${acc.balance.toLocaleString()}
                                    </p>
                                    <p className="text-[10px] text-emerald-400 uppercase tracking-wider flex items-center justify-end gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Synced
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-3 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10">
                        <AlertTriangle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <p className="text-[10px] text-emerald-400/80 leading-tight">
                            <strong>Security Protocol Active:</strong> Connection is restricted to READ-ONLY.
                            Attempting to initiate transfers will result in immediate termination of the session.
                        </p>
                    </div>
                </div>
            )}
        </Card>
    );
}
