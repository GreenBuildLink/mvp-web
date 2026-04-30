"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Compass,
    User,
    Briefcase,
    Target,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    FileText,
    Send,
    Sparkles,
    Loader2,
    Crown,
    Star,
    Zap,
} from "lucide-react";

const expertiseFields = ["Architecture", "Engineering", "Construction", "Design", "Student", "Other"];
const experienceOptions = ["0-1", "1-3", "3-5", "5+"];
const educationLevels = ["High School", "Bachelor", "Master", "Doctorate", "Other"];
const certificationOptions = ["LEED", "EDGE", "BREEAM", "HQE", "Other"];
const sustainableDesignLevels = ["Beginner", "Intermediate", "Advanced"];
const keySkillOptions = [
    "Sustainable design principles",
    "Energy modeling",
    "Project management",
    "Data analysis",
    "Site execution",
    "Other",
];
const objectiveOptions = ["Learn basics", "Get certified", "Find job opportunities", "Networking", "Work on real projects"];
const learningFormats = ["Online", "In-person", "Hybrid"];
const knowledgeOptions = ["No knowledge", "Basic understanding", "Intermediate", "Advanced", "Expert"];

const subscriptionPlans = [
    {
        id: "starter",
        name: "GB Starter Link",
        price: "EUR 0",
        icon: Star,
        color: "from-gray-400 to-gray-500",
        borderColor: "border-gray-200",
        features: ["Community profile", "Learning resources", "Directory visibility"],
    },
    {
        id: "professional",
        name: "GB Business Link",
        price: "EUR 29/month",
        icon: Zap,
        color: "from-emerald-500 to-teal-600",
        borderColor: "border-emerald-300",
        popular: true,
        features: ["Priority matching", "Advanced profile", "Exclusive opportunities"],
    },
    {
        id: "enterprise",
        name: "GB Premium Link",
        price: "EUR 79/month",
        icon: Crown,
        color: "from-amber-500 to-amber-600",
        borderColor: "border-amber-300",
        features: ["Top visibility", "Dedicated support", "Partner network access"],
    },
];

