import { useMemo, useState } from "react";

export function usePlanSelection<TPlan extends { id: string }>(
    plans: readonly TPlan[],
    initialPlan = "",
) {
    const [selectedPlan, setSelectedPlan] = useState(initialPlan);

    const selectedPlanConfig = useMemo(
        () => plans.find((plan) => plan.id === selectedPlan),
        [plans, selectedPlan],
    );

    return {
        selectedPlan,
        setSelectedPlan,
        selectedPlanConfig,
    };
}
