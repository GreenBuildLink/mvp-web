import { cn } from "@/lib/utils";
import { SearchX } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export function EmptyState({
    title,
    description,
    icon,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
            {icon || <SearchX className="w-16 h-16 text-muted-foreground/50 mb-4" />}
            <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground max-w-md mb-6">{description}</p>
            {action && (
                <Button onClick={action.onClick} variant="outline" className="rounded-full">
                    {action.label}
                </Button>
            )}
        </div>
    );
}