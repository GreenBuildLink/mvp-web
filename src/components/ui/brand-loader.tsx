import { BrandMark } from "@/components/ui/brand-mark";

type BrandLoaderProps = {
  title?: string;
  description?: string;
};

export function BrandLoader({
  title = "Loading GreenBuildLink",
  description = "Preparing the next step of your sustainable building experience.",
}: BrandLoaderProps) {
  return (
    <div className="ui-page-shell-centered relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient animate-gradient-x" />
      <div className="absolute inset-0">
        <div className="absolute left-[-4rem] top-16 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl sm:left-8 sm:h-64 sm:w-64" />
        <div className="absolute bottom-12 right-[-4rem] h-48 w-48 rounded-full bg-teal-300/20 blur-3xl sm:right-8 sm:h-72 sm:w-72" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center text-center">
        <div className="rounded-[2rem] border border-white/60 bg-white/65 p-5 shadow-2xl shadow-emerald-900/10 backdrop-blur-xl">
          <BrandMark
            className="h-20 w-20 rounded-[1.75rem] animate-float"
            iconClassName="h-10 w-10"
            dotClassName="h-5 w-5 -right-1 -top-1"
            pulse
          />
        </div>
        <div className="mt-8 max-w-md space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700/80">
            GreenBuildLink
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>
        <div className="mt-8 flex items-center gap-3 rounded-full border border-emerald-200/70 bg-white/70 px-5 py-3 text-sm text-emerald-700 shadow-lg shadow-emerald-500/10 backdrop-blur">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          Sustainable experience loading
        </div>
      </div>
    </div>
  );
}
