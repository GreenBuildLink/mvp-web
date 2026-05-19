"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, Loader2 } from "lucide-react";

import { CompanyBusinessDashboard } from "@/components/company/dashboards/company-business-dashboard";
import { CompanyPremiumDashboard } from "@/components/company/dashboards/company-premium-dashboard";
import { CompanyStarterDashboard } from "@/components/company/dashboards/company-starter-dashboard";
import { CompanyProfilePlanStep } from "@/components/company/profile/company-profile-plan-step";
import { CompanyProfileStepOne } from "@/components/company/profile/company-profile-step-one";
import { CompanyProfileStepTwo } from "@/components/company/profile/company-profile-step-two";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageIntro } from "@/components/ui/page-intro";
import { StepProgress } from "@/components/ui/step-progress";
import { useCompletionScore } from "@/hooks/use-completion-score";
import { useFormFieldErrors } from "@/hooks/use-form-field-errors";
import { usePlanSelection } from "@/hooks/use-plan-selection";
import {
    companySteps,
    companySubscriptionPlans,
    CompanyProductForm,
    emptyCompanyProduct,
} from "@/lib/company-registration";
import { findFirstStepValidationError } from "@/lib/registration/step-validation";

function toggleValue(value: string, items: string[], setItems: (next: string[]) => void) {
    setItems(items.includes(value) ? items.filter((item) => item !== value) : [...items, value]);
}

function hasText(value: string) {
    return value.trim().length > 0;
}

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function productHasAnyValue(product: CompanyProductForm) {
    return (
        hasText(product.name) ||
        hasText(product.category) ||
        hasText(product.description) ||
        hasText(product.keyFeatures) ||
        hasText(product.scopeOfWorks) ||
        product.certifications.length > 0 ||
        hasText(product.otherCertification) ||
        hasText(product.technicalDatasheet) ||
        hasText(product.testReports) ||
        product.useCases.length > 0 ||
        hasText(product.exampleProjects) ||
        hasText(product.clientsReferences) ||
        product.availableMarkets.length > 0 ||
        hasText(product.priceRange) ||
        product.salesModels.length > 0 ||
        hasText(product.productImages) ||
        hasText(product.brochure) ||
        hasText(product.videoDemo)
    );
}

type FieldErrors = Record<string, string>;

