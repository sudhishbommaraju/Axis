
const { performance } = require('perf_hooks');

// --- Logic Simulation ---

const RiskState = {
    STABLE: 'STABLE',
    TIGHT: 'TIGHT',
    FRAGILE: 'FRAGILE'
};

// 2. Core Calculation (The "Engine")
function calculateRealSpendingPower(state) {
    // Logic: Balance - Commitments - SafetyBuffer
    return state.bankBalance - state.committedSpend - state.safetyBuffer;
}

// 3. State Machine Logic
function determineRiskState(runwayMonths) {
    if (runwayMonths > 6) return RiskState.STABLE;
    if (runwayMonths > 3) return RiskState.TIGHT;
    return RiskState.FRAGILE;
}

// --- Benchmark Runner ---

function runBenchmark() {
    console.log("🚀 Starting Financial Logic Benchmark (JS)...");

    const iterations = 1000000;
    const mockData = {
        bankBalance: 5000000,
        committedSpend: 1200000,
        burnRate: 450000,
        safetyBuffer: 1000000
    };

    // Measure Calculation Time
    const startCalc = performance.now();
    for (let i = 0; i < iterations; i++) {
        const power = calculateRealSpendingPower(mockData);
        if (power < 0 && Math.random() > 1) console.log(power);
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

    const results = {
        spendingPowerLatency: avgCalcLatency,
        riskStateLatency: avgStateLatency,
        totalLatency: avgCalcLatency + avgStateLatency,
        throughput: Math.floor(1000 / (avgCalcLatency + avgStateLatency))
    };

    const fs = require('fs');
    fs.writeFileSync('benchmark_data.json', JSON.stringify(results, null, 2));

    console.log("✅ Results written to benchmark_data.json");
}

runBenchmark();
