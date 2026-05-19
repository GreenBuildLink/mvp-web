"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/ui/brand-mark";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
    Building2,
    ChevronDown,
    Compass,
    HardHat,
    Home,
    LayoutDashboard,
    Leaf,
    Menu,
    X,
} from "lucide-react";

const navLinks = [
    { href: "/", label: "Home", icon: Home },
];

const sarraLink = { href: "/to-sarra", label: "toSarra", icon: LayoutDashboard };

const greenHubLinks = [
    { href: "/company", label: "Green Industries", icon: Building2 },
    { href: "/concepteur", label: "Green Designers", icon: Compass },
    { href: "/workers", label: "Green Workers", icon: HardHat },
];

export function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [mobileHubOpen, setMobileHubOpen] = useState(false);
    const isGreenHubActive = greenHubLinks.some((link) => pathname === link.href);
    const isSarraActive = pathname.startsWith(sarraLink.href);
    const SarraIcon = sarraLink.icon;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-lg shadow-emerald-900/5 border-b border-emerald-100/50 dark:border-emerald-900/20"
                    : "bg-transparent"
                }`}
        >
            <div className="w-full px-3 sm:px-6 lg:px-24">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5 group">
                        <BrandMark className="h-10 w-10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-emerald-500/50 sm:h-12 sm:w-12" />
                        <span className="truncate text-lg sm:text-2xl font-black tracking-tight">
                            <span className="text-foreground">GreenBuild</span>
                            <span className="text-emerald-500">Link</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            const Icon = link.icon;
                            return (
                                <Link key={link.href} href={link.href}>
                                    <Button
                                        variant={isActive ? "default" : "ghost"}
                                        className={`gap-2 rounded-full px-5 transition-all duration-300 ${isActive
                                                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                                                : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-muted-foreground hover:text-emerald-700 dark:hover:text-emerald-400"
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {link.label}
                                    </Button>
                                </Link>
                            );
                        })}

                        <Link href={sarraLink.href}>
                            <Button
                                variant={isSarraActive ? "default" : "ghost"}
                                className={`gap-2 rounded-full px-5 transition-all duration-300 ${isSarraActive
                                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                                        : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-muted-foreground hover:text-emerald-700 dark:hover:text-emerald-400"
                                    }`}
                            >
                                <SarraIcon className="w-4 h-4" />
                                {sarraLink.label}
                            </Button>
                        </Link>

                        <div className="relative group">
                            <Button
                                variant={isGreenHubActive ? "default" : "ghost"}
                                className={`gap-2 rounded-full px-5 transition-all duration-300 ${isGreenHubActive
                                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                                        : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-muted-foreground hover:text-emerald-700 dark:hover:text-emerald-400"
                                    }`}
                            >
                                <Leaf className="w-4 h-4" />
                                Green Hub
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                            <div className="absolute top-full left-0 mt-2 min-w-60 rounded-2xl border border-emerald-100/70 dark:border-emerald-900/30 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-xl p-2 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-300">
                                {greenHubLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    const Icon = link.icon;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                                    ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 dark:text-emerald-400 font-medium"
                                                    : "text-muted-foreground hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-foreground"
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </nav>

                    {/* CTA buttons desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/company/profile">
                            <Button
                                variant="outline"
                                className="rounded-full border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30 transition-all duration-300"
                            >
                                <Building2 className="w-4 h-4 mr-2" />
                                Enterprise Space
                            </Button>
                        </Link>
                        <Link href="/consultation/request">
                            <Button className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-700 hover:to-teal-700 transition-all duration-300">
                                <Compass className="w-4 h-4 mr-2" />
                                Request Consultation
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile menu */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full max-w-sm p-0">
                            <SheetTitle className="sr-only">Navigation</SheetTitle>
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between p-5 border-b border-emerald-100 dark:border-emerald-900/30">
                                    <Link href="/" className="flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
                                        <BrandMark className="h-10 w-10 rounded-xl shadow-lg shadow-emerald-500/25" />
                                        <span className="truncate text-lg sm:text-xl font-black tracking-tight">
                                            <span className="text-foreground">GreenBuild</span><span className="text-emerald-500">Link</span>
                                        </span>
                                    </Link>
                                    <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setOpen(false)}>
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                                <nav className="flex-1 p-4 space-y-1">
                                    {navLinks.map((link) => {
                                        const isActive = pathname === link.href;
                                        const Icon = link.icon;
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => setOpen(false)}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                                        ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 dark:text-emerald-400 font-medium"
                                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                    }`}
                                            >
                                                <Icon className="w-5 h-5" />
                                                {link.label}
                                            </Link>
                                        );
                                    })}
                                    <Link
                                        href={sarraLink.href}
                                        onClick={() => setOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isSarraActive
                                                ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 dark:text-emerald-400 font-medium"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            }`}
                                    >
                                        <SarraIcon className="w-5 h-5" />
                                        {sarraLink.label}
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setMobileHubOpen((prev) => !prev)}
                                        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isGreenHubActive
                                                ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 dark:text-emerald-400 font-medium"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            }`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <Leaf className="w-5 h-5" />
                                            Green Hub
                                        </span>
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileHubOpen ? "rotate-180" : ""}`} />
                                    </button>
                                    {mobileHubOpen && (
                                        <div className="pl-4 space-y-1">
                                            {greenHubLinks.map((link) => {
                                                const isActive = pathname === link.href;
                                                const Icon = link.icon;
                                                return (
                                                    <Link
                                                        key={link.href}
                                                        href={link.href}
                                                        onClick={() => {
                                                            setOpen(false);
                                                            setMobileHubOpen(false);
                                                        }}
                                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                                                ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 dark:text-emerald-400 font-medium"
                                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                            }`}
                                                    >
                                                        <Icon className="w-5 h-5" />
                                                        {link.label}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </nav>
                                <div className="p-4 space-y-3 border-t border-emerald-100 dark:border-emerald-900/30">
                                    <Link href="/company/profile" onClick={() => setOpen(false)}>
                                        <Button variant="outline" className="w-full rounded-xl gap-2 justify-center border-emerald-200">
                                            <Building2 className="w-4 h-4" />
                                            Enterprise Space
                                        </Button>
                                    </Link>
                                    <Link href="/consultation/request" onClick={() => setOpen(false)}>
                                        <Button className="w-full rounded-xl gap-2 justify-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white mt-2">
                                            <Compass className="w-4 h-4" />
                                            Request Consultation
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
