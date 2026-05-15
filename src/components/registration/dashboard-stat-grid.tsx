import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardStat {
    title: string;
    value: string;
    description: string;
    icon: LucideIcon;
}

interface DashboardStatGridProps {
    stats: DashboardStat[];
    accent?: "brand" | "worker" | "designer" | "premium";
    badgeLabel?: string;
}

const accentClassNames = {
    brand: {
        border: "border-emerald-100/80",
        icon: "from-emerald-500 to-teal-600 shadow-emerald-500/20",
        label: "text-emerald-700/80",
    },
    worker: {
        border: "border-lime-100/80",
        icon: "from-lime-500 to-emerald-600 shadow-lime-500/20",
        label: "text-lime-700/80",
    },
    designer: {
        border: "border-teal-100/80",
        icon: "from-teal-500 to-sky-600 shadow-teal-500/20",
        label: "text-teal-700/80",
    },
    premium: {
        border: "border-amber-100/80",
        icon: "from-amber-500 to-amber-600 shadow-amber-500/20",
        label: "text-amber-700/80",
    },
};

export function DashboardStatGrid({
    stats,
    accent = "brand",
    badgeLabel,
}: DashboardStatGridProps) {
    const styles = accentClassNames[accent];

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title} className={cn("bg-card/90 shadow-sm", styles.border)}>
                    <CardContent className="space-y-3 p-5">
                        <div className="flex items-center justify-between">
                            <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg", styles.icon)}>
                                <stat.icon className="h-5 w-5 text-white" />
                            </div>
                            <span className={cn("text-xs font-medium uppercase tracking-[0.18em]", styles.label)}>
                                {badgeLabel ?? (accent === "premium" ? "Premium" : accent === "designer" ? "Designer" : accent === "worker" ? "Worker" : "Brand")}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                            <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">{stat.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