export default function CompanyProfilePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { fieldErrors, setFieldErrors, clearFieldError, getFieldClass } = useFormFieldErrors();

    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companyPhone, setCompanyPhone] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [companyCountry, setCompanyCountry] = useState("");
    const [companyCity, setCompanyCity] = useState("");
    const [companyWebsite, setCompanyWebsite] = useState("");
    const [linkedInUrl, setLinkedInUrl] = useState("");
    const [facebookUrl, setFacebookUrl] = useState("");
    const [pinterestUrl, setPinterestUrl] = useState("");
    const [instagramUrl, setInstagramUrl] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [companyType, setCompanyType] = useState("");
    const [yearsOfOperation, setYearsOfOperation] = useState("");
    const [mainSector, setMainSector] = useState("");
    const [products, setProducts] = useState<CompanyProductForm[]>([{ ...emptyCompanyProduct }]);
    const [collaborationInterests, setCollaborationInterests] = useState<string[]>([]);
    const [publishConsent, setPublishConsent] = useState(false);
    const { selectedPlan, setSelectedPlan, selectedPlanConfig } = usePlanSelection(companySubscriptionPlans);
    const previewPlanId = searchParams.get("preview") === "sarra" ? searchParams.get("plan") : null;
    const previewPlanConfig = useMemo(
        () => companySubscriptionPlans.find((plan) => plan.id === previewPlanId),
        [previewPlanId],
    );
    const previewProducts = useMemo<CompanyProductForm[]>(
        () => [
            {
                ...emptyCompanyProduct,
                name: "EcoTherm Facade Panel",
                category: "Insulation systems",
                description: "High-performance facade solution positioned for sustainable retrofit projects.",
                certifications: ["Environmental Product Declaration (EPD)"],
                technicalDatasheet: "preview/ecotherm-facade-panel.pdf",
                exampleProjects: "North district housing retrofit",
            },
            {
                ...emptyCompanyProduct,
                name: "RainLoop Recovery Module",
                category: "Water solutions",
                description: "Compact rainwater capture and reuse system for mixed-use developments.",
                certifications: ["LEED compliant"],
                technicalDatasheet: "preview/rainloop-module.pdf",
                exampleProjects: "Mixed-use civic campus",
            },
            {
                ...emptyCompanyProduct,
                name: "SolarSkin Canopy",
                category: "Energy solutions",
                description: "Solar-ready shading canopy for commercial and educational environments.",
                certifications: ["ISO standards"],
                technicalDatasheet: "preview/solarskin-canopy.pdf",
                exampleProjects: "Regional education hub",
            },
            {
                ...emptyCompanyProduct,
                name: "SmartVent Control Kit",
                category: "Smart building",
                description: "Ventilation optimization kit with demand-based controls for energy-aware buildings.",
                certifications: ["Environmental Product Declaration (EPD)"],
                exampleProjects: "Office upgrade package",
            },
        ],
        [],
    );

    const companyLocation = useMemo(
        () => [companyAddress, companyCity, companyCountry].map((part) => part.trim()).filter(Boolean).join(", "),
        [companyAddress, companyCity, companyCountry],
    );
    const socialMediaLinks = useMemo(
        () =>
            [linkedInUrl, facebookUrl, pinterestUrl, instagramUrl, youtubeUrl]
                .map((value) => value.trim())
                .filter(Boolean)
                .join(" | "),
        [linkedInUrl, facebookUrl, pinterestUrl, instagramUrl, youtubeUrl],
    );
    const submittedProducts = useMemo(() => products.filter(productHasAnyValue), [products]);
    const starterVisibleProducts = useMemo(() => submittedProducts.slice(0, 3), [submittedProducts]);
    const starterCategoryCount = useMemo(
        () => new Set(submittedProducts.map((product) => product.category.trim()).filter(Boolean)).size,
        [submittedProducts],
    );
    const starterDatasheetCount = useMemo(
        () => submittedProducts.filter((product) => hasText(product.technicalDatasheet)).length,
        [submittedProducts],
    );
    const starterCertificationCount = useMemo(
        () => submittedProducts.filter((product) => product.certifications.length > 0).length,
        [submittedProducts],
    );
    const previewStarterVisibleProducts = useMemo(() => previewProducts.slice(0, 3), [previewProducts]);
    const previewCategoryCount = useMemo(
        () => new Set(previewProducts.map((product) => product.category.trim()).filter(Boolean)).size,
        [previewProducts],
    );
    const previewDatasheetCount = useMemo(
        () => previewProducts.filter((product) => hasText(product.technicalDatasheet)).length,
        [previewProducts],
    );
    const previewCertificationCount = useMemo(
        () => previewProducts.filter((product) => product.certifications.length > 0).length,
        [previewProducts],
    );

    const profileCompletionCompleted = useMemo(() => {
        const checkpoints = [
            companyName,
            companyEmail,
            companyPhone,
            companyAddress,
            companyCountry,
            companyCity,
            companyWebsite,
            companyType,
            yearsOfOperation,
            mainSector,
        ];

        let completed = checkpoints.filter(hasText).length;
        if (socialMediaLinks.length > 0) completed += 1;
        if (submittedProducts.length > 0) completed += 1;
        if (publishConsent) completed += 1;

        return completed;
    }, [
        companyAddress,
        companyCity,
        companyCountry,
        companyEmail,
        companyName,
        companyPhone,
        companyType,
        companyWebsite,
        mainSector,
        publishConsent,
        socialMediaLinks,
        submittedProducts.length,
        yearsOfOperation,
    ]);

    const profileCompletion = useCompletionScore({
        completed: profileCompletionCompleted,
        total: 13,
    });

    const updateProduct = (index: number, field: keyof CompanyProductForm, value: string | string[]) => {
        setProducts((previousProducts) => {
            const nextProducts = [...previousProducts];
            nextProducts[index] = { ...nextProducts[index], [field]: value };
            return nextProducts;
        });
    };

    const addProduct = () => {
        setProducts((previousProducts) => [...previousProducts, { ...emptyCompanyProduct }]);
    };

    const removeProduct = (index: number) => {
        setProducts((previousProducts) => (
            previousProducts.length === 1 ? previousProducts : previousProducts.filter((_, itemIndex) => itemIndex !== index)
        ));
    };

    const toggleProductMulti = (
        index: number,
        field: "certifications" | "useCases" | "availableMarkets" | "salesModels",
        value: string,
    ) => {
        const currentValues = products[index][field];
        const nextValues = currentValues.includes(value)
            ? currentValues.filter((item) => item !== value)
            : [...currentValues, value];

        updateProduct(index, field, nextValues);

        if (field === "certifications" && value === "Other" && currentValues.includes(value)) {
            setFieldErrors((previousErrors) => {
                const nextErrors = { ...previousErrors };
                delete nextErrors[`product-${index}-otherCertification`];
                return nextErrors;
            });
        }
    };

    const getStepErrors = (stepNumber: number) => {
        if (stepNumber === 1) {
            const errors: FieldErrors = {};

            if (!hasText(companyName)) errors.companyName = "Company name is required.";
            if (!hasText(companyEmail)) {
                errors.companyEmail = "Email address is required.";
            } else if (!isValidEmail(companyEmail)) {
                errors.companyEmail = "Enter a valid email address.";
            }
            if (!hasText(companyPhone)) errors.companyPhone = "Phone number is required.";
            if (!hasText(companyAddress)) errors.companyAddress = "Address is required.";
            if (!hasText(companyCountry)) errors.companyCountry = "Country is required.";
            if (!hasText(companyCity)) errors.companyCity = "City is required.";
            if (companyLocation.length === 0) errors.companyLocation = "Location is required.";
            if (!hasText(companyType)) errors.companyType = "Type of company is required.";
            if (!hasText(yearsOfOperation)) errors.yearsOfOperation = "Years of experience is required.";
            if (!hasText(mainSector)) errors.mainSector = "Main activity sector is required.";

            return errors;
        }

        if (stepNumber === 2) {
            const errors: FieldErrors = {};

            products.forEach((product, index) => {
                if (!productHasAnyValue(product)) return;

                if (!hasText(product.name)) errors[`product-${index}-name`] = "Product name is required.";
                if (!hasText(product.category)) errors[`product-${index}-category`] = "Category is required.";
                if (product.certifications.includes("Other") && !hasText(product.otherCertification)) {
                    errors[`product-${index}-otherCertification`] = "Please specify the other certification.";
                }
            });

            if (!publishConsent) {
                errors.publishConsent = "You must agree to publish product information on the platform.";
            }

            return errors;
        }

        if (stepNumber === 3) {
            const errors: FieldErrors = {};
            if (!selectedPlanConfig) {
                errors.selectedPlan = "Please choose a plan before submitting.";
            }
            return errors;
        }

        return {};
    };

    const moveToStep = (targetStep: number) => {
        if (targetStep <= step) {
            setFieldErrors({});
            setError("");
            setStep(targetStep);
            return;
        }

        const validation = findFirstStepValidationError(
            Array.from({ length: targetStep - 1 }, (_, index) => index + 1),
            getStepErrors,
        );

        if (validation) {
            setFieldErrors(validation.errors);
            setStep(validation.step);
            return;
        }

        setFieldErrors({});
        setError("");
        setStep(targetStep);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validation = findFirstStepValidationError([1, 2, 3], getStepErrors);

        if (validation) {
            setFieldErrors(validation.errors);
            setStep(validation.step);
            return;
        }

        setIsLoading(true);
        setFieldErrors({});
        setError("");

        try {
            const normalizedProducts = products
                .filter(productHasAnyValue)
                .map((product) => ({
                    name: product.name,
                    category: product.category,
                    description: product.description,
                    keyFeatures: product.keyFeatures,
                    scopeOfWorks: product.scopeOfWorks,
                    certName: product.certifications.join(", "),
                    certOther: product.otherCertification,
                    technicalDatasheet: product.technicalDatasheet,
                    testReports: product.testReports,
                    useCases: product.useCases,
                    exampleProjects: product.exampleProjects,
                    clientsReferences: product.clientsReferences,
                    availableMarkets: product.availableMarkets,
                    priceRange: product.priceRange,
                    salesModels: product.salesModels,
                    productImages: product.productImages,
                    brochure: product.brochure,
                    videoDemo: product.videoDemo,
                }));

            const payload = {
                type: "company",
                companyName,
                companyDescription: mainSector,
                companyAddress,
                companyCity,
                companyCountry,
                companyLocation,
                companyEmail,
                companyPhone,
                companyWebsite,
                socialMediaLinks,
                linkedInUrl,
                facebookUrl,
                pinterestUrl,
                instagramUrl,
                youtubeUrl,
                companyType,
                yearsOfOperation,
                mainSector,
                collaborationInterests,
                publishConsent,
                selectedPlan: selectedPlanConfig?.name ?? selectedPlan,
                products: normalizedProducts,
            };

            const response = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error();
            setSubmitted(true);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const renderFieldError = (field: string) =>
        fieldErrors[field] ? <p className="text-sm text-red-500">{fieldErrors[field]}</p> : null;

    const resetForm = () => {
        setSubmitted(false);
        setStep(1);
    };

    if (previewPlanConfig) {
        if (previewPlanConfig.id === "enterprise") {
            return (
                <CompanyPremiumDashboard
                    companyName="Sarra Preview Industries"
                    selectedPlanName={previewPlanConfig.name}
                    selectedPlanPrice={previewPlanConfig.price}
                    submittedProductCount={previewProducts.length}
                    onExploreDirectory={() => router.push("/company")}
                    onGoHome={() => router.push("/")}
                    onReset={() => router.push("/to-sarra")}
                />
            );
        }

        if (previewPlanConfig.id === "professional") {
            return (
                <CompanyBusinessDashboard
                    companyName="Sarra Preview Industries"
                    selectedPlanName={previewPlanConfig.name}
                    selectedPlanPrice={previewPlanConfig.price}
                    profileCompletion={92}
                    submittedProducts={previewProducts}
                    starterCategoryCount={previewCategoryCount}
                    starterDatasheetCount={previewDatasheetCount}
                    starterCertificationCount={previewCertificationCount}
                    companyLocation="Tunis, Tunisia"
                    onExploreDirectory={() => router.push("/company")}
                    onGoHome={() => router.push("/")}
                    onReset={() => router.push("/to-sarra")}
                />
            );
        }

        if (previewPlanConfig.id === "starter") {
            return (
                <CompanyStarterDashboard
                    companyName="Sarra Preview Industries"
                    selectedPlanName={previewPlanConfig.name}
                    selectedPlanPrice={previewPlanConfig.price}
                    profileCompletion={84}
                    submittedProducts={previewProducts}
                    starterVisibleProducts={previewStarterVisibleProducts}
                    starterCategoryCount={previewCategoryCount}
                    starterDatasheetCount={previewDatasheetCount}
                    starterCertificationCount={previewCertificationCount}
                    companyLocation="Tunis, Tunisia"
                    onExploreDirectory={() => router.push("/company")}
                    onGoHome={() => router.push("/")}
                    onReset={() => router.push("/to-sarra")}
                />
            );
        }
    }

    if (submitted) {
        if (selectedPlan === "enterprise") {
            return (
                <CompanyPremiumDashboard
                    companyName={companyName}
                    selectedPlanName={selectedPlanConfig?.name}
                    selectedPlanPrice={selectedPlanConfig?.price}
                    submittedProductCount={submittedProducts.length}
                    onExploreDirectory={() => router.push("/company")}
                    onGoHome={() => router.push("/")}
                    onReset={resetForm}
                />
            );
        }

        if (selectedPlan === "professional") {
            return (
                <CompanyBusinessDashboard
                    companyName={companyName}
                    selectedPlanName={selectedPlanConfig?.name}
                    selectedPlanPrice={selectedPlanConfig?.price}
                    profileCompletion={profileCompletion}
                    submittedProducts={submittedProducts}
                    starterCategoryCount={starterCategoryCount}
                    starterDatasheetCount={starterDatasheetCount}
                    starterCertificationCount={starterCertificationCount}
                    companyLocation={companyLocation}
                    onExploreDirectory={() => router.push("/company")}
                    onGoHome={() => router.push("/")}
                    onReset={resetForm}
                />
            );
        }

        if (selectedPlan === "starter") {
            return (
                <CompanyStarterDashboard
                    companyName={companyName}
                    selectedPlanName={selectedPlanConfig?.name}
                    selectedPlanPrice={selectedPlanConfig?.price}
                    profileCompletion={profileCompletion}
                    submittedProducts={submittedProducts}
                    starterVisibleProducts={starterVisibleProducts}
                    starterCategoryCount={starterCategoryCount}
                    starterDatasheetCount={starterDatasheetCount}
                    starterCertificationCount={starterCertificationCount}
                    companyLocation={companyLocation}
                    onExploreDirectory={() => router.push("/company")}
                    onGoHome={() => router.push("/")}
                    onReset={resetForm}
                />
            );
        }

        return (
            <div className="ui-page-shell-centered">
                <Card className="max-w-lg w-full border-0 shadow-2xl animate-scale-in">
                    <CardContent className="p-10 text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30">
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3">Registration submitted</h2>
                        <p className="text-muted-foreground mb-2">Your Green Industry form has been submitted successfully.</p>
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-6">Plan: {selectedPlanConfig?.name ?? "Not selected"}</p>
                        <div className="space-y-3">
                            <Button className="ui-btn-brand w-full" onClick={() => router.push("/")}>
                                Go to Home
                            </Button>
                            <Button variant="outline" className="w-full rounded-full" onClick={resetForm}>
                                Submit Another
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="ui-page-shell">
            <div className="ui-page-container-4xl">
                <PageIntro
                    badge="Green Industry Space"
                    icon={Building2}
                    title={
                        <>
                            Green Industry <span className="gradient-text">Registration Form</span>
                        </>
                    }
                    className="mb-8"
                />

                <StepProgress
                    currentStep={step}
                    steps={companySteps.map((label) => ({ label }))}
                    className="mb-8"
                    onStepSelect={moveToStep}
                />

                <form onSubmit={handleSubmit}>
                    <Card className="border-0 shadow-xl">
                        <CardHeader className="pb-2">
                            <CardTitle>{step === 1 ? "Company Information + Company Profile" : step === 2 ? "Product Sections" : "Final. Subscription"}</CardTitle>
                            <CardDescription />
                        </CardHeader>
                        <CardContent className="space-y-6 pt-4">
                            {step === 1 ? (
                                <CompanyProfileStepOne
                                    companyName={companyName}
                                    setCompanyName={setCompanyName}
                                    companyEmail={companyEmail}
                                    setCompanyEmail={setCompanyEmail}
                                    companyPhone={companyPhone}
                                    setCompanyPhone={setCompanyPhone}
                                    companyAddress={companyAddress}
                                    setCompanyAddress={setCompanyAddress}
                                    companyCountry={companyCountry}
                                    setCompanyCountry={setCompanyCountry}
                                    companyCity={companyCity}
                                    setCompanyCity={setCompanyCity}
                                    companyWebsite={companyWebsite}
                                    setCompanyWebsite={setCompanyWebsite}
                                    linkedInUrl={linkedInUrl}
                                    setLinkedInUrl={setLinkedInUrl}
                                    facebookUrl={facebookUrl}
                                    setFacebookUrl={setFacebookUrl}
                                    pinterestUrl={pinterestUrl}
                                    setPinterestUrl={setPinterestUrl}
                                    instagramUrl={instagramUrl}
                                    setInstagramUrl={setInstagramUrl}
                                    youtubeUrl={youtubeUrl}
                                    setYoutubeUrl={setYoutubeUrl}
                                    companyType={companyType}
                                    setCompanyType={setCompanyType}
                                    yearsOfOperation={yearsOfOperation}
                                    setYearsOfOperation={setYearsOfOperation}
                                    mainSector={mainSector}
                                    setMainSector={setMainSector}
                                    clearFieldError={clearFieldError}
                                    getFieldClass={getFieldClass}
                                    renderFieldError={renderFieldError}
                                />
                            ) : null}

                            {step === 2 ? (
                                <CompanyProfileStepTwo
                                    products={products}
                                    collaborationInterests={collaborationInterests}
                                    publishConsent={publishConsent}
                                    updateProduct={updateProduct}
                                    removeProduct={removeProduct}
                                    addProduct={addProduct}
                                    toggleProductMulti={toggleProductMulti}
                                    toggleCollaborationInterest={(value) => toggleValue(value, collaborationInterests, setCollaborationInterests)}
                                    setPublishConsent={setPublishConsent}
                                    clearFieldError={clearFieldError}
                                    getFieldClass={getFieldClass}
                                    renderFieldError={renderFieldError}
                                />
                            ) : null}

                            {step === 3 ? (
                                <CompanyProfilePlanStep
                                    selectedPlan={selectedPlan}
                                    selectedPlanName={selectedPlanConfig?.name}
                                    selectedPlanPrice={selectedPlanConfig?.price}
                                    selectedPlanError={Boolean(fieldErrors.selectedPlan)}
                                    onSelectPlan={(planId) => {
                                        setSelectedPlan(planId);
                                        clearFieldError("selectedPlan");
                                    }}
                                    renderFieldError={renderFieldError}
                                />
                            ) : null}

                            {error ? <p className="text-sm text-red-500 text-center">{error}</p> : null}

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
                                <Button type="button" variant="outline" className="w-full rounded-full px-6 sm:w-auto" onClick={() => setStep((currentStep) => Math.max(1, currentStep - 1))} disabled={isLoading || step === 1}>
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                                {step < 3 ? (
                                    <Button type="button" className="ui-btn-brand w-full px-8 sm:w-auto" onClick={() => moveToStep(Math.min(3, step + 1))}>
                                        Next
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                ) : (
                                    <Button type="submit" className="ui-btn-brand w-full px-10 sm:w-auto" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-5 h-5 mr-2" />
                                                Submit
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </div>
    );
}
