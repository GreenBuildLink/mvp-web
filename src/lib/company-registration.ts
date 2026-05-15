import { Crown, Star, Zap } from "lucide-react";

import type { RegistrationPlan } from "@/lib/registration/types";

export const companySubscriptionPlans: RegistrationPlan[] = [
    {
        id: "starter",
        name: "GB Starter Link",
        price: "EUR 0",
        icon: Star,
        color: "from-gray-400 to-gray-500",
        borderColor: "border-gray-200",
        features: ["Basic company profile", "Up to 3 products", "Standard visibility"],
    },
    {
        id: "professional",
        name: "GB Business Link",
        price: "EUR 49/month",
        icon: Zap,
        color: "from-emerald-500 to-teal-600",
        borderColor: "border-emerald-300",
        popular: true,
        features: [
            "Full company profile",
            "Up to 15 products",
            "Priority visibility",
            "Advanced analytics",
            "Priority support",
        ],
    },
    {
        id: "enterprise",
        name: "GB Premium Link",
        price: "EUR 129/month",
        icon: Crown,
        color: "from-amber-500 to-amber-600",
        borderColor: "border-amber-300",
        features: [
            "Premium company profile",
            "Unlimited products",
            "Maximum visibility",
            "Full analytics suite",
            "Dedicated 24/7 support",
            "Integration API",
        ],
    },
];

export const companyTypes = [
    "Manufacturer",
    "Supplier / Distributor",
    "Service Provider",
    "Startup / Innovator",
];

export const companyCertificationOptions = [
    "Environmental Product Declaration (EPD)",
    "ISO standards",
    "LEED compliant",
    "Other",
];

export const companyUseCaseOptions = [
    "Residential",
    "Commercial",
    "Industrial",
    "Healthcare",
    "School",
    "Infrastructure",
    "Other",
];

export const companyMarketOptions = ["Local", "Regional", "International"];
export const companySalesModelOptions = ["Direct sales", "Distributor network", "Custom solutions"];
export const companyCollaborationOptions = ["Being listed in directory", "Training / workshops", "Partnerships"];
export const companySteps = ["Company & Profile", "Product Details", "Subscription"];
export const starterMarketplaceCategories = [
    "Sustainable materials",
    "Energy solutions",
    "Water solutions",
    "Smart building",
    "Basic green construction categories",
];
export const businessMarketplaceCategories = [
    "Green materials",
    "Low-carbon solutions",
    "Circular economy products",
    "Smart building technologies",
];
export const businessCollaborationRoles = [
    "Architects",
    "Engineers",
    "Consultants",
    "Developers",
];
export const businessAiTools = [
    "Product environmental impact analysis",
    "Carbon footprint comparison",
    "Market opportunity recommendations",
    "Certification compatibility suggestions",
];
export const businessOpportunityItems = [
    "Green project tenders",
    "Construction sustainability projects",
    "Export opportunities",
];
export const premiumOpportunityItems = [
    "International tenders",
    "Export acceleration programs (B2B opportunities)",
    "Strategic global partnerships",
];
export const premiumPromotionItems = [
    "Sponsored campaigns",
    "Product spotlight features",
    "Co-branding opportunities with Green BuildLink",
];

export interface CompanyProductForm {
    name: string;
    category: string;
    description: string;
    keyFeatures: string;
    scopeOfWorks: string;
    certifications: string[];
    otherCertification: string;
    technicalDatasheet: string;
    testReports: string;
    useCases: string[];
    exampleProjects: string;
    clientsReferences: string;
    availableMarkets: string[];
    priceRange: string;
    salesModels: string[];
    productImages: string;
    brochure: string;
    videoDemo: string;
}

export const emptyCompanyProduct: CompanyProductForm = {
    name: "",
    category: "",
    description: "",
    keyFeatures: "",
    scopeOfWorks: "",
    certifications: [],
    otherCertification: "",
    technicalDatasheet: "",
    testReports: "",
    useCases: [],
    exampleProjects: "",
    clientsReferences: "",
    availableMarkets: [],
    priceRange: "",
    salesModels: [],
    productImages: "",
    brochure: "",
    videoDemo: "",
};
