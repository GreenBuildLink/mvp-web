import { type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PageIntroAccent = "brand" | "worker";

const badgeClassName: Record<PageIntroAccent, string> = {
  brand: "ui-badge-brand",
  worker: "ui-badge-worker",
};

interface PageIntroProps {
  accent?: PageIntroAccent;
  badge: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export function PageIntro({
  accent = "brand",
  badge,
  title,
  description,
  icon: Icon,
  className,
}: PageIntroProps) {
  return (
    <div className={cn("text-center", className)}>
      <Badge className={badgeClassName[accent]}>
        {Icon ? <Icon className="h-4 w-4" /> : null}
        {badge}
      </Badge>
      <h1 className="mb-3 text-3xl font-bold sm:text-4xl">{title}</h1>
      {description ? (
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
