"use client";

import { FormEvent, useState } from "react";
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
    HardHat,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Send,
    Loader2,
    Crown,
    Star,
    Zap,
    Sparkles,
    ShieldCheck,
    Wrench,
    GraduationCap,
    BriefcaseBusiness,
    Users,
    MapPin,
} from "lucide-react";

const workerOccupations = ["Worker", "Technician", "Installer", "Supervisor", "Student", "Unemployed"];
const workerTrades = ["Masonry", "Electrical", "Plumbing", "HVAC", "Solar installation", "Insulation works", "Other"];
const workerExperienceOptions = ["0-1", "1-3", "3-5", "5+"];
const taskOptions = ["Reading plans", "Equipment installation", "Maintenance", "Site execution", "Safety procedures", "Other"];
const tradeLevelOptions = ["Beginner", "Intermediate", "Skilled worker", "Supervisor"];
const workTypeOptions = ["Full-time", "Part-time", "Freelance / Missions"];
const mobilityOptions = ["Local only", "National"];
const greenAreas = ["Solar energy", "Energy efficiency", "Green materials", "Smart buildings"];
const trainingTypeOptions = ["Practical (on-site)", "Short courses", "Certification programs"];

const workerSubscriptionPlans = [
    {
        id: "starter",
        name: "GB Starter Link",
        price: "EUR 0",
        icon: Star,
        color: "from-gray-400 to-gray-500",
        borderColor: "border-gray-200",
        features: ["Basic worker profile", "Directory visibility", "Community updates"],
    },
    {
        id: "professional",
        name: "GB Business Link",
        price: "EUR 19/month",
        icon: Zap,
        color: "from-lime-500 to-emerald-600",
        borderColor: "border-lime-300",
        popular: true,
        features: ["Priority project matching", "Highlighted profile", "Training priority"],
    },
    {
        id: "enterprise",
        name: "GB Premium Link",
        price: "EUR 49/month",
        icon: Crown,
        color: "from-amber-500 to-amber-600",
        borderColor: "border-amber-300",
        features: ["Top listing visibility", "Premium support", "Partnership opportunities"],
    },
];

function toggleValue(value: string, items: string[], setItems: (next: string[]) => void) {
    setItems(items.includes(value) ? items.filter((item) => item !== value) : [...items, value]);
}

