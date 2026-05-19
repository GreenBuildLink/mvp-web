"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ArrowRight,
    BriefcaseBusiness,
    CheckCircle2,
    GraduationCap,
    HardHat,
    MapPin,
    ShieldCheck,
    Users,
    Wrench,
} from "lucide-react";

import { WorkerQualifiedDashboard } from "@/components/worker/dashboards/worker-qualified-dashboard";
import { WorkerVerifiedDashboard } from "@/components/worker/dashboards/worker-verified-dashboard";
import { WorkerRegistrationStepContent } from "@/components/worker/registration/worker-registration-step-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageIntro } from "@/components/ui/page-intro";
import { StepProgress } from "@/components/ui/step-progress";
import { useCompletionScore } from "@/hooks/use-completion-score";
import { useFormFieldErrors } from "@/hooks/use-form-field-errors";
import { usePlanSelection } from "@/hooks/use-plan-selection";
import {
    workerSteps,
    workerSubscriptionPlans,
} from "@/lib/worker-registration";
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

type FieldErrors = Record<string, string>;

export default function WorkersPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showForm, setShowForm] = useState(false);
    const [formStep, setFormStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { fieldErrors, setFieldErrors, clearFieldError, getFieldClass } = useFormFieldErrors();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [age, setAge] = useState("");
    const [occupation, setOccupation] = useState("");
    const [trade, setTrade] = useState("");
    const [otherTrade, setOtherTrade] = useState("");
    const [yearsExperience, setYearsExperience] = useState("");
    const [tasks, setTasks] = useState<string[]>([]);
    const [otherTask, setOtherTask] = useState("");
    const [workedOnSites, setWorkedOnSites] = useState("");
    const [greenProjectExperience, setGreenProjectExperience] = useState("");
    const [tradeLevel, setTradeLevel] = useState("");
    const [toolsMachines, setToolsMachines] = useState("");
    const [technicalTraining, setTechnicalTraining] = useState("");
    const [workerCertifications, setWorkerCertifications] = useState("");
    const [currentlyAvailable, setCurrentlyAvailable] = useState("");
    const [workType, setWorkType] = useState("");
    const [mobility, setMobility] = useState("");
    const [interestedInGreen, setInterestedInGreen] = useState("");
    const [greenInterestAreas, setGreenInterestAreas] = useState<string[]>([]);
    const [wantsTraining, setWantsTraining] = useState("");
    const [preferredTrainingType, setPreferredTrainingType] = useState("");
    const [cvLink, setCvLink] = useState("");
    const [workerCertificatesLink, setWorkerCertificatesLink] = useState("");
    const [portfolioLink, setPortfolioLink] = useState("");
    const [consent, setConsent] = useState(false);
    const { selectedPlan, setSelectedPlan, selectedPlanConfig } = usePlanSelection(workerSubscriptionPlans);
    const previewPlanId = searchParams.get("preview") === "sarra" ? searchParams.get("plan") : null;
    const previewPlanConfig = useMemo(
        () => workerSubscriptionPlans.find((plan) => plan.id === previewPlanId),
        [previewPlanId],
    );

    const workerReadinessCompleted = useMemo(() => {
        const checkpoints = [
            name,
            phone,
            email,
            location,
            trade,
            yearsExperience,
            tradeLevel,
            currentlyAvailable,
            workType,
            mobility,
            interestedInGreen,
            wantsTraining,
        ];

        let completed = checkpoints.filter(hasText).length;
        if (tasks.length > 0) completed += 1;
        if (greenInterestAreas.length > 0) completed += 1;
        if (hasText(workerCertifications)) completed += 1;
        if (hasText(technicalTraining)) completed += 1;
        if (hasText(cvLink)) completed += 1;
        if (consent) completed += 1;
        return completed;
    }, [
        consent,
        currentlyAvailable,
        cvLink,
        email,
        greenInterestAreas.length,
        interestedInGreen,
        location,
        mobility,
        name,
        phone,
        tasks.length,
        technicalTraining,
        trade,
        tradeLevel,
        wantsTraining,
        workType,
        workerCertifications,
        yearsExperience,
    ]);

    const workerReadiness = useCompletionScore({
        completed: workerReadinessCompleted,
        total: 18,
    });

    const getStepErrors = (stepNumber: number) => {
        if (stepNumber === 1) {
            const errors: FieldErrors = {};
            if (!hasText(name)) errors.name = "Full name is required.";
            if (!hasText(phone)) errors.phone = "Phone number is required.";
            if (!hasText(email)) {
                errors.email = "Email is required.";
            } else if (!isValidEmail(email)) {
                errors.email = "Enter a valid email address.";
            }
            if (!hasText(location)) errors.location = "City / Region is required.";
            return errors;
        }

        if (stepNumber === 2) {
            const errors: FieldErrors = {};
            if (!hasText(trade)) errors.trade = "Trade is required.";
            if (trade === "Other" && !hasText(otherTrade)) errors.otherTrade = "Please specify your trade.";
            return errors;
        }

        if (stepNumber === 3) {
            const errors: FieldErrors = {};
            if (tasks.includes("Other") && !hasText(otherTask)) errors.otherTask = "Please specify the other task.";
            return errors;
        }

        if (stepNumber === 4) {
            const errors: FieldErrors = {};
            if (wantsTraining === "Yes" && !hasText(preferredTrainingType)) {
                errors.preferredTrainingType = "Preferred training type is required.";
            }
            if (!consent) {
                errors.consent = "You must agree to share data for job opportunities and training.";
            }
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
        if (targetStep <= formStep) {
            setFieldErrors({});
            setError("");
            setFormStep(targetStep);
            return;
        }

        const validation = findFirstStepValidationError(
            Array.from({ length: targetStep - 1 }, (_, index) => index + 1),
            getStepErrors,
        );

        if (validation) {
            setFieldErrors(validation.errors);
            setFormStep(validation.step);
            return;
        }

        setFieldErrors({});
        setError("");
        setFormStep(targetStep);
    };

    const handleWorkerSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validation = findFirstStepValidationError([1, 2, 3, 4, 5], getStepErrors);

        if (validation) {
            setFieldErrors(validation.errors);
            setFormStep(validation.step);
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
                    type: "worker",
                    name,
                    phone,
                    email,
                    location,
                    age,
                    occupation,
                    trade,
                    otherTrade,
                    yearsExperience,
                    tasks,
                    otherTask,
                    workedOnSites,
                    greenProjectExperience,
                    tradeLevel,
                    toolsMachines,
                    technicalTraining,
                    workerCertifications,
                    currentlyAvailable,
                    workType,
                    mobility,
                    interestedInGreen,
                    greenInterestAreas,
                    wantsTraining,
                    preferredTrainingType,
                    cvLink,
                    workerCertificatesLink,
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

    const done = () => {
        setSubmitted(false);
        setShowForm(false);
    };
    const resetForm = () => {
        setSubmitted(false);
        setShowForm(false);
        setFormStep(1);
    };

    if (previewPlanConfig) {
        if (previewPlanConfig.id === "qualified") {
            return (
                <WorkerQualifiedDashboard
                    name="Sarra Preview Worker"
                    trade="Solar installation"
                    workerReadiness={86}
                    yearsExperience="3-5 years"
                    location="Tunis, Tunisia"
                    currentlyAvailable="Yes"
                    tasksCount={4}
                    selectedPlanName={previewPlanConfig.name}
                    selectedPlanPrice={previewPlanConfig.price}
                    onGoHome={() => router.push("/")}
                    onDone={() => router.push("/to-sarra")}
                    onReset={() => router.push("/to-sarra")}
                />
            );
        }

        if (previewPlanConfig.id === "verified") {
            return (
                <WorkerVerifiedDashboard
                    name="Sarra Preview Worker"
                    workerReadiness={93}
                    selectedPlanName={previewPlanConfig.name}
                    selectedPlanPrice={previewPlanConfig.price}
                    onGoHome={() => router.push("/")}
                    onDone={() => router.push("/to-sarra")}
                    onReset={() => router.push("/to-sarra")}
                />
            );
        }
    }

    if (!showForm) {
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto space-y-10">
                    <div className="text-center">
                        <Badge className="mb-4 px-4 py-1.5 rounded-full bg-lime-100/80 text-lime-700 border-lime-200/50 text-sm">
                            <HardHat className="w-4 h-4 mr-2" />
                            Green Workers Space
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Build your career as a <span className="gradient-text">Green Worker</span></h1>
                        <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
                            Create your profile once, get discovered by green projects, and access training opportunities that improve your practical skills and employability.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Button size="lg" className="w-full sm:w-auto rounded-full px-8 py-6 bg-gradient-to-r from-lime-600 to-emerald-600 text-white" onClick={() => setShowForm(true)}>
                                Start Registration
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 py-6 border-lime-200 text-lime-700 hover:bg-lime-50">
                                Explore Opportunities
                            </Button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-6 space-y-3">
                                <div className="w-12 h-12 rounded-xl bg-lime-100 text-lime-700 flex items-center justify-center">
                                    <BriefcaseBusiness className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold">More Job Visibility</h3>
                                <p className="text-sm text-muted-foreground">
                                    Get your profile in front of companies and designers looking for skilled teams in sustainable construction.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-6 space-y-3">
                                <div className="w-12 h-12 rounded-xl bg-lime-100 text-lime-700 flex items-center justify-center">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold">Training and Upskilling</h3>
                                <p className="text-sm text-muted-foreground">
                                    Highlight your training needs and get matched to technical and green-building learning paths.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-6 space-y-3">
                                <div className="w-12 h-12 rounded-xl bg-lime-100 text-lime-700 flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold">Verified Skills Profile</h3>
                                <p className="text-sm text-muted-foreground">
                                    Share your trade, tools, and certifications to build trust with project owners and hiring teams.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="border-0 shadow-xl overflow-hidden">
                        <div className="h-1.5 bg-gradient-to-r from-lime-500 to-emerald-500" />
                        <CardContent className="p-8 space-y-6">
                            <h2 className="text-2xl font-bold">What you will complete in the form</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    {[
                                        "Personal details and location",
                                        "Trade, occupation, and years of experience",
                                        "Tasks you can perform on site",
                                        "Technical level and tools you use",
                                        "Training background and certifications",
                                    ].map((item) => (
                                        <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <CheckCircle2 className="w-4 h-4 text-lime-600 mt-0.5 shrink-0" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-3">
                                    {[
                                        "Availability and preferred work type",
                                        "Interest in green construction domains",
                                        "Preferred training format",
                                        "Optional CV, certificates, and portfolio links",
                                        "Final subscription selection",
                                    ].map((item) => (
                                        <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <CheckCircle2 className="w-4 h-4 text-lime-600 mt-0.5 shrink-0" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <Card className="border border-lime-100 shadow-sm">
                            <CardContent className="p-5 flex items-center gap-3">
                                <Users className="w-5 h-5 text-lime-600" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Network Access</p>
                                    <p className="font-semibold">Designers + Industries</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border border-lime-100 shadow-sm">
                            <CardContent className="p-5 flex items-center gap-3">
                                <Wrench className="w-5 h-5 text-lime-600" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Skills Focus</p>
                                    <p className="font-semibold">Practical Green Jobs</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border border-lime-100 shadow-sm">
                            <CardContent className="p-5 flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-lime-600" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Coverage</p>
                                    <p className="font-semibold">Local and National</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    if (submitted) {
        if (selectedPlan === "qualified") {
            return (
                <WorkerQualifiedDashboard
                    name={name}
                    trade={trade}
                    workerReadiness={workerReadiness}
                    yearsExperience={yearsExperience}
                    location={location}
                    currentlyAvailable={currentlyAvailable}
                    tasksCount={tasks.length}
                    selectedPlanName={selectedPlanConfig?.name}
                    selectedPlanPrice={selectedPlanConfig?.price}
                    onGoHome={() => router.push("/")}
                    onDone={done}
                    onReset={resetForm}
                />
            );
        }

        if (selectedPlan === "verified") {
            return (
                <WorkerVerifiedDashboard
                    name={name}
                    workerReadiness={workerReadiness}
                    selectedPlanName={selectedPlanConfig?.name}
                    selectedPlanPrice={selectedPlanConfig?.price}
                    onGoHome={() => router.push("/")}
                    onDone={done}
                    onReset={resetForm}
                />
            );
        }
    }

    return (
        <div className="ui-page-shell">
            <div className="ui-page-container-4xl">
                <PageIntro
                    accent="worker"
                    badge="Green Workers Space"
                    icon={HardHat}
                    title={
                        <>
                            Green Workers <span className="gradient-text">Registration Form</span>
                        </>
                    }
                    className="mb-10"
                />

                <StepProgress
                    accent="worker"
                    currentStep={formStep}
                    steps={workerSteps.map((label) => ({ label }))}
                    className="mb-10"
                    onStepSelect={moveToStep}
                />

                <WorkerRegistrationStepContent
                    formStep={formStep}
                    error={error}
                    isLoading={isLoading}
                    selectedPlan={selectedPlan}
                    selectedPlanName={selectedPlanConfig?.name}
                    selectedPlanPrice={selectedPlanConfig?.price}
                    selectedPlanError={Boolean(fieldErrors.selectedPlan)}
                    name={name}
                    phone={phone}
                    email={email}
                    location={location}
                    age={age}
                    occupation={occupation}
                    trade={trade}
                    otherTrade={otherTrade}
                    yearsExperience={yearsExperience}
                    tasks={tasks}
                    otherTask={otherTask}
                    workedOnSites={workedOnSites}
                    greenProjectExperience={greenProjectExperience}
                    tradeLevel={tradeLevel}
                    toolsMachines={toolsMachines}
                    technicalTraining={technicalTraining}
                    workerCertifications={workerCertifications}
                    currentlyAvailable={currentlyAvailable}
                    workType={workType}
                    mobility={mobility}
                    interestedInGreen={interestedInGreen}
                    greenInterestAreas={greenInterestAreas}
                    wantsTraining={wantsTraining}
                    preferredTrainingType={preferredTrainingType}
                    cvLink={cvLink}
                    workerCertificatesLink={workerCertificatesLink}
                    portfolioLink={portfolioLink}
                    consent={consent}
                    setName={setName}
                    setPhone={setPhone}
                    setEmail={setEmail}
                    setLocation={setLocation}
                    setAge={setAge}
                    setOccupation={setOccupation}
                    setTrade={setTrade}
                    setOtherTrade={setOtherTrade}
                    setYearsExperience={setYearsExperience}
                    setTasks={setTasks}
                    setOtherTask={setOtherTask}
                    setWorkedOnSites={setWorkedOnSites}
                    setGreenProjectExperience={setGreenProjectExperience}
                    setTradeLevel={setTradeLevel}
                    setToolsMachines={setToolsMachines}
                    setTechnicalTraining={setTechnicalTraining}
                    setWorkerCertifications={setWorkerCertifications}
                    setCurrentlyAvailable={setCurrentlyAvailable}
                    setWorkType={setWorkType}
                    setMobility={setMobility}
                    setInterestedInGreen={setInterestedInGreen}
                    setGreenInterestAreas={setGreenInterestAreas}
                    setWantsTraining={setWantsTraining}
                    setPreferredTrainingType={setPreferredTrainingType}
                    setCvLink={setCvLink}
                    setWorkerCertificatesLink={setWorkerCertificatesLink}
                    setPortfolioLink={setPortfolioLink}
                    setConsent={setConsent}
                    setSelectedPlan={setSelectedPlan}
                    toggleValue={toggleValue}
                    clearFieldError={clearFieldError}
                    getFieldClass={getFieldClass}
                    renderFieldError={renderFieldError}
                    onBack={() => formStep === 1 ? setShowForm(false) : setFormStep((currentStep) => Math.max(1, currentStep - 1))}
                    onNext={() => moveToStep(Math.min(5, formStep + 1))}
                    onSubmit={handleWorkerSubmit}
                />
            </div>
        </div>
    );
}
