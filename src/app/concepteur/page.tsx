"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Compass, ArrowRight, CheckCircle2, Star } from "lucide-react";

const highlights = [
    "Personal profile for Green Designers",
    "Professional background and skills",
    "Green projects experience and objectives",
    "Availability, portfolio, and consent",
    "Subscription is selected at the final step",
];

export default function ConcepteurPage() {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <Badge className="mb-4 px-4 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 text-sm">
                        <Compass className="w-4 h-4 mr-2" />
                        Green Designers Space
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        Green Designers <span className="gradient-text">Registration</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Start your registration now. You will choose your subscription plan at the final step inside the form.
                    </p>
                </div>

                <Card className="border-0 shadow-xl overflow-hidden">
                    <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
                    <CardContent className="p-8 sm:p-10">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-4">What You Will Complete</h2>
                                <ul className="space-y-3">
                                    {highlights.map((item) => (
                                        <li key={item} className="flex items-start gap-2 text-muted-foreground">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="w-full md:w-auto">
                                <Link href="/concepteur/new-project">
                                    <Button className="w-full md:w-auto rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-6 shadow-lg shadow-emerald-500/20 text-base">
                                        <Star className="w-4 h-4 mr-2" />
                                        Start Registration
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
