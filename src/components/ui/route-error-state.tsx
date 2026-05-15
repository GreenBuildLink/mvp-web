import Link from "next/link";
import { AlertTriangle, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/ui/brand-mark";

type RouteErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export function RouteErrorState({
  title = "Something interrupted the experience",
  description = "The page could not finish loading right now. You can retry the request or head back to the home page.",
  onRetry,
  retryLabel = "Try again",
}: RouteErrorStateProps) {
  return (
    <div className="ui-page-shell-centered relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0">
        <div className="absolute left-[-5rem] top-12 h-48 w-48 rounded-full bg-emerald-300/15 blur-3xl sm:left-6 sm:h-72 sm:w-72" />
        <div className="absolute bottom-8 right-[-4rem] h-56 w-56 rounded-full bg-teal-300/15 blur-3xl sm:right-10 sm:h-80 sm:w-80" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <div className="overflow-hidden rounded-[2rem] border border-emerald-100/80 bg-card/85 shadow-2xl shadow-emerald-900/10 backdrop-blur-xl">
          <div className="relative p-8 sm:p-10">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-300/20 to-transparent blur-2xl" />
            <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-gradient-to-tr from-teal-300/20 to-transparent blur-2xl" />

            <div className="relative flex flex-col items-center text-center">
              <BrandMark
                className="h-[4.5rem] w-[4.5rem] rounded-[1.6rem] sm:h-20 sm:w-20 sm:rounded-[1.75rem]"
                iconClassName="h-9 w-9 sm:h-10 sm:w-10"
                dotClassName="h-5 w-5 -right-1 -top-1"
                pulse
              />

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/80 px-4 py-2 text-sm font-medium text-emerald-700">
                <AlertTriangle className="h-4 w-4" />
                GreenBuildLink recovery screen
              </div>

              <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>

              <div className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
                {onRetry ? (
                  <Button
                    type="button"
                    className="ui-btn-brand w-full px-8 sm:w-auto"
                    onClick={onRetry}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    {retryLabel}
                  </Button>
                ) : null}

                <Link href="/" className="w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-full border-emerald-200 px-8 hover:border-emerald-400 hover:bg-emerald-50/70 sm:w-auto"
                  >
                    Back to home
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