export default function WorkersPage() {
    const [showForm, setShowForm] = useState(false);
    const [formStep, setFormStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

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
    const [selectedPlan, setSelectedPlan] = useState("professional");

    const handleWorkerSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!consent) {
            setError("Please agree to share data for job opportunities and training.");
            return;
        }
        setIsLoading(true);
        setError("");
        try {
            const res = await fetch("/api/waitlist", {
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
                    selectedPlan: workerSubscriptionPlans.find((p) => p.id === selectedPlan)?.name ?? selectedPlan,
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

    if (!showForm) {
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto space-y-10">
                    <div className="text-center">
                        <Badge className="mb-4 px-4 py-1.5 rounded-full bg-lime-100/80 text-lime-700 border-lime-200/50 text-sm">
                            <HardHat className="w-4 h-4 mr-2" />
                            Green Workers Space
                        </Badge>
                        <h1 className="text-4xl font-bold mb-4">Build your career as a <span className="gradient-text">Green Worker</span></h1>
                        <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
                            Create your profile once, get discovered by green projects, and access training opportunities that improve your practical skills and employability.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Button size="lg" className="rounded-full px-8 py-6 bg-gradient-to-r from-lime-600 to-emerald-600 text-white" onClick={() => setShowForm(true)}>
                                Start Registration
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 border-lime-200 text-lime-700 hover:bg-lime-50">
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
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
                <Card className="max-w-md w-full border-0 shadow-2xl animate-scale-in">
                    <CardContent className="p-10 text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-lime-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-lime-500/30">
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3">Registration submitted!</h2>
                        <p className="text-muted-foreground mb-6">Your worker profile has been submitted successfully.</p>
                        <Button className="w-full rounded-full bg-gradient-to-r from-lime-600 to-emerald-600 text-white shadow-lg" onClick={() => { setSubmitted(false); setShowForm(false); setFormStep(1); }}>
                            Back to Green Workers
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
                    <Badge className="mb-4 px-4 py-1.5 rounded-full bg-lime-100/80 text-lime-700 border-lime-200/50 text-sm">
                        <HardHat className="w-4 h-4 mr-2" />
                        Green Workers Space
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">Green Workers <span className="gradient-text">Registration Form</span></h1>
                </div>

                <div className="flex items-center justify-center gap-2 mb-10">
                    {["Personal", "Profile", "Skills", "Training", "Subscription"].map((label, index) => {
                        const s = index + 1;
                        return (
                            <div key={label} className="flex items-center gap-2">
                                <button onClick={() => setFormStep(s)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formStep === s ? "bg-gradient-to-r from-lime-600 to-emerald-600 text-white" : formStep > s ? "bg-lime-100 text-lime-700" : "bg-muted text-muted-foreground"}`}>
                                    {s}. {label}
                                </button>
                                {index < 4 && <div className={`w-8 h-0.5 rounded-full ${formStep > s ? "bg-lime-500" : "bg-muted"}`} />}
                            </div>
                        );
                    })}
                </div>

                <Card className="border-0 shadow-xl">
                    <form onSubmit={handleWorkerSubmit}>
                        <CardHeader className="pb-2">
                            <CardTitle>{formStep === 5 ? "Final. Subscription" : "Green Workers Multi-Step Form"}</CardTitle>
                            <CardDescription>{formStep < 5 ? "Subsections follow PDF pages 10-13." : "Choose a plan then submit."}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            {formStep === 1 && (
                                <div className="rounded-xl border border-lime-100 p-4 space-y-4">
                                    <h3 className="font-semibold">1. Personal Information</h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2"><Label>Full Name *</Label><Input placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                        <div className="space-y-2"><Label>Phone Number *</Label><Input placeholder="+216 ..." value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2"><Label>Email *</Label><Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                        <div className="space-y-2"><Label>City / Region *</Label><Input placeholder="Ex: Tunis / Ariana" value={location} onChange={(e) => setLocation(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                    </div>
                                    <div className="space-y-2"><Label>Age (optional)</Label><Input placeholder="Ex: 29" value={age} onChange={(e) => setAge(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                </div>
                            )}

                            {formStep === 2 && (
                                <div className="rounded-xl border border-lime-100 p-4 space-y-4">
                                    <h3 className="font-semibold">2. Professional Profile</h3>
                                    <div className="space-y-2"><Label>Current occupation</Label><Select value={occupation} onValueChange={setOccupation}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select occupation" /></SelectTrigger><SelectContent>{workerOccupations.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div>
                                    <div className="space-y-2"><Label>Trade</Label><Select value={trade} onValueChange={setTrade}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select trade" /></SelectTrigger><SelectContent>{workerTrades.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div>
                                    {trade === "Other" && <div className="space-y-2"><Label>Other (specify)</Label><Input placeholder="Specify your trade" value={otherTrade} onChange={(e) => setOtherTrade(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>}
                                    <div className="space-y-2"><Label>Years of experience</Label><Select value={yearsExperience} onValueChange={setYearsExperience}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select range" /></SelectTrigger><SelectContent>{workerExperienceOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div>
                                </div>
                            )}

                            {formStep === 3 && (
                                <>
                                    <div className="rounded-xl border border-lime-100 p-4 space-y-4">
                                        <h3 className="font-semibold">3. Skills & Practical Experience</h3>
                                        <div className="space-y-2"><Label>What tasks can you perform?</Label><div className="grid sm:grid-cols-2 gap-3">{taskOptions.map((option) => <label key={option} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={tasks.includes(option)} onChange={() => toggleValue(option, tasks, setTasks)} className="rounded border-lime-300 text-lime-600 focus:ring-lime-500" />{option}</label>)}</div></div>
                                        {tasks.includes("Other") && <div className="space-y-2"><Label>Other task</Label><Input placeholder="Specify other task" value={otherTask} onChange={(e) => setOtherTask(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>}
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2"><Label>Have you worked on construction sites?</Label><Select value={workedOnSites} onValueChange={setWorkedOnSites}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select></div>
                                            <div className="space-y-2"><Label>Experience in green/sustainable projects?</Label><Select value={greenProjectExperience} onValueChange={setGreenProjectExperience}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select></div>
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-lime-100 p-4 space-y-4">
                                        <h3 className="font-semibold">4. Technical Skills Level</h3>
                                        <div className="space-y-2"><Label>Your level in your trade</Label><Select value={tradeLevel} onValueChange={setTradeLevel}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select level" /></SelectTrigger><SelectContent>{tradeLevelOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div>
                                        <div className="space-y-2"><Label>Do you use any tools or machines? (specify)</Label><Textarea placeholder="List tools/machines you use" value={toolsMachines} onChange={(e) => setToolsMachines(e.target.value)} className="rounded-xl min-h-[90px] border-emerald-200/50" /></div>
                                    </div>
                                </>
                            )}

                            {formStep === 4 && (
                                <>
                                    <div className="rounded-xl border border-lime-100 p-4 space-y-4">
                                        <h3 className="font-semibold">5. Certifications & Training</h3>
                                        <div className="space-y-2"><Label>Any technical training completed?</Label><Textarea placeholder="Describe completed training" value={technicalTraining} onChange={(e) => setTechnicalTraining(e.target.value)} className="rounded-xl min-h-[90px] border-emerald-200/50" /></div>
                                        <div className="space-y-2"><Label>Certifications (if any)</Label><Input placeholder="Safety, Electrical, HVAC, Solar, etc." value={workerCertifications} onChange={(e) => setWorkerCertifications(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                    </div>
                                    <div className="rounded-xl border border-lime-100 p-4 space-y-4">
                                        <h3 className="font-semibold">6. Availability & Work Preferences</h3>
                                        <div className="grid sm:grid-cols-3 gap-4">
                                            <div className="space-y-2"><Label>Currently available for work?</Label><Select value={currentlyAvailable} onValueChange={setCurrentlyAvailable}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select></div>
                                            <div className="space-y-2"><Label>Type of work</Label><Select value={workType} onValueChange={setWorkType}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent>{workTypeOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div>
                                            <div className="space-y-2"><Label>Mobility</Label><Select value={mobility} onValueChange={setMobility}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select mobility" /></SelectTrigger><SelectContent>{mobilityOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div>
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-lime-100 p-4 space-y-4">
                                        <h3 className="font-semibold">7. Interest in Green Construction</h3>
                                        <div className="space-y-2"><Label>Interested in sustainable / green construction?</Label><Select value={interestedInGreen} onValueChange={setInterestedInGreen}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select></div>
                                        <div className="space-y-2"><Label>Which areas interest you?</Label><div className="grid sm:grid-cols-2 gap-3">{greenAreas.map((option) => <label key={option} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={greenInterestAreas.includes(option)} onChange={() => toggleValue(option, greenInterestAreas, setGreenInterestAreas)} className="rounded border-lime-300 text-lime-600 focus:ring-lime-500" />{option}</label>)}</div></div>
                                    </div>
                                    <div className="rounded-xl border border-lime-100 p-4 space-y-4">
                                        <h3 className="font-semibold">8. Training Needs</h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2"><Label>Do you want training?</Label><Select value={wantsTraining} onValueChange={setWantsTraining}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select></div>
                                            <div className="space-y-2"><Label>Preferred training type</Label><Select value={preferredTrainingType} onValueChange={setPreferredTrainingType}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent>{trainingTypeOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div>
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-lime-100 p-4 space-y-4">
                                        <h3 className="font-semibold">9. Documents (Optional but powerful)</h3>
                                        <div className="space-y-2"><Label>Upload CV (if available)</Label><Input placeholder="Paste CV link" value={cvLink} onChange={(e) => setCvLink(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                        <div className="space-y-2"><Label>Upload certifications</Label><Input placeholder="Paste certifications link" value={workerCertificatesLink} onChange={(e) => setWorkerCertificatesLink(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                        <div className="space-y-2"><Label>Portfolio / photos of previous work</Label><Input placeholder="Paste portfolio/photos link" value={portfolioLink} onChange={(e) => setPortfolioLink(e.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                    </div>
                                    <div className="rounded-xl border border-lime-100 p-4 space-y-4">
                                        <h3 className="font-semibold">10. Consent</h3>
                                        <label className="flex items-start gap-3 text-sm text-muted-foreground"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 rounded border-lime-300 text-lime-600 focus:ring-lime-500" /><span>Agreement to share data for job opportunities and training.</span></label>
                                    </div>
                                </>
                            )}

                            {formStep === 5 && (
                                <div className="grid md:grid-cols-3 gap-6">
                                    {workerSubscriptionPlans.map((plan) => (
                                        <Card key={plan.id} className={`relative cursor-pointer border-2 transition-all duration-500 overflow-hidden ${selectedPlan === plan.id ? `${plan.borderColor} shadow-xl` : "border-transparent shadow-lg hover:shadow-xl"}`} onClick={() => setSelectedPlan(plan.id)}>
                                            {plan.popular && <Badge className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-lime-500 to-emerald-500 text-white border-0 text-xs"><Sparkles className="w-3 h-3 mr-1" />Popular</Badge>}
                                            <CardContent className="p-6">
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg mb-4`}><plan.icon className="w-6 h-6 text-white" /></div>
                                                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                                                <p className="text-2xl font-bold gradient-text mb-4">{plan.price}</p>
                                                <ul className="space-y-2">{plan.features.map((f) => <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-lime-500 shrink-0" />{f}</li>)}</ul>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}

                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                            <div className="flex justify-between pt-2">
                                <Button variant="outline" className="rounded-full px-6" type="button" onClick={() => formStep === 1 ? setShowForm(false) : setFormStep((s) => Math.max(1, s - 1))} disabled={isLoading}>
                                    <ArrowLeft className="w-4 h-4 mr-2" />Back
                                </Button>
                                {formStep < 5 ? (
                                    <Button type="button" className="rounded-full bg-gradient-to-r from-lime-600 to-emerald-600 text-white px-8 shadow-lg shadow-lime-500/20" onClick={() => setFormStep((s) => Math.min(5, s + 1))}>
                                        Next<ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                ) : (
                                    <Button className="rounded-full bg-gradient-to-r from-lime-600 to-emerald-600 text-white px-8 shadow-lg shadow-lime-500/20" type="submit" disabled={isLoading}>
                                        {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</> : <><Send className="w-4 h-4 mr-2" />Submit Profile</>}
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </form>
                </Card>
            </div>
        </div>
    );
}
