"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    Crown,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    Star,
    Zap,
    Loader2,
    Package,
    Shield,
    Plus,
    Trash2,
} from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/types";

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

export default function CompanyProfilePage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

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

    const [selectedPlan, setSelectedPlan] = useState("professional");

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
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!publishConsent) {
            setError("Please agree to publish product information on the platform.");
            return;
        }

        setIsLoading(true);
        setError("");
        try {
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
                selectedPlan: subscriptionPlans.find((p) => p.id === selectedPlan)?.name ?? selectedPlan,
                products: products.map((product) => ({
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
                })),
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

    if (submitted) {
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <Card className="max-w-lg w-full border-0 shadow-2xl animate-scale-in">
                    <CardContent className="p-10 text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30">
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3">Registration submitted</h2>
                        <p className="text-muted-foreground mb-2">Your Green Industry form has been submitted successfully.</p>
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-6">Plan: {subscriptionPlans.find((p) => p.id === selectedPlan)?.name}</p>
                        <div className="space-y-3">
                            <Button className="w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg" onClick={() => router.push("/")}>
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
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <Badge className="mb-4 max-w-full whitespace-normal px-4 py-1.5 text-center text-sm leading-snug bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                        <Building2 className="w-4 h-4 mr-2" />
                        Green Industry Space
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">Green Industry <span className="gradient-text">Registration Form</span></h1>
                </div>

                <div className="mb-8 space-y-4">
                    <div className="rounded-2xl border border-emerald-100 bg-card/80 p-4 shadow-sm sm:hidden">
                        <div className="mb-3 flex items-center justify-between gap-3 text-xs font-medium text-muted-foreground">
                            <span>Step {step} of {companySteps.length}</span>
                            <span className="text-right text-emerald-700">{companySteps[step - 1]}</span>
                        </div>
                        <div className="h-2 rounded-full bg-emerald-100">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 transition-all"
                                style={{ width: `${(step / companySteps.length) * 100}%` }}
                            />
                        </div>
                    </div>
                    <div className="hidden overflow-x-auto pb-2 sm:block">
                        <div className="flex w-max min-w-full items-center justify-start gap-2 sm:justify-center">
                        {companySteps.map((label, index) => {
                            const s = index + 1;
                            return (
                                <button
                                    key={label}
                                    onClick={() => setStep(s)}
                                    className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${step === s
                                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                                        : step > s
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    {s}. {label}
                                </button>
                            );
                        })}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card className="border-0 shadow-xl">
                        <CardHeader className="pb-2">
                            <CardTitle>{step === 1 ? "Company Information + Company Profile" : step === 2 ? "Product Sections" : "Final. Subscription"}</CardTitle>
                            <CardDescription>{step === 2 ? "" : ""}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-4">
                            {step === 1 && (
                                <>
                                    <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                                        <h3 className="font-semibold">1. Company Information</h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2"><Label>Company Name *</Label><Input placeholder="Ex: GreenBuild Materials" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                            <div className="space-y-2"><Label>Email Address *</Label><Input type="email" placeholder="Ex: contact@company.com" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2"><Label>Phone Number *</Label><Input placeholder="Ex: +216 12 345 678" value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                            <div className="space-y-2"><Label>Website</Label><Input placeholder="Ex: https://company.com" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                        </div>
                                        <div className="grid sm:grid-cols-3 gap-4">
                                            <div className="space-y-2"><Label>Address *</Label><Input placeholder="Ex: 12 Green Avenue" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                            <div className="space-y-2"><Label>Country *</Label><Input placeholder="Ex: Tunisia" value={companyCountry} onChange={(e) => setCompanyCountry(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                            <div className="space-y-2"><Label>City *</Label><Input placeholder="Ex: Tunis" value={companyCity} onChange={(e) => setCompanyCity(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                        </div>
                                        <div className="rounded-lg border border-emerald-100 p-3 space-y-3">
                                            <h4 className="font-medium">Social Media (if available)</h4>
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                <div className="space-y-2">
                                                    <Label>LinkedIn</Label>
                                                    <Input placeholder="https://linkedin.com/company/..." value={linkedInUrl} onChange={(e) => setLinkedInUrl(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Facebook</Label>
                                                    <Input placeholder="https://facebook.com/..." value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Pinterest</Label>
                                                    <Input placeholder="https://pinterest.com/..." value={pinterestUrl} onChange={(e) => setPinterestUrl(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Instagram</Label>
                                                    <Input placeholder="https://instagram.com/..." value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Youtube</Label>
                                                <Input placeholder="https://youtube.com/@..." value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                                        <h3 className="font-semibold">2. Company Profile</h3>
                                        <div className="space-y-2">
                                            <Label>Type of company</Label>
                                            <Select value={companyType} onValueChange={setCompanyType}>
                                                <SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select type" /></SelectTrigger>
                                                <SelectContent>{companyTypes.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2"><Label>Years of operation</Label><Input placeholder="Ex: 8 years" value={yearsOfOperation} onChange={(e) => setYearsOfOperation(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                            <div className="space-y-2"><Label>Main activity / sector</Label><Input placeholder="Ex: Eco insulation and facade systems" value={mainSector} onChange={(e) => setMainSector(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
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

                                            <div className="space-y-2"><Label>3. Product / Solution Name</Label><Input placeholder="Ex: EcoTherm Panel X" value={product.name} onChange={(e) => updateProduct(index, "name", e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                            <div className="space-y-2"><Label>Category</Label><Select value={product.category} onValueChange={(v) => updateProduct(index, "category", v)}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent>{PRODUCT_CATEGORIES.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}</SelectContent></Select></div>
                                            <div className="space-y-2"><Label>Description (short but clear)</Label><Textarea placeholder="Briefly describe the product and its sustainability value." value={product.description} onChange={(e) => updateProduct(index, "description", e.target.value)} className="rounded-xl min-h-[100px] border-emerald-200/50" /></div>
                                            <div className="space-y-2"><Label>Key features / specifications</Label><Textarea placeholder="List technical specs: performance, materials, dimensions, etc." value={product.keyFeatures} onChange={(e) => updateProduct(index, "keyFeatures", e.target.value)} className="rounded-xl min-h-[100px] border-emerald-200/50" /></div>
                                            <div className="space-y-2"><Label>Scope of works (Designation of works)</Label><Textarea placeholder="Where this solution applies (facade, roofing, HVAC, etc.)." value={product.scopeOfWorks} onChange={(e) => updateProduct(index, "scopeOfWorks", e.target.value)} className="rounded-xl min-h-[100px] border-emerald-200/50" /></div>

                                            <div className="rounded-lg border border-emerald-100 p-3 space-y-3">
                                                <h4 className="font-medium flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-600" />4. Certifications & Compliance</h4>
                                                <div className="grid sm:grid-cols-2 gap-3">{certificationOptions.map((option) => (<label key={option} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={product.certifications.includes(option)} onChange={() => toggleProductMulti(index, "certifications", option)} className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />{option}</label>))}</div>
                                                {product.certifications.includes("Other") && (<div className="space-y-2"><Label>Other certification</Label><Input placeholder="Ex: Local eco-label XYZ" value={product.otherCertification} onChange={(e) => updateProduct(index, "otherCertification", e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>)}
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
                                        <h3 className="font-semibold mb-3">10. Consent</h3>
                                        <label className="flex items-start gap-3 text-sm text-muted-foreground"><input type="checkbox" checked={publishConsent} onChange={(e) => setPublishConsent(e.target.checked)} className="mt-0.5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" /><span>Agreement to publish product information on platform.</span></label>
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <div className="text-center p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                                        <p className="text-sm text-emerald-700 dark:text-emerald-300">
                                            <span className="font-semibold">Selected Plan:</span> {subscriptionPlans.find((p) => p.id === selectedPlan)?.name} ({subscriptionPlans.find((p) => p.id === selectedPlan)?.price})
                                        </p>
                                    </div>
                                    <div className="grid gap-6 md:grid-cols-3">
                                        {subscriptionPlans.map((plan) => (
                                            <Card key={plan.id} className={`relative cursor-pointer border-2 transition-all duration-500 overflow-hidden ${selectedPlan === plan.id ? `${plan.borderColor} shadow-xl ring-2 ring-emerald-500` : "border-transparent shadow-lg hover:shadow-xl"}`} onClick={() => setSelectedPlan(plan.id)}>
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
                                </div>
                            )}

                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
                                <Button type="button" variant="outline" className="w-full rounded-full px-6 sm:w-auto" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={isLoading || step === 1}><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>
                                {step < 3 ? (
                                    <Button type="button" className="w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 sm:w-auto" onClick={() => setStep((s) => Math.min(3, s + 1))}>Next<ArrowRight className="w-4 h-4 ml-2" /></Button>
                                ) : (
                                    <Button type="submit" className="w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 sm:w-auto" disabled={isLoading}>
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
