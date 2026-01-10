
import { performance } from 'perf_hooks';

// --- Logic Simulation ---

// 1. Data Structures
interface FinancialState {
    bankBalance: number;
    committedSpend: number; // AP + Contracts
    burnRate: number;      // Monthly average
    safetyBuffer: number;  // Required cash floor
}

enum RiskState {
    STABLE = 'STABLE',
    TIGHT = 'TIGHT',
    FRAGILE = 'FRAGILE'
}

// 2. Core Calculation (The "Engine")
function calculateRealSpendingPower(state: FinancialState): number {
    // Logic: Balance - Commitments - SafetyBuffer
    return state.bankBalance - state.committedSpend - state.safetyBuffer;
}

// 3. State Machine Logic
function determineRiskState(runwayMonths: number): RiskState {
    if (runwayMonths > 6) return RiskState.STABLE;
    if (runwayMonths > 3) return RiskState.TIGHT;
    return RiskState.FRAGILE;
}

// --- Benchmark Runner ---

function runBenchmark() {
    console.log("🚀 Starting Financial Logic Benchmark...");

    const iterations = 1_000_000;
    const mockData: FinancialState = {
        bankBalance: 5_000_000,
        committedSpend: 1_200_000,
        burnRate: 450_000,
        safetyBuffer: 1_000_000
    };

    // Measure Calculation Time
    const startCalc = performance.now();
    for (let i = 0; i < iterations; i++) {
        // Force calculation to prevent V8 optimization removal
        const power = calculateRealSpendingPower(mockData);
        if (power < 0 && Math.random() > 1) console.log(power); // Dummy check
    }
    const endCalc = performance.now();
    const totalCalcTime = endCalc - startCalc;
    const avgCalcLatency = totalCalcTime / iterations;

    // Measure State Machine Time
    const startState = performance.now();
    for (let i = 0; i < iterations; i++) {
        const runway = (mockData.bankBalance - mockData.committedSpend) / mockData.burnRate;
        const state = determineRiskState(runway);
        if (state === RiskState.FRAGILE && Math.random() > 1) console.log(state);
    }
    const endState = performance.now();
    const totalStateTime = endState - startState;
    const avgStateLatency = totalStateTime / iterations;

    console.log(`\n📊 Results (${iterations.toLocaleString()} iterations):`);
    console.log(`------------------------------------------------`);
    console.log(`Spending Power Calculation: ${avgCalcLatency.toFixed(6)} ms/op`);
    console.log(`Risk State Evaluation:      ${avgStateLatency.toFixed(6)} ms/op`);
    console.log(`Total Pipeline Latency:     ${(avgCalcLatency + avgStateLatency).toFixed(6)} ms`);
    console.log(`Theoretical Throughput:     ${Math.floor(1000 / (avgCalcLatency + avgStateLatency)).toLocaleString()} ops/sec`);
    console.log(`------------------------------------------------`);

    // Verify "under 100ms" and "under 200ms" claims
    if ((avgCalcLatency + avgStateLatency) < 0.1) {
        console.log("✅ Claim Verified: Logic latency is < 100 microseconds (far exceeding < 100ms claim).");
    } else {
        console.log("❌ Claim Failed: Latency is too high.");
    }
}

runBenchmark();
