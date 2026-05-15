import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-emerald-50/50 dark:to-emerald-950/20 border-t border-emerald-100/50 dark:border-emerald-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <BrandMark className="h-12 w-12 shadow-xl shadow-emerald-500/25" />
              <span className="text-xl sm:text-2xl font-black tracking-tight">
                <span className="text-foreground">GreenBuild</span>
                <span className="text-emerald-500">Link</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The integrated platform linking green industries, designers, and
              workers for efficient and sustainable construction projects.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/company", label: "Green Industries" },
                { href: "/concepteur", label: "Green Designers" },
                { href: "/workers", label: "Green Workers" },
                { href: "/concepteur/new-project", label: "New Expertise" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {[
                "Green Practices",
                "Energy Simulation",
                "Environmental Expertise",
                "Building Certification",
              ].map((s) => (
                <li key={s}>
                  <span className="text-sm text-muted-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-emerald-500" />
                Tunis, Tunisia
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-emerald-500" />
                smida.designstudio@gmail.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-emerald-500" />
                +216 52 000 072
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-emerald-100/50 dark:bg-emerald-900/20" />

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © 2026 GreenBuildLink. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground sm:justify-end">
            <span className="hover:text-emerald-600 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-emerald-600 cursor-pointer transition-colors">
              Legal Notice
            </span>
            <span className="hover:text-emerald-600 cursor-pointer transition-colors">
              Terms of Use
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
