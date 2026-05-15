import { BarChart3, Crown, Globe, Shield, Sparkles, Target } from "lucide-react";

import { DashboardStatGrid } from "@/components/registration/dashboard-stat-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageIntro } from "@/components/ui/page-intro";

interface CompanyPremiumDashboardProps {
    companyName: string;
    selectedPlanName?: string;
    selectedPlanPrice?: string;
    submittedProductCount: number;
    onExploreDirectory: () => void;
    onGoHome: () => void;
    onReset: () => void;
}

export function CompanyPremiumDashboard({
    companyName,
    selectedPlanName,
    selectedPlanPrice,
    submittedProductCount,
    onExploreDirectory,
    onGoHome,
    onReset,
}: CompanyPremiumDashboardProps) {
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
            value: `${submittedProductCount} signal sets`,
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
                                                {selectedPlanName ?? "GB Premium Link"} - {selectedPlanPrice ?? "EUR 129/month"}
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
                                    <Button className="ui-btn-brand w-full" onClick={onExploreDirectory}>
                                        Explore Directory
                                    </Button>
                                    <Button variant="outline" className="w-full rounded-full border-amber-200" onClick={onGoHome}>
                                        Go to Home
                                    </Button>
                                    <Button variant="outline" className="w-full rounded-full" onClick={onReset}>
                                        Submit Another
                                    </Button>
                                </div>
                            </div>

                            <DashboardStatGrid stats={premiumStats} accent="premium" badgeLabel="Premium" />
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
                                {[
                                    {
                                        label: "Search ranking",
                                        value: "Top ranking",
                                        description: "Premium listings are staged for stronger placement in relevant discovery surfaces.",
                                    },
                                    {
                                        label: "Homepage feature",
                                        value: "Featured placement",
                                        description: "This tier supports elevated brand placement across premium GreenBuildLink moments.",
                                    },
                                    {
                                        label: "Partner status",
                                        value: "Premium Green Partner",
                                        description: "A dedicated premium badge strengthens trust and leadership positioning.",
                                    },
                                ].map((item) => (
                                    <div key={item.label} className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
                                        <p className="text-sm text-muted-foreground">{item.label}</p>
                                        <p className="mt-1 text-2xl font-bold">{item.value}</p>
                                        <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                ))}
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
                                {[
                                    "Deep performance insights",
                                    "Market positioning analysis",
                                    "Competitor benchmarking",
                                    "Conversion tracking",
                                ].map((item) => (
                                    <div key={item} className="rounded-2xl border border-amber-100 p-4">
                                        <p className="font-medium">{item}</p>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {item === "Deep performance insights"
                                                ? "Designed for a richer reading of catalog attention, engagement depth, and asset interaction quality."
                                                : item === "Market positioning analysis"
                                                    ? "Helps frame how your company is represented across sustainability-focused categories and opportunities."
                                                    : item === "Competitor benchmarking"
                                                        ? "Premium tier anticipates comparison-oriented insight for stronger strategic decisions."
                                                        : "Tracks how visibility, downloads, and outreach convert into meaningful opportunity progression."}
                                        </p>
                                    </div>
                                ))}
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
                                {[
                                    "Priority project matching",
                                    "International client exposure",
                                    "Strategic partnership recommendations",
                                ].map((item) => (
                                    <div key={item} className="rounded-2xl border border-amber-100 p-4">
                                        <p className="font-medium">{item}</p>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {item === "Priority project matching"
                                                ? "Premium submissions are staged for stronger alignment with higher-value green construction opportunities."
                                                : item === "International client exposure"
                                                    ? "Richer certifications, references, and catalog depth support global discoverability."
                                                    : "Partnership suggestions can be guided by product fit, sustainability value, and market direction."}
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
                                {[
                                    "International tenders",
                                    "Export acceleration programs (B2B opportunities)",
                                    "Strategic global partnerships",
                                ].map((item) => (
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
                                {[
                                    "Sponsored campaigns",
                                    "Product spotlight features",
                                    "Co-branding opportunities with Green BuildLink",
                                ].map((item) => (
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
