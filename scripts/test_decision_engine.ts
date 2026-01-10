
import { generateOptions } from "../lib/decision-engine/generator";
import { simulateOption } from "../lib/decision-engine/simulator";
import { Constraints, FinancialSnapshot } from "../lib/decision-engine/types";

// Mock Snapshot
const snapshot: FinancialSnapshot = {
    currentCash: 50000,
    monthlyRevenue: 10000,
    fixedCosts: 5000,
    variableCostRatio: 0.1, // 1000
    currentHeadcount: 2,
    avgSalaryPerEmployee: 3000, // Payroll = 6000
    hiringCostPerEmployee: 2000,
    discretionarySpend: 2000, // Total expenses = 5000 + 6000 + 1000 + 2000 = 14000.  Net Burn = 4000.
};

// Constraints
const constraints: Constraints = {
    minRunwayMonths: 6,
    riskTolerance: 'medium'
};

console.log("--- Starting Decision Engine Test ---");
console.log("Current Cash:", snapshot.currentCash);
console.log("Monthly Burn (approx):", 4000);

const options = generateOptions(snapshot);
console.log(`Generated ${options.length} options.`);

options.forEach((opt, idx) => {
    console.log(`\nOption ${idx + 1}: Hire ${opt.hiringDelta}, Marketing +${(opt.marketingSpendIncrease * 100).toFixed(0)}%`);
    const result = simulateOption(snapshot, opt, constraints);
    console.log("Status:", result.status);
    console.log("Runway:", result.runwayMonths, "months");
    if (result.failureMonth) {
        console.log("Failure Month:", result.failureMonth);
        console.log("Risk Factor:", result.primaryRiskFactor);
    }
});
