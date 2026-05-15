import { Briefcase, CheckCircle2, Crown, Star, Target, User, Zap } from "lucide-react";

import type { RegistrationPlan } from "@/lib/registration/types";

export const designerExpertiseFields = [
    "Architecture",
    "Engineering",
    "Construction",
    "Design",
    "Student",
    "Other",
];

export const designerExperienceOptions = ["0-1", "1-3", "3-5", "5+"];
export const designerEducationLevels = ["High School", "Bachelor", "Master", "Doctorate", "Other"];
export const designerCertificationOptions = ["LEED", "EDGE", "BREEAM", "HQE", "Other"];
export const designerSustainableDesignLevels = ["Beginner", "Intermediate", "Advanced"];
export const designerKeySkillOptions = [
    "Sustainable design principles",
    "Energy modeling",
    "Project management",
    "Data analysis",
    "Site execution",
    "Other",
];
export const designerObjectiveOptions = [
    "Learn basics",
    "Get certified",
    "Find job opportunities",
    "Networking",
    "Work on real projects",
];
export const designerLearningFormats = ["Online", "In-person", "Hybrid"];
export const designerKnowledgeOptions = ["No knowledge", "Basic understanding", "Intermediate", "Advanced", "Expert"];

export const designerSteps = [
    { n: 1, label: "Personal", icon: User },
    { n: 2, label: "Background", icon: Briefcase },
    { n: 3, label: "Goals", icon: Target },
    { n: 4, label: "Availability", icon: CheckCircle2 },
    { n: 5, label: "Subscription", icon: Crown },
];

export const designerSubscriptionPlans: RegistrationPlan[] = [
    {
        id: "discovery",
        name: "GB Discovery Link",
        price: "EUR 0",
        icon: Star,
        color: "from-gray-400 to-gray-500",
        borderColor: "border-gray-200",
        features: ["Community profile", "Learning resources", "Directory visibility"],
    },
    {
        id: "professional",
        name: "GB Professional Link",
        price: "EUR 29/month",
        icon: Zap,
        color: "from-emerald-500 to-teal-600",
        borderColor: "border-emerald-300",
        popular: true,
        features: ["Priority matching", "Advanced profile", "Exclusive opportunities"],
    },
    {
        id: "accredited",
        name: "GB Accredited Link",
        price: "EUR 79/month",
        icon: Crown,
        color: "from-amber-500 to-amber-600",
        borderColor: "border-amber-300",
        features: ["Top visibility", "Dedicated support", "Partner network access"],
    },
];

export const discoveryExploreItems = [
    "Green product library",
    "Sustainable materials",
    "Innovative solutions",
    "Case studies",
];
export const discoveryNetworkItems = [
    "Companies",
    "Consultants",
    "Experts",
    "Other designers",
];
export const discoveryInspirationItems = [
    "Certified projects",
    "Technical details",
    "Green building trends",
];
export const discoveryNewsItems = [
    "Sustainable construction news",
    "New products",
    "Events",
    "Webinars",
];
export const professionalJobItems = [
    "Green building jobs",
    "Freelance missions",
    "Sustainable consulting",
];
export const professionalPartnershipItems = [
    "Collaboration with companies",
    "Participation in projects",
    "Multidisciplinary teams",
];
export const professionalAiItems = [
    "Energy optimization",
    "Low-carbon material suggestions",
    "Daylight analysis",
    "LEED/EDGE optimization",
    "Sustainable concept generation",
];
export const professionalTrainingItems = [
    "Discounted training programs",
    "Workshops",
    "Preparatory certifications",
];
export const professionalLibraryItems = [
    "Templates",
    "LEED guides",
    "EDGE guides",
    "BIM sustainable resources",
];
export const accreditedBadgeItems = [
    "LEED GA",
    "LEED AP",
    "EDGE Expert",
    "WELL AP",
];
export const accreditedOpportunityItems = [
    "Premium consulting assignments",
    "Conferences and speaking opportunities",
    "Green BuildLink ambassador role",
];
export const accreditedAiItems = [
    "Certification pre-assessment",
    "Carbon footprint calculation",
    "Energy simulation",
    "ESG preliminary audit",
];
export const accreditedRevenueItems = [
    "Service sales",
    "Coaching",
    "Mentorship",
    "Training programs",
];
