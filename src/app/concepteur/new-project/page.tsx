"use client";

import { Dispatch, FormEvent, SetStateAction, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Send, Sparkles, Compass } from "lucide-react";

import { DesignerAccreditedDashboard } from "@/components/designer/dashboards/designer-accredited-dashboard";
import { DesignerDiscoveryDashboard } from "@/components/designer/dashboards/designer-discovery-dashboard";
import { DesignerProfessionalDashboard } from "@/components/designer/dashboards/designer-professional-dashboard";
import { DesignerRegistrationStepContent } from "@/components/designer/registration/designer-registration-step-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageIntro } from "@/components/ui/page-intro";
import { StepProgress } from "@/components/ui/step-progress";
import { useCompletionScore } from "@/hooks/use-completion-score";
import { useFormFieldErrors } from "@/hooks/use-form-field-errors";
import { usePlanSelection } from "@/hooks/use-plan-selection";
import {
    designerSteps,
    designerSubscriptionPlans,
} from "@/lib/designer-registration";
import { findFirstStepValidationError } from "@/lib/registration/step-validation";

function hasText(value: string) {
    return value.trim().length > 0;
}

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

type FieldErrors = Record<string, string>;

export default function NewProjectPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [expertiseField, setExpertiseField] = useState("");
    const [yearsExperience, setYearsExperience] = useState("");
    const [organization, setOrganization] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [certifications, setCertifications] = useState<string[]>([]);
    const [otherCertification, setOtherCertification] = useState("");
    const [tools, setTools] = useState("");
    const [sustainableDesignLevel, setSustainableDesignLevel] = useState("");
    const [keySkills, setKeySkills] = useState<string[]>([]);
    const [otherKeySkill, setOtherKeySkill] = useState("");
    const [greenProjectsWorked, setGreenProjectsWorked] = useState("");
    const [greenProjectDescription, setGreenProjectDescription] = useState("");
    const [projectTypes, setProjectTypes] = useState("");
    const [knowledgeLevel, setKnowledgeLevel] = useState("");
    const [joinReason, setJoinReason] = useState("");
    const [objectives, setObjectives] = useState<string[]>([]);
    const [learningFormat, setLearningFormat] = useState("");
    const [availabilityPerWeek, setAvailabilityPerWeek] = useState("");
    const [preferredSchedule, setPreferredSchedule] = useState("");
    const [portfolioLink, setPortfolioLink] = useState("");
    const [consent, setConsent] = useState(false);
    const { selectedPlan, setSelectedPlan, selectedPlanConfig } = usePlanSelection(designerSubscriptionPlans);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { fieldErrors, setFieldErrors, clearFieldError, getFieldClass } = useFormFieldErrors();

    const profileReadinessCompleted = useMemo(() => {
        const checkpoints = [
            fullName,
            email,
            phone,
            country,
            city,
            jobTitle,
            expertiseField,
            yearsExperience,
            educationLevel,
            sustainableDesignLevel,
            knowledgeLevel,
            joinReason,
            availabilityPerWeek,
            preferredSchedule,
        ];
        let completed = checkpoints.filter(hasText).length;
        if (hasText(portfolioLink)) completed += 1;
        if (hasText(organization)) completed += 1;
        if (certifications.length > 0) completed += 1;
        if (keySkills.length > 0) completed += 1;
        if (objectives.length > 0) completed += 1;
        if (consent) completed += 1;
        return completed;
    }, [
        availabilityPerWeek,
        certifications.length,
        city,
        consent,
        country,
        educationLevel,
        email,
        expertiseField,
        fullName,
        joinReason,
        jobTitle,
        keySkills.length,
        knowledgeLevel,
        objectives.length,
        organization,
        phone,
        portfolioLink,
        preferredSchedule,
        sustainableDesignLevel,
        yearsExperience,
    ]);

    const profileReadiness = useCompletionScore({
        completed: profileReadinessCompleted,
        total: 20,
    });

    const toggleArrayValue = (value: string, setter: Dispatch<SetStateAction<string[]>>) => {
        setter((previousValues) => (
            previousValues.includes(value)
                ? previousValues.filter((item) => item !== value)
                : [...previousValues, value]
        ));
    };

    const getStepErrors = (stepNumber: number) => {
        if (stepNumber === 1) {
            const errors: FieldErrors = {};
            if (!hasText(fullName)) errors.fullName = "Full name is required.";
            if (!hasText(email)) {
                errors.email = "Email address is required.";
            } else if (!isValidEmail(email)) {
                errors.email = "Enter a valid email address.";
            }
            if (!hasText(phone)) errors.phone = "Phone number is required.";
            if (!hasText(country)) errors.country = "Country is required.";
            if (!hasText(city)) errors.city = "City is required.";
            if (!hasText(jobTitle)) errors.jobTitle = "Current position / job title is required.";
            return errors;
        }

        if (stepNumber === 2) {
            const errors: FieldErrors = {};
            if (!hasText(expertiseField)) errors.expertiseField = "Field of expertise is required.";
            if (!hasText(yearsExperience)) errors.yearsExperience = "Years of experience is required.";
            if (!hasText(educationLevel)) errors.educationLevel = "Highest level of education is required.";
            if (!hasText(sustainableDesignLevel)) errors.sustainableDesignLevel = "Your level in sustainable design is required.";
            if (certifications.includes("Other") && !hasText(otherCertification)) {
                errors.otherCertification = "Please specify the other certification.";
            }
            if (keySkills.includes("Other") && !hasText(otherKeySkill)) {
                errors.otherKeySkill = "Please specify the other key skill.";
            }
            return errors;
        }

        if (stepNumber === 3) {
            const errors: FieldErrors = {};
            if (!hasText(greenProjectsWorked)) errors.greenProjectsWorked = "Please select whether you worked on sustainable projects.";
            if (!hasText(knowledgeLevel)) errors.knowledgeLevel = "Knowledge in sustainable construction is required.";
            if (!hasText(joinReason)) errors.joinReason = "Please share why you want to join Green Designers Hub.";
            if (!hasText(learningFormat)) errors.learningFormat = "Preferred learning format is required.";
            return errors;
        }

        if (stepNumber === 4) {
            const errors: FieldErrors = {};
            if (!hasText(availabilityPerWeek)) errors.availabilityPerWeek = "Availability per week is required.";
            if (!hasText(preferredSchedule)) errors.preferredSchedule = "Preferred schedule is required.";
            if (!consent) errors.consent = "You must agree to the use of your data for program placement and communication.";
            return errors;
        }

        if (stepNumber === 5) {
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
        const validation = findFirstStepValidationError([1, 2, 3, 4, 5], getStepErrors);

        if (validation) {
            setFieldErrors(validation.errors);
            setStep(validation.step);
            return;
        }

        setIsLoading(true);
        setFieldErrors({});
        setError("");

        try {
            const response = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "project",
                    fullName,
                    email,
                    phone,
                    country,
                    city,
                    jobTitle,
                    expertiseField,
                    yearsExperience,
                    organization,
                    educationLevel,
                    certifications,
                    otherCertification,
                    tools,
                    sustainableDesignLevel,
                    keySkills,
                    otherKeySkill,
                    greenProjectsWorked,
                    greenProjectDescription,
                    projectTypes,
                    knowledgeLevel,
                    joinReason,
                    objectives,
                    learningFormat,
                    availabilityPerWeek,
                    preferredSchedule,
                    portfolioLink,
                    consent,
                    selectedPlan: selectedPlanConfig?.name ?? selectedPlan,
                }),
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

    const done = () => setSubmitted(false);
    const resetForm = () => {
        setSubmitted(false);
        setStep(1);
    };

    if (submitted) {
        if (selectedPlan === "discovery") {
            return (
                <DesignerDiscoveryDashboard
                    fullName={fullName}
                    knowledgeLevel={knowledgeLevel}
                    profileReadiness={profileReadiness}
                    selectedPlanName={selectedPlanConfig?.name}
                    selectedPlanPrice={selectedPlanConfig?.price}
                    onGoHome={() => router.push("/")}
                    onDone={done}
                    onReset={resetForm}
                />
            );
        }

        if (selectedPlan === "professional") {
            return (
                <DesignerProfessionalDashboard
                    fullName={fullName}
                    profileReadiness={profileReadiness}
                    selectedPlanName={selectedPlanConfig?.name}
                    selectedPlanPrice={selectedPlanConfig?.price}
                    onGoHome={() => router.push("/")}
                    onDone={done}
                    onReset={resetForm}
                />
            );
        }

        if (selectedPlan === "accredited") {
            return (
                <DesignerAccreditedDashboard
                    fullName={fullName}
                    selectedPlanName={selectedPlanConfig?.name}
                    selectedPlanPrice={selectedPlanConfig?.price}
                    onGoHome={() => router.push("/")}
                    onDone={done}
                    onReset={resetForm}
                />
            );
        }

        return (
            <div className="ui-page-shell-centered">
                <Card className="max-w-lg w-full border-0 shadow-2xl animate-scale-in">
                    <CardContent className="p-10 text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30 animate-pulse-glow">
                            <Send className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3">Registration submitted!</h2>
                        <p className="text-muted-foreground mb-8">Your Green Designers registration is now in review. We will contact you by email with next steps.</p>

                        <div className="text-left rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/10 p-5 mb-6 space-y-3">
                            <h4 className="font-medium text-sm flex items-center gap-2">
                                <FileText className="w-4 h-4 text-emerald-500" />
                                Registration Summary
                            </h4>
                            <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                                <span className="text-muted-foreground">Name:</span>
                                <span className="font-medium">{fullName}</span>
                                <span className="text-muted-foreground">Expertise:</span>
                                <span className="font-medium">{expertiseField || "-"}</span>
                                <span className="text-muted-foreground">Plan:</span>
                                <span className="font-medium">{selectedPlanConfig?.name || "-"}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button className="ui-btn-brand w-full" onClick={() => router.push("/")}>
                                Go to Home
                            </Button>
                            <Button variant="outline" className="w-full rounded-full" onClick={done}>
                                <Sparkles className="w-4 h-4 mr-2" />
                                Done
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
                    badge="Green Designers Hub - Registration"
                    icon={Compass}
                    title={
                        <>
                            Join as a <span className="gradient-text">Green Designer</span>
                        </>
                    }
                    className="mb-10"
                />

                <StepProgress
                    currentStep={step}
                    steps={designerSteps.map(({ label, icon }) => ({ label, icon }))}
                    className="mb-10"
                    onStepSelect={moveToStep}
                />

                <DesignerRegistrationStepContent
                    step={step}
                    error={error}
                    isLoading={isLoading}
                    selectedPlan={selectedPlan}
                    selectedPlanName={selectedPlanConfig?.name}
                    selectedPlanPrice={selectedPlanConfig?.price}
                    selectedPlanError={Boolean(fieldErrors.selectedPlan)}
                    fullName={fullName}
                    email={email}
                    phone={phone}
                    country={country}
                    city={city}
                    jobTitle={jobTitle}
                    expertiseField={expertiseField}
                    yearsExperience={yearsExperience}
                    organization={organization}
                    educationLevel={educationLevel}
                    certifications={certifications}
                    otherCertification={otherCertification}
                    tools={tools}
                    sustainableDesignLevel={sustainableDesignLevel}
                    keySkills={keySkills}
                    otherKeySkill={otherKeySkill}
                    greenProjectsWorked={greenProjectsWorked}
                    greenProjectDescription={greenProjectDescription}
                    projectTypes={projectTypes}
                    knowledgeLevel={knowledgeLevel}
                    joinReason={joinReason}
                    objectives={objectives}
                    learningFormat={learningFormat}
                    availabilityPerWeek={availabilityPerWeek}
                    preferredSchedule={preferredSchedule}
                    portfolioLink={portfolioLink}
                    consent={consent}
                    setFullName={setFullName}
                    setEmail={setEmail}
                    setPhone={setPhone}
                    setCountry={setCountry}
                    setCity={setCity}
                    setJobTitle={setJobTitle}
                    setExpertiseField={setExpertiseField}
                    setYearsExperience={setYearsExperience}
                    setOrganization={setOrganization}
                    setEducationLevel={setEducationLevel}
                    setOtherCertification={setOtherCertification}
                    setTools={setTools}
                    setSustainableDesignLevel={setSustainableDesignLevel}
                    setOtherKeySkill={setOtherKeySkill}
                    setGreenProjectsWorked={setGreenProjectsWorked}
                    setGreenProjectDescription={setGreenProjectDescription}
                    setProjectTypes={setProjectTypes}
                    setKnowledgeLevel={setKnowledgeLevel}
                    setJoinReason={setJoinReason}
                    setLearningFormat={setLearningFormat}
                    setAvailabilityPerWeek={setAvailabilityPerWeek}
                    setPreferredSchedule={setPreferredSchedule}
                    setPortfolioLink={setPortfolioLink}
                    setConsent={setConsent}
                    setSelectedPlan={setSelectedPlan}
                    toggleArrayValue={toggleArrayValue}
                    setCertifications={setCertifications}
                    setKeySkills={setKeySkills}
                    setObjectives={setObjectives}
                    clearFieldError={clearFieldError}
                    getFieldClass={getFieldClass}
                    renderFieldError={renderFieldError}
                    onBack={() => setStep((currentStep) => Math.max(1, currentStep - 1))}
                    onNext={() => moveToStep(Math.min(5, step + 1))}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}
