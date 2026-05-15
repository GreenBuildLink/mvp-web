import { Star, Zap } from "lucide-react";

import type { RegistrationPlan } from "@/lib/registration/types";

export const workerOccupations = [
    "Worker",
    "Technician",
    "Installer",
    "Supervisor",
    "Student",
    "Unemployed",
];
export const workerTrades = [
    "Masonry",
    "Electrical",
    "Plumbing",
    "HVAC",
    "Solar installation",
    "Insulation works",
    "Other",
];
export const workerExperienceOptions = ["0-1", "1-3", "3-5", "5+"];
export const workerTaskOptions = [
    "Reading plans",
    "Equipment installation",
    "Maintenance",
    "Site execution",
    "Safety procedures",
    "Other",
];
export const workerTradeLevelOptions = ["Beginner", "Intermediate", "Skilled worker", "Supervisor"];
export const workerWorkTypeOptions = ["Full-time", "Part-time", "Freelance / Missions"];
export const workerMobilityOptions = ["Local only", "National"];
export const workerGreenAreas = ["Solar energy", "Energy efficiency", "Green materials", "Smart buildings"];
export const workerTrainingTypeOptions = ["Practical (on-site)", "Short courses", "Certification programs"];
export const workerSteps = ["Personal", "Profile", "Skills", "Training", "Subscription"];

export const qualifiedTrainingItems = [
    "Practical video tutorials",
    "Safety modules",
    "Introduction to sustainable construction",
];
export const qualifiedJobItems = [
    "Green construction sites",
    "Local missions",
    "Specialized jobs",
];
export const qualifiedAdvancedTrainingItems = [
    "High-performance insulation",
    "Waterproofing techniques",
    "Solar installation basics",
    "Construction waste management",
];
export const verifiedProjectItems = [
    "Certified construction sites",
    "International projects",
];

export const workerSubscriptionPlans: RegistrationPlan[] = [
    {
        id: "qualified",
        name: "GB Qualified Link",
        price: "EUR 0",
        icon: Star,
        color: "from-gray-400 to-gray-500",
        borderColor: "border-gray-200",
        features: ["Basic worker profile", "Directory visibility", "Community updates"],
    },
    {
        id: "verified",
        name: "GB Verified Link",
        price: "EUR 19/month",
        icon: Zap,
        color: "from-lime-500 to-emerald-600",
        borderColor: "border-lime-300",
        popular: true,
        features: ["Priority project matching", "Highlighted profile", "Training priority"],
    },
];
