import type { ReactNode } from "react";

import { PlanSelectedBanner } from "@/components/registration/plan-selected-banner";
import { PlanSelectionCards } from "@/components/registration/plan-selection-cards";
import { companySubscriptionPlans } from "@/lib/company-registration";

interface CompanyProfilePlanStepProps {
    selectedPlan: string;
    selectedPlanName?: string;
    selectedPlanPrice?: string;
    selectedPlanError?: boolean;
    onSelectPlan: (planId: string) => void;
    renderFieldError: (field: string) => ReactNode;
}

export function CompanyProfilePlanStep({
    selectedPlan,
    selectedPlanName,
    selectedPlanPrice,
    selectedPlanError = false,
    onSelectPlan,
    renderFieldError,
}: CompanyProfilePlanStepProps) {
    return (
        <div className="space-y-6">
            <PlanSelectedBanner
                name={selectedPlanName}
                price={selectedPlanPrice}
            />
            <PlanSelectionCards
                plans={companySubscriptionPlans}
                selectedPlan={selectedPlan}
                onSelect={onSelectPlan}
                className={selectedPlanError ? "rounded-2xl border border-red-500 p-3" : undefined}
            />
            {renderFieldError("selectedPlan")}
        </div>
    );
}
