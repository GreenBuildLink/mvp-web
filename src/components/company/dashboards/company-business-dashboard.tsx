import { BarChart3, Download, FileText, LayoutGrid, Mail, Package, Search, Shield, Sparkles, Target, Users, Zap } from "lucide-react";

import { DashboardStatGrid } from "@/components/registration/dashboard-stat-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageIntro } from "@/components/ui/page-intro";
import type { CompanyProductForm } from "@/lib/company-registration";

interface CompanyBusinessDashboardProps {
    companyName: string;
    selectedPlanName?: string;
    selectedPlanPrice?: string;
    profileCompletion: number;
    submittedProducts: CompanyProductForm[];
    starterCategoryCount: number;
    starterDatasheetCount: number;
    starterCertificationCount: number;
    companyLocation: string;
    onExploreDirectory: () => void;
    onGoHome: () => void;
    onReset: () => void;
}

function hasText(value: string) {
    return value.trim().length > 0;
}

export function CompanyBusinessDashboard({
    companyName,
    selectedPlanName,
    selectedPlanPrice,
    profileCompletion,
    submittedProducts,
    starterCategoryCount,
    starterDatasheetCount,
    starterCertificationCount,
    companyLocation,
    onExploreDirectory,
    onGoHome,
    onReset,
}: CompanyBusinessDashboardProps) {
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
                                                {selectedPlanName ?? "GB Business Link"} - {selectedPlanPrice ?? "EUR 49/month"}
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
                                    <Button className="ui-btn-brand w-full" onClick={onExploreDirectory}>
                                        Explore Directory
                                    </Button>
                                    <Button variant="outline" className="w-full rounded-full border-emerald-200" onClick={onGoHome}>
                                        Go to Home
                                    </Button>
                                    <Button variant="outline" className="w-full rounded-full" onClick={onReset}>
                                        Submit Another
                                    </Button>
                                </div>
                            </div>

                            <DashboardStatGrid stats={businessStats} accent="brand" badgeLabel="Business" />
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
                                {[
                                    "Qualified project matching",
                                    "RFQ system",
                                    "Smart matchmaking",
                                ].map((item) => (
                                    <div key={item} className="rounded-2xl border border-emerald-100 p-4">
                                        <p className="font-medium">{item}</p>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {item === "Qualified project matching"
                                                ? "Submitted categories and references help align your company with relevant green building opportunities."
                                                : item === "RFQ system"
                                                    ? "Request-for-quotation activity can be organized into a clearer business development pipeline."
                                                    : "Product, certification, and use-case signals improve the relevance of suggested projects."}
                                        </p>
                                    </div>
                                ))}
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
                                    {[
                                        "Green materials",
                                        "Low-carbon solutions",
                                        "Circular economy products",
                                        "Smart building technologies",
                                    ].map((category) => (
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
                                    {["Architects", "Engineers", "Consultants", "Developers"].map((role) => (
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
                                {[
                                    "Product environmental impact analysis",
                                    "Carbon footprint comparison",
                                    "Market opportunity recommendations",
                                    "Certification compatibility suggestions",
                                ].map((tool) => (
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
                                {[
                                    "Green project tenders",
                                    "Construction sustainability projects",
                                    "Export opportunities",
                                ].map((item) => (
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
