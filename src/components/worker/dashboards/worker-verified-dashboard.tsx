import { BadgeCheck, Bot, BriefcaseBusiness, ShieldCheck, TrendingUp } from "lucide-react";

import { DashboardStatGrid } from "@/components/registration/dashboard-stat-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageIntro } from "@/components/ui/page-intro";
import { verifiedProjectItems } from "@/lib/worker-registration";

interface WorkerVerifiedDashboardProps {
    name: string;
    workerReadiness: number;
    selectedPlanName?: string;
    selectedPlanPrice?: string;
    onGoHome: () => void;
    onDone: () => void;
    onReset: () => void;
}

export function WorkerVerifiedDashboard({
    name,
    workerReadiness,
    selectedPlanName,
    selectedPlanPrice,
    onGoHome,
    onDone,
    onReset,
}: WorkerVerifiedDashboardProps) {
    const verifiedStats = [
        {
            title: "Verified badge",
            value: "Trust-focused profile",
            description: "Field validation and project-history verification strengthen confidence in your worker profile.",
            icon: ShieldCheck,
        },
        {
            title: "Premium projects",
            value: "Priority access",
            description: "Verified workers can be surfaced toward certified and higher-value project opportunities.",
            icon: BriefcaseBusiness,
        },
        {
            title: "Reputation system",
            value: "Score-ready",
            description: "Client ratings, site feedback, and quality scoring can build over time from completed work.",
            icon: BadgeCheck,
        },
        {
            title: "Smart recommendations",
            value: `${workerReadiness}% match-ready`,
            description: "Your submitted location, trade, and skills improve project matching and income opportunities.",
            icon: Bot,
        },
    ];

    return (
        <div className="ui-page-shell">
            <div className="ui-page-container-6xl space-y-8">
                <PageIntro
                    accent="worker"
                    badge="GB Verified Link"
                    icon={ShieldCheck}
                    title={
                        <>
                            {name || "Your"} <span className="gradient-text">Verified Dashboard</span>
                        </>
                    }
                    description="Your worker profile has been submitted into a verified-level workspace built for trust, quality assurance, and higher-value mission access."
                    className="mb-2"
                />

                <Card className="overflow-hidden border-0 shadow-2xl shadow-lime-900/10">
                    <CardContent className="relative p-6 sm:p-8">
                        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-lime-500/16 via-emerald-500/12 to-green-500/8" />
                        <div className="relative space-y-6">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-500 to-emerald-600 shadow-lg shadow-lime-500/25">
                                        <ShieldCheck className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge className="ui-badge-worker mb-0 px-3 py-1 text-xs">
                                                Verified access activated
                                            </Badge>
                                            <Badge variant="outline" className="rounded-full border-lime-200 bg-white/80 text-lime-700">
                                                {selectedPlanName ?? "GB Verified Link"} - {selectedPlanPrice ?? "EUR 19/month"}
                                            </Badge>
                                        </div>
                                        <h2 className="text-2xl font-bold sm:text-3xl">
                                            Trust, quality assurance, and higher-value mission access are now staged.
                                        </h2>
                                        <p className="max-w-3xl text-muted-foreground">
                                            This verified workspace builds on your worker profile with trust signals, reputation readiness, premium project exposure, and smarter recommendations for better-paid opportunities.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-3 lg:w-[360px] lg:grid-cols-1">
                                    <Button className="ui-btn-worker w-full" onClick={onGoHome}>
                                        Go to Home
                                    </Button>
                                    <Button variant="outline" className="w-full rounded-full border-lime-200" onClick={onDone}>
                                        Done
                                    </Button>
                                    <Button variant="outline" className="w-full rounded-full" onClick={onReset}>
                                        Submit Another
                                    </Button>
                                </div>
                            </div>

                            <DashboardStatGrid stats={verifiedStats} accent="worker" badgeLabel="Verified" />
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
                    <div className="space-y-6">
                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5 text-lime-600" />
                                    Verified Worker Badge
                                </CardTitle>
                                <CardDescription>
                                    Verified level adds trust-building signals backed by inspection and project-history validation.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-2xl border border-lime-100 p-4">
                                    <p className="font-medium">Validation after field inspection</p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Worker verification is positioned around field review and stronger quality assurance signals.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-lime-100 p-4">
                                    <p className="font-medium">Verified project history</p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Completed work can build into a more trusted profile with clearer project history proof points.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <BriefcaseBusiness className="h-5 w-5 text-lime-600" />
                                    Priority Access to Premium Projects
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {verifiedProjectItems.map((item) => (
                                    <div key={item} className="rounded-2xl border border-lime-100 p-4">
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
                                    <BadgeCheck className="h-5 w-5 text-lime-600" />
                                    Reputation System
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    "Client ratings",
                                    "Site feedback",
                                    "Quality score",
                                ].map((item) => (
                                    <div key={item} className="rounded-2xl border border-lime-100 p-4">
                                        <p className="font-medium">{item}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Bot className="h-5 w-5 text-lime-600" />
                                    Smart Recommendations
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-2xl border border-lime-100 p-4">
                                    <p className="font-medium">AI matching with suitable projects</p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Verified workers can be aligned more accurately with project needs, profile strengths, and location fit.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-lime-100 bg-lime-50/60 p-4">
                                    <p className="font-medium">Improved income opportunities</p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Access to higher-paid missions grows as trust, ratings, and verification signals improve.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-lime-600" />
                                    Income Growth
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-2xl border border-lime-100 p-4">
                                    <p className="font-medium">Access to higher-paid missions</p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Verified workers are positioned for stronger trust and premium opportunity visibility.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
