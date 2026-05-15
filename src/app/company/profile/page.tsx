"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageIntro } from "@/components/ui/page-intro";
import { StepProgress } from "@/components/ui/step-progress";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Building2,
    BarChart3,
    Crown,
    CheckCircle2,
    Download,
    ArrowRight,
    ArrowLeft,
    Eye,
    FileText,
    Globe,
    LayoutGrid,
    Mail,
    Search,
    Sparkles,
    Star,
    Target,
    Users,
    Zap,
    Loader2,
    Package,
    Shield,
    Plus,
    Trash2,
} from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/types";
import { cn } from "@/lib/utils";

const subscriptionPlans = [
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

const companyTypes = [
    "Manufacturer",
    "Supplier / Distributor",
    "Service Provider",
    "Startup / Innovator",
];

const certificationOptions = [
    "Environmental Product Declaration (EPD)",
    "ISO standards",
    "LEED compliant",
    "Other",
];

const useCaseOptions = [
    "Residential",
    "Commercial",
    "Industrial",
    "Healthcare",
    "School",
    "Infrastructure",
    "Other",
];

const marketOptions = ["Local", "Regional", "International"];
const salesModelOptions = ["Direct sales", "Distributor network", "Custom solutions"];
const collaborationOptions = ["Being listed in directory", "Training / workshops", "Partnerships"];
const companySteps = ["Company & Profile", "Product Details", "Subscription"];
const starterMarketplaceCategories = [
    "Sustainable materials",
    "Energy solutions",
    "Water solutions",
    "Smart building",
    "Basic green construction categories",
];
const businessMarketplaceCategories = [
    "Green materials",
    "Low-carbon solutions",
    "Circular economy products",
    "Smart building technologies",
];
const businessCollaborationRoles = [
    "Architects",
    "Engineers",
    "Consultants",
    "Developers",
];
const businessAiTools = [
    "Product environmental impact analysis",
    "Carbon footprint comparison",
    "Market opportunity recommendations",
    "Certification compatibility suggestions",
];
const businessOpportunityItems = [
    "Green project tenders",
    "Construction sustainability projects",
    "Export opportunities",
];
const premiumOpportunityItems = [
    "International tenders",
    "Export acceleration programs (B2B opportunities)",
    "Strategic global partnerships",
];
const premiumPromotionItems = [
    "Sponsored campaigns",
    "Product spotlight features",
    "Co-branding opportunities with Green BuildLink",
];

interface ProductForm {
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

const emptyProduct: ProductForm = {
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

function toggleValue(value: string, items: string[], setItems: (next: string[]) => void) {
    setItems(items.includes(value) ? items.filter((v) => v !== value) : [...items, value]);
}

function hasText(value: string) {
    return value.trim().length > 0;
}

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function productHasAnyValue(product: ProductForm) {
    return (
        hasText(product.name) ||
        hasText(product.category) ||
        hasText(product.description) ||
        hasText(product.keyFeatures) ||
        hasText(product.scopeOfWorks) ||
        product.certifications.length > 0 ||
        hasText(product.otherCertification) ||
        hasText(product.technicalDatasheet) ||
        hasText(product.testReports) ||
        product.useCases.length > 0 ||
        hasText(product.exampleProjects) ||
        hasText(product.clientsReferences) ||
        product.availableMarkets.length > 0 ||
        hasText(product.priceRange) ||
        product.salesModels.length > 0 ||
        hasText(product.productImages) ||
        hasText(product.brochure) ||
        hasText(product.videoDemo)
    );
}

type FieldErrors = Record<string, string>;

export default function CompanyProfilePage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companyPhone, setCompanyPhone] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [companyCountry, setCompanyCountry] = useState("");
    const [companyCity, setCompanyCity] = useState("");
    const [companyWebsite, setCompanyWebsite] = useState("");
    const [linkedInUrl, setLinkedInUrl] = useState("");
    const [facebookUrl, setFacebookUrl] = useState("");
    const [pinterestUrl, setPinterestUrl] = useState("");
    const [instagramUrl, setInstagramUrl] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");

    const [companyType, setCompanyType] = useState("");
    const [yearsOfOperation, setYearsOfOperation] = useState("");
    const [mainSector, setMainSector] = useState("");

    const [products, setProducts] = useState<ProductForm[]>([{ ...emptyProduct }]);

    const [collaborationInterests, setCollaborationInterests] = useState<string[]>([]);
    const [publishConsent, setPublishConsent] = useState(false);

    const [selectedPlan, setSelectedPlan] = useState("");

    const companyLocation = useMemo(
        () => [companyAddress, companyCity, companyCountry].map((p) => p.trim()).filter(Boolean).join(", "),
        [companyAddress, companyCity, companyCountry],
    );
    const socialMediaLinks = useMemo(
        () =>
            [linkedInUrl, facebookUrl, pinterestUrl, instagramUrl, youtubeUrl]
                .map((v) => v.trim())
                .filter(Boolean)
                .join(" | "),
        [linkedInUrl, facebookUrl, pinterestUrl, instagramUrl, youtubeUrl],
    );
    const selectedPlanConfig = useMemo(
        () => subscriptionPlans.find((plan) => plan.id === selectedPlan),
        [selectedPlan],
    );
    const submittedProducts = useMemo(() => products.filter(productHasAnyValue), [products]);
    const starterVisibleProducts = useMemo(() => submittedProducts.slice(0, 3), [submittedProducts]);
    const starterCategoryCount = useMemo(
        () => new Set(submittedProducts.map((product) => product.category.trim()).filter(Boolean)).size,
        [submittedProducts],
    );
    const starterDatasheetCount = useMemo(
        () => submittedProducts.filter((product) => hasText(product.technicalDatasheet)).length,
        [submittedProducts],
    );
    const starterCertificationCount = useMemo(
        () => submittedProducts.filter((product) => product.certifications.length > 0).length,
        [submittedProducts],
    );
    const profileCompletion = useMemo(() => {
        const checkpoints = [
            companyName,
            companyEmail,
            companyPhone,
            companyAddress,
            companyCountry,
            companyCity,
            companyWebsite,
            companyType,
            yearsOfOperation,
            mainSector,
        ];
        let completed = checkpoints.filter(hasText).length;
        if (socialMediaLinks.length > 0) completed += 1;
        if (submittedProducts.length > 0) completed += 1;
        if (publishConsent) completed += 1;

        return Math.round((completed / (checkpoints.length + 3)) * 100);
    }, [
        companyAddress,
        companyCity,
        companyCountry,
        companyEmail,
        companyName,
        companyPhone,
        companyType,
        companyWebsite,
        mainSector,
        publishConsent,
        socialMediaLinks,
        submittedProducts.length,
        yearsOfOperation,
    ]);

    const updateProduct = (index: number, field: keyof ProductForm, value: string | string[]) => {
        setProducts((prev) => {
            const next = [...prev];
            next[index] = { ...next[index], [field]: value };
            return next;
        });
    };

    const addProduct = () => {
        setProducts((prev) => [...prev, { ...emptyProduct }]);
    };

    const removeProduct = (index: number) => {
        setProducts((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));
    };

    const toggleProductMulti = (
        index: number,
        field: "certifications" | "useCases" | "availableMarkets" | "salesModels",
        value: string,
    ) => {
        const current = products[index][field];
        const next = current.includes(value)
            ? current.filter((item) => item !== value)
            : [...current, value];
        updateProduct(index, field, next);

        if (field === "certifications" && value === "Other" && current.includes(value)) {
            setFieldErrors((prev) => {
                const nextErrors = { ...prev };
                delete nextErrors[`product-${index}-otherCertification`];
                return nextErrors;
            });
        }
    };

    const getStepErrors = (stepNumber: number) => {
        if (stepNumber === 1) {
            const errors: FieldErrors = {};

            if (!hasText(companyName)) errors.companyName = "Company name is required.";
            if (!hasText(companyEmail)) {
                errors.companyEmail = "Email address is required.";
            } else if (!isValidEmail(companyEmail)) {
                errors.companyEmail = "Enter a valid email address.";
            }
            if (!hasText(companyPhone)) errors.companyPhone = "Phone number is required.";
            if (!hasText(companyAddress)) errors.companyAddress = "Address is required.";
            if (!hasText(companyCountry)) errors.companyCountry = "Country is required.";
            if (!hasText(companyCity)) errors.companyCity = "City is required.";
            if (companyLocation.length === 0) errors.companyLocation = "Location is required.";

            return errors;
        }

        if (stepNumber === 2) {
            const errors: FieldErrors = {};

            products.forEach((product, index) => {
                if (!productHasAnyValue(product)) {
                    return;
                }

                if (!hasText(product.name)) errors[`product-${index}-name`] = "Product name is required.";
                if (!hasText(product.category)) errors[`product-${index}-category`] = "Category is required.";
                if (product.certifications.includes("Other") && !hasText(product.otherCertification)) {
                    errors[`product-${index}-otherCertification`] = "Please specify the other certification.";
                }
            });

            if (!publishConsent) {
                errors.publishConsent = "You must agree to publish product information on the platform.";
            }

            return errors;
        }

        if (stepNumber === 3) {
            const errors: FieldErrors = {};

            if (!selectedPlanConfig) {
                errors.selectedPlan = "Please choose a plan before submitting.";
            }

            return errors;
        }

        return {};
    };

    const moveToStep = (targetStep: number) => {
        if (targetStep <= step) {
            setFieldErrors({});
            setError("");
            setStep(targetStep);
            return;
        }

        for (let stepNumber = 1; stepNumber < targetStep; stepNumber += 1) {
            const stepErrors = getStepErrors(stepNumber);

            if (Object.keys(stepErrors).length > 0) {
                setFieldErrors(stepErrors);
                setStep(stepNumber);
                return;
            }
        }

        setFieldErrors({});
        setError("");
        setStep(targetStep);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        for (const stepNumber of [1, 2, 3]) {
            const stepErrors = getStepErrors(stepNumber);

            if (Object.keys(stepErrors).length > 0) {
                setFieldErrors(stepErrors);
                setStep(stepNumber);
                return;
            }
        }

        setIsLoading(true);
        setFieldErrors({});
        setError("");
        try {
            const normalizedProducts = products
                .filter(productHasAnyValue)
                .map((product) => ({
                    name: product.name,
                    category: product.category,
                    description: product.description,
                    keyFeatures: product.keyFeatures,
                    scopeOfWorks: product.scopeOfWorks,
                    certName: product.certifications.join(", "),
                    certOther: product.otherCertification,
                    technicalDatasheet: product.technicalDatasheet,
                    testReports: product.testReports,
                    useCases: product.useCases,
                    exampleProjects: product.exampleProjects,
                    clientsReferences: product.clientsReferences,
                    availableMarkets: product.availableMarkets,
                    priceRange: product.priceRange,
                    salesModels: product.salesModels,
                    productImages: product.productImages,
                    brochure: product.brochure,
                    videoDemo: product.videoDemo,
                }));

            const payload = {
                type: "company",
                companyName,
                companyDescription: mainSector || companyType || "Green industry registration",
                companyAddress,
                companyCity,
                companyCountry,
                companyLocation,
                companyEmail,
                companyPhone,
                companyWebsite,
                socialMediaLinks,
                linkedInUrl,
                facebookUrl,
                pinterestUrl,
                instagramUrl,
                youtubeUrl,
                companyType,
                yearsOfOperation,
                mainSector,
                collaborationInterests,
                publishConsent,
                selectedPlan: selectedPlanConfig?.name ?? selectedPlan,
                products: normalizedProducts,
            };

            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error();
            setSubmitted(true);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const clearFieldError = (field: string) => {
        setFieldErrors((prev) => {
            if (!prev[field]) return prev;
            const next = { ...prev };
            delete next[field];
            return next;
        });
    };

    const getFieldClass = (field: string, defaultClassName: string) =>
        cn(
            defaultClassName,
            fieldErrors[field] && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
        );

    const renderFieldError = (field: string) =>
        fieldErrors[field] ? <p className="text-sm text-red-500">{fieldErrors[field]}</p> : null;

    if (submitted) {
        if (selectedPlan === "enterprise") {
            const premiumStats = [
                {
                    title: "Premium visibility",
                    value: "Top-tier staging",
                    description: "Premium Link is positioned for top ranking, homepage presence, and stronger brand authority.",
                    icon: Crown,
                },
                {
                    title: "Advanced analytics",
                    value: "Deep insights ready",
                    description: "Performance, positioning, benchmarking, and conversion reporting are prepared in this workspace.",
                    icon: BarChart3,
                },
                {
                    title: "Global ecosystem access",
                    value: "Priority matching",
                    description: "Your company is staged for higher-value projects, international exposure, and strategic partnerships.",
                    icon: Globe,
                },
                {
                    title: "Enterprise AI suite",
                    value: `${submittedProducts.length} signal sets`,
                    description: "Product, certification, and reference data can support advanced AI-led sustainability insights.",
                    icon: Sparkles,
                },
            ];

            return (
                <div className="ui-page-shell">
                    <div className="ui-page-container-6xl space-y-8">
                        <PageIntro
                            badge="GB Premium Link"
                            icon={Crown}
                            title={
                                <>
                                    {companyName || "Your company"} <span className="gradient-text">Premium Dashboard</span>
                                </>
                            }
                            description="Your profile has been submitted into a premium workspace built for maximum visibility, global expansion, and strategic leadership positioning."
                            className="mb-2"
                        />

                        <Card className="overflow-hidden border-0 shadow-2xl shadow-emerald-900/10">
                            <CardContent className="relative p-6 sm:p-8">
                                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-amber-500/18 via-emerald-500/10 to-teal-500/10" />
                                <div className="relative space-y-6">
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/25">
                                                <Crown className="h-8 w-8 text-white" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Badge className="mb-0 rounded-full border-amber-200/60 bg-amber-100/80 px-3 py-1 text-xs text-amber-700">
                                                        Premium access activated
                                                    </Badge>
                                                    <Badge variant="outline" className="rounded-full border-amber-200 bg-white/80 text-amber-700">
                                                        {selectedPlanConfig?.name ?? "GB Premium Link"} - {selectedPlanConfig?.price ?? "EUR 129/month"}
                                                    </Badge>
                                                </div>
                                                <h2 className="text-2xl font-bold sm:text-3xl">
                                                    Maximum visibility and strategic positioning are ready to lead.
                                                </h2>
                                                <p className="max-w-3xl text-muted-foreground">
                                                    This premium workspace expands your post-submit experience into top-tier brand visibility, international opportunity readiness, advanced analytics, and enterprise-grade AI support while preserving the current GreenBuildLink look and feel.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-3 lg:w-[360px] lg:grid-cols-1">
                                            <Button className="ui-btn-brand w-full" onClick={() => router.push("/company")}>
                                                Explore Directory
                                            </Button>
                                            <Button variant="outline" className="w-full rounded-full border-amber-200" onClick={() => router.push("/")}>
                                                Go to Home
                                            </Button>
                                            <Button variant="outline" className="w-full rounded-full" onClick={() => { setSubmitted(false); setStep(1); }}>
                                                Submit Another
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                        {premiumStats.map((stat) => (
                                            <Card key={stat.title} className="border border-amber-100/80 bg-card/90 shadow-sm">
                                                <CardContent className="space-y-3 p-5">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20">
                                                            <stat.icon className="h-5 w-5 text-white" />
                                                        </div>
                                                        <span className="text-xs font-medium uppercase tracking-[0.18em] text-amber-700/80">
                                                            Premium
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
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
                            <div className="space-y-6">
                                <Card className="border-0 shadow-xl">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="flex items-center gap-2">
                                            <Crown className="h-5 w-5 text-amber-600" />
                                            Premium Visibility
                                        </CardTitle>
                                        <CardDescription>
                                            GB Premium Link is positioned for top search ranking, featured homepage visibility, and stronger authority in the ecosystem.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-4 md:grid-cols-3">
                                        <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
                                            <p className="text-sm text-muted-foreground">Search ranking</p>
                                            <p className="mt-1 text-2xl font-bold">Top ranking</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Premium listings are staged for stronger placement in relevant discovery surfaces.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
                                            <p className="text-sm text-muted-foreground">Homepage feature</p>
                                            <p className="mt-1 text-2xl font-bold">Featured placement</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                This tier supports elevated brand placement across premium GreenBuildLink moments.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
                                            <p className="text-sm text-muted-foreground">Partner status</p>
                                            <p className="mt-1 text-2xl font-bold">Premium Green Partner</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                A dedicated premium badge strengthens trust and leadership positioning.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-xl">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="flex items-center gap-2">
                                            <BarChart3 className="h-5 w-5 text-amber-600" />
                                            Advanced Analytics
                                        </CardTitle>
                                        <CardDescription>
                                            Premium analytics go beyond traffic counts into positioning, benchmarking, and conversion-oriented signals.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-4 md:grid-cols-2">
                                        <div className="rounded-2xl border border-amber-100 p-4">
                                            <p className="font-medium">Deep performance insights</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Designed for a richer reading of catalog attention, engagement depth, and asset interaction quality.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-amber-100 p-4">
                                            <p className="font-medium">Market positioning analysis</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Helps frame how your company is represented across sustainability-focused categories and opportunities.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-amber-100 p-4">
                                            <p className="font-medium">Competitor benchmarking</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Premium tier anticipates comparison-oriented insight for stronger strategic decisions.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-amber-100 p-4">
                                            <p className="font-medium">Conversion tracking</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Tracks how visibility, downloads, and outreach convert into meaningful opportunity progression.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-xl">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="flex items-center gap-2">
                                            <Globe className="h-5 w-5 text-amber-600" />
                                            Full Ecosystem Access
                                        </CardTitle>
                                        <CardDescription>
                                            Premium Link prioritizes high-value project exposure, international clients, and strategic partnership potential.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-4 md:grid-cols-3">
                                        <div className="rounded-2xl border border-amber-100 p-4">
                                            <p className="font-medium">Priority project matching</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Premium submissions are staged for stronger alignment with higher-value green construction opportunities.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-amber-100 p-4">
                                            <p className="font-medium">International client exposure</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Richer certifications, references, and catalog depth support global discoverability.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-amber-100 p-4">
                                            <p className="font-medium">Strategic partnership recommendations</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Partnership suggestions can be guided by product fit, sustainability value, and market direction.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <Card className="border-0 shadow-xl">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="flex items-center gap-2">
                                            <Sparkles className="h-5 w-5 text-amber-600" />
                                            Enterprise AI Suite
                                        </CardTitle>
                                        <CardDescription>
                                            Advanced premium AI modules focus on environmental modeling, market forecasting, and performance optimization.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {[
                                            "Advanced carbon modeling",
                                            "Lifecycle assessment insights (LCA support)",
                                            "Predictive market demand analysis",
                                            "ESG performance optimization tools",
                                        ].map((item) => (
                                            <div key={item} className="rounded-2xl border border-amber-100 p-4">
                                                <p className="font-medium">{item}</p>
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    Prepared as part of the premium workspace using your submitted catalog, certifications, and reference signals.
                                                </p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-xl">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="flex items-center gap-2">
                                            <Target className="h-5 w-5 text-amber-600" />
                                            Global Opportunities
                                        </CardTitle>
                                        <CardDescription>
                                            Premium access expands the opportunity surface toward international growth and strategic expansion.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {premiumOpportunityItems.map((item) => (
                                            <div key={item} className="rounded-2xl border border-amber-100 p-4">
                                                <p className="font-medium">{item}</p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-xl">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="flex items-center gap-2">
                                            <Shield className="h-5 w-5 text-amber-600" />
                                            Branding & Promotion
                                        </CardTitle>
                                        <CardDescription>
                                            Premium Link extends beyond visibility into promotional amplification and brand association.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {premiumPromotionItems.map((item) => (
                                            <div key={item} className="rounded-2xl border border-amber-100 p-4">
                                                <p className="font-medium">{item}</p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (selectedPlan === "professional") {
            const businessStats = [
                {
                    title: "Detailed analytics",
                    value: "0 live views",
                    description: "Views, engagement, and downloads will populate after your Business Link catalog goes live.",
                    icon: BarChart3,
                },
                {
                    title: "Lead tracking",
                    value: "0 open leads",
                    description: "Qualified requests, collaboration inquiries, and RFQ activity will be tracked here.",
                    icon: Mail,
                },
                {
                    title: "Opportunity insights",
                    value: `${submittedProducts.length} catalog signals`,
                    description: "Your submitted products already seed ranking, matching, and visibility opportunities.",
                    icon: Search,
                },
                {
                    title: "Downloads ready",
                    value: `${starterDatasheetCount} references`,
                    description: "Datasheet interactions and future BIM asset downloads are prepared for reporting.",
                    icon: Download,
                },
            ];

            return (
                <div className="ui-page-shell">
                    <div className="ui-page-container-6xl space-y-8">
                        <PageIntro
                            badge="GB Business Link"
                            icon={Zap}
                            title={
                                <>
                                    {companyName || "Your company"} <span className="gradient-text">Business Dashboard</span>
                                </>
                            }
                            description="Your company profile has been submitted and staged in a growth-focused workspace designed for lead generation, collaboration, and stronger marketplace visibility."
                            className="mb-2"
                        />

                        <Card className="overflow-hidden border-0 shadow-2xl shadow-emerald-900/10">
                            <CardContent className="relative p-6 sm:p-8">
                                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-emerald-500/14 via-teal-500/10 to-sky-500/10" />
                                <div className="relative space-y-6">
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
                                                <Zap className="h-8 w-8 text-white" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Badge className="ui-badge-brand mb-0 px-3 py-1 text-xs">
                                                        Business access activated
                                                    </Badge>
                                                    <Badge variant="outline" className="rounded-full border-emerald-200 bg-white/80 text-emerald-700">
                                                        {selectedPlanConfig?.name ?? "GB Business Link"} - {selectedPlanConfig?.price ?? "EUR 49/month"}
                                                    </Badge>
                                                </div>
                                                <h2 className="text-2xl font-bold sm:text-3xl">
                                                    Growth, lead generation, and active collaboration are ready to scale.
                                                </h2>
                                                <p className="max-w-3xl text-muted-foreground">
                                                    This Business Link workspace keeps the same GreenBuildLink visual language while expanding your post-submit experience into catalog management, qualified opportunities, and AI-assisted insights. Live market activity begins once your profile is published.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-3 lg:w-[360px] lg:grid-cols-1">
                                            <Button className="ui-btn-brand w-full" onClick={() => router.push("/company")}>
                                                Explore Directory
                                            </Button>
                                            <Button variant="outline" className="w-full rounded-full border-emerald-200" onClick={() => router.push("/")}>
                                                Go to Home
                                            </Button>
                                            <Button variant="outline" className="w-full rounded-full" onClick={() => { setSubmitted(false); setStep(1); }}>
                                                Submit Another
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                        {businessStats.map((stat) => (
                                            <Card key={stat.title} className="border border-emerald-100/80 bg-card/90 shadow-sm">
                                                <CardContent className="space-y-3 p-5">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20">
                                                            <stat.icon className="h-5 w-5 text-white" />
                                                        </div>
                                                        <span className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-700/80">
                                                            Business
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
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
                            <div className="space-y-6">
                                <Card className="border-0 shadow-xl">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="flex items-center gap-2">
                                            <BarChart3 className="h-5 w-5 text-emerald-600" />
                                            Enhanced Dashboard
                                        </CardTitle>
                                        <CardDescription>
                                            Business Link emphasizes detailed analytics, lead tracking, and opportunity signals instead of basic starter visibility only.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-4 md:grid-cols-2">
                                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                                            <p className="text-sm text-muted-foreground">Engagement snapshot</p>
                                            <p className="mt-1 text-2xl font-bold">Views, engagement, downloads</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Detailed reporting is prepared for listing visits, interest levels, and technical asset activity.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                                            <p className="text-sm text-muted-foreground">Lead system</p>
                                            <p className="mt-1 text-2xl font-bold">Tracked from day one</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Collaboration requests and qualified project signals can be organized as they come in.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-emerald-100 p-4">
                                            <p className="text-sm text-muted-foreground">Opportunity insights</p>
                                            <p className="mt-1 text-2xl font-bold">{starterCategoryCount || submittedProducts.length}</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Category and product details from your submission already shape visibility and matching recommendations.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-emerald-100 p-4">
                                            <p className="text-sm text-muted-foreground">Profile readiness</p>
                                            <p className="mt-1 text-2xl font-bold">{profileCompletion}%</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                A stronger profile creates better lead quality and better regional or international discoverability.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-xl">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="flex items-center gap-2">
                                            <Package className="h-5 w-5 text-emerald-600" />
                                            Product & Service Management
                                        </CardTitle>
                                        <CardDescription>
                                            Full catalog management expands beyond starter listings with case studies, project references, and advanced certification visibility.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid gap-4 md:grid-cols-4">
                                            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                                                <p className="text-sm text-muted-foreground">Catalog entries</p>
                                                <p className="mt-1 text-2xl font-bold">{submittedProducts.length}</p>
                                            </div>
                                            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                                                <p className="text-sm text-muted-foreground">Case studies</p>
                                                <p className="mt-1 text-2xl font-bold">{submittedProducts.filter((product) => hasText(product.exampleProjects)).length}</p>
                                            </div>
                                            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                                                <p className="text-sm text-muted-foreground">Advanced certifications</p>
                                                <p className="mt-1 text-2xl font-bold">{starterCertificationCount}</p>
                                            </div>
                                            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                                                <p className="text-sm text-muted-foreground">Datasheet references</p>
                                                <p className="mt-1 text-2xl font-bold">{starterDatasheetCount}</p>
                                            </div>
                                        </div>

                                        {submittedProducts.length > 0 ? (
                                            <div className="grid gap-4 lg:grid-cols-2">
                                                {submittedProducts.map((product, index) => (
                                                    <div key={`${product.name || "catalog"}-${index}`} className="rounded-2xl border border-emerald-100 p-5 shadow-sm">
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div>
                                                                <p className="text-sm font-medium text-muted-foreground">Catalog item {index + 1}</p>
                                                                <h3 className="text-lg font-semibold">{product.name || "Untitled product"}</h3>
                                                                <p className="mt-1 text-sm text-muted-foreground">
                                                                    {product.category || "Category pending"}{companyLocation ? ` - ${companyLocation}` : ""}
                                                                </p>
                                                            </div>
                                                            <Badge variant="outline" className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700">
                                                                Full catalog
                                                            </Badge>
                                                        </div>

                                                        <div className="mt-4 flex flex-wrap gap-2">
                                                            <Badge variant="outline" className="rounded-full border-emerald-200 bg-white">
                                                                <FileText className="mr-1 h-3.5 w-3.5 text-emerald-600" />
                                                                {hasText(product.technicalDatasheet) ? "Datasheet ready" : "Add datasheet"}
                                                            </Badge>
                                                            <Badge variant="outline" className="rounded-full border-emerald-200 bg-white">
                                                                <Shield className="mr-1 h-3.5 w-3.5 text-emerald-600" />
                                                                {product.certifications.length > 0 ? product.certifications.join(", ") : "Advanced certifications pending"}
                                                            </Badge>
                                                            <Badge variant="outline" className="rounded-full border-emerald-200 bg-white">
                                                                <LayoutGrid className="mr-1 h-3.5 w-3.5 text-emerald-600" />
                                                                {hasText(product.exampleProjects) ? "Case study added" : "Add project reference"}
                                                            </Badge>
                                                        </div>

                                                        <div className="mt-4 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/40 p-4 text-sm text-muted-foreground">
                                                            BIM objects and Revit files are part of the Business Link catalog workflow. This screen stages that richer catalog model while using the information submitted in today&apos;s form.
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 p-6 text-center">
                                                <p className="font-medium">Your catalog is ready for Business Link expansion.</p>
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    Add products, case studies, technical assets, and advanced certifications to unlock stronger visibility and lead quality.
                                                </p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-xl">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="flex items-center gap-2">
                                            <Target className="h-5 w-5 text-emerald-600" />
                                            Lead Generation
                                        </CardTitle>
                                        <CardDescription>
                                            Business Link is structured around qualified matching, RFQ workflows, and smarter project relevance.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-4 md:grid-cols-3">
                                        <div className="rounded-2xl border border-emerald-100 p-4">
                                            <p className="font-medium">Qualified project matching</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Submitted categories and references help align your company with relevant green building opportunities.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-emerald-100 p-4">
                                            <p className="font-medium">RFQ system</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Request-for-quotation activity can be organized into a clearer business development pipeline.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-emerald-100 p-4">
                                            <p className="font-medium">Smart matchmaking</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Product, certification, and use-case signals improve the relevance of suggested projects.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <Card className="border-0 shadow-xl">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="flex items-center gap-2">
                                            <LayoutGrid className="h-5 w-5 text-emerald-600" />
                                            Marketplace Visibility
                                        </CardTitle>
                                        <CardDescription>
                                            Business Link improves ranking across higher-value green construction discovery categories.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            {businessMarketplaceCategories.map((category) => (
                                                <Badge key={category} variant="outline" className="rounded-full border-emerald-200 bg-emerald-50/70 px-3 py-1 text-emerald-700">
                                                    {category}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="rounded-2xl border border-emerald-100 p-4">
                                            <p className="text-sm text-muted-foreground">Ranking profile</p>
                                            <p className="mt-1 text-2xl font-bold">Higher visibility</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Your Business Link plan is positioned for stronger category ranking than the starter tier.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-xl">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="flex items-center gap-2">
                                            <Users className="h-5 w-5 text-emerald-600" />
                                            Networking & Collaboration
                                        </CardTitle>
                                        <CardDescription>
                                            Collaboration requests can come from a broader professional network with regional and international project potential.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            {businessCollaborationRoles.map((role) => (
                                                <Badge key={role} variant="outline" className="rounded-full border-emerald-200 bg-white px-3 py-1">
                                                    {role}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="rounded-2xl border border-emerald-100 p-4">
                                            <p className="font-medium">Regional & international project participation</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                A stronger catalog, better certifications, and richer references help position your company beyond basic local discovery.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-xl">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="flex items-center gap-2">
                                            <Sparkles className="h-5 w-5 text-emerald-600" />
                                            AI Tools
                                        </CardTitle>
                                        <CardDescription>
                                            Business Link introduces AI-assisted insight modules around sustainability performance and market potential.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {businessAiTools.map((tool) => (
                                            <div key={tool} className="rounded-2xl border border-emerald-100 p-4">
                                                <p className="font-medium">{tool}</p>
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    Prepared as part of the Business Link workspace using your catalog structure, certifications, and product details as signal inputs.
                                                </p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-xl">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="flex items-center gap-2">
                                            <Search className="h-5 w-5 text-emerald-600" />
                                            Opportunities Hub
                                        </CardTitle>
                                        <CardDescription>
                                            A dedicated space for the next layer of business development opportunities tied to sustainable construction.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {businessOpportunityItems.map((item) => (
                                            <div key={item} className="rounded-2xl border border-emerald-100 p-4">
                                                <p className="font-medium">{item}</p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (selectedPlan === "starter") {
            const starterStats = [
                {
                    title: "Basic visibility",
                    value: "Pending review",
                    description: "Your starter listing is queued for directory visibility in the green ecosystem.",
                    icon: Eye,
                },
                {
                    title: "Product views",
                    value: "0",
                    description: "Views will start counting once your public listing is visible to professionals.",
                    icon: BarChart3,
                },
                {
                    title: "Contact requests",
                    value: "0",
                    description: "Starter networking is limited to inbound discovery and simple contact requests.",
                    icon: Mail,
                },
                {
                    title: "Profile analytics",
                    value: `${profileCompletion}%`,
                    description: "Based on the company and product details you completed in this form.",
                    icon: Search,
                },
            ];

            return (
                <div className="ui-page-shell">
                    <div className="ui-page-container-6xl space-y-8">
                        <PageIntro
                            badge="GB Starter Link"
                            icon={Star}
                            title={
                                <>
                                    {companyName || "Your company"} <span className="gradient-text">Starter Dashboard</span>
                                </>
                            }
                            description="Your profile has been submitted and is now staged in the GreenBuildLink ecosystem with a starter-level visibility setup."
                            className="mb-2"
                        />

                        <Card className="overflow-hidden border-0 shadow-2xl shadow-emerald-900/10">
                            <CardContent className="relative p-6 sm:p-8">
                                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-emerald-500/12 via-teal-500/8 to-sky-500/10" />
                                <div className="relative space-y-6">
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
                                                <CheckCircle2 className="h-8 w-8 text-white" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Badge className="ui-badge-brand mb-0 px-3 py-1 text-xs">
                                                        Starter access activated
                                                    </Badge>
                                                    <Badge variant="outline" className="rounded-full border-emerald-200 bg-white/80 text-emerald-700">
                                                        {selectedPlanConfig.name} - {selectedPlanConfig.price}
                                                    </Badge>
                                                </div>
                                                <h2 className="text-2xl font-bold sm:text-3xl">
                                                    Basic visibility and product presence are ready to launch.
                                                </h2>
                                                <p className="max-w-3xl text-muted-foreground">
                                                    This starter workspace reflects the profile you just submitted. Live views and contact activity will populate after your listing becomes visible, while product details below use the exact information captured in the intake form.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-3 lg:w-[360px] lg:grid-cols-1">
                                            <Button className="ui-btn-brand w-full" onClick={() => router.push("/company")}>
                                                Explore Directory
                                            </Button>
                                            <Button variant="outline" className="w-full rounded-full border-emerald-200" onClick={() => router.push("/")}>
                                                Go to Home
                                            </Button>
                                            <Button variant="outline" className="w-full rounded-full" onClick={() => { setSubmitted(false); setStep(1); }}>
                                                Submit Another
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                        {starterStats.map((stat) => (
                                            <Card key={stat.title} className="border border-emerald-100/80 bg-card/90 shadow-sm">
                                                <CardContent className="space-y-3 p-5">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20">
                                                            <stat.icon className="h-5 w-5 text-white" />
                                                        </div>
                                                        <span className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-700/80">
                                                            Starter
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
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
                            <Card className="border-0 shadow-xl">
                                <CardHeader className="space-y-2">
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-5 w-5 text-emerald-600" />
                                        Product & Service Management
                                    </CardTitle>
                                    <CardDescription>
                                        Starter Link keeps product management simple: up to three visible listings, datasheet references, basic certification display, and straightforward listing status.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                                            <p className="text-sm text-muted-foreground">Visible starter listings</p>
                                            <p className="mt-1 text-2xl font-bold">{starterVisibleProducts.length}/3</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                {submittedProducts.length > 3
                                                    ? `${submittedProducts.length - 3} additional product entries were submitted beyond the starter visibility cap.`
                                                    : "You are within the starter listing capacity."}
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                                            <p className="text-sm text-muted-foreground">Datasheet references</p>
                                            <p className="mt-1 text-2xl font-bold">{starterDatasheetCount}</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Technical data sheets are currently captured as links or file references from the form.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                                            <p className="text-sm text-muted-foreground">Certification display</p>
                                            <p className="mt-1 text-2xl font-bold">{starterCertificationCount}</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Certifications like LEED compliance will appear as simple listing badges.
                                            </p>
                                        </div>
                                    </div>

                                    {starterVisibleProducts.length > 0 ? (
                                        <div className="grid gap-4 lg:grid-cols-2">
                                            {starterVisibleProducts.map((product, index) => (
                                                <div key={`${product.name || "product"}-${index}`} className="rounded-2xl border border-emerald-100 p-5 shadow-sm">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <p className="text-sm font-medium text-muted-foreground">Listing {index + 1}</p>
                                                            <h3 className="text-lg font-semibold">{product.name || "Untitled product"}</h3>
                                                                <p className="mt-1 text-sm text-muted-foreground">
                                                                    {product.category || "Category pending"}{companyLocation ? ` - ${companyLocation}` : ""}
                                                                </p>
                                                        </div>
                                                        <Badge variant="outline" className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700">
                                                            Basic listing
                                                        </Badge>
                                                    </div>

                                                    <div className="mt-4 flex flex-wrap gap-2">
                                                        <Badge variant="outline" className="rounded-full border-emerald-200 bg-white">
                                                            <LayoutGrid className="mr-1 h-3.5 w-3.5 text-emerald-600" />
                                                            {product.category || "General category"}
                                                        </Badge>
                                                        <Badge variant="outline" className="rounded-full border-emerald-200 bg-white">
                                                            <FileText className="mr-1 h-3.5 w-3.5 text-emerald-600" />
                                                            {hasText(product.technicalDatasheet) ? "Datasheet attached" : "No datasheet yet"}
                                                        </Badge>
                                                        <Badge variant="outline" className="rounded-full border-emerald-200 bg-white">
                                                            <Shield className="mr-1 h-3.5 w-3.5 text-emerald-600" />
                                                            {product.certifications.length > 0 ? product.certifications.join(", ") : "No certification added"}
                                                        </Badge>
                                                    </div>

                                                    <div className="mt-4 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/40 p-4 text-sm text-muted-foreground">
                                                        {hasText(product.description)
                                                            ? product.description
                                                            : "This listing is ready for simple starter visibility once the profile is reviewed."}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 p-6 text-center">
                                            <p className="font-medium">No products were added in this submission.</p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                The starter dashboard is ready for simple listing management as soon as product details are provided.
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <div className="space-y-6">
                                <Card className="border-0 shadow-xl">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="flex items-center gap-2">
                                            <LayoutGrid className="h-5 w-5 text-emerald-600" />
                                            Marketplace Listing
                                        </CardTitle>
                                        <CardDescription>
                                            Your starter presence is distributed across GreenBuildLink&apos;s core green construction discovery categories.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            {starterMarketplaceCategories.map((category) => (
                                                <Badge key={category} variant="outline" className="rounded-full border-emerald-200 bg-emerald-50/70 px-3 py-1 text-emerald-700">
                                                    {category}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="rounded-2xl border border-emerald-100 p-4">
                                                <p className="text-sm text-muted-foreground">Submitted product categories</p>
                                                <p className="mt-1 text-2xl font-bold">{starterCategoryCount}</p>
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    Product categories from your form help determine how your listing is surfaced.
                                                </p>
                                            </div>
                                            <div className="rounded-2xl border border-emerald-100 p-4">
                                                <p className="text-sm text-muted-foreground">Company discoverability</p>
                                                <p className="mt-1 text-2xl font-bold">Basic</p>
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    Starter listings are searchable by professionals looking for green products and services.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-xl">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="flex items-center gap-2">
                                            <Mail className="h-5 w-5 text-emerald-600" />
                                            Networking (Limited)
                                        </CardTitle>
                                        <CardDescription>
                                            GB Starter Link focuses on inbound opportunities without adding a full enterprise workspace.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="rounded-2xl border border-emerald-100 p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                                                    <Mail className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Receive contact requests</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Contact activity begins once your listing is visible and professionals start reaching out.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded-2xl border border-emerald-100 p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                                                    <Search className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Be discoverable by professionals</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Your company profile and visible products can be surfaced to designers, specifiers, and project owners.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="ui-page-shell-centered">
                <Card className="max-w-lg w-full border-0 shadow-2xl animate-scale-in">
                    <CardContent className="p-10 text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30">
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3">Registration submitted</h2>
                        <p className="text-muted-foreground mb-2">Your Green Industry form has been submitted successfully.</p>
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-6">Plan: {selectedPlanConfig?.name ?? "Not selected"}</p>
                        <div className="space-y-3">
                            <Button className="ui-btn-brand w-full" onClick={() => router.push("/")}>
                                Go to Home
                            </Button>
                            <Button variant="outline" className="w-full rounded-full" onClick={() => { setSubmitted(false); setStep(1); }}>
                                Submit Another
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="ui-page-shell">
            <div className="ui-page-container-4xl">
                <PageIntro
                    badge="Green Industry Space"
                    icon={Building2}
                    title={
                        <>
                            Green Industry <span className="gradient-text">Registration Form</span>
                        </>
                    }
                    className="mb-8"
                />

                <StepProgress
                    currentStep={step}
                    steps={companySteps.map((label) => ({ label }))}
                    className="mb-8"
                    onStepSelect={moveToStep}
                />

                <form onSubmit={handleSubmit}>
                    <Card className="border-0 shadow-xl">
                        <CardHeader className="pb-2">
                            <CardTitle>{step === 1 ? "Company Information + Company Profile" : step === 2 ? "Product Sections" : "Final. Subscription"}</CardTitle>
                            <CardDescription>{step === 2 ? "" : ""}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-4">
                            {step === 1 && (
                                <>
                                    <div className="ui-form-section">
                                        <h3 className="font-semibold">1. Company Information</h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2"><Label>Company Name *</Label><Input placeholder="Ex: GreenBuild Materials" value={companyName} onChange={(e) => { setCompanyName(e.target.value); clearFieldError("companyName"); }} className={getFieldClass("companyName", "ui-field")} />{renderFieldError("companyName")}</div>
                                            <div className="space-y-2"><Label>Email Address *</Label><Input type="email" placeholder="Ex: contact@company.com" value={companyEmail} onChange={(e) => { setCompanyEmail(e.target.value); clearFieldError("companyEmail"); clearFieldError("companyLocation"); }} className={getFieldClass("companyEmail", "ui-field")} />{renderFieldError("companyEmail")}</div>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2"><Label>Phone Number *</Label><Input placeholder="Ex: +216 12 345 678" value={companyPhone} onChange={(e) => { setCompanyPhone(e.target.value); clearFieldError("companyPhone"); }} className={getFieldClass("companyPhone", "ui-field")} />{renderFieldError("companyPhone")}</div>
                                            <div className="space-y-2"><Label>Website</Label><Input placeholder="Ex: https://company.com" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} className="ui-field" /></div>
                                        </div>
                                        <div className="grid sm:grid-cols-3 gap-4">
                                            <div className="space-y-2"><Label>Address *</Label><Input placeholder="Ex: 12 Green Avenue" value={companyAddress} onChange={(e) => { setCompanyAddress(e.target.value); clearFieldError("companyAddress"); clearFieldError("companyLocation"); }} className={getFieldClass("companyAddress", "ui-field")} />{renderFieldError("companyAddress")}</div>
                                            <div className="space-y-2"><Label>Country *</Label><Input placeholder="Ex: Tunisia" value={companyCountry} onChange={(e) => { setCompanyCountry(e.target.value); clearFieldError("companyCountry"); clearFieldError("companyLocation"); }} className={getFieldClass("companyCountry", "ui-field")} />{renderFieldError("companyCountry")}</div>
                                            <div className="space-y-2"><Label>City *</Label><Input placeholder="Ex: Tunis" value={companyCity} onChange={(e) => { setCompanyCity(e.target.value); clearFieldError("companyCity"); clearFieldError("companyLocation"); }} className={getFieldClass("companyCity", "ui-field")} />{renderFieldError("companyCity")}</div>
                                        </div>
                                        {renderFieldError("companyLocation")}
                                        <div className="rounded-lg border border-emerald-100 p-3 space-y-3">
                                            <h4 className="font-medium">Social Media (if available)</h4>
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                <div className="space-y-2">
                                                    <Label>LinkedIn</Label>
                                                    <Input placeholder="https://linkedin.com/company/..." value={linkedInUrl} onChange={(e) => setLinkedInUrl(e.target.value)} className="ui-field" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Facebook</Label>
                                                    <Input placeholder="https://facebook.com/..." value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} className="ui-field" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Pinterest</Label>
                                                    <Input placeholder="https://pinterest.com/..." value={pinterestUrl} onChange={(e) => setPinterestUrl(e.target.value)} className="ui-field" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Instagram</Label>
                                                    <Input placeholder="https://instagram.com/..." value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} className="ui-field" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Youtube</Label>
                                                <Input placeholder="https://youtube.com/@..." value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} className="ui-field" />
                                    </div>
                                </div>
                                    </div>

                                    <div className="ui-form-section">
                                        <h3 className="font-semibold">2. Company Profile</h3>
                                        <div className="space-y-2">
                                            <Label>Type of company</Label>
                                            <Select value={companyType} onValueChange={setCompanyType}>
                                                <SelectTrigger className="ui-field"><SelectValue placeholder="Select type" /></SelectTrigger>
                                                <SelectContent>{companyTypes.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2"><Label>Years of operation</Label><Input placeholder="Ex: 8 years" value={yearsOfOperation} onChange={(e) => setYearsOfOperation(e.target.value)} className="ui-field" /></div>
                                            <div className="space-y-2"><Label>Main activity / sector</Label><Input placeholder="Ex: Eco insulation and facade systems" value={mainSector} onChange={(e) => setMainSector(e.target.value)} className="ui-field" /></div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    {products.map((product, index) => (
                                        <div key={index} className="rounded-xl border border-emerald-100 p-4 space-y-4">
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                <h3 className="font-semibold flex items-center gap-2"><Package className="w-4 h-4 text-emerald-600" />Product {index + 1}</h3>
                                                {products.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="rounded-full text-destructive hover:bg-destructive/10"
                                                        onClick={() => removeProduct(index)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>

                                            <div className="space-y-2"><Label>3. Product / Solution Name</Label><Input placeholder="Ex: EcoTherm Panel X" value={product.name} onChange={(e) => { updateProduct(index, "name", e.target.value); clearFieldError(`product-${index}-name`); }} className={getFieldClass(`product-${index}-name`, "rounded-xl h-12 border-emerald-200/50")} />{renderFieldError(`product-${index}-name`)}</div>
                                            <div className="space-y-2"><Label>Category</Label><Select value={product.category} onValueChange={(v) => { updateProduct(index, "category", v); clearFieldError(`product-${index}-category`); }}><SelectTrigger className={getFieldClass(`product-${index}-category`, "rounded-xl h-12 border-emerald-200/50")}><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent>{PRODUCT_CATEGORIES.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}</SelectContent></Select>{renderFieldError(`product-${index}-category`)}</div>
                                            <div className="space-y-2"><Label>Description (short but clear)</Label><Textarea placeholder="Briefly describe the product and its sustainability value." value={product.description} onChange={(e) => updateProduct(index, "description", e.target.value)} className="rounded-xl min-h-[100px] border-emerald-200/50" /></div>
                                            <div className="space-y-2"><Label>Key features / specifications</Label><Textarea placeholder="List technical specs: performance, materials, dimensions, etc." value={product.keyFeatures} onChange={(e) => updateProduct(index, "keyFeatures", e.target.value)} className="rounded-xl min-h-[100px] border-emerald-200/50" /></div>
                                            <div className="space-y-2"><Label>Scope of works (Designation of works)</Label><Textarea placeholder="Where this solution applies (facade, roofing, HVAC, etc.)." value={product.scopeOfWorks} onChange={(e) => updateProduct(index, "scopeOfWorks", e.target.value)} className="rounded-xl min-h-[100px] border-emerald-200/50" /></div>

                                            <div className="rounded-lg border border-emerald-100 p-3 space-y-3">
                                                <h4 className="font-medium flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-600" />4. Certifications & Compliance</h4>
                                                <div className="grid sm:grid-cols-2 gap-3">{certificationOptions.map((option) => (<label key={option} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={product.certifications.includes(option)} onChange={() => toggleProductMulti(index, "certifications", option)} className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />{option}</label>))}</div>
                                                {product.certifications.includes("Other") && (<div className="space-y-2"><Label>Other certification</Label><Input placeholder="Ex: Local eco-label XYZ" value={product.otherCertification} onChange={(e) => { updateProduct(index, "otherCertification", e.target.value); clearFieldError(`product-${index}-otherCertification`); }} className={getFieldClass(`product-${index}-otherCertification`, "rounded-xl h-12 border-emerald-200/50")} />{renderFieldError(`product-${index}-otherCertification`)}</div>)}
                                                <div className="space-y-2"><Label>Technical datasheets upload</Label><Input placeholder="Paste datasheet URL or file reference" value={product.technicalDatasheet} onChange={(e) => updateProduct(index, "technicalDatasheet", e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                                <div className="space-y-2"><Label>Test reports (optional)</Label><Input placeholder="Paste test report URL or file reference" value={product.testReports} onChange={(e) => updateProduct(index, "testReports", e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                            </div>

                                            <div className="rounded-lg border border-emerald-100 p-3 space-y-3">
                                                <h4 className="font-medium">5. Application & Use Cases</h4>
                                                <div className="grid sm:grid-cols-2 gap-3">{useCaseOptions.map((option) => (<label key={option} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={product.useCases.includes(option)} onChange={() => toggleProductMulti(index, "useCases", option)} className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />{option}</label>))}</div>
                                                <div className="space-y-2"><Label>Example projects (if any)</Label><Textarea placeholder="Ex: Green Office Tower, 2024, Tunis" value={product.exampleProjects} onChange={(e) => updateProduct(index, "exampleProjects", e.target.value)} className="rounded-xl min-h-[90px] border-emerald-200/50" /></div>
                                                <div className="space-y-2"><Label>Clients / references (optional)</Label><Textarea placeholder="List major clients, sectors, or references." value={product.clientsReferences} onChange={(e) => updateProduct(index, "clientsReferences", e.target.value)} className="rounded-xl min-h-[90px] border-emerald-200/50" /></div>
                                            </div>

                                            <div className="rounded-lg border border-emerald-100 p-3 space-y-3">
                                                <h4 className="font-medium">6. Availability & Market</h4>
                                                <div className="flex flex-wrap gap-4">{marketOptions.map((option) => (<label key={option} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={product.availableMarkets.includes(option)} onChange={() => toggleProductMulti(index, "availableMarkets", option)} className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />{option}</label>))}</div>
                                            </div>

                                            <div className="rounded-lg border border-emerald-100 p-3 space-y-3">
                                                <h4 className="font-medium">7. Pricing & Business Model</h4>
                                                <div className="space-y-2"><Label>Price range</Label><Input placeholder="Ex: 30-45 EUR / m2" value={product.priceRange} onChange={(e) => updateProduct(index, "priceRange", e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                                <div className="grid sm:grid-cols-2 gap-3">{salesModelOptions.map((option) => (<label key={option} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={product.salesModels.includes(option)} onChange={() => toggleProductMulti(index, "salesModels", option)} className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />{option}</label>))}</div>
                                            </div>

                                            <div className="rounded-lg border border-emerald-100 p-3 space-y-3">
                                                <h4 className="font-medium">8. Media & Documents</h4>
                                                <div className="space-y-2"><Label>Product images</Label><Input placeholder="Paste image gallery URL or drive folder link" value={product.productImages} onChange={(e) => updateProduct(index, "productImages", e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                                <div className="space-y-2"><Label>Catalog / brochure upload</Label><Input placeholder="Paste brochure URL or file link" value={product.brochure} onChange={(e) => updateProduct(index, "brochure", e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                                <div className="space-y-2"><Label>Video demo (if available)</Label><Input placeholder="Paste video URL (YouTube, Vimeo, etc.)" value={product.videoDemo} onChange={(e) => updateProduct(index, "videoDemo", e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                            </div>
                                        </div>
                                    ))}

                                    <Button type="button" variant="outline" className="w-full rounded-xl border-dashed border-2 border-emerald-200 h-12" onClick={addProduct}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add another product
                                    </Button>

                                    <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                                        <h3 className="font-semibold">9. Collaboration Interest</h3>
                                        <div className="grid sm:grid-cols-2 gap-3">{collaborationOptions.map((option) => (<label key={option} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={collaborationInterests.includes(option)} onChange={() => toggleValue(option, collaborationInterests, setCollaborationInterests)} className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />{option}</label>))}</div>
                                    </div>

                                    <div className="rounded-xl border border-emerald-100 p-4">
                                        <h3 className="font-semibold mb-3">10. Consent *</h3>
                                        <label className="flex items-start gap-3 text-sm text-muted-foreground"><input type="checkbox" checked={publishConsent} onChange={(e) => { setPublishConsent(e.target.checked); clearFieldError("publishConsent"); }} className="mt-0.5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" /><span>Agreement to publish product information on platform.</span></label>
                                        {renderFieldError("publishConsent")}
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <div className="text-center p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                                        <p className="text-sm text-emerald-700 dark:text-emerald-300">
                                            <span className="font-semibold">Selected Plan:</span> {selectedPlanConfig ? `${selectedPlanConfig.name} (${selectedPlanConfig.price})` : "Choose one plan to continue"}
                                        </p>
                                    </div>
                                    <div className={cn("grid gap-6 md:grid-cols-3", fieldErrors.selectedPlan && "rounded-2xl border border-red-500 p-3")}>
                                        {subscriptionPlans.map((plan) => (
                                            <Card
                                                key={plan.id}
                                                className={`relative cursor-pointer border-2 transition-all duration-500 overflow-hidden ${selectedPlan === plan.id ? `${plan.borderColor} shadow-xl ring-2 ring-emerald-500` : "border-transparent shadow-lg hover:shadow-xl"}`}
                                                onClick={() => {
                                                    setSelectedPlan(plan.id);
                                                    clearFieldError("selectedPlan");
                                                }}
                                            >
                                                {plan.popular && (<Badge className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 text-xs"><Sparkles className="w-3 h-3 mr-1" />Popular</Badge>)}
                                                <CardContent className="p-6">
                                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg mb-4`}><plan.icon className="w-6 h-6 text-white" /></div>
                                                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                                                    <p className="text-2xl font-bold gradient-text mb-4">{plan.price}</p>
                                                    <ul className="space-y-2">{plan.features.map((f) => (<li key={f} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{f}</li>))}</ul>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                    {renderFieldError("selectedPlan")}
                                </div>
                            )}

                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
                                <Button type="button" variant="outline" className="w-full rounded-full px-6 sm:w-auto" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={isLoading || step === 1}><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>
                                {step < 3 ? (
                                    <Button type="button" className="ui-btn-brand w-full px-8 sm:w-auto" onClick={() => moveToStep(Math.min(3, step + 1))}>Next<ArrowRight className="w-4 h-4 ml-2" /></Button>
                                ) : (
                                    <Button type="submit" className="ui-btn-brand w-full px-10 sm:w-auto" disabled={isLoading}>
                                        {isLoading ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" />Sending...</>) : (<><CheckCircle2 className="w-5 h-5 mr-2" />Submit</>)}
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </div>
    );
}
