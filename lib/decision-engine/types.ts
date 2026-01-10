export interface FinancialSnapshot {
    currentCash: number;
    monthlyRevenue: number;
    fixedCosts: number;
    variableCostRatio: number; // 0.0 to 1.0 (as a percentage of revenue)
    currentHeadcount: number;
    avgSalaryPerEmployee: number;
    hiringCostPerEmployee: number;
    discretionarySpend: number;
}

export interface Constraints {
    minRunwayMonths: number;
    riskTolerance: 'low' | 'medium' | 'high';
    maxMonthlyBurn?: number;
}

export interface DecisionLevers {
    hiringDelta: number; // Number of new hires (integer)
    marketingSpendIncrease: number; // Percentage increase (0.0 to 1.0)
    inventorySpendIncrease: number; // Percentage increase (0.0 to 1.0)
    startDelayMonths: number; // 0 to N
}

export interface SimulationMonth {
    monthIndex: number;
    cashStart: number;
    cashEnd: number;
    revenue: number;
    totalExpenses: number;
    netBurn: number;
    headcount: number;
    isViolation: boolean;
    violationReason?: string;
}

export type SimulationStatus = 'FEASIBLE' | 'RISKY' | 'INFEASIBLE';

export interface SimulationResult {
    option: DecisionLevers;
    status: SimulationStatus;
    runwayMonths: number;
    monthlyData: SimulationMonth[];
    failureMonth?: number;
    primaryRiskFactor?: string;
}
