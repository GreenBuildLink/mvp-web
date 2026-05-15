import type { LucideIcon } from "lucide-react";

export interface RegistrationPlan {
    id: string;
    name: string;
    price: string;
    icon: LucideIcon;
    color: string;
    borderColor: string;
    features: string[];
    popular?: boolean;
}
