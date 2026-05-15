import { BarChart3, CheckCircle2, Eye, FileText, LayoutGrid, Mail, Package, Search, Shield, Star } from "lucide-react";

import { DashboardStatGrid } from "@/components/registration/dashboard-stat-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageIntro } from "@/components/ui/page-intro";
import type { CompanyProductForm } from "@/lib/company-registration";

interface CompanyStarterDashboardProps {
    companyName: string;
    selectedPlanName?: string;
    selectedPlanPrice?: string;
    profileCompletion: number;
    submittedProducts: CompanyProductForm[];
    starterVisibleProducts: CompanyProductForm[];
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

export function CompanyStarterDashboard({
    companyName,
    selectedPlanName,
    selectedPlanPrice,
    profileCompletion,
    submittedProducts,
    starterVisibleProducts,
    starterCategoryCount,
    starterDatasheetCount,
    starterCertificationCount,
    companyLocation,
    onExploreDirectory,
    onGoHome,
    onReset,
}: CompanyStarterDashboardProps) {
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
                                                {selectedPlanName ?? "GB Starter Link"} - {selectedPlanPrice ?? "EUR 0"}
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

                            <DashboardStatGrid stats={starterStats} accent="brand" badgeLabel="Starter" />
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
                                    {[
                                        "Sustainable materials",
                                        "Energy solutions",
                                        "Water solutions",
                                        "Smart building",
                                        "Basic green construction categories",
                                    ].map((category) => (
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
