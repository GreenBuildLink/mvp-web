import { LucideIcon, CheckCircle2, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { RegistrationPlan } from "@/lib/registration/types";
import { cn } from "@/lib/utils";

interface PlanSelectionCardsProps {
    plans: RegistrationPlan[];
    selectedPlan: string;
    onSelect: (planId: string) => void;
    accent?: "brand" | "worker";
    className?: string;
}

const accentStyles = {
    brand: {
        ring: "ring-emerald-500",
        badge: "from-emerald-500 to-teal-500",
        featureIcon: "text-emerald-500",
    },
    worker: {
        ring: "ring-lime-500",
        badge: "from-lime-500 to-emerald-500",
        featureIcon: "text-lime-500",
    },
};

export function PlanSelectionCards({
    plans,
    selectedPlan,
    onSelect,
    accent = "brand",
    className,
}: PlanSelectionCardsProps) {
    const styles = accentStyles[accent];

    return (
        <div className={cn("grid gap-6 md:grid-cols-3", className)}>
            {plans.map((plan) => (
                <Card
                    key={plan.id}
                    className={cn(
                        "relative cursor-pointer overflow-hidden border-2 transition-all duration-500",
                        selectedPlan === plan.id
                            ? `${plan.borderColor} shadow-xl ring-2 ${styles.ring}`
                            : "border-transparent shadow-lg hover:shadow-xl",
                    )}
                    onClick={() => onSelect(plan.id)}
                >
                    {plan.popular ? (
                        <Badge className={cn("absolute top-4 right-4 rounded-full border-0 text-xs text-white bg-gradient-to-r", styles.badge)}>
                            <Sparkles className="w-3 h-3 mr-1" />
                            Popular
                        </Badge>
                    ) : null}
                    <CardContent className="p-6">
                        <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg", plan.color)}>
                            <plan.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="mb-1 text-xl font-bold">{plan.name}</h3>
                        <p className="gradient-text mb-4 text-2xl font-bold">{plan.price}</p>
                        <ul className="space-y-2">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CheckCircle2 className={cn("w-4 h-4 shrink-0", styles.featureIcon)} />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
