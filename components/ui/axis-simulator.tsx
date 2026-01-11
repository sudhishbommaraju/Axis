"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, RotateCcw, ShieldCheck, AlertCircle, Activity, ArrowRight, CheckCircle2, Sparkles, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { AILoader } from "./ai-loader"

interface SimulationStep {
    id: number
    title: string
    action: string
    intent: string
    result: "allowed" | "blocked"
    explanation: string
    balanceChange: number
    timestamp: string
}

const FIXED_SCENARIO: SimulationStep[] = [
    {
        id: 1,
        title: "Initial Request",
        action: "DEBIT",
        intent: "Transfer $80.00 to Vendor_A",
        result: "allowed",
        explanation: "Action within spending power limits ($100.00).",
        balanceChange: -80,
        timestamp: "09:42:01.001"
    },
    {
        id: 2,
        title: "Concurrent Collision",
        action: "DEBIT",
        intent: "Transfer $30.00 to Vendor_B",
        result: "blocked",
        explanation: "INVARIANT VIOLATION: Transaction would result in negative balance (-$10.00).",
        balanceChange: 0,
        timestamp: "09:42:01.002"
    },
    {
        id: 3,
        title: "Safety Buffer Check",
        action: "DEBIT",
        intent: "Transfer $15.00 (Emergency)",
        result: "allowed",
        explanation: "Sufficient liquidity remaining ($20.00).",
        balanceChange: -15,
        timestamp: "09:42:05.142"
    }
]

