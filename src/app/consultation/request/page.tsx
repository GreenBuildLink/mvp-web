"use client";

import { FormEvent, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
    "Training",
];

const consultationSteps = [
    "Personal Information",
    "Project Information",
    "Required Service",
];

export default function ConsultationRequestPage() {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

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

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (requiredServices.length === 0) {
            setError("Please select at least one required service.");
            return;
        }
        if (!estimatedQuote) {
            setError("Please confirm estimated quote.");
            return;
        }

        setIsLoading(true);
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

    if (submitted) {
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
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
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <Badge className="mb-4 max-w-full whitespace-normal px-4 py-1.5 text-center text-sm leading-snug bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                        <Compass className="w-4 h-4 mr-2" />
                        Request Consultation
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                        Consultation <span className="gradient-text">Request Form</span>
                    </h1>
                </div>

                <div className="mb-8 space-y-4">
                    <div className="rounded-2xl border border-emerald-100 bg-card/80 p-4 shadow-sm sm:hidden">
                        <div className="mb-3 flex items-center justify-between gap-3 text-xs font-medium text-muted-foreground">
                            <span>Step {step} of {consultationSteps.length}</span>
                            <span className="text-right text-emerald-700">{consultationSteps[step - 1]}</span>
                        </div>
                        <div className="h-2 rounded-full bg-emerald-100">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 transition-all"
                                style={{ width: `${(step / consultationSteps.length) * 100}%` }}
                            />
                        </div>
                    </div>
                    <div className="hidden overflow-x-auto pb-2 sm:block">
                        <div className="flex w-max min-w-full items-center justify-start gap-2 sm:justify-center">
                            {consultationSteps.map((label, index) => {
                            const s = index + 1;
                            return (
                                <button
                                    key={label}
                                    type="button"
                                    onClick={() => setStep(s)}
                                    className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${step === s
                                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                                        : step > s
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    {s}. {label}
                                </button>
                            );
                        })}
                        </div>
                    </div>
                </div>

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
                                <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>First name *</Label>
                                            <Input placeholder="Ex: Sarah" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Last name *</Label>
                                            <Input placeholder="Ex: Ben Ali" value={lastName} onChange={(e) => setLastName(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Phone *</Label>
                                            <Input placeholder="Ex: +216 52 000 072" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Email *</Label>
                                            <Input type="email" placeholder="Ex: sarah@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Address *</Label>
                                            <Input placeholder="Ex: 45 Green Avenue, Tunis" value={address} onChange={(e) => setAddress(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Position *</Label>
                                            <Input placeholder="Ex: Project Manager" value={position} onChange={(e) => setPosition(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                                    <h3 className="font-semibold">Project location</h3>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label>Country *</Label>
                                            <Input placeholder="Ex: Tunisia" value={projectCountry} onChange={(e) => setProjectCountry(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>City *</Label>
                                            <Input placeholder="Ex: Sfax" value={projectCity} onChange={(e) => setProjectCity(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Climate zone *</Label>
                                            <Input placeholder="Ex: Hot semi-arid" value={climateZone} onChange={(e) => setClimateZone(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Project type *</Label>
                                            <Select value={projectType} onValueChange={setProjectType}>
                                                <SelectTrigger className="rounded-xl h-12 border-emerald-200/50">
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
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Project stage *</Label>
                                            <Select value={projectStage} onValueChange={setProjectStage}>
                                                <SelectTrigger className="rounded-xl h-12 border-emerald-200/50">
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
                                        </div>
                                    </div>

                                    <h3 className="font-semibold pt-2">Project size</h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Land area (m2) *</Label>
                                            <Input type="number" min="0" placeholder="Ex: 5000" value={landArea} onChange={(e) => setLandArea(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Built-up area (m2) *</Label>
                                            <Input type="number" min="0" placeholder="Ex: 3200" value={builtUpArea} onChange={(e) => setBuiltUpArea(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Timeline start date *</Label>
                                            <Input type="date" placeholder="YYYY-MM-DD" value={timelineStart} onChange={(e) => setTimelineStart(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Timeline delivery date *</Label>
                                            <Input type="date" placeholder="YYYY-MM-DD" value={timelineDelivery} onChange={(e) => setTimelineDelivery(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {requiredServiceOptions.map((option) => (
                                            <label key={option} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <input
                                                    type="checkbox"
                                                    checked={requiredServices.includes(option)}
                                                    onChange={() => toggleRequiredService(option)}
                                                    className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                    <label className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <input
                                            type="checkbox"
                                            checked={estimatedQuote}
                                            onChange={(e) => setEstimatedQuote(e.target.checked)}
                                            className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                        Estimated quote *
                                    </label>
                                </div>
                            )}

                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full rounded-full px-6 sm:w-auto"
                                    onClick={() => setStep((s) => Math.max(1, s - 1))}
                                    disabled={isLoading || step === 1}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                                {step < 3 ? (
                                    <Button
                                        type="button"
                                        className="w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 sm:w-auto"
                                        onClick={() => setStep((s) => Math.min(3, s + 1))}
                                    >
                                        Next
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 sm:w-auto" disabled={isLoading}>
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
