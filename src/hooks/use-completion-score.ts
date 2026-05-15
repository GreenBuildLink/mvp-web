import { useMemo } from "react";

interface CompletionScoreOptions {
    completed: number;
    total: number;
}

export function useCompletionScore({ completed, total }: CompletionScoreOptions) {
    return useMemo(() => {
        if (total <= 0) return 0;
        return Math.round((completed / total) * 100);
    }, [completed, total]);
}
