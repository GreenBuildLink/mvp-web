import { BadgeCheck, BriefcaseBusiness, ClipboardCheck, GraduationCap, HardHat, MapPin, PlayCircle, TrendingUp, Wrench } from "lucide-react";

import { DashboardStatGrid } from "@/components/registration/dashboard-stat-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageIntro } from "@/components/ui/page-intro";
import {
    qualifiedAdvancedTrainingItems,
    qualifiedJobItems,
    qualifiedTrainingItems,
} from "@/lib/worker-registration";

interface WorkerQualifiedDashboardProps {
    name: string;
    trade: string;
    workerReadiness: number;
    yearsExperience: string;
    location: string;
    currentlyAvailable: string;
    tasksCount: number;
    selectedPlanName?: string;
    selectedPlanPrice?: string;
    onGoHome: () => void;
    onDone: () => void;
    onReset: () => void;
}

export function WorkerQualifiedDashboard({
    name,
    trade,
    workerReadiness,
    yearsExperience,
    location,
    currentlyAvailable,
    tasksCount,
    selectedPlanName,
    selectedPlanPrice,
    onGoHome,
    onDone,
    onReset,
}: WorkerQualifiedDashboardProps) {
    const qualifiedStats = [
        {
            title: "Professional profile",
            value: `${trade || "Worker trade"}`,
            description: "Skills, experience, location, and availability are structured to improve employability.",
            icon: Wrench,
        },
        {
            title: "Training access",
            value: "Starter worker modules",
            description: "Practical tutorials, safety modules, and sustainable construction basics are staged in this profile.",
            icon: PlayCircle,
        },
        {
            title: "Qualified badge",
            value: `${workerReadiness}% ready`,
            description: "Your profile completion supports improved visibility and recruitment priority.",
            icon: BadgeCheck,
        },
        {
            title: "Career development",
            value: "Progress tracking",
            description: "Skill progression and training history can grow from the details you submitted today.",
            icon: TrendingUp,
        },
    ];

    return (
        <div className="ui-page-shell">
            <div className="ui-page-container-6xl space-y-8">
                <PageIntro
                    accent="worker"
                    badge="GB Qualified Link"
                    icon={HardHat}
                    title={
                        <>
                            {name || "Your"} <span className="gradient-text">Qualified Dashboard</span>
                        </>
                    }
                    description="Your worker profile has been submitted into a qualified-level workspace focused on recognition, training, and employability."
                    className="mb-2"
                />

                <Card className="overflow-hidden border-0 shadow-2xl shadow-lime-900/10">
                    <CardContent className="relative p-6 sm:p-8">
                        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-lime-500/14 via-emerald-500/10 to-green-500/8" />
                        <div className="relative space-y-6">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-500 to-emerald-600 shadow-lg shadow-lime-500/25">
                                        <HardHat className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge className="ui-badge-worker mb-0 px-3 py-1 text-xs">
                                                Qualified access activated
                                            </Badge>
                                            <Badge variant="outline" className="rounded-full border-lime-200 bg-white/80 text-lime-700">
                                                {selectedPlanName ?? "GB Qualified Link"} - {selectedPlanPrice ?? "EUR 0"}
                                            </Badge>
                                        </div>
                                        <h2 className="text-2xl font-bold sm:text-3xl">
                                            Trained-worker recognition and employability are ready to grow.
                                        </h2>
                                        <p className="max-w-3xl text-muted-foreground">
                                            This qualified workspace highlights your professional profile, entry-level training access, and worker visibility while preserving the current GreenBuildLink worker experience.
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

                            <DashboardStatGrid stats={qualifiedStats} accent="worker" badgeLabel="Qualified" />
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
                    <div className="space-y-6">
                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <BriefcaseBusiness className="h-5 w-5 text-lime-600" />
                                    Professional Profile
                                </CardTitle>
                                <CardDescription>
                                    Qualified level organizes the core signals employers need to trust your worker profile.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-2xl border border-lime-100 p-4">
                                    <p className="text-sm text-muted-foreground">Skills</p>
                                    <p className="mt-1 text-lg font-semibold">{tasksCount > 0 ? `${tasksCount} selected` : "Skills profile ready"}</p>
                                </div>
                                <div className="rounded-2xl border border-lime-100 p-4">
                                    <p className="text-sm text-muted-foreground">Experience</p>
                                    <p className="mt-1 text-lg font-semibold">{yearsExperience || "Experience to be developed"}</p>
                                </div>
                                <div className="rounded-2xl border border-lime-100 p-4">
                                    <p className="text-sm text-muted-foreground">Location</p>
                                    <p className="mt-1 text-lg font-semibold">{location || "Location pending"}</p>
                                </div>
                                <div className="rounded-2xl border border-lime-100 p-4">
                                    <p className="text-sm text-muted-foreground">Availability</p>
                                    <p className="mt-1 text-lg font-semibold">{currentlyAvailable || "Availability pending"}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-lime-600" />
                                    Training
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {qualifiedTrainingItems.map((item) => (
                                    <div key={item} className="rounded-2xl border border-lime-100 p-4">
                                        <p className="font-medium">{item}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Wrench className="h-5 w-5 text-lime-600" />
                                    Advanced Training Access
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                {qualifiedAdvancedTrainingItems.map((item) => (
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
                                    <MapPin className="h-5 w-5 text-lime-600" />
                                    Job Opportunities
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {qualifiedJobItems.map((item) => (
                                    <div key={item} className="rounded-2xl border border-lime-100 p-4">
                                        <p className="font-medium">{item}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <ClipboardCheck className="h-5 w-5 text-lime-600" />
                                    Skill Certification System
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-2xl border border-lime-100 p-4">
                                    <p className="font-medium">Skill badges</p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Your training, tasks, and technical profile prepare the base for skill badge visibility.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-lime-100 p-4">
                                    <p className="font-medium">Evaluations</p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Worker evaluations can build on submitted skills, certifications, and site experience.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-lime-600" />
                                    Career Development
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-2xl border border-lime-100 p-4">
                                    <p className="font-medium">Skill progression tracking</p>
                                </div>
                                <div className="rounded-2xl border border-lime-100 p-4">
                                    <p className="font-medium">Training history record</p>
                                </div>
                                <div className="rounded-2xl border border-lime-100 bg-lime-50/60 p-4">
                                    <p className="font-medium">Qualified Worker badge</p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Improved visibility and recruitment priority grow from a stronger qualified profile.
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
