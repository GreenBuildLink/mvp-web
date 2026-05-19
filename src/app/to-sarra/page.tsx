import Link from "next/link";
import { ArrowRight, Building2, Compass, Eye, HardHat, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageIntro } from "@/components/ui/page-intro";
import { companySubscriptionPlans } from "@/lib/company-registration";
import { designerSubscriptionPlans } from "@/lib/designer-registration";
import { workerSubscriptionPlans } from "@/lib/worker-registration";

const previewSections = [
    {
        title: "Green Industries",
        description: "Open each final company dashboard directly from the selected plan, without filling the registration form.",
        icon: Building2,
        href: "/company/profile",
        plans: companySubscriptionPlans,
    },
    {
        title: "Green Designers",
        description: "Preview the final designer dashboards exactly where the plan decision normally routes after submission.",
        icon: Compass,
        href: "/concepteur/new-project",
        plans: designerSubscriptionPlans,
    },
    {
        title: "Green Workers",
        description: "Jump straight to the qualified and verified worker dashboards without going through the landing flow.",
        icon: HardHat,
        href: "/workers",
        plans: workerSubscriptionPlans,
    },
] as const;

function buildPreviewHref(route: string, plan: string) {
    return `${route}?preview=sarra&plan=${plan}`;
}

export default function ToSarraPage() {
    return (
        <div className="ui-page-shell">
            <div className="ui-page-container-6xl space-y-8">
                <PageIntro
                    badge="Client Review Mode"
                    icon={Eye}
                    title={
                        <>
                            Dashboard previews for <span className="gradient-text">Sarra</span>
                        </>
                    }
                    description="This temporary space opens the real post-plan dashboards directly, so feedback can happen without filling the multi-step forms."
                    className="mb-2"
                />

                <Card className="overflow-hidden border-0 shadow-2xl shadow-emerald-900/10">
                    <CardContent className="relative p-6 sm:p-8">
                        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-emerald-500/14 via-teal-500/10 to-sky-500/10" />
                        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div className="space-y-3">
                                <Badge className="ui-badge-brand mb-0 px-3 py-1 text-xs">
                                    Temporary preview flow
                                </Badge>
                                <h2 className="text-2xl font-bold sm:text-3xl">
                                    Open any dashboard as if the plan had already been chosen.
                                </h2>
                                <p className="max-w-3xl text-muted-foreground">
                                    These links bypass the forms and render the same final dashboard components used after registration. Normal users still keep the existing flow untouched.
                                </p>
                            </div>

                            <Link href="/">
                                <Button className="ui-btn-brand w-full px-8 lg:w-auto">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 xl:grid-cols-3">
                    {previewSections.map((section) => {
                        const Icon = section.icon;

                        return (
                            <Card key={section.title} className="border-0 shadow-xl">
                                <CardHeader className="space-y-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <CardTitle>{section.title}</CardTitle>
                                        <CardDescription>{section.description}</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {section.plans.map((plan) => {
                                        const PlanIcon = plan.icon;

                                        return (
                                            <Link key={plan.id} href={buildPreviewHref(section.href, plan.id)} className="block">
                                                <div className="rounded-2xl border border-emerald-100 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${plan.color} text-white shadow-sm`}>
                                                                    <PlanIcon className="h-4 w-4" />
                                                                </div>
                                                                <div>
                                                                    <p className="font-semibold">{plan.name}</p>
                                                                    <p className="text-sm text-muted-foreground">{plan.price}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {plan.features.slice(0, 2).map((feature) => (
                                                                    <Badge key={feature} variant="outline" className="rounded-full border-emerald-200 bg-emerald-50/70 px-3 py-1 text-emerald-700">
                                                                        {feature}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <ArrowRight className="mt-1 h-5 w-5 text-emerald-600" />
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <Card className="border border-dashed border-emerald-200 bg-emerald-50/40 shadow-sm">
                    <CardContent className="flex items-start gap-3 p-5 text-sm text-muted-foreground">
                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        The preview routes are meant to be temporary. Removing the `toSarra` page and the `preview=sarra` checks later will cleanly remove this review mode without touching the actual registration logic.
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
