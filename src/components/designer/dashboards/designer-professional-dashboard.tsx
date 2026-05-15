import { BadgeCheck, Bot, Briefcase, GraduationCap, Users, Zap } from "lucide-react";

import { DashboardStatGrid } from "@/components/registration/dashboard-stat-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageIntro } from "@/components/ui/page-intro";
import {
    professionalAiItems,
    professionalJobItems,
    professionalLibraryItems,
    professionalPartnershipItems,
    professionalTrainingItems,
} from "@/lib/designer-registration";

interface DesignerProfessionalDashboardProps {
    fullName: string;
    profileReadiness: number;
    selectedPlanName?: string;
    selectedPlanPrice?: string;
    onGoHome: () => void;
    onDone: () => void;
    onReset: () => void;
}

export function DesignerProfessionalDashboard({
    fullName,
    profileReadiness,
    selectedPlanName,
    selectedPlanPrice,
    onGoHome,
    onDone,
    onReset,
}: DesignerProfessionalDashboardProps) {
    const professionalStats = [
        {
            title: "Job opportunities",
            value: "Career access",
            description: "Green jobs, freelance missions, and consulting opportunities are staged in one professional workspace.",
            icon: Briefcase,
        },
        {
            title: "Partnerships",
            value: "Project-ready",
            description: "Collaborate with companies and multidisciplinary teams on greener projects.",
            icon: Users,
        },
        {
            title: "AI access",
            value: "5 design tools",
            description: "Use advanced guidance for energy, materials, daylight, certifications, and concept generation.",
            icon: Bot,
        },
        {
            title: "Green Professional badge",
            value: `${profileReadiness}% ready`,
            description: "Your submitted skills and experience build the foundation for sustainable profile validation.",
            icon: BadgeCheck,
        },
    ];

    return (
        <div className="ui-page-shell">
            <div className="ui-page-container-6xl space-y-8">
                <PageIntro
                    badge="GB Professional Link"
                    icon={Zap}
                    title={
                        <>
                            {fullName || "Your"} <span className="gradient-text">Professional Dashboard</span>
                        </>
                    }
                    description="Your Green Designer profile has been submitted into a professional workspace focused on development, collaboration, and access to real opportunities."
                    className="mb-2"
                />

                <Card className="overflow-hidden border-0 shadow-2xl shadow-teal-900/10">
                    <CardContent className="relative p-6 sm:p-8">
                        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-teal-500/14 via-sky-500/12 to-emerald-500/8" />
                        <div className="relative space-y-6">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-sky-600 shadow-lg shadow-teal-500/25">
                                        <Zap className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge className="mb-0 rounded-full border-teal-200/60 bg-teal-100/80 px-3 py-1 text-xs text-teal-700">
                                                Professional access activated
                                            </Badge>
                                            <Badge variant="outline" className="rounded-full border-teal-200 bg-white/80 text-teal-700">
                                                {selectedPlanName ?? "GB Professional Link"} - {selectedPlanPrice ?? "EUR 29/month"}
                                            </Badge>
                                        </div>
                                        <h2 className="text-2xl font-bold sm:text-3xl">
                                            Professional development and opportunity access are ready to grow.
                                        </h2>
                                        <p className="max-w-3xl text-muted-foreground">
                                            This workspace expands your designer profile into jobs, partnerships, AI assistance, training, and a stronger technical library while keeping the current GreenBuildLink tone.
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

                            <DashboardStatGrid stats={professionalStats} accent="designer" badgeLabel="Professional" />
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
                    <div className="space-y-6">
                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5 text-teal-600" />
                                    Job Opportunities
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-3">
                                {professionalJobItems.map((item) => (
                                    <div key={item} className="rounded-2xl border border-teal-100 p-4">
                                        <p className="font-medium">{item}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-teal-600" />
                                    Partnerships & Collaboration
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-3">
                                {professionalPartnershipItems.map((item) => (
                                    <div key={item} className="rounded-2xl border border-teal-100 p-4">
                                        <p className="font-medium">{item}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-teal-600" />
                                    Training & Technical Library
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-3">
                                    {professionalTrainingItems.map((item) => (
                                        <div key={item} className="rounded-2xl border border-teal-100 p-4">
                                            <p className="font-medium">{item}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {professionalLibraryItems.map((item) => (
                                        <Badge key={item} variant="outline" className="rounded-full border-teal-200 bg-teal-50/70 px-3 py-1 text-teal-700">
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Bot className="h-5 w-5 text-teal-600" />
                                    AI Access
                                </CardTitle>
                                <CardDescription>
                                    Professional Link introduces guided design intelligence for sustainable decision-making.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {professionalAiItems.map((item) => (
                                    <div key={item} className="rounded-2xl border border-teal-100 p-4">
                                        <p className="font-medium">{item}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <BadgeCheck className="h-5 w-5 text-teal-600" />
                                    Green Professional Badge
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-4">
                                    <p className="font-medium">Validation of sustainable skills</p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Your expertise field, certifications, skills, and sustainable design experience prepare your professional validation path.
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
