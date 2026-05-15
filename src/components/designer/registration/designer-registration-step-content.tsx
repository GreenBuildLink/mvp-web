import type { Dispatch, FormEvent, ReactNode, SetStateAction } from "react";

import {
    ArrowLeft,
    ArrowRight,
    Briefcase,
    CheckCircle2,
    Crown,
    Loader2,
    Send,
    Target,
    User,
} from "lucide-react";

import { PlanSelectedBanner } from "@/components/registration/plan-selected-banner";
import { PlanSelectionCards } from "@/components/registration/plan-selection-cards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    designerCertificationOptions,
    designerEducationLevels,
    designerExperienceOptions,
    designerExpertiseFields,
    designerKeySkillOptions,
    designerKnowledgeOptions,
    designerLearningFormats,
    designerObjectiveOptions,
    designerSteps,
    designerSubscriptionPlans,
    designerSustainableDesignLevels,
} from "@/lib/designer-registration";

interface DesignerRegistrationStepContentProps {
    step: number;
    error: string;
    isLoading: boolean;
    selectedPlan: string;
    selectedPlanName?: string;
    selectedPlanPrice?: string;
    selectedPlanError?: boolean;
    fullName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    jobTitle: string;
    expertiseField: string;
    yearsExperience: string;
    organization: string;
    educationLevel: string;
    certifications: string[];
    otherCertification: string;
    tools: string;
    sustainableDesignLevel: string;
    keySkills: string[];
    otherKeySkill: string;
    greenProjectsWorked: string;
    greenProjectDescription: string;
    projectTypes: string;
    knowledgeLevel: string;
    joinReason: string;
    objectives: string[];
    learningFormat: string;
    availabilityPerWeek: string;
    preferredSchedule: string;
    portfolioLink: string;
    consent: boolean;
    setFullName: (value: string) => void;
    setEmail: (value: string) => void;
    setPhone: (value: string) => void;
    setCountry: (value: string) => void;
    setCity: (value: string) => void;
    setJobTitle: (value: string) => void;
    setExpertiseField: (value: string) => void;
    setYearsExperience: (value: string) => void;
    setOrganization: (value: string) => void;
    setEducationLevel: (value: string) => void;
    setOtherCertification: (value: string) => void;
    setTools: (value: string) => void;
    setSustainableDesignLevel: (value: string) => void;
    setOtherKeySkill: (value: string) => void;
    setGreenProjectsWorked: (value: string) => void;
    setGreenProjectDescription: (value: string) => void;
    setProjectTypes: (value: string) => void;
    setKnowledgeLevel: (value: string) => void;
    setJoinReason: (value: string) => void;
    setLearningFormat: (value: string) => void;
    setAvailabilityPerWeek: (value: string) => void;
    setPreferredSchedule: (value: string) => void;
    setPortfolioLink: (value: string) => void;
    setConsent: (checked: boolean) => void;
    setSelectedPlan: (planId: string) => void;
    toggleArrayValue: (value: string, setter: Dispatch<SetStateAction<string[]>>) => void;
    setCertifications: Dispatch<SetStateAction<string[]>>;
    setKeySkills: Dispatch<SetStateAction<string[]>>;
    setObjectives: Dispatch<SetStateAction<string[]>>;
    clearFieldError: (field: string) => void;
    getFieldClass: (field: string, defaultClassName: string) => string;
    renderFieldError: (field: string) => ReactNode;
    onBack: () => void;
    onNext: () => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function DesignerRegistrationStepContent({
    step,
    error,
    isLoading,
    selectedPlan,
    selectedPlanName,
    selectedPlanPrice,
    selectedPlanError = false,
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
    setFullName,
    setEmail,
    setPhone,
    setCountry,
    setCity,
    setJobTitle,
    setExpertiseField,
    setYearsExperience,
    setOrganization,
    setEducationLevel,
    setOtherCertification,
    setTools,
    setSustainableDesignLevel,
    setOtherKeySkill,
    setGreenProjectsWorked,
    setGreenProjectDescription,
    setProjectTypes,
    setKnowledgeLevel,
    setJoinReason,
    setLearningFormat,
    setAvailabilityPerWeek,
    setPreferredSchedule,
    setPortfolioLink,
    setConsent,
    setSelectedPlan,
    toggleArrayValue,
    setCertifications,
    setKeySkills,
    setObjectives,
    clearFieldError,
    getFieldClass,
    renderFieldError,
    onBack,
    onNext,
    onSubmit,
}: DesignerRegistrationStepContentProps) {
    if (step === 5) {
        return (
            <Card className="border-0 shadow-xl animate-fade-in-up">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                        <Crown className="w-5 h-5 text-emerald-500" />
                        Final. Subscription
                    </CardTitle>
                    <CardDescription>Choose your plan, then submit your registration.</CardDescription>
                </CardHeader>
                <form onSubmit={onSubmit}>
                    <CardContent className="space-y-6 pt-4">
                        <PlanSelectedBanner
                            name={selectedPlanName}
                            price={selectedPlanPrice}
                        />
                        <PlanSelectionCards
                            plans={designerSubscriptionPlans}
                            selectedPlan={selectedPlan}
                            onSelect={(planId) => {
                                setSelectedPlan(planId);
                                clearFieldError("selectedPlan");
                            }}
                            className={selectedPlanError ? "rounded-2xl border border-red-500 p-3" : undefined}
                        />
                        {renderFieldError("selectedPlan")}
                        {error ? <p className="text-sm text-red-500 text-center">{error}</p> : null}
                        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
                            <Button type="button" variant="outline" className="w-full rounded-full px-6 sm:w-auto" onClick={onBack} disabled={isLoading}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                            <Button type="submit" className="w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 shadow-lg shadow-emerald-500/20 text-base sm:w-auto" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        Submit Registration
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </form>
            </Card>
        );
    }

    if (step === 1) {
        return (
            <Card className="border-0 shadow-xl animate-fade-in-up">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5 text-emerald-500" />
                        {designerSteps[0].label} Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 pt-4">
                    <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                        <h3 className="font-semibold">1. Personal Information</h3>
                        <div className="space-y-2"><Label>Full name *</Label><Input placeholder="Your full name" value={fullName} onChange={(event) => { setFullName(event.target.value); clearFieldError("fullName"); }} className={getFieldClass("fullName", "ui-field")} />{renderFieldError("fullName")}</div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>Email address *</Label><Input type="email" placeholder="your@email.com" value={email} onChange={(event) => { setEmail(event.target.value); clearFieldError("email"); }} className={getFieldClass("email", "ui-field")} />{renderFieldError("email")}</div>
                            <div className="space-y-2"><Label>Phone number *</Label><Input placeholder="+216 ..." value={phone} onChange={(event) => { setPhone(event.target.value); clearFieldError("phone"); }} className={getFieldClass("phone", "ui-field")} />{renderFieldError("phone")}</div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>Country *</Label><Input placeholder="Ex: Tunisia" value={country} onChange={(event) => { setCountry(event.target.value); clearFieldError("country"); }} className={getFieldClass("country", "ui-field")} />{renderFieldError("country")}</div>
                            <div className="space-y-2"><Label>City *</Label><Input placeholder="Ex: Tunis" value={city} onChange={(event) => { setCity(event.target.value); clearFieldError("city"); }} className={getFieldClass("city", "ui-field")} />{renderFieldError("city")}</div>
                        </div>
                        <div className="space-y-2"><Label>Current position / job title *</Label><Input placeholder="Ex: Junior Architect" value={jobTitle} onChange={(event) => { setJobTitle(event.target.value); clearFieldError("jobTitle"); }} className={getFieldClass("jobTitle", "ui-field")} />{renderFieldError("jobTitle")}</div>
                    </div>
                    {error ? <p className="text-center text-sm text-red-500">{error}</p> : null}
                    <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end"><Button className="ui-btn-brand w-full px-8 sm:w-auto" type="button" onClick={onNext}>Next<ArrowRight className="w-4 h-4 ml-2" /></Button></div>
                </CardContent>
            </Card>
        );
    }

    if (step === 2) {
        return (
            <Card className="border-0 shadow-xl animate-fade-in-up">
                <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-emerald-500" />Professional Background</CardTitle></CardHeader>
                <CardContent className="space-y-6 pt-4">
                    <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                        <h3 className="font-semibold">2. Professional Background</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>Field of expertise *</Label><Select value={expertiseField} onValueChange={(value) => { setExpertiseField(value); clearFieldError("expertiseField"); }}><SelectTrigger className={getFieldClass("expertiseField", "rounded-xl h-12 border-emerald-200/50")}><SelectValue placeholder="Select field" /></SelectTrigger><SelectContent>{designerExpertiseFields.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent></Select>{renderFieldError("expertiseField")}</div>
                            <div className="space-y-2"><Label>Years of experience *</Label><Select value={yearsExperience} onValueChange={(value) => { setYearsExperience(value); clearFieldError("yearsExperience"); }}><SelectTrigger className={getFieldClass("yearsExperience", "rounded-xl h-12 border-emerald-200/50")}><SelectValue placeholder="Select range" /></SelectTrigger><SelectContent>{designerExperienceOptions.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent></Select>{renderFieldError("yearsExperience")}</div>
                        </div>
                        <div className="space-y-2"><Label>Current organization / company</Label><Input placeholder="Optional" value={organization} onChange={(event) => setOrganization(event.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                    </div>
                    <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                        <h3 className="font-semibold">3. Education & Certifications</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>Highest level of education *</Label><Select value={educationLevel} onValueChange={(value) => { setEducationLevel(value); clearFieldError("educationLevel"); }}><SelectTrigger className={getFieldClass("educationLevel", "rounded-xl h-12 border-emerald-200/50")}><SelectValue placeholder="Select level" /></SelectTrigger><SelectContent>{designerEducationLevels.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent></Select>{renderFieldError("educationLevel")}</div>
                            <div className="space-y-2"><Label>Your level in sustainable design *</Label><Select value={sustainableDesignLevel} onValueChange={(value) => { setSustainableDesignLevel(value); clearFieldError("sustainableDesignLevel"); }}><SelectTrigger className={getFieldClass("sustainableDesignLevel", "rounded-xl h-12 border-emerald-200/50")}><SelectValue placeholder="Select level" /></SelectTrigger><SelectContent>{designerSustainableDesignLevels.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent></Select>{renderFieldError("sustainableDesignLevel")}</div>
                        </div>
                        <div className="space-y-2">
                            <Label>Relevant certifications</Label>
                            <div className="grid sm:grid-cols-2 gap-3">{designerCertificationOptions.map((option) => (<label key={option} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={certifications.includes(option)} onChange={() => { toggleArrayValue(option, setCertifications); if (option === "Other" && certifications.includes("Other")) clearFieldError("otherCertification"); }} className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />{option}</label>))}</div>
                            {certifications.includes("Other") ? (<><Input placeholder="Specify other certification" value={otherCertification} onChange={(event) => { setOtherCertification(event.target.value); clearFieldError("otherCertification"); }} className={getFieldClass("otherCertification", "rounded-xl h-12 border-emerald-200/50 mt-3")} />{renderFieldError("otherCertification")}</>) : null}
                        </div>
                    </div>
                    <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                        <h3 className="font-semibold">4. Skills & Competencies</h3>
                        <div className="space-y-2"><Label>Which tools do you use?</Label><Textarea placeholder="AutoCAD, Revit, SketchUp, Power BI, etc." value={tools} onChange={(event) => setTools(event.target.value)} className="rounded-xl min-h-[90px] border-emerald-200/50" /></div>
                        <div className="space-y-2">
                            <Label>Key skills</Label>
                            <div className="grid sm:grid-cols-2 gap-3">{designerKeySkillOptions.map((option) => (<label key={option} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={keySkills.includes(option)} onChange={() => { toggleArrayValue(option, setKeySkills); if (option === "Other" && keySkills.includes("Other")) clearFieldError("otherKeySkill"); }} className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />{option}</label>))}</div>
                            {keySkills.includes("Other") ? (<><Input placeholder="Specify other key skill" value={otherKeySkill} onChange={(event) => { setOtherKeySkill(event.target.value); clearFieldError("otherKeySkill"); }} className={getFieldClass("otherKeySkill", "rounded-xl h-12 border-emerald-200/50 mt-3")} />{renderFieldError("otherKeySkill")}</>) : null}
                        </div>
                    </div>
                    {error ? <p className="text-center text-sm text-red-500">{error}</p> : null}
                    <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-between"><Button variant="outline" className="w-full rounded-full px-6 sm:w-auto" type="button" onClick={onBack}><ArrowLeft className="w-4 h-4 mr-2" />Back</Button><Button className="w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 text-white sm:w-auto" type="button" onClick={onNext}>Next<ArrowRight className="w-4 h-4 ml-2" /></Button></div>
                </CardContent>
            </Card>
        );
    }

    if (step === 3) {
        return (
            <Card className="border-0 shadow-xl animate-fade-in-up">
                <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-emerald-500" />Experience, Goals & Expectations</CardTitle></CardHeader>
                <CardContent className="space-y-6 pt-4">
                    <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                        <h3 className="font-semibold">5. Experience in Green Projects</h3>
                        <div className="space-y-2"><Label>Have you worked on sustainable projects? *</Label><div className="flex items-center gap-6"><label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="radio" name="greenProjectsWorked" checked={greenProjectsWorked === "Yes"} onChange={() => { setGreenProjectsWorked("Yes"); clearFieldError("greenProjectsWorked"); }} />Yes</label><label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="radio" name="greenProjectsWorked" checked={greenProjectsWorked === "No"} onChange={() => { setGreenProjectsWorked("No"); clearFieldError("greenProjectsWorked"); }} />No</label></div>{renderFieldError("greenProjectsWorked")}</div>
                        {greenProjectsWorked === "Yes" ? <div className="space-y-2"><Label>If yes, describe briefly</Label><Textarea placeholder="Short description" value={greenProjectDescription} onChange={(event) => setGreenProjectDescription(event.target.value)} className="rounded-xl min-h-[90px] border-emerald-200/50" /></div> : null}
                        <div className="space-y-2"><Label>Type of projects</Label><Input placeholder="Residential, Commercial, Public..." value={projectTypes} onChange={(event) => setProjectTypes(event.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                        <div className="space-y-2"><Label>Knowledge in sustainable construction *</Label><Select value={knowledgeLevel} onValueChange={(value) => { setKnowledgeLevel(value); clearFieldError("knowledgeLevel"); }}><SelectTrigger className={getFieldClass("knowledgeLevel", "rounded-xl h-12 border-emerald-200/50")}><SelectValue placeholder="Select level" /></SelectTrigger><SelectContent>{designerKnowledgeOptions.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent></Select>{renderFieldError("knowledgeLevel")}</div>
                    </div>
                    <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                        <h3 className="font-semibold">6. Goals & Expectations</h3>
                        <div className="space-y-2"><Label>Why do you want to join Green Designers Hub? *</Label><Textarea placeholder="Share your motivation" value={joinReason} onChange={(event) => { setJoinReason(event.target.value); clearFieldError("joinReason"); }} className={getFieldClass("joinReason", "rounded-xl min-h-[100px] border-emerald-200/50")} />{renderFieldError("joinReason")}</div>
                        <div className="space-y-2"><Label>Main objectives</Label><div className="grid sm:grid-cols-2 gap-3">{designerObjectiveOptions.map((option) => (<label key={option} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={objectives.includes(option)} onChange={() => toggleArrayValue(option, setObjectives)} className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />{option}</label>))}</div></div>
                        <div className="space-y-2"><Label>Preferred learning format *</Label><Select value={learningFormat} onValueChange={(value) => { setLearningFormat(value); clearFieldError("learningFormat"); }}><SelectTrigger className={getFieldClass("learningFormat", "rounded-xl h-12 border-emerald-200/50")}><SelectValue placeholder="Select format" /></SelectTrigger><SelectContent>{designerLearningFormats.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent></Select>{renderFieldError("learningFormat")}</div>
                    </div>
                    {error ? <p className="text-center text-sm text-red-500">{error}</p> : null}
                    <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-between"><Button variant="outline" className="w-full rounded-full px-6 sm:w-auto" type="button" onClick={onBack}><ArrowLeft className="w-4 h-4 mr-2" />Back</Button><Button className="w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 text-white sm:w-auto" type="button" onClick={onNext}>Next<ArrowRight className="w-4 h-4 ml-2" /></Button></div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-0 shadow-xl animate-fade-in-up">
            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" />Availability, Portfolio & Consent</CardTitle></CardHeader>
            <CardContent className="space-y-6 pt-4">
                <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                    <h3 className="font-semibold">7. Availability & Commitment</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Availability per week *</Label><Input placeholder="Ex: 6 hours/week" value={availabilityPerWeek} onChange={(event) => { setAvailabilityPerWeek(event.target.value); clearFieldError("availabilityPerWeek"); }} className={getFieldClass("availabilityPerWeek", "rounded-xl h-12 border-emerald-200/50")} />{renderFieldError("availabilityPerWeek")}</div>
                        <div className="space-y-2"><Label>Preferred schedule *</Label><Input placeholder="Ex: Weekday evenings" value={preferredSchedule} onChange={(event) => { setPreferredSchedule(event.target.value); clearFieldError("preferredSchedule"); }} className={getFieldClass("preferredSchedule", "rounded-xl h-12 border-emerald-200/50")} />{renderFieldError("preferredSchedule")}</div>
                    </div>
                </div>
                <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                    <h3 className="font-semibold">8. Portfolio</h3>
                    <div className="space-y-2"><Label>Portfolio / LinkedIn / social link</Label><Input placeholder="https://..." value={portfolioLink} onChange={(event) => setPortfolioLink(event.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                </div>
                <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                    <h3 className="font-semibold">9. Consent *</h3>
                    <label className="flex items-start gap-3 text-sm text-muted-foreground"><input type="checkbox" checked={consent} onChange={(event) => { setConsent(event.target.checked); clearFieldError("consent"); }} className="mt-0.5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" /><span>I agree to the use of my data for program placement and communication.</span></label>
                    {renderFieldError("consent")}
                </div>
                {error ? <p className="text-center text-sm text-red-500">{error}</p> : null}
                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between"><Button variant="outline" className="w-full rounded-full px-6 sm:w-auto" type="button" onClick={onBack}><ArrowLeft className="w-4 h-4 mr-2" />Back</Button><Button className="w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 text-white sm:w-auto" type="button" onClick={onNext}>Next<ArrowRight className="w-4 h-4 ml-2" /></Button></div>
            </CardContent>
        </Card>
    );
}