export default function NewProjectPage() {
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

    const [selectedPlan, setSelectedPlan] = useState("professional");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const toggleArrayValue = (value: string, setter: Dispatch<SetStateAction<string[]>>) => {
        setter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!consent) {
            setError("Please agree to data usage for placement and communication.");
            return;
        }

        setIsLoading(true);
        setError("");
        try {
            const res = await fetch("/api/waitlist", {
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
                    selectedPlan: subscriptionPlans.find((p) => p.id === selectedPlan)?.name ?? selectedPlan,
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
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <span className="text-muted-foreground">Name:</span>
                                <span className="font-medium">{fullName}</span>
                                <span className="text-muted-foreground">Expertise:</span>
                                <span className="font-medium">{expertiseField || "-"}</span>
                                <span className="text-muted-foreground">Plan:</span>
                                <span className="font-medium">{subscriptionPlans.find((p) => p.id === selectedPlan)?.name || "-"}</span>
                            </div>
                        </div>

                        <Button className="w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg" onClick={() => setSubmitted(false)}>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Done
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <Badge className="mb-4 px-4 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 text-sm">
                        <Compass className="w-4 h-4 mr-2" />
                        Green Designers Hub — Registration
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">Join as a <span className="gradient-text">Green Designer</span></h1>
                </div>

                <div className="flex items-center justify-center gap-2 mb-10">
                    {[
                        { n: 1, label: "Personal", icon: User },
                        { n: 2, label: "Background", icon: Briefcase },
                        { n: 3, label: "Goals", icon: Target },
                        { n: 4, label: "Availability", icon: CheckCircle2 },
                        { n: 5, label: "Subscription", icon: Crown },
                    ].map((s, i) => (
                        <div key={s.n} className="flex items-center gap-2">
                            <button onClick={() => setStep(s.n)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${step === s.n ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25" : step > s.n ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-muted text-muted-foreground"}`}>
                                <s.icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{s.label}</span>
                            </button>
                            {i < 4 && <div className={`w-8 h-0.5 rounded-full transition-colors duration-300 ${step > s.n ? "bg-emerald-500" : "bg-muted"}`} />}
                        </div>
                    ))}
                </div>

                {step === 1 && (
                    <Card className="border-0 shadow-xl animate-fade-in-up">
                        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-emerald-500" />Personal Information</CardTitle></CardHeader>
                        <CardContent className="space-y-5 pt-4">
                            <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                                <h3 className="font-semibold">1. Personal Information</h3>
                                <div className="space-y-2"><Label>Full name *</Label><Input placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label>Email address *</Label><Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                    <div className="space-y-2"><Label>Phone number *</Label><Input placeholder="+216 ..." value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label>Country *</Label><Input placeholder="Ex: Tunisia" value={country} onChange={(e) => setCountry(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                    <div className="space-y-2"><Label>City *</Label><Input placeholder="Ex: Tunis" value={city} onChange={(e) => setCity(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                </div>
                                <div className="space-y-2"><Label>Current position / job title *</Label><Input placeholder="Ex: Junior Architect" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                            </div>
                            <div className="flex justify-end pt-4"><Button className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8" onClick={() => setStep(2)}>Next<ArrowRight className="w-4 h-4 ml-2" /></Button></div>
                        </CardContent>
                    </Card>
                )}

                {step === 2 && (
                    <Card className="border-0 shadow-xl animate-fade-in-up">
                        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-emerald-500" />Professional Background</CardTitle></CardHeader>
                        <CardContent className="space-y-6 pt-4">
                            <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                                <h3 className="font-semibold">2. Professional Background</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label>Field of expertise *</Label><Select value={expertiseField} onValueChange={setExpertiseField}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select field" /></SelectTrigger><SelectContent>{expertiseFields.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent></Select></div>
                                    <div className="space-y-2"><Label>Years of experience *</Label><Select value={yearsExperience} onValueChange={setYearsExperience}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select range" /></SelectTrigger><SelectContent>{experienceOptions.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent></Select></div>
                                </div>
                                <div className="space-y-2"><Label>Current organization / company</Label><Input placeholder="Optional" value={organization} onChange={(e) => setOrganization(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                            </div>
                            <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                                <h3 className="font-semibold">3. Education & Certifications</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label>Highest level of education *</Label><Select value={educationLevel} onValueChange={setEducationLevel}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select level" /></SelectTrigger><SelectContent>{educationLevels.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent></Select></div>
                                    <div className="space-y-2"><Label>Your level in sustainable design *</Label><Select value={sustainableDesignLevel} onValueChange={setSustainableDesignLevel}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select level" /></SelectTrigger><SelectContent>{sustainableDesignLevels.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent></Select></div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Relevant certifications</Label>
                                    <div className="grid sm:grid-cols-2 gap-3">{certificationOptions.map((option) => (<label key={option} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={certifications.includes(option)} onChange={() => toggleArrayValue(option, setCertifications)} className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />{option}</label>))}</div>
                                    {certifications.includes("Other") && (<Input placeholder="Specify other certification" value={otherCertification} onChange={(e) => setOtherCertification(e.target.value)} className="rounded-xl h-12 border-emerald-200/50 mt-3" />)}
                                </div>
                            </div>
                            <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                                <h3 className="font-semibold">4. Skills & Competencies</h3>
                                <div className="space-y-2"><Label>Which tools do you use?</Label><Textarea placeholder="AutoCAD, Revit, SketchUp, Power BI, etc." value={tools} onChange={(e) => setTools(e.target.value)} className="rounded-xl min-h-[90px] border-emerald-200/50" /></div>
                                <div className="space-y-2">
                                    <Label>Key skills</Label>
                                    <div className="grid sm:grid-cols-2 gap-3">{keySkillOptions.map((option) => (<label key={option} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={keySkills.includes(option)} onChange={() => toggleArrayValue(option, setKeySkills)} className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />{option}</label>))}</div>
                                    {keySkills.includes("Other") && (<Input placeholder="Specify other key skill" value={otherKeySkill} onChange={(e) => setOtherKeySkill(e.target.value)} className="rounded-xl h-12 border-emerald-200/50 mt-3" />)}
                                </div>
                            </div>
                            <div className="flex justify-between pt-4"><Button variant="outline" className="rounded-full px-6" onClick={() => setStep(1)}><ArrowLeft className="w-4 h-4 mr-2" />Back</Button><Button className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8" onClick={() => setStep(3)}>Next<ArrowRight className="w-4 h-4 ml-2" /></Button></div>
                        </CardContent>
                    </Card>
                )}

                {step === 3 && (
                    <Card className="border-0 shadow-xl animate-fade-in-up">
                        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-emerald-500" />Experience, Goals & Expectations</CardTitle></CardHeader>
                        <CardContent className="space-y-6 pt-4">
                            <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                                <h3 className="font-semibold">5. Experience in Green Projects</h3>
                                <div className="space-y-2"><Label>Have you worked on sustainable projects? *</Label><div className="flex items-center gap-6"><label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="radio" name="greenProjectsWorked" checked={greenProjectsWorked === "Yes"} onChange={() => setGreenProjectsWorked("Yes")} />Yes</label><label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="radio" name="greenProjectsWorked" checked={greenProjectsWorked === "No"} onChange={() => setGreenProjectsWorked("No")} />No</label></div></div>
                                {greenProjectsWorked === "Yes" && <div className="space-y-2"><Label>If yes, describe briefly</Label><Textarea placeholder="Short description" value={greenProjectDescription} onChange={(e) => setGreenProjectDescription(e.target.value)} className="rounded-xl min-h-[90px] border-emerald-200/50" /></div>}
                                <div className="space-y-2"><Label>Type of projects</Label><Input placeholder="Residential, Commercial, Public..." value={projectTypes} onChange={(e) => setProjectTypes(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                <div className="space-y-2"><Label>Knowledge in sustainable construction *</Label><Select value={knowledgeLevel} onValueChange={setKnowledgeLevel}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select level" /></SelectTrigger><SelectContent>{knowledgeOptions.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent></Select></div>
                            </div>
                            <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                                <h3 className="font-semibold">6. Goals & Expectations</h3>
                                <div className="space-y-2"><Label>Why do you want to join Green Designers Hub? *</Label><Textarea placeholder="Share your motivation" value={joinReason} onChange={(e) => setJoinReason(e.target.value)} className="rounded-xl min-h-[100px] border-emerald-200/50" /></div>
                                <div className="space-y-2"><Label>Main objectives</Label><div className="grid sm:grid-cols-2 gap-3">{objectiveOptions.map((option) => (<label key={option} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={objectives.includes(option)} onChange={() => toggleArrayValue(option, setObjectives)} className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />{option}</label>))}</div></div>
                                <div className="space-y-2"><Label>Preferred learning format *</Label><Select value={learningFormat} onValueChange={setLearningFormat}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select format" /></SelectTrigger><SelectContent>{learningFormats.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent></Select></div>
                            </div>
                            <div className="flex justify-between pt-4"><Button variant="outline" className="rounded-full px-6" onClick={() => setStep(2)}><ArrowLeft className="w-4 h-4 mr-2" />Back</Button><Button className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8" onClick={() => setStep(4)}>Next<ArrowRight className="w-4 h-4 ml-2" /></Button></div>
                        </CardContent>
                    </Card>
                )}

                {step === 4 && (
                    <Card className="border-0 shadow-xl animate-fade-in-up">
                        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" />Availability, Portfolio & Consent</CardTitle></CardHeader>
                        <CardContent className="space-y-6 pt-4">
                            <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                                <h3 className="font-semibold">7. Availability & Commitment</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label>Availability per week *</Label><Input placeholder="Ex: 6 hours/week" value={availabilityPerWeek} onChange={(e) => setAvailabilityPerWeek(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                    <div className="space-y-2"><Label>Preferred schedule *</Label><Input placeholder="Ex: Weekday evenings" value={preferredSchedule} onChange={(e) => setPreferredSchedule(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                </div>
                            </div>
                            <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                                <h3 className="font-semibold">8. Portfolio</h3>
                                <div className="space-y-2"><Label>Portfolio / LinkedIn / social link</Label><Input placeholder="https://..." value={portfolioLink} onChange={(e) => setPortfolioLink(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                            </div>
                            <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                                <h3 className="font-semibold">9. Consent</h3>
                                <label className="flex items-start gap-3 text-sm text-muted-foreground"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" /><span>I agree to the use of my data for program placement and communication.</span></label>
                            </div>
                            <div className="flex justify-between pt-2"><Button variant="outline" className="rounded-full px-6" onClick={() => setStep(3)}><ArrowLeft className="w-4 h-4 mr-2" />Back</Button><Button className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8" onClick={() => setStep(5)}>Next<ArrowRight className="w-4 h-4 ml-2" /></Button></div>
                        </CardContent>
                    </Card>
                )}

                {step === 5 && (
                    <Card className="border-0 shadow-xl animate-fade-in-up">
                        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><Crown className="w-5 h-5 text-emerald-500" />Final. Subscription</CardTitle><CardDescription>Choose your plan, then submit your registration.</CardDescription></CardHeader>
                        <form onSubmit={handleSubmit}>
                            <CardContent className="space-y-6 pt-4">
                                <div className="grid md:grid-cols-3 gap-6">
                                    {subscriptionPlans.map((plan) => (
                                        <Card key={plan.id} className={`relative cursor-pointer border-2 transition-all duration-500 overflow-hidden ${selectedPlan === plan.id ? `${plan.borderColor} shadow-xl` : "border-transparent shadow-lg hover:shadow-xl"}`} onClick={() => setSelectedPlan(plan.id)}>
                                            {plan.popular && <Badge className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 text-xs"><Sparkles className="w-3 h-3 mr-1" />Popular</Badge>}
                                            <CardContent className="p-6">
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg mb-4`}><plan.icon className="w-6 h-6 text-white" /></div>
                                                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                                                <p className="text-2xl font-bold gradient-text mb-4">{plan.price}</p>
                                                <ul className="space-y-2">{plan.features.map((f) => <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{f}</li>)}</ul>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                                <div className="flex justify-between pt-2">
                                    <Button type="button" variant="outline" className="rounded-full px-6" onClick={() => setStep(4)} disabled={isLoading}><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>
                                    <Button type="submit" className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 shadow-lg shadow-emerald-500/20 text-base" disabled={isLoading}>
                                        {isLoading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Sending...</> : <><Send className="w-5 h-5 mr-2" />Submit Registration</>}
                                    </Button>
                                </div>
                            </CardContent>
                        </form>
                    </Card>
                )}
            </div>
        </div>
    );
}
