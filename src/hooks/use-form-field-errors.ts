import { useState } from "react";

import { cn } from "@/lib/utils";

export type FormFieldErrors = Record<string, string>;

export function useFormFieldErrors() {
    const [fieldErrors, setFieldErrors] = useState<FormFieldErrors>({});

    const clearFieldError = (field: string) => {
        setFieldErrors((prev) => {
            if (!prev[field]) return prev;
            const next = { ...prev };
            delete next[field];
            return next;
        });
    };

    const getFieldClass = (field: string, defaultClassName: string) =>
        cn(
            defaultClassName,
            fieldErrors[field] && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
        );

    return {
        fieldErrors,
        setFieldErrors,
        clearFieldError,
        getFieldClass,
    };
}
