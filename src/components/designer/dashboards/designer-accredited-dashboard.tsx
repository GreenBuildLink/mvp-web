import { Bot, Briefcase, Crown, Globe, Target, Users } from "lucide-react";

import { DashboardStatGrid } from "@/components/registration/dashboard-stat-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageIntro } from "@/components/ui/page-intro";
import {
    accreditedAiItems,
    accreditedBadgeItems,
    accreditedOpportunityItems,
    accreditedRevenueItems,
} from "@/lib/designer-registration";

interface DesignerAccreditedDashboardProps {
    fullName: string;
    selectedPlanName?: string;
    selectedPlanPrice?: string;
    onGoHome: () => void;
    onDone: () => void;
    onReset: () => void;
}

export function DesignerAccreditedDashboard({
    fullName,
    selectedPlanName,
    selectedPlanPrice,
    onGoHome,
    onDone,
    onReset,
}: DesignerAccreditedDashboardProps) {
    const accreditedStats = [
        {
            title: "Premium visibility",
            value: "Priority placement",
            description: "Your accredited profile is staged for stronger placement, official badges, and featured spotlight opportunities.",
            icon: Crown,
        },
        {
            title: "Service export",
            value: "Global reach",
            description: "International projects, foreign clients, and mission matching become part of the accredited workspace.",
            icon: Globe,
        },
        {
            title: "Expert network",
            value: "Accredited access",
            description: "Join expert communities, technical panels, and strategic conversations around sustainability leadership.",
            icon: Users,
        },
        {
            title: "Advanced AI tools",
            value: "Audit-ready",
            description: "Use advanced pre-assessment, simulation, and ESG-oriented support in a higher-tier designer environment.",
            icon: Bot,
        },
    ];

    return (
        <div className="ui-page-shell">
            <div className="ui-page-container-6xl space-y-8">
                <PageIntro
                    badge="GB Accredited Link"
                    icon={Crown}
                    title={
                        <>
                            {fullName || "Your"} <span className="gradient-text">Accredited Dashboard</span>
                        </>
                    }
                    description="Your Green Designer profile has been submitted into a leadership-focused workspace designed for international visibility, expert positioning, and premium opportunities."
                    className="mb-2"
                />

                <Card className="overflow-hidden border-0 shadow-2xl shadow-teal-900/10">
                    <CardContent className="relative p-6 sm:p-8">
                        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-amber-500/16 via-teal-500/12 to-sky-500/10" />
                        <div className="relative space-y-6">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/25">
                                        <Crown className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge className="mb-0 rounded-full border-amber-200/60 bg-amber-100/80 px-3 py-1 text-xs text-amber-700">
                                                Accredited access activated
                                            </Badge>
                                            <Badge variant="outline" className="rounded-full border-amber-200 bg-white/80 text-amber-700">
                                                {selectedPlanName ?? "GB Accredited Link"} - {selectedPlanPrice ?? "EUR 79/month"}
                                            </Badge>
                                        </div>
                                        <h2 className="text-2xl font-bold sm:text-3xl">
                                            Leadership and international visibility are ready to expand.
                                        </h2>
                                        <p className="max-w-3xl text-muted-foreground">
                                            This accredited workspace is built for premium visibility, international service export, expert networking, advanced AI support, and additional revenue paths for top-tier green designers.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-3 lg:w-[360px] lg:grid-cols-1">
                                    <Button className="w-full rounded-full bg-gradient-to-r from-teal-600 to-sky-600 px-8 text-white shadow-lg shadow-teal-500/20 hover:from-teal-700 hover:to-sky-700 lg:w-full" onClick={onGoHome}>
                                        Go to Home
                                    </Button>
                                    <Button variant="outline" className="w-full rounded-full border-amber-200" onClick={onDone}>
                                        Done
                                    </Button>
                                    <Button variant="outline" className="w-full rounded-full" onClick={onReset}>
                                        Submit Another
                                    </Button>
                                </div>
                            </div>

                            <DashboardStatGrid stats={accreditedStats} accent="premium" badgeLabel="Accredited" />
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
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-3">
                                    {[
                                        "Priority profile placement",
                                        "Featured partner spotlight",
                                        "Official badge visibility",
                                    ].map((item) => (
                                        <div key={item} className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
                                            <p className="font-medium">{item}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {accreditedBadgeItems.map((item) => (
                                        <Badge key={item} variant="outline" className="rounded-full border-amber-200 bg-white px-3 py-1 text-amber-700">
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-amber-600" />
                                    Service Export & Expert Network
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-2xl border border-amber-100 p-4">
                                    <p className="font-medium">Access to international projects</p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        International missions and foreign client matching become part of your accredited exposure path.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-amber-100 p-4">
                                    <p className="font-medium">Accredited expert community</p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Connect through think tanks, technical panels, and high-level sustainability exchanges.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-amber-600" />
                                    Exclusive Opportunities
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {accreditedOpportunityItems.map((item) => (
                                    <div key={item} className="rounded-2xl border border-amber-100 p-4">
                                        <p className="font-medium">{item}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Bot className="h-5 w-5 text-amber-600" />
                                    Advanced AI Tools
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {accreditedAiItems.map((item) => (
                                    <div key={item} className="rounded-2xl border border-amber-100 p-4">
                                        <p className="font-medium">{item}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5 text-amber-600" />
                                    Additional Revenue Streams
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {accreditedRevenueItems.map((item) => (
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
