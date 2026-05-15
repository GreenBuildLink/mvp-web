export type StepErrorMap = Record<string, string>;

export type StepErrorGetter = (stepNumber: number) => StepErrorMap;

interface StepValidationResult {
    step: number;
    errors: StepErrorMap;
}

export function findFirstStepValidationError(
    steps: number[],
    getStepErrors: StepErrorGetter,
): StepValidationResult | null {
    for (const step of steps) {
        const errors = getStepErrors(step);
        if (Object.keys(errors).length > 0) {
            return { step, errors };
        }
    }

    return null;
}
