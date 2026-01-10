
const { performance } = require('perf_hooks');

// ==========================================
// THE RESILIENT ENGINE (MITIGATED)
// ==========================================
// Features: 
// 1. Mutex/Locking for Concurrency Control
// 2. Append-Only Ledger Enforcement
// 3. Timestamp Monotonicity Checks

class ResilientFinancialEngine {
    constructor(initialBalance) {
        const ledgerArr = [];
        this.ledger = new Proxy(ledgerArr, {
            set: (target, property, value) => {
                if (property === 'length') { target.length = value; return true; }
                const index = Number(property);
                if (!Number.isNaN(index)) {
                    if (index < target.length) {
                        return false; // Reject overwrite (Simulated DB Permission Error)
                    }
                }
                target[property] = value;
                return true;
            }
        });

        this.currentBalance = initialBalance;
        this.isLocked = false;

        // Initialize Genesis Block
        this._commitEvent({
            type: 'GENESIS',
            amount: 0,
            balance_after: initialBalance,
            timestamp: Date.now() - 10000 // In the past
        });
    }

    // INTERNAL: The only way to write to ledger
    _commitEvent(event) {
        // INVARIANTCHECK: Monotonic Time
        const lastEvent = this.ledger[this.ledger.length - 1];
        if (lastEvent && event.timestamp < lastEvent.timestamp) {
            throw new Error("INVARIANT_VIOLATION: Time Traveler Detected (New timestamp < Last committed)");
        }

        this.ledger.push(Object.freeze(event)); // Freeze for JS-level Immutability
    }

    // PUBLIC: Transaction Processor
    async processTransaction(txId, amount) {
        // 1. ACQUIRE LOCK (Simulated Row Lock)
        // In a real DB, this is `SELECT ... FOR UPDATE`
        while (this.isLocked) {
            await new Promise(r => setTimeout(r, 5)); // Spin-wait
        }
        this.isLocked = true;

        try {
            // 2. CRITICAL SECTION
            // Re-read balance INSIDE the lock (The "Gap of Death" Fix)
            const safeBalance = this.currentBalance;

            // Simulate DB Latency
            await new Promise(r => setTimeout(r, Math.random() * 20));

            // 3. INVARIANT CHECK: Real Spending Power
            if (safeBalance - amount < 0) {
                return { success: false, reason: "REJECTED: Insufficient Funds", balance: safeBalance };
            }

            // 4. STATE UPDATE
            this.currentBalance -= amount;

            const event = {
                id: txId,
                type: 'SPEND',
                amount: amount,
                balance_after: this.currentBalance,
                timestamp: Date.now()
            };

            // 5. COMMIT
            this._commitEvent(event);
            return { success: true, event };

        } catch (e) {
            return { success: false, reason: `SYSTEM_ERROR: ${e.message}` };
        } finally {
            // 6. RELEASE LOCK
            this.isLocked = false;
        }
    }

    // PUBLIC: Attack Interface (Simulating Direct DB Access)
    async attemptLedgerMutation(index, newData) {
        try {
            this.ledger[index] = newData;
            // In strict mode JS or with Object.freeze, this fails.
            // If it doesn't throw, we manually check if it stuck.
            if (this.ledger[index] === newData) return true;
            return false;
        } catch (e) {
            return false; // Mutation failed (Good!)
        }
    }

    getLedgerSize() { return this.ledger.length; }
}

// ==========================================
// THE KILL-LIST TEST SUITE
// ==========================================

async function runKillList() {
    console.log("🛡️  Initiating PRE-DEPLOY KILL-LIST TESTS...");
    const engine = new ResilientFinancialEngine(100_000);

    let passes = 0;
    let fails = 0;

    // --- TEST 1: THE GAP OF DEATH ---
    console.log("\n🧪 Test 1: The 'Gap of Death' (Concurrency Stress)");
    console.log("   Scenario: 50 concurrent requests, each demanding 60% of budget.");

    const threads = [];
    for (let i = 0; i < 50; i++) {
        threads.push(engine.processTransaction(`tx_${i}`, 60_000));
    }

    const results = await Promise.all(threads);
    const successes = results.filter(r => r.success).length;
    const rejections = results.filter(r => !r.success).length;

    console.log(`   Result: ${successes} Success, ${rejections} Rejections`);

    if (successes === 1 && rejections === 49) {
        console.log("   ✅ PASS: Exact/Atomic locking confirmed.");
        passes++;
    } else {
        console.log("   ❌ FAIL: Race condition detected!");
        fails++;
    }

    // --- TEST 2: THE TIME TRAVELER ---
    console.log("\n🧪 Test 2: The 'Time Traveler' (Causality Check)");
    console.log("   Scenario: Inject event with timestamp from the past.");

    // Hack: Manually try to commit a bad event via a backdoor wrapper or just verifying the internal check logic
    // We'll simulate a transaction that tries to backdate (internal engine clock is monotonic, but let's force it)

    try {
        // Start a fresh engine instance for dirty testing hooks
        const tempEngine = new ResilientFinancialEngine(1000);
        await tempEngine._commitEvent({ type: 'BAD_EVT', amount: 0, balance_after: 0, timestamp: 0 }); // 1970
        console.log("   ❌ FAIL: System accepted backdated event.");
        fails++;
    } catch (e) {
        if (e.message.includes("Time Traveler")) {
            console.log(`   ✅ PASS: Rejected backdated event: "${e.message}"`);
            passes++;
        } else {
            console.log(`   ⚠️ WARN: Failed for wrong reason: ${e.message}`);
            fails++;
        }
    }

    // --- TEST 3: THE ERASER ---
    console.log("\n🧪 Test 3: The 'Eraser' (Immutability Check)");
    console.log("   Scenario: Attempt in-memory corruption of ledger index 0.");

    const mutationSuccess = await engine.attemptLedgerMutation(0, { corrupted: true });

    if (!mutationSuccess) {
        console.log("   ✅ PASS: Database/Ledger memory is immutable.");
        passes++;
    } else {
        console.log("   ❌ FAIL: Ledger was successfully corrupted.");
        fails++;
    }

    const summary = {
        passes,
        fails,
        status: fails === 0 ? "SURVIVABLE" : "VULNERABLE",
        gapOfDeath: { successes, rejections },
        timestamp: Date.now()
    };

    const fs = require('fs');
    fs.writeFileSync('kill_list_report.json', JSON.stringify(summary, null, 2));

    console.log("\n========================================");
    console.log(`SUMMARY: ${passes} Passed, ${fails} Failed`);
    if (fails === 0) console.log("🟢 SYSTEM STATUS: SURVIVABLE. READY FOR DEPLOY.");
    else console.log("🔴 SYSTEM STATUS: CRITICAL VULNERABILITIES. ABORT DEPLOY.");
    console.log("========================================");
}

runKillList();
