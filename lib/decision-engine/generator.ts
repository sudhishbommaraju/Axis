import { DecisionLevers, FinancialSnapshot } from "./types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateOptions(_snapshot: FinancialSnapshot): DecisionLevers[] {
    const options: DecisionLevers[] = [];

    // Base option: Do nothing
    options.push({
        hiringDelta: 0,
        marketingSpendIncrease: 0,
        inventorySpendIncrease: 0,
        startDelayMonths: 0
    });

    // Hiring options (conservative)
    options.push({
        hiringDelta: 1,
        marketingSpendIncrease: 0,
        inventorySpendIncrease: 0,
        startDelayMonths: 0
    });

    options.push({
        hiringDelta: 2,
        marketingSpendIncrease: 0,
        inventorySpendIncrease: 0,
        startDelayMonths: 1 // Slight delay
    });

    // Marketing options
    options.push({
        hiringDelta: 0,
        marketingSpendIncrease: 0.1, // 10% increase
        inventorySpendIncrease: 0,
        startDelayMonths: 0
    });

    options.push({
        hiringDelta: 0,
        marketingSpendIncrease: 0.2, // 20% increase
        inventorySpendIncrease: 0,
        startDelayMonths: 0
    });

    // Mixed/Aggressive Option
    options.push({
        hiringDelta: 1,
        marketingSpendIncrease: 0.15,
        inventorySpendIncrease: 0.1,
        startDelayMonths: 0
    });

    return options;
}