export function AxisSimulator() {
    const [isRunning, setIsRunning] = useState(false)
    const [isThinking, setIsThinking] = useState(false)
    const [currentStepIndex, setCurrentStepIndex] = useState(-1)
    const [balance, setBalance] = useState(100)
    const [history, setHistory] = useState<SimulationStep[]>([])
    const containerRef = useRef<HTMLDivElement>(null)

    const reset = () => {
        setIsRunning(false)
        setCurrentStepIndex(-1)
        setBalance(100)
        setHistory([])
    }

    const runSimulation = async () => {
        if (isRunning) return
        reset()
        setIsRunning(true)
        setIsThinking(true)

        // Artificial "AI Thinking" delay
        await new Promise(resolve => setTimeout(resolve, 2500))
        setIsThinking(false)

        for (let i = 0; i < FIXED_SCENARIO.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 1500))
            const step = FIXED_SCENARIO[i]
            setCurrentStepIndex(i)
            setHistory(prev => [step, ...prev])
            if (step.result === "allowed") {
                setBalance(prev => prev + step.balanceChange)
            }
        }
        setIsRunning(false)
    }

    return (
        <div
            ref={containerRef}
            className="w-full max-w-4xl mx-auto bg-neutral-900/50 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl"
        >
            {/* Header / State Bar */}
            <div className="p-6 border-b border-white/5 bg-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                        <Activity className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white">Live Authority Feed</h3>
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-tight">Scenario: Concurrent Double-Spend Prevention</p>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="text-right">
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">System Entropy</p>
                        <p className="text-xl font-mono font-bold text-white tracking-tighter">
                            ${balance.toFixed(2)}
                            <span className="text-xs text-neutral-500 ml-1">USD</span>
                        </p>
                    </div>

                    <div className="flex gap-2 relative z-50">
                        <Button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent bubbling issues
                                console.log("Run Simulation Clicked");
                                runSimulation();
                            }}
                            disabled={isRunning}
                            size="sm"
                            className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-widest text-[10px] px-4 cursor-pointer relative z-50 transition-all hover:scale-105 active:scale-95"
                        >
                            {isRunning ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    Simulating...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Play className="w-3 h-3" />
                                    Run Simulation
                                </span>
                            )}
                        </Button>
                        <Button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                reset();
                            }}
                            disabled={isRunning}
                            variant="outline"
                            size="icon"
                            className="rounded-lg border-white/10 hover:bg-white/5 cursor-pointer relative z-50 transition-all active:scale-95"
                        >
                            <RotateCcw className="w-4 h-4 text-neutral-400" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Demo Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 h-[450px]">
                {/* Left: Instruction Visualization */}
                <div className="p-8 border-r border-white/5 flex flex-col gap-6 bg-black/20">
                    <div className="space-y-2">
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em]">Instruction Set</p>
                        <div className="space-y-4">
                            {FIXED_SCENARIO.map((step, idx) => (
                                <motion.div
                                    key={step.id}
                                    initial={false}
                                    animate={{
                                        opacity: currentStepIndex >= idx ? 1 : 0.3,
                                        scale: currentStepIndex === idx ? 1.02 : 1
                                    }}
                                    className={cn(
                                        "p-4 rounded-xl border transition-all duration-300",
                                        currentStepIndex === idx
                                            ? "bg-white/5 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                            : "bg-transparent border-white/5"
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[10px] font-bold text-emerald-500/80 font-mono tracking-tighter">CMD_0{step.id}</span>
                                        <span className="text-[9px] font-mono text-neutral-600">{step.timestamp}</span>
                                    </div>
                                    <p className="text-xs font-bold text-white uppercase tracking-tight mb-1">{step.intent}</p>
                                    <div className="flex items-center gap-2">
                                        <div className={cn("h-1 w-1 rounded-full", step.result === "allowed" ? "bg-emerald-500" : "bg-red-500")} />
                                        <p className="text-[10px] font-mono text-neutral-500 uppercase">{step.action}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Result Feed */}
                <div className="p-8 overflow-y-auto custom-scrollbar bg-black/10">
                    <div className="space-y-4">
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em]">Reality Ledger</p>

                        <AnimatePresence mode="wait">
                            {isThinking ? (
                                <motion.div
                                    key="thinking"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    className="flex flex-col items-center justify-center h-64"
                                >
                                    <Sparkles className="w-8 h-8 text-emerald-500 animate-pulse mb-2" />
                                    <AILoader />
                                    <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.3em] mt-4">Analyzing Invariants...</p>
                                </motion.div>
                            ) : history.length === 0 ? (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center h-48 text-center"
                                >
                                    <ShieldCheck className="w-12 h-12 text-neutral-800 mb-4" />
                                    <p className="text-xs font-mono text-neutral-600 uppercase tracking-widest">System Ready<br />Await Instructions</p>
                                </motion.div>
                            ) : (
                                <div className="space-y-4">
                                    {history.map((step) => (
                                        <motion.div
                                            key={step.id}
                                            initial={{ x: 20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className={cn(
                                                "p-5 rounded-2xl border flex flex-col gap-3",
                                                step.result === "allowed"
                                                    ? "bg-emerald-500/5 border-emerald-500/20"
                                                    : "bg-red-500/5 border-red-500/20"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                {step.result === "allowed" ? (
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                ) : (
                                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                                )}
                                                <div className="flex-1">
                                                    <p className={cn(
                                                        "text-[10px] font-bold uppercase tracking-widest",
                                                        step.result === "allowed" ? "text-emerald-500" : "text-red-500"
                                                    )}>
                                                        {step.result === "allowed" ? "AUTHORITY_PASSED" : "AUTHORITY_BLOCKED"}
                                                    </p>
                                                    <p className="text-xs font-bold text-white mt-0.5">{step.title}</p>
                                                </div>
                                            </div>
                                            <p className="text-[11px] leading-relaxed text-neutral-400 font-medium">
                                                {step.explanation}
                                            </p>
                                            {step.balanceChange !== 0 && (
                                                <div className="pt-2 border-t border-white/5 mt-1">
                                                    <span className="text-[10px] font-mono text-emerald-500/60 uppercase">Net Delta: {step.balanceChange > 0 ? "+" : ""}{step.balanceChange.toFixed(2)} USD</span>
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Visual Footer */}
            <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-center">
                <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-[0.4em]">
                    Real-Time Determinism • Invariant Locking Agent V1.0
                </p>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.1); }
            `}</style>
        </div>
    )
}
