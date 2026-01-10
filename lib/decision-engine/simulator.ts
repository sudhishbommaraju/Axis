import { Constraints, DecisionLevers, FinancialSnapshot, SimulationMonth, SimulationResult, SimulationStatus } from "./types";

const HORIZON_MONTHS = 18;

export function simulateOption(
    snapshot: FinancialSnapshot,
    option: DecisionLevers,
    constraints: Constraints
): SimulationResult {
    let currentCash = snapshot.currentCash;
    const currentHeadcount = snapshot.currentHeadcount;
    const currentMonthlyRevenue = snapshot.monthlyRevenue; // Assuming flat revenue for simplicity, or we could project growth

    // Apply immediate hiring cost if any (assuming hiring happens at month 0/start)
    // Note: We might want to delay this based on startDelayMonths

    const monthlyData: SimulationMonth[] = [];
    let failureMonth: number | undefined;
    let primaryRiskFactor: string | undefined;

    for (let month = 1; month <= HORIZON_MONTHS; month++) {
        const isActionMonth = month > option.startDelayMonths;

        // 1. Calculate Revenue (Future: add growth/churn logic)
        const monthlyRevenue = currentMonthlyRevenue;

        // 2. Adjust Expenses based on Levers
        let headcount = currentHeadcount;
        if (isActionMonth) {
            headcount += option.hiringDelta;
        }

        const payroll = headcount * snapshot.avgSalaryPerEmployee;

        let marketingSpend = snapshot.discretionarySpend * 0.3; // Base assumption: 30% of discretionary is marketing
        if (isActionMonth) {
            marketingSpend *= (1 + option.marketingSpendIncrease);
        }

        let inventorySpend = snapshot.discretionarySpend * 0.4; // Base assumption: 40% of discretionary is inventory
        if (isActionMonth) {
            inventorySpend *= (1 + option.inventorySpendIncrease);
        }

        const otherDiscretionary = snapshot.discretionarySpend * 0.3; // Remaining 30%

        const totalDiscretionary = marketingSpend + inventorySpend + otherDiscretionary;

        const variableCosts = monthlyRevenue * snapshot.variableCostRatio;
        const totalExpenses = snapshot.fixedCosts + payroll + totalDiscretionary + variableCosts;

        // One-time hiring costs
        let oneTimeCosts = 0;
        if (month === option.startDelayMonths + 1 && option.hiringDelta > 0) {
            oneTimeCosts = option.hiringDelta * snapshot.hiringCostPerEmployee;
        }

        const netBurn = totalExpenses + oneTimeCosts - monthlyRevenue;

        const cashStart = currentCash;
        currentCash -= netBurn;

        // Check for bankruptcy
        let isViolation = false;
        let violationReason: string | undefined;

        if (currentCash < 0) {
            isViolation = true;
            violationReason = "Bankruptcy: Cash balance below zero.";
            if (!failureMonth) {
                failureMonth = month;
                primaryRiskFactor = "Bankruptcy";
            }
        }
        else if (currentCash < (constraints.minRunwayMonths * netBurn) && netBurn > 0) {
            // Heuristic: If remaining cash < N months of current burn
            // This is a softer check, technically not a violation of physical reality but a violation of safety constraint
            // We can flag it as Risk or Violation depending on strictness.
            // For strict constraints:
            isViolation = true;
            violationReason = `Runway violation: Cash reserves dropped below ${constraints.minRunwayMonths} months of burn.`;
            if (!failureMonth) {
                failureMonth = month;
                primaryRiskFactor = "Runway Breach";
            }
        }

        monthlyData.push({
            monthIndex: month,
            cashStart,
            cashEnd: currentCash,
            revenue: monthlyRevenue,
            totalExpenses: totalExpenses + oneTimeCosts,
            netBurn,
            headcount,
            isViolation,
            violationReason
        });

        // Optimization: If bankrupt, we can stop or continue to show the depth of failure
        // We continue to show the curve.
    }

    let status: SimulationStatus = 'FEASIBLE';
    if (failureMonth) {
        status = 'INFEASIBLE';
        // Check if it's just risky? 
        // If the violation was just "Runway Breach" but not bankruptcy, and risk tolerance is high, maybe it's just risky?
        // For now, strict: if ANY constraint breaks -> Infeasible (or Risky if close?)
        // Let's refine:
        // Bankruptcy = INFEASIBLE
        // Runway Breach = RISKY (if tolerance allows?) OR INFEASIBLE (if hard constraint)

        if (primaryRiskFactor === "Bankruptcy") {
            status = 'INFEASIBLE';
        } else {
            // Runway violation
            if (constraints.riskTolerance === 'high') {
                status = 'RISKY';
            } else {
                status = 'INFEASIBLE';
            }
        }
    }

    // Calculate actual runway
    // Find first month where cash < 0
    let runwayMonths = HORIZON_MONTHS;
    if (failureMonth && primaryRiskFactor === "Bankruptcy") {
        runwayMonths = failureMonth - 1;
    } else {
        // If we didn't go bankrupt but violated runway constraint, runway is still technically "until 0"
        // But let's calculate based on final burn
        const finalBurn = monthlyData[HORIZON_MONTHS - 1].netBurn;
        if (finalBurn > 0 && currentCash > 0) {
            runwayMonths = Math.min(HORIZON_MONTHS, Math.floor(currentCash / finalBurn) + HORIZON_MONTHS);
            // Allow runway > Horizon
        } else if (currentCash > 0) {
            runwayMonths = 999; // Infinite/Sustainable
        }
    }

    return {
        option,
        status,
        runwayMonths,
        monthlyData,
        failureMonth,
        primaryRiskFactor
    };
}
