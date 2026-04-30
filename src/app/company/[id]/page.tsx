"use client";

import { use } from "react";
import { MOCK_COMPANIES } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Building2,
    MapPin,
    Globe,
    Mail,
    Phone,
    Package,
    Star,
    Leaf,
    Shield,
    ArrowLeft,
    CheckCircle2,
    ExternalLink,
} from "lucide-react";
import Link from "next/link";

const certLevelColors: Record<string, string> = {
    "A+": "bg-emerald-500 text-white",
    A: "bg-emerald-400 text-white",
    B: "bg-teal-400 text-white",
    C: "bg-amber-400 text-white",
    D: "bg-red-400 text-white",
};

export default function CompanyDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const company = MOCK_COMPANIES.find((c) => c.id === id);

    if (!company) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Entreprise non trouvée</h2>
                    <Link href="/company">
                        <Button variant="outline" className="rounded-full">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Retour aux entreprises
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <Link
                    href="/company"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-600 transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour aux entreprises
                </Link>

                {/* Company Header */}
                <div className="relative rounded-3xl overflow-hidden mb-8">
                    <div className="h-48 sm:h-56 bg-gradient-to-br from-emerald-500/15 to-teal-500/15 dark:from-emerald-500/10 dark:to-teal-500/10">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-400/10 via-transparent to-transparent" />
                    </div>
                    <div className="relative bg-card border border-border/50 rounded-b-3xl px-6 sm:px-10 pb-8">
                        <div className="flex flex-col sm:flex-row items-start gap-6 -mt-10">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-500/20 ring-4 ring-background shrink-0">
                                <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                            </div>
                            <div className="flex-1 pt-2">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                                    <h1 className="text-2xl sm:text-3xl font-bold">
                                        {company.name}
                                    </h1>
                                    <Badge
                                        className={`rounded-full w-fit ${company.subscription === "enterprise"
                                                ? "bg-amber-100 text-amber-700 border-amber-200"
                                                : company.subscription === "professional"
                                                    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                                    : "bg-gray-100 text-gray-600 border-gray-200"
                                            }`}
                                    >
                                        <Star className="w-3 h-3 mr-1" />
                                        Pack{" "}
                                        {company.subscription.charAt(0).toUpperCase() +
                                            company.subscription.slice(1)}
                                    </Badge>
                                </div>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {company.description}
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    {company.location && (
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4 text-emerald-500" />
                                            {company.location}
                                        </span>
                                    )}
                                    {company.website && (
                                        <span className="flex items-center gap-1.5">
                                            <Globe className="w-4 h-4 text-emerald-500" />
                                            {company.website}
                                        </span>
                                    )}
                                    {company.email && (
                                        <span className="flex items-center gap-1.5">
                                            <Mail className="w-4 h-4 text-emerald-500" />
                                            {company.email}
                                        </span>
                                    )}
                                    {company.phone && (
                                        <span className="flex items-center gap-1.5">
                                            <Phone className="w-4 h-4 text-emerald-500" />
                                            {company.phone}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Specialties */}
                {company.specialties && company.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {company.specialties.map((s) => (
                            <Badge
                                key={s}
                                variant="secondary"
                                className="rounded-full px-4 py-1.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-0"
                            >
                                <Leaf className="w-3.5 h-3.5 mr-1.5" />
                                {s}
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Products Section */}
                <Tabs defaultValue="grid" className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Package className="w-5 h-5 text-emerald-500" />
                            <h2 className="text-xl font-semibold">
                                Catalogue Produits ({company.products.length})
                            </h2>
                        </div>
                        <TabsList className="rounded-full bg-emerald-50 dark:bg-emerald-900/30">
                            <TabsTrigger value="grid" className="rounded-full">
                                Grille
                            </TabsTrigger>
                            <TabsTrigger value="list" className="rounded-full">
                                Liste
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* Grid View */}
                    <TabsContent value="grid">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {company.products.map((product, i) => (
                                <Card
                                    key={product.id}
                                    className="group border-0 shadow-lg shadow-emerald-900/5 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden animate-fade-in-up"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                    <CardContent className="p-0">
                                        <div className="h-3 bg-gradient-to-r from-emerald-500 to-teal-500" />
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-3">
                                                <Badge
                                                    variant="secondary"
                                                    className="rounded-full text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                                                >
                                                    {product.category}
                                                </Badge>
                                                <Badge
                                                    className={`rounded-full text-xs font-bold ${certLevelColors[product.certification?.level || ""] ||
                                                        "bg-gray-500 text-white"
                                                        }`}
                                                >
                                                    {product.certification?.level || "N/A"}
                                                </Badge>
                                            </div>

                                            <h3 className="text-lg font-semibold mb-2">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                                {product.description}
                                            </p>

                                            {/* Characteristics */}
                                            <div className="space-y-1.5 mb-4">
                                                {product.characteristics.slice(0, 3).map((char) => (
                                                    <div
                                                        key={char}
                                                        className="flex items-center gap-2 text-xs text-muted-foreground"
                                                    >
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                                        {char}
                                                    </div>
                                                ))}
                                            </div>

                                            {product.certification && (
                                            <div className="rounded-xl bg-emerald-50/50 dark:bg-emerald-900/10 p-3 mb-4">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Shield className="w-4 h-4 text-emerald-600" />
                                                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                                                        {product.certification.name}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground line-clamp-2">
                                                    {product.certification.description}
                                                </p>
                                            </div>
                                            )}

                                            {product.price && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-lg font-bold gradient-text">
                                                        {product.price}
                                                    </span>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="rounded-full text-emerald-600 hover:bg-emerald-50"
                                                    >
                                                        <ExternalLink className="w-4 h-4 mr-1" />
                                                        Détails
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* List View */}
                    <TabsContent value="list">
                        <div className="space-y-4">
                            {company.products.map((product, i) => (
                                <Card
                                    key={product.id}
                                    className="border-0 shadow-md shadow-emerald-900/5 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex flex-col lg:flex-row gap-6">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <h3 className="text-lg font-semibold">
                                                        {product.name}
                                                    </h3>
                                                    <Badge
                                                        variant="secondary"
                                                        className="rounded-full text-xs bg-emerald-50 text-emerald-700"
                                                    >
                                                        {product.category}
                                                    </Badge>
                                                    <Badge
                                                        className={`rounded-full text-xs font-bold ${certLevelColors[product.certification?.level || ""] ||
                                                            "bg-gray-500 text-white"
                                                            }`}
                                                    >
                                                        Impact {product.certification?.level || "N/A"}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    {product.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {product.characteristics.map((c) => (
                                                        <Badge
                                                            key={c}
                                                            variant="outline"
                                                            className="rounded-full text-xs border-emerald-200/50"
                                                        >
                                                            <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-500" />
                                                            {c}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end justify-between shrink-0">
                                                {product.price && (
                                                    <span className="text-xl font-bold gradient-text">
                                                        {product.price}
                                                    </span>
                                                )}
                                                {product.certification && (
                                                <div className="rounded-xl bg-emerald-50/50 dark:bg-emerald-900/10 p-3 mt-2 max-w-xs">
                                                    <div className="flex items-center gap-1.5 mb-1">
                                                        <Shield className="w-3.5 h-3.5 text-emerald-600" />
                                                        <span className="text-xs font-medium text-emerald-700">
                                                            {product.certification.name}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        {product.certification.description}
                                                    </p>
                                                </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
