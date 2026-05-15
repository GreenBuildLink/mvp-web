"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageIntro } from "@/components/ui/page-intro";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { StepProgress } from "@/components/ui/step-progress";
import { cn } from "@/lib/utils";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Compass,
    Loader2,
    Send,
} from "lucide-react";

const projectTypeOptions = [
    "Residential",
    "Office",
    "Hospital",
    "School",
    "Commercial",
    "Mixed-use",
    "Industrial",
    "Other",
];

const projectStageOptions = [
    "Concept",
    "Design",
    "Construction",
    "Existing building (retrofit)",
];

const requiredServiceOptions = [
    "Environmental Design",
    "Environmental impact study",
    "Energy Efficiency",
    "Energy simulation",
    "Material Consulting",
    "Green Building Consulting",
    "Green Building Certification (LEED, EDGE, HQE, BREEAM)",
    "Assistance / Training",
];

const consultationSteps = [
    "Personal Information",
    "Project Information",
    "Required Service",
];

function hasText(value: string) {
    return value.trim().length > 0;
}

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

type FieldErrors = Record<string, string>;

export default function ConsultationRequestPage() {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [position, setPosition] = useState("");

    const [projectCountry, setProjectCountry] = useState("");
    const [projectCity, setProjectCity] = useState("");
    const [climateZone, setClimateZone] = useState("");
    const [projectType, setProjectType] = useState("");
    const [projectStage, setProjectStage] = useState("");
    const [landArea, setLandArea] = useState("");
    const [builtUpArea, setBuiltUpArea] = useState("");
    const [timelineStart, setTimelineStart] = useState("");
    const [timelineDelivery, setTimelineDelivery] = useState("");

    const [requiredServices, setRequiredServices] = useState<string[]>([]);
    const [estimatedQuote, setEstimatedQuote] = useState(false);

    const toggleRequiredService = (service: string) => {
        setRequiredServices((prev) =>
            prev.includes(service)
                ? prev.filter((item) => item !== service)
                : [...prev, service],
        );
    };

    const getStepErrors = (stepNumber: number) => {
        if (stepNumber === 1) {
            const errors: FieldErrors = {};

            if (!hasText(firstName)) errors.firstName = "First name is required.";
            if (!hasText(lastName)) errors.lastName = "Last name is required.";
            if (!hasText(phone)) errors.phone = "Phone is required.";
            if (!hasText(email)) {
                errors.email = "Email is required.";
            } else if (!isValidEmail(email)) {
                errors.email = "Enter a valid email address.";
            }
            if (!hasText(address)) errors.address = "Address is required.";
            if (!hasText(position)) errors.position = "Position is required.";

            return errors;
        }

        if (stepNumber === 2) {
            const errors: FieldErrors = {};

            if (!hasText(projectCountry)) errors.projectCountry = "Country is required.";
            if (!hasText(projectCity)) errors.projectCity = "City is required.";
            if (!hasText(climateZone)) errors.climateZone = "Climate zone is required.";
            if (!hasText(projectType)) errors.projectType = "Project type is required.";
            if (!hasText(projectStage)) errors.projectStage = "Project stage is required.";
            if (!hasText(landArea)) errors.landArea = "Land area is required.";
            if (!hasText(builtUpArea)) errors.builtUpArea = "Built-up area is required.";
            if (!hasText(timelineStart)) errors.timelineStart = "Timeline start date is required.";
            if (!hasText(timelineDelivery)) errors.timelineDelivery = "Timeline delivery date is required.";

            return errors;
        }

        if (stepNumber === 3) {
            const errors: FieldErrors = {};

            if (requiredServices.length === 0) {
                errors.requiredServices = "Please select at least one required service.";
            }

            if (!estimatedQuote) {
                errors.estimatedQuote = "Please confirm estimated quote.";
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

        for (let stepNumber = 1; stepNumber < targetStep; stepNumber += 1) {
            const stepErrors = getStepErrors(stepNumber);

            if (Object.keys(stepErrors).length > 0) {
                setFieldErrors(stepErrors);
                setStep(stepNumber);
                return;
            }
        }

        setFieldErrors({});
        setError("");
        setStep(targetStep);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        for (const stepNumber of [1, 2, 3]) {
            const stepErrors = getStepErrors(stepNumber);

            if (Object.keys(stepErrors).length > 0) {
                setFieldErrors(stepErrors);
                setStep(stepNumber);
                return;
            }
        }

        setIsLoading(true);
        setFieldErrors({});
        setError("");

        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "consultation",
                    firstName,
                    lastName,
                    phone,
                    email,
                    address,
                    position,
                    projectCountry,
                    projectCity,
                    climateZone,
                    projectType,
                    projectStage,
                    landArea,
                    builtUpArea,
                    timelineStart,
                    timelineDelivery,
                    requiredServices,
                    estimatedQuote,
                }),
            });

            if (!res.ok) throw new Error();
            setSubmitted(true);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

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

    const renderFieldError = (field: string) =>
        fieldErrors[field] ? <p className="text-sm text-red-500">{fieldErrors[field]}</p> : null;

    if (submitted) {
        return (
            <div className="ui-page-shell-centered">
                <Card className="max-w-lg w-full border-0 shadow-2xl animate-scale-in">
                    <CardContent className="p-10 text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30">
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3">Consultation request submitted</h2>
                        <p className="text-muted-foreground">
                            Your request has been received. Our team will contact you shortly.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="ui-page-shell">
            <div className="ui-page-container-4xl">
                <PageIntro
                    badge="Request Consultation"
                    icon={Compass}
                    title={
                        <>
                            Consultation <span className="gradient-text">Request Form</span>
                        </>
                    }
                    className="mb-8"
                />

                <StepProgress
                    currentStep={step}
                    steps={consultationSteps.map((label) => ({ label }))}
                    className="mb-8"
                    onStepSelect={moveToStep}
                />

                <form onSubmit={handleSubmit}>
                    <Card className="border-0 shadow-xl">
                        <CardHeader className="pb-2">
                            <CardTitle>
                                {step === 1
                                    ? "1. Personal Information"
                                    : step === 2
                                        ? "2. Project Information"
                                        : "3. Required Service"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-4">
                            {step === 1 && (
                                <div className="ui-form-section">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>First name *</Label>
                                            <Input placeholder="Ex: Sarah" value={firstName} onChange={(e) => { setFirstName(e.target.value); clearFieldError("firstName"); }} className={getFieldClass("firstName", "ui-field")} />
                                            {renderFieldError("firstName")}
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Last name *</Label>
                                            <Input placeholder="Ex: Ben Ali" value={lastName} onChange={(e) => { setLastName(e.target.value); clearFieldError("lastName"); }} className={getFieldClass("lastName", "ui-field")} />
                                            {renderFieldError("lastName")}
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Phone *</Label>
                                            <Input placeholder="Ex: +216 52 000 072" value={phone} onChange={(e) => { setPhone(e.target.value); clearFieldError("phone"); }} className={getFieldClass("phone", "ui-field")} />
                                            {renderFieldError("phone")}
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Email *</Label>
                                            <Input type="email" placeholder="Ex: sarah@company.com" value={email} onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }} className={getFieldClass("email", "ui-field")} />
                                            {renderFieldError("email")}
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Address *</Label>
                                            <Input placeholder="Ex: 45 Green Avenue, Tunis" value={address} onChange={(e) => { setAddress(e.target.value); clearFieldError("address"); }} className={getFieldClass("address", "ui-field")} />
                                            {renderFieldError("address")}
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Position *</Label>
                                            <Input placeholder="Ex: Project Manager" value={position} onChange={(e) => { setPosition(e.target.value); clearFieldError("position"); }} className={getFieldClass("position", "ui-field")} />
                                            {renderFieldError("position")}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="ui-form-section">
                                    <h3 className="font-semibold">Project location</h3>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label>Country *</Label>
                                            <Input placeholder="Ex: Tunisia" value={projectCountry} onChange={(e) => { setProjectCountry(e.target.value); clearFieldError("projectCountry"); }} className={getFieldClass("projectCountry", "ui-field")} />
                                            {renderFieldError("projectCountry")}
                                        </div>
                                        <div className="space-y-2">
                                            <Label>City *</Label>
                                            <Input placeholder="Ex: Sfax" value={projectCity} onChange={(e) => { setProjectCity(e.target.value); clearFieldError("projectCity"); }} className={getFieldClass("projectCity", "ui-field")} />
                                            {renderFieldError("projectCity")}
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Climate zone *</Label>
                                            <Input placeholder="Ex: Hot semi-arid" value={climateZone} onChange={(e) => { setClimateZone(e.target.value); clearFieldError("climateZone"); }} className={getFieldClass("climateZone", "ui-field")} />
                                            {renderFieldError("climateZone")}
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Project type *</Label>
                                            <Select value={projectType} onValueChange={(value) => { setProjectType(value); clearFieldError("projectType"); }}>
                                                <SelectTrigger className={getFieldClass("projectType", "ui-field")}>
                                                    <SelectValue placeholder="Select project type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {projectTypeOptions.map((option) => (
                                                        <SelectItem key={option} value={option}>
                                                            {option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {renderFieldError("projectType")}
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Project stage *</Label>
                                            <Select value={projectStage} onValueChange={(value) => { setProjectStage(value); clearFieldError("projectStage"); }}>
                                                <SelectTrigger className={getFieldClass("projectStage", "ui-field")}>
                                                    <SelectValue placeholder="Select project stage" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {projectStageOptions.map((option) => (
                                                        <SelectItem key={option} value={option}>
                                                            {option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {renderFieldError("projectStage")}
                                        </div>
                                    </div>

                                    <h3 className="font-semibold pt-2">Project size</h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Land area (m2) *</Label>
                                            <Input type="number" min="0" placeholder="Ex: 5000" value={landArea} onChange={(e) => { setLandArea(e.target.value); clearFieldError("landArea"); }} className={getFieldClass("landArea", "ui-field")} />
                                            {renderFieldError("landArea")}
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Built-up area (m2) *</Label>
                                            <Input type="number" min="0" placeholder="Ex: 3200" value={builtUpArea} onChange={(e) => { setBuiltUpArea(e.target.value); clearFieldError("builtUpArea"); }} className={getFieldClass("builtUpArea", "ui-field")} />
                                            {renderFieldError("builtUpArea")}
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Timeline start date *</Label>
                                            <Input type="date" placeholder="YYYY-MM-DD" value={timelineStart} onChange={(e) => { setTimelineStart(e.target.value); clearFieldError("timelineStart"); }} className={getFieldClass("timelineStart", "ui-field")} />
                                            {renderFieldError("timelineStart")}
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Timeline delivery date *</Label>
                                            <Input type="date" placeholder="YYYY-MM-DD" value={timelineDelivery} onChange={(e) => { setTimelineDelivery(e.target.value); clearFieldError("timelineDelivery"); }} className={getFieldClass("timelineDelivery", "ui-field")} />
                                            {renderFieldError("timelineDelivery")}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="ui-form-section">
                                    <div className={cn(
                                        "grid sm:grid-cols-2 gap-3 rounded-xl border border-emerald-100 p-4",
                                        fieldErrors.requiredServices && "border-red-500",
                                    )}>
                                        {requiredServiceOptions.map((option) => (
                                            <label key={option} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <input
                                                    type="checkbox"
                                                    checked={requiredServices.includes(option)}
                                                    onChange={() => {
                                                        toggleRequiredService(option);
                                                        clearFieldError("requiredServices");
                                                    }}
                                                    className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                    {renderFieldError("requiredServices")}
                                    <div className={cn(
                                        "rounded-xl border border-emerald-100 p-4",
                                        fieldErrors.estimatedQuote && "border-red-500",
                                    )}>
                                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <input
                                                type="checkbox"
                                                checked={estimatedQuote}
                                                onChange={(e) => {
                                                    setEstimatedQuote(e.target.checked);
                                                    clearFieldError("estimatedQuote");
                                                }}
                                                className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                                            />
                                            Estimated quote
                                        </label>
                                    </div>
                                    {renderFieldError("estimatedQuote")}
                                </div>
                            )}

                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full rounded-full px-6 sm:w-auto"
                                    onClick={() => {
                                        setFieldErrors({});
                                        setStep((s) => Math.max(1, s - 1));
                                    }}
                                    disabled={isLoading || step === 1}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                                {step < 3 ? (
                                    <Button
                                        type="button"
                                        className="ui-btn-brand w-full px-8 sm:w-auto"
                                        onClick={() => moveToStep(Math.min(3, step + 1))}
                                    >
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
                                                <Send className="w-5 h-5 mr-2" />
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
