interface PlanSelectedBannerProps {
    name?: string;
    price?: string;
    accent?: "brand" | "worker";
    emptyText?: string;
}

const accentClassNames = {
    brand: "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300",
    worker: "bg-lime-50 border-lime-200 text-lime-700 dark:bg-lime-900/20 dark:border-lime-800 dark:text-lime-300",
};

export function PlanSelectedBanner({
    name,
    price,
    accent = "brand",
    emptyText = "Choose one plan to continue",
}: PlanSelectedBannerProps) {
    return (
        <div className={`rounded-xl border p-4 text-center ${accentClassNames[accent]}`}>
            <p className="text-sm">
                <span className="font-semibold">Selected Plan:</span>{" "}
                {name && price ? `${name} (${price})` : emptyText}
            </p>
        </div>
    );
}
