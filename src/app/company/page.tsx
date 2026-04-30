"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_COMPANIES } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Building2,
    Search,
    MapPin,
    Package,
    Star,
    ArrowRight,
    Filter,
    Leaf,
} from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/types";

export default function CompanyListPage() {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    const filteredCompanies = MOCK_COMPANIES.filter((company) => {
        const matchesSearch =
            company.name.toLowerCase().includes(search.toLowerCase()) ||
            company.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
            categoryFilter === "all" ||
            company.products.some((p) => p.category === categoryFilter);
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <Badge className="mb-4 px-4 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 text-sm">
                        <Building2 className="w-4 h-4 mr-2" />
                        Green Marketplace
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        Your Gateway to{" "}
                        <span className="gradient-text">Green Building Solutions</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Discover innovative partners driving the future of sustainable construction.
                    </p>
                </div>

                {/* Filters */}
                <div className="glass-card rounded-2xl p-4 sm:p-6 mb-10">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                placeholder="Search a company..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 rounded-xl border-emerald-200/50 dark:border-emerald-900/30 bg-background/50 h-12"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Filter className="w-5 h-5 text-muted-foreground hidden sm:block" />
                            <Select
                                value={categoryFilter}
                                onValueChange={setCategoryFilter}
                            >
                                <SelectTrigger className="w-full sm:w-[220px] rounded-xl border-emerald-200/50 dark:border-emerald-900/30 bg-background/50 h-12">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All categories</SelectItem>
                                    {PRODUCT_CATEGORIES.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Results count */}
                <p className="text-sm text-muted-foreground mb-6">
                    {filteredCompanies.length} {filteredCompanies.length > 1 ? "companies" : "company"} found
                </p>

                {/* Company Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredCompanies.map((company, i) => (
                        <Card
                            key={company.id}
                            className="group border-0 shadow-lg shadow-emerald-900/5 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden animate-fade-in-up"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <CardContent className="p-0">
                                {/* Company header gradient */}
                                <div className="h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-400/10 via-transparent to-transparent" />
                                    <div className="absolute top-4 right-4">
                                        <Badge
                                            className={`rounded-full text-xs font-medium ${company.subscription === "enterprise"
                                                    ? "bg-amber-100 text-amber-700 border-amber-200"
                                                    : company.subscription === "professional"
                                                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                                        : "bg-gray-100 text-gray-600 border-gray-200"
                                                }`}
                                        >
                                            <Star className="w-3 h-3 mr-1" />
                                            {company.subscription === "enterprise"
                                                ? "Enterprise"
                                                : company.subscription === "professional"
                                                    ? "Professional"
                                                    : "Starter"}
                                        </Badge>
                                    </div>
                                    <div className="absolute bottom-0 left-6 translate-y-1/2">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-500/20 ring-4 ring-background">
                                            <Building2 className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-12 pb-6 px-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-bold">{company.name}</h3>
                                    </div>

                                    {company.location && (
                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                                            <MapPin className="w-4 h-4 text-emerald-500" />
                                            {company.location}
                                        </div>
                                    )}

                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                                        {company.description}
                                    </p>

                                    {/* Specialties */}
                                    {company.specialties && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {company.specialties.map((s) => (
                                                <Badge
                                                    key={s}
                                                    variant="secondary"
                                                    className="rounded-full text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-0"
                                                >
                                                    <Leaf className="w-3 h-3 mr-1" />
                                                    {s}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-4 border-t border-emerald-100/50 dark:border-emerald-900/20">
                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <Package className="w-4 h-4 text-emerald-500" />
                                            {company.products.length} {company.products.length > 1 ? "products" : "product"}
                                        </div>
                                        <Link href={`/company/${company.id}`}>
                                            <Button
                                                variant="ghost"
                                                className="rounded-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20 group/btn"
                                            >
                                                View profile
                                                <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredCompanies.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                            No companies found
                        </h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search criteria.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
