import { BadgeCheck, BookOpen, Compass, Lightbulb, Newspaper, Star, Users } from "lucide-react";

import { DashboardStatGrid } from "@/components/registration/dashboard-stat-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageIntro } from "@/components/ui/page-intro";
import {
    discoveryExploreItems,
    discoveryInspirationItems,
    discoveryNetworkItems,
    discoveryNewsItems,
} from "@/lib/designer-registration";

interface DesignerDiscoveryDashboardProps {
    fullName: string;
    knowledgeLevel: string;
    profileReadiness: number;
    selectedPlanName?: string;
    selectedPlanPrice?: string;
    onGoHome: () => void;
    onDone: () => void;
    onReset: () => void;
}

export function DesignerDiscoveryDashboard({
    fullName,
    knowledgeLevel,
    profileReadiness,
    selectedPlanName,
    selectedPlanPrice,
    onGoHome,
    onDone,
    onReset,
}: DesignerDiscoveryDashboardProps) {
    const discoveryStats = [
        {
            title: "Explore sustainable solutions",
            value: "Library ready",
            description: "Discovery gives you access to green products, materials, innovative solutions, and case studies.",
            icon: BookOpen,
        },
        {
            title: "Networking",
            value: "4 connection paths",
            description: "Meet companies, consultants, experts, and fellow designers inside the ecosystem.",
            icon: Users,
        },
        {
            title: "Project inspiration",
            value: knowledgeLevel || "Discovery mode",
            description: "Browse certified projects, technical details, and green building trends for inspiration.",
            icon: Lightbulb,
        },
        {
            title: "Profile readiness",
            value: `${profileReadiness}%`,
            description: "Based on the portfolio, skills, and profile information you completed in the form.",
            icon: BadgeCheck,
        },
    ];

    return (
        <div className="ui-page-shell">
            <div className="ui-page-container-6xl space-y-8">
                <PageIntro
                    badge="GB Discovery Link"
                    icon={Star}
                    title={
                        <>
                            {fullName || "Your"} <span className="gradient-text">Discovery Dashboard</span>
                        </>
                    }
                    description="Your Green Designer profile has been submitted into a discovery-focused workspace built for exploration, inspiration, and networking."
                    className="mb-2"
                />

                <Card className="overflow-hidden border-0 shadow-2xl shadow-teal-900/10">
                    <CardContent className="relative p-6 sm:p-8">
                        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-teal-500/14 via-sky-500/10 to-emerald-500/8" />
                        <div className="relative space-y-6">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-sky-600 shadow-lg shadow-teal-500/25">
                                        <Compass className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge className="mb-0 rounded-full border-teal-200/60 bg-teal-100/80 px-3 py-1 text-xs text-teal-700">
                                                Discovery access activated
                                            </Badge>
                                            <Badge variant="outline" className="rounded-full border-teal-200 bg-white/80 text-teal-700">
                                                {selectedPlanName ?? "GB Discovery Link"} - {selectedPlanPrice ?? "EUR 0"}
                                            </Badge>
                                        </div>
                                        <h2 className="text-2xl font-bold sm:text-3xl">
                                            Discovery and networking are ready to begin.
                                        </h2>
                                        <p className="max-w-3xl text-muted-foreground">
                                            This designer workspace focuses on exploring sustainable solutions, building relationships, and shaping your professional profile inside the GreenBuildLink ecosystem.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-3 lg:w-[360px] lg:grid-cols-1">
                                    <Button className="w-full rounded-full bg-gradient-to-r from-teal-600 to-sky-600 px-8 text-white shadow-lg shadow-teal-500/20 hover:from-teal-700 hover:to-sky-700 lg:w-full" onClick={onGoHome}>
                                        Go to Home
                                    </Button>
                                    <Button variant="outline" className="w-full rounded-full border-teal-200" onClick={onDone}>
                                        Done
                                    </Button>
                                    <Button variant="outline" className="w-full rounded-full" onClick={onReset}>
                                        Submit Another
                                    </Button>
                                </div>
                            </div>

                            <DashboardStatGrid stats={discoveryStats} accent="designer" badgeLabel="Discovery" />
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
                    <Card className="border-0 shadow-xl">
                        <CardHeader className="space-y-2">
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-teal-600" />
                                Explore Sustainable Solutions
                            </CardTitle>
                            <CardDescription>
                                Discovery mode centers on learning through libraries, examples, and practical sustainable references.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {discoveryExploreItems.map((item) => (
                                    <Badge key={item} variant="outline" className="rounded-full border-teal-200 bg-teal-50/70 px-3 py-1 text-teal-700">
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-2xl border border-teal-100 p-4">
                                    <p className="font-medium">Project inspiration</p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Browse certified projects, technical references, and green design trends to shape your next ideas.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-teal-100 p-4">
                                    <p className="font-medium">Professional profile</p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Your portfolio, CV signals, skills, and areas of interest form the base of your discovery profile.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-teal-600" />
                                    Networking
                                </CardTitle>
                                <CardDescription>
                                    Connect with the right sustainability actors while building your presence in the ecosystem.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {discoveryNetworkItems.map((item) => (
                                    <Badge key={item} variant="outline" className="rounded-full border-teal-200 bg-white px-3 py-1">
                                        {item}
                                    </Badge>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Newspaper className="h-5 w-5 text-teal-600" />
                                    News Feed
                                </CardTitle>
                                <CardDescription>
                                    Stay current with sustainable construction updates and events relevant to green designers.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {discoveryNewsItems.map((item) => (
                                    <div key={item} className="rounded-2xl border border-teal-100 p-4">
                                        <p className="font-medium">{item}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Lightbulb className="h-5 w-5 text-teal-600" />
                                    Inspiration Sources
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {discoveryInspirationItems.map((item) => (
                                    <div key={item} className="rounded-2xl border border-teal-100 p-4">
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
