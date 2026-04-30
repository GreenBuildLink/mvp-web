import Link from "next/link";
import {
  Building2,
  Compass,
  HardHat,
  Leaf,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Globe,
  ChevronRight,
  TreePine,
  Sun,
  Droplets,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  { value: "200+", label: "Partner Companies", icon: Building2 },
  { value: "1500+", label: "Experts", icon: Compass },
  { value: "95%", label: "Client Satisfaction", icon: Sparkles },
  { value: "40%", label: "CO2 Reduction", icon: Leaf },
];

const features = [
  {
    icon: Shield,
    title: "Certified Materials",
    description:
      "Access a catalogue of certified materials with verified and transparent environmental impact data.",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Zap,
    title: "Energy Performance",
    description:
      "Get personalized recommendations based on the specific characteristics of your project.",
    gradient: "from-teal-500 to-teal-600",
  },
  {
    icon: Globe,
    title: "Expert Network",
    description:
      "Connect with green construction professionals and specialists across the country.",
    gradient: "from-sky-500 to-sky-600",
  },
];

const ecoIcons = [
  { icon: TreePine, label: "Certified Wood", delay: "0s" },
  { icon: Sun, label: "Solar Energy", delay: "2s" },
  { icon: Droplets, label: "Water Management", delay: "4s" },
  { icon: Leaf, label: "Bio-sourced", delay: "1s" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated background */}
        <div className="absolute inset-0 hero-gradient animate-gradient-x" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/20 dark:bg-emerald-600/10 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300/20 dark:bg-teal-600/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "3s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-200/10 dark:bg-emerald-700/5 rounded-full blur-3xl"
          />
        </div>

        {/* Floating eco icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {ecoIcons.map((item, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-10 dark:opacity-5"
              style={{
                animationDelay: item.delay,
                top: `${20 + i * 20}%`,
                left: `${10 + i * 22}%`,
              }}
            >
              <item.icon className="w-16 h-16 text-emerald-600" />
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <Badge className="mb-6 px-5 py-2 rounded-full bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/30 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              GreenBuildLink : An Integrated Ecosystem for Green Building
            </Badge>
          </div>

          <h1 className="animate-fade-in-up stagger-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Build a{" "}
            <span className="gradient-text">Sustainable Future</span>
            <br />
            <span className="text-muted-foreground font-normal text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
              Starting with a Smart Link
            </span>
          </h1>

          <p className="animate-fade-in-up stagger-2 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
            Linking all stakeholders to deliver efficient and sustainable projects.
          </p>

          <div className="animate-fade-in-up stagger-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/consultation/request">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-base bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-700 hover:to-teal-700 transition-all duration-500 group"
              >
                <Compass className="w-5 h-5 mr-2" />
                Request Service
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/company">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-base border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/50 dark:border-emerald-800 dark:hover:bg-emerald-900/20 transition-all duration-500"
              >
                <Building2 className="w-5 h-5 mr-2" />
                Explore Green Industries
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up stagger-4 mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-5 group hover:scale-105 transition-transform duration-500"
              >
                <stat.icon className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-emerald-50/30 dark:to-emerald-950/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 text-sm">
              Our Solutions
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              All You Need for Your{" "}
              <span className="gradient-text">Green Project</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful tools to optimize every phase of your sustainable construction projects.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="group border-0 shadow-lg shadow-emerald-900/5 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-500 hover:-translate-y-2 bg-card/80 backdrop-blur-sm overflow-hidden"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Two Roles */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Link Up with the{" "}
              <span className="gradient-text">Green Community</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Whether you&apos;re a Green Industry, a Green Designer, or a skilled worker, GreenBuildLink is your link to sustainable success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Green Industries Card */}
            <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500" />
              <CardContent className="relative p-8 lg:p-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Green Industries
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Showcase your eco-friendly materials and connect with qualified designers and project owners.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Custom company profile",
                    "Certified product catalogue",
                    "Flexible subscription plans",
                    "Visibility with designers",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/company/profile">
                  <Button className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 group/btn">
                    Join as Industry
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Green Designers Card */}
            <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-sky-500/5 group-hover:from-teal-500/10 group-hover:to-sky-500/10 transition-all duration-500" />
              <CardContent className="relative p-8 lg:p-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-sky-600 flex items-center justify-center shadow-xl shadow-teal-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Compass className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Green Designers
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Launch your green construction projects and get personalized expert recommendations.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Free mode with full form",
                    "Browse green industries",
                    "Practice recommendations",
                    "AI expertise (coming soon)",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-teal-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/concepteur">
                  <Button className="rounded-full bg-gradient-to-r from-teal-600 to-sky-600 text-white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 group/btn">
                    Join as Designer
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Green Workers Card */}
            <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 to-emerald-500/5 group-hover:from-lime-500/10 group-hover:to-emerald-500/10 transition-all duration-500" />
              <CardContent className="relative p-8 lg:p-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-500 to-emerald-600 flex items-center justify-center shadow-xl shadow-lime-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <HardHat className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Green Workers
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Find green construction missions, grow your skills, and connect with industry leaders.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Access to green projects",
                    "Skill certification support",
                    "Network with designers",
                    "Career growth tools",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-lime-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/workers">
                  <Button className="rounded-full bg-gradient-to-r from-lime-600 to-emerald-600 text-white shadow-lg shadow-lime-500/20 hover:shadow-lime-500/40 group/btn">
                    Join as Worker
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-2xl shadow-emerald-900/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
            <CardContent className="relative p-10 sm:p-14 text-center">
              <Leaf className="w-12 h-12 mx-auto mb-6 text-emerald-200" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Your Sustainable Building Journey Starts Here
              </h2>
              <p className="text-emerald-100 mb-8 max-w-lg mx-auto text-lg">
                Be part of the growing community of professionals transforming construction sustainably with GreenBuildLink.
              </p>
              <Link href="/concepteur/new-project">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-6 text-base bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl hover:shadow-2xl transition-all duration-500 font-semibold"
                >
                  Start Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
