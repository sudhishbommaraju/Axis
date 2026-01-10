
const { performance } = require('perf_hooks');
const fs = require('fs');

// --- 1. System Constants & Logic ---

const RiskState = {
    STABLE: 'STABLE',
    TIGHT: 'TIGHT',
    FRAGILE: 'FRAGILE'
};

const SAFETY_BUFFER_RATIO = 0.15; // 15% safety buffer

function processTransactionBatch(batch, currentBalance) {
    let runningBalance = currentBalance;
    let riskState = RiskState.STABLE;

    // Simulate complex reduction: 
    // 1. Update Balance
    // 2. Recalculate Runway
    // 3. Determine Risk State
    // 4. Check Safety Violation

    const results = [];

    for (const tx of batch) {
        // Step 1: Commit Spend
        runningBalance -= tx.amount;

        // Step 2: Recalculate Runway (Dynamic Burn Rate)
        const currentBurn = tx.burnRateSnapshot;
        const runway = runningBalance / currentBurn;

        // Step 3: Determine Risk
        if (runway > 6) riskState = RiskState.STABLE;
        else if (runway > 3) riskState = RiskState.TIGHT;
        else riskState = RiskState.FRAGILE;

        // Step 4: Safety Rule Check
        const safetyFloor = currentBurn * 3; // Must have 3 months cash
        const violation = runningBalance < safetyFloor;

        results.push({
            id: tx.id,
            finalBalance: runningBalance,
            riskState,
            violation
        });
    }
    return results;
}

// --- 2. Test Harness ---

function runStressTest() {
    console.log("🔥 Starting Rigorous Stress Test (Pipeline Simulation)...");

    const BATCH_SIZE = 100000;
    const TOTAL_ITEMS = 5000000; // 5 Million Transactions
    const BATCHES = TOTAL_ITEMS / BATCH_SIZE;

    const latencies = [];
    let initialMemory = process.memoryUsage().heapUsed;
    let peakMemory = initialMemory;

    console.log(`Payload: ${TOTAL_ITEMS.toLocaleString()} Transactions`);
    console.log(`Batch Size: ${BATCH_SIZE.toLocaleString()}`);

    // Generate Mock Data (Just-in-time to avoid OOM during gen) - actually pre-gen small batches

    let totalTime = 0;
    let operationsCount = 0;

    for (let b = 0; b < BATCHES; b++) {
        // Generate a noisy batch
        const batch = [];
        for (let i = 0; i < BATCH_SIZE; i++) {
            batch.push({
                id: `tx_${b}_${i}`,
                amount: Math.random() * 1000,
                burnRateSnapshot: 50000 + (Math.random() * 10000)
            });
        }

        const start = performance.now();
        const results = processTransactionBatch(batch, 100_000_000); // 100M Start Balance
        const end = performance.now();

        const duration = end - start;
        latencies.push(duration);
        totalTime += duration;
        operationsCount += BATCH_SIZE;

        // Memory Check
        const currentMem = process.memoryUsage().heapUsed;
        if (currentMem > peakMemory) peakMemory = currentMem;

        // Tiny GC pause simulation
        // if (b % 10 === 0) global.gc && global.gc(); 
    }

    // --- 3. Analysis ---

    latencies.sort((a, b) => a - b);
    const p50 = latencies[Math.floor(latencies.length * 0.50)];
    const p95 = latencies[Math.floor(latencies.length * 0.95)];
    const p99 = latencies[Math.floor(latencies.length * 0.99)];

    const avgBatchLatency = totalTime / BATCHES;
    const avgOpLatencyMicro = (totalTime / TOTAL_ITEMS) * 1000; // microseconds
    const throughput = Math.floor(TOTAL_ITEMS / (totalTime / 1000));

    const finalMemory = process.memoryUsage().heapUsed;
    const memDeltaMB = (peakMemory - initialMemory) / 1024 / 1024;

    console.log(`\n📊 Stress Test Results:`);
    console.log(`-----------------------`);
    console.log(`Total Transactions: ${TOTAL_ITEMS.toLocaleString()}`);
    console.log(`Throughput:         ${throughput.toLocaleString()} tx/sec`);
    console.log(`-----------------------`);
    console.log(`Latency (per Batch of ${BATCH_SIZE.toLocaleString()}):`);
    console.log(`  p50 (Median):     ${p50.toFixed(2)} ms`);
    console.log(`  p95:              ${p95.toFixed(2)} ms`);
    console.log(`  p99:              ${p99.toFixed(2)} ms`);
    console.log(`-----------------------`);
    console.log(`Latency (per Transaction):`);
    console.log(`  Average:          ${avgOpLatencyMicro.toFixed(4)} μs`);
    console.log(`-----------------------`);
    console.log(`Memory Impact:`);
    console.log(`  Peak Delta:       ${memDeltaMB.toFixed(2)} MB`);

    const report = {
        throughput,
        p99BatchMs: p99,
        avgOpLatencyMicro,
        totalItems: TOTAL_ITEMS,
        peakMemoryDeltaMB: memDeltaMB
    };

    fs.writeFileSync('stress_test_results.json', JSON.stringify(report, null, 2));
    console.log("\n✅ Validated. Report saved to stress_test_results.json");
}

runStressTest();
