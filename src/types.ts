// Context
type Budget = {
    budgetName: string;
    budgetValue: number;
    explanation: string;
    percentage: number;
};
type Goal = {
    goal: string;
    monthlyPayments: number;
    targetAmount: number;
    explanation: string;
};
type Investment = {
    option: string;
    returns: number;
    explanation: string;
    riskGrade: string;
    diversificationGrade: string;
};
type Retirement = {
    option: string;
    monthlyPayments: number;
    explanation: string;
};
type EmergencyFund = {
    monthlyPayments: number;
    targetAmount: number;
    explanation: string;
};
type LongTermFund = {
    monthlyPayments: number;
    targetAmount: number;
    explanation: string;
};
type Projection = {
    totalSavings: number;
    years: number;
};
type Savings = {
    emergencyFund: EmergencyFund;
    longTermFund: LongTermFund;
    projection: Projection[];
};
export type Context = {
    budget: Budget[];
    goals: { short: Goal[]; long: Goal[] };
    investments: Investment[];
    retirement: Retirement[];
    savings: Savings;
};

// Summaries
export interface SummaryQuery {
    age: number;
    gender: "male" | "female";
    income: number;
    mStatus: "single" | "married";
    occupation: string;
    education:
        | "no high school"
        | "high school diploma"
        | "some college"
        | "college graduate";
}

// Error Handling
export type Status = {
    status: "error" | "success" | "normal";
	errorMessage?: string;
    context?: Context;
};
