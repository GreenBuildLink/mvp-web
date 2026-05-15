import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type StepProgressAccent = "brand" | "worker";

interface StepItem {
  label: string;
  icon?: LucideIcon;
}

interface StepProgressProps {
  accent?: StepProgressAccent;
  currentStep: number;
  steps: StepItem[];
  className?: string;
  onStepSelect?: (step: number) => void;
}

const accentClasses = {
  brand: {
    mobileCard: "ui-mobile-progress-brand",
    mobileLabel: "text-emerald-700",
    progressTrack: "bg-emerald-100",
    progressFill: "bg-gradient-to-r from-emerald-600 to-teal-600",
    active: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25",
    complete:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    connectorActive: "bg-emerald-500",
  },
  worker: {
    mobileCard: "ui-mobile-progress-worker",
    mobileLabel: "text-lime-700",
    progressTrack: "bg-lime-100",
    progressFill: "bg-gradient-to-r from-lime-600 to-emerald-600",
    active: "bg-gradient-to-r from-lime-600 to-emerald-600 text-white shadow-lg shadow-lime-500/25",
    complete:
      "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300",
    connectorActive: "bg-lime-500",
  },
} as const;

export function StepProgress({
  accent = "brand",
  currentStep,
  steps,
  className,
  onStepSelect,
}: StepProgressProps) {
  const tone = accentClasses[accent];

  return (
    <div className={cn("space-y-4", className)}>
      <div className={cn("sm:hidden", tone.mobileCard)}>
        <div className="mb-3 flex items-center justify-between gap-3 text-xs font-medium text-muted-foreground">
          <span>
            Step {currentStep} of {steps.length}
          </span>
          <span className={cn("text-right", tone.mobileLabel)}>
            {steps[currentStep - 1]?.label}
          </span>
        </div>
        <div className={cn("h-2 rounded-full", tone.progressTrack)}>
          <div
            className={cn(
              "h-full rounded-full transition-all",
              tone.progressFill,
            )}
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="hidden overflow-x-auto pb-2 sm:block">
        <div className="flex w-max min-w-full items-center justify-start gap-2 sm:justify-center">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const Icon = step.icon;
            const isActive = currentStep === stepNumber;
            const isComplete = currentStep > stepNumber;

            return (
              <div key={`${stepNumber}-${step.label}`} className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => onStepSelect?.(stepNumber)}
                  disabled={!onStepSelect}
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    onStepSelect ? "" : "cursor-default",
                    isActive
                      ? tone.active
                      : isComplete
                        ? tone.complete
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                  <span>
                    {stepNumber}. {step.label}
                  </span>
                </button>
                {index < steps.length - 1 ? (
                  <div
                    className={cn(
                      "h-0.5 w-8 rounded-full transition-colors duration-300",
                      isComplete ? tone.connectorActive : "bg-muted",
                    )}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
