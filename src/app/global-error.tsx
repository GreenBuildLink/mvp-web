"use client";

import { useEffect } from "react";
import "./globals.css";
import { RouteErrorState } from "@/components/ui/route-error-state";

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalErrorPage({
  error,
  reset,
}: GlobalErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <RouteErrorState
          title="GreenBuildLink needs a fresh restart"
          description="A root-level issue interrupted the app shell. Retry to recover the session or return to the homepage."
          onRetry={reset}
          retryLabel="Restart experience"
        />
      </body>
    </html>
  );
}
