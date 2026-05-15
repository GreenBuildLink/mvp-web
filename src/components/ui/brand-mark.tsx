import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  iconClassName?: string;
  dotClassName?: string;
  pulse?: boolean;
};

export function BrandMark({
  className,
  iconClassName,
  dotClassName,
  pulse = false,
}: BrandMarkProps) {
  return (
    <div
      className={cn(
        "relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl shadow-emerald-500/30",
        pulse && "animate-pulse-glow",
        className,
      )}
      aria-hidden="true"
    >
      <Leaf className={cn("h-6 w-6 text-white", iconClassName)} />
      <div
        className={cn(
          "absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400",
          pulse && "animate-pulse",
          dotClassName,
        )}
      />
    </div>
  );
}
