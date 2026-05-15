import type { Dispatch, FormEvent, ReactNode, SetStateAction } from "react";

import { ArrowLeft, ArrowRight, Loader2, Send } from "lucide-react";

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
    workerGreenAreas,
    workerMobilityOptions,
    workerOccupations,
    workerSteps,
    workerSubscriptionPlans,
    workerTaskOptions,
    workerTrades,
    workerTradeLevelOptions,
    workerTrainingTypeOptions,
    workerWorkTypeOptions,
    workerExperienceOptions,
} from "@/lib/worker-registration";

interface WorkerRegistrationStepContentProps {
    formStep: number;
    error: string;
    isLoading: boolean;
    selectedPlan: string;
    selectedPlanName?: string;
    selectedPlanPrice?: string;
    selectedPlanError?: boolean;
    name: string;
    phone: string;
    email: string;
    location: string;
    age: string;
    occupation: string;
    trade: string;
    otherTrade: string;
    yearsExperience: string;
    tasks: string[];
    otherTask: string;
    workedOnSites: string;
    greenProjectExperience: string;
    tradeLevel: string;
    toolsMachines: string;
    technicalTraining: string;
    workerCertifications: string;
    currentlyAvailable: string;
    workType: string;
    mobility: string;
    interestedInGreen: string;
    greenInterestAreas: string[];
    wantsTraining: string;
    preferredTrainingType: string;
    cvLink: string;
    workerCertificatesLink: string;
    portfolioLink: string;
    consent: boolean;
    setName: (value: string) => void;
    setPhone: (value: string) => void;
    setEmail: (value: string) => void;
    setLocation: (value: string) => void;
    setAge: (value: string) => void;
    setOccupation: (value: string) => void;
    setTrade: (value: string) => void;
    setOtherTrade: (value: string) => void;
    setYearsExperience: (value: string) => void;
    setTasks: Dispatch<SetStateAction<string[]>>;
    setOtherTask: (value: string) => void;
    setWorkedOnSites: (value: string) => void;
    setGreenProjectExperience: (value: string) => void;
    setTradeLevel: (value: string) => void;
    setToolsMachines: (value: string) => void;
    setTechnicalTraining: (value: string) => void;
    setWorkerCertifications: (value: string) => void;
    setCurrentlyAvailable: (value: string) => void;
    setWorkType: (value: string) => void;
    setMobility: (value: string) => void;
    setInterestedInGreen: (value: string) => void;
    setGreenInterestAreas: Dispatch<SetStateAction<string[]>>;
    setWantsTraining: (value: string) => void;
    setPreferredTrainingType: (value: string) => void;
    setCvLink: (value: string) => void;
    setWorkerCertificatesLink: (value: string) => void;
    setPortfolioLink: (value: string) => void;
    setConsent: (checked: boolean) => void;
    setSelectedPlan: (planId: string) => void;
    toggleValue: (value: string, items: string[], setItems: (next: string[]) => void) => void;
    clearFieldError: (field: string) => void;
    getFieldClass: (field: string, defaultClassName: string) => string;
    renderFieldError: (field: string) => ReactNode;
    onBack: () => void;
    onNext: () => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function WorkerRegistrationStepContent({
    formStep,
    error,
    isLoading,
    selectedPlan,
    selectedPlanName,
    selectedPlanPrice,
    selectedPlanError = false,
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
    setName,
    setPhone,
    setEmail,
    setLocation,
    setAge,
    setOccupation,
    setTrade,
    setOtherTrade,
    setYearsExperience,
    setTasks,
    setOtherTask,
    setWorkedOnSites,
    setGreenProjectExperience,
    setTradeLevel,
    setToolsMachines,
    setTechnicalTraining,
    setWorkerCertifications,
    setCurrentlyAvailable,
    setWorkType,
    setMobility,
    setInterestedInGreen,
    setGreenInterestAreas,
    setWantsTraining,
    setPreferredTrainingType,
    setCvLink,
    setWorkerCertificatesLink,
    setPortfolioLink,
    setConsent,
    setSelectedPlan,
    toggleValue,
    clearFieldError,
    getFieldClass,
    renderFieldError,
    onBack,
    onNext,
    onSubmit,
}: WorkerRegistrationStepContentProps) {
    return (
        <Card className="border-0 shadow-xl">
            <form onSubmit={onSubmit}>
                <CardHeader className="pb-2">
                    <CardTitle>{formStep === 5 ? "Final. Subscription" : "Green Workers Multi-Step Form"}</CardTitle>
                    <CardDescription>{formStep < 5 ? "Subsections follow PDF pages 10-13." : "Choose a plan then submit."}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    {formStep === 1 ? (
                        <div className="ui-form-section-worker">
                            <h3 className="font-semibold">1. {workerSteps[0]} Information</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>Full Name *</Label><Input placeholder="Your full name" value={name} onChange={(event) => { setName(event.target.value); clearFieldError("name"); }} className={getFieldClass("name", "ui-field-worker")} />{renderFieldError("name")}</div>
                                <div className="space-y-2"><Label>Phone Number *</Label><Input placeholder="+216 ..." value={phone} onChange={(event) => { setPhone(event.target.value); clearFieldError("phone"); }} className={getFieldClass("phone", "ui-field-worker")} />{renderFieldError("phone")}</div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>Email *</Label><Input type="email" placeholder="your@email.com" value={email} onChange={(event) => { setEmail(event.target.value); clearFieldError("email"); }} className={getFieldClass("email", "ui-field-worker")} />{renderFieldError("email")}</div>
                                <div className="space-y-2"><Label>City / Region *</Label><Input placeholder="Ex: Tunis / Ariana" value={location} onChange={(event) => { setLocation(event.target.value); clearFieldError("location"); }} className={getFieldClass("location", "ui-field-worker")} />{renderFieldError("location")}</div>
                            </div>
                            <div className="space-y-2"><Label>Age (optional)</Label><Input placeholder="Ex: 29" value={age} onChange={(event) => setAge(event.target.value)} className="ui-field-worker" /></div>
                        </div>
                    ) : null}

                    {formStep === 2 ? (
                        <div className="ui-form-section-worker">
                            <h3 className="font-semibold">2. Professional Profile</h3>
                            <div className="space-y-2"><Label>Current occupation</Label><Select value={occupation} onValueChange={setOccupation}><SelectTrigger className="ui-field-worker"><SelectValue placeholder="Select occupation" /></SelectTrigger><SelectContent>{workerOccupations.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div>
                            <div className="space-y-2"><Label>Trade *</Label><Select value={trade} onValueChange={(value) => { setTrade(value); clearFieldError("trade"); if (value !== "Other") clearFieldError("otherTrade"); }}><SelectTrigger className={getFieldClass("trade", "ui-field-worker")}><SelectValue placeholder="Select trade" /></SelectTrigger><SelectContent>{workerTrades.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select>{renderFieldError("trade")}</div>
                            {trade === "Other" ? <div className="space-y-2"><Label>Other (specify) *</Label><Input placeholder="Specify your trade" value={otherTrade} onChange={(event) => { setOtherTrade(event.target.value); clearFieldError("otherTrade"); }} className={getFieldClass("otherTrade", "ui-field-worker")} />{renderFieldError("otherTrade")}</div> : null}
                            <div className="space-y-2"><Label>Years of experience</Label><Select value={yearsExperience} onValueChange={setYearsExperience}><SelectTrigger className="ui-field-worker"><SelectValue placeholder="Select range" /></SelectTrigger><SelectContent>{workerExperienceOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div>
                        </div>
                    ) : null}

                    {formStep === 3 ? (
                        <>
                            <div className="ui-form-section-worker">
                                <h3 className="font-semibold">3. Skills & Practical Experience</h3>
                                <div className="space-y-2"><Label>What tasks can you perform?</Label><div className="grid sm:grid-cols-2 gap-3">{workerTaskOptions.map((option) => <label key={option} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={tasks.includes(option)} onChange={() => { toggleValue(option, tasks, setTasks); if (option === "Other" && tasks.includes("Other")) clearFieldError("otherTask"); }} className="rounded border-lime-300 text-lime-600 focus:ring-lime-500" />{option}</label>)}</div></div>
                                {tasks.includes("Other") ? <div className="space-y-2"><Label>Other task *</Label><Input placeholder="Specify other task" value={otherTask} onChange={(event) => { setOtherTask(event.target.value); clearFieldError("otherTask"); }} className={getFieldClass("otherTask", "ui-field-worker")} />{renderFieldError("otherTask")}</div> : null}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label>Have you worked on construction sites?</Label><Select value={workedOnSites} onValueChange={setWorkedOnSites}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select></div>
                                    <div className="space-y-2"><Label>Experience in green/sustainable projects?</Label><Select value={greenProjectExperience} onValueChange={setGreenProjectExperience}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select></div>
                                </div>
                            </div>
                            <div className="rounded-xl border border-lime-100 p-4 space-y-4">
                                <h3 className="font-semibold">4. Technical Skills Level</h3>
                                <div className="space-y-2"><Label>Your level in your trade</Label><Select value={tradeLevel} onValueChange={setTradeLevel}><SelectTrigger className="ui-field-worker"><SelectValue placeholder="Select level" /></SelectTrigger><SelectContent>{workerTradeLevelOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div>
                                <div className="space-y-2"><Label>Do you use any tools or machines? (specify)</Label><Textarea placeholder="List tools/machines you use" value={toolsMachines} onChange={(event) => setToolsMachines(event.target.value)} className="ui-textarea-worker min-h-[90px]" /></div>
                            </div>
                        </>
                    ) : null}

                    {formStep === 4 ? (
                        <>
                            <div className="rounded-xl border border-lime-100 p-4 space-y-4">
                                <h3 className="font-semibold">5. Certifications & Training</h3>
                                <div className="space-y-2"><Label>Any technical training completed?</Label><Textarea placeholder="Describe completed training" value={technicalTraining} onChange={(event) => setTechnicalTraining(event.target.value)} className="rounded-xl min-h-[90px] border-emerald-200/50" /></div>
                                <div className="space-y-2"><Label>Certifications (if any)</Label><Input placeholder="Safety, Electrical, HVAC, Solar, etc." value={workerCertifications} onChange={(event) => setWorkerCertifications(event.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                            </div>
                            <div className="rounded-xl border border-lime-100 p-4 space-y-4">
                                <h3 className="font-semibold">6. Availability & Work Preferences</h3>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    <div className="space-y-2"><Label>Currently available for work?</Label><Select value={currentlyAvailable} onValueChange={setCurrentlyAvailable}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select></div>
                                    <div className="space-y-2"><Label>Type of work</Label><Select value={workType} onValueChange={setWorkType}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent>{workerWorkTypeOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div>
                                    <div className="space-y-2"><Label>Mobility</Label><Select value={mobility} onValueChange={setMobility}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select mobility" /></SelectTrigger><SelectContent>{workerMobilityOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div>
                                </div>
                            </div>
                            <div className="rounded-xl border border-lime-100 p-4 space-y-4">
                                <h3 className="font-semibold">7. Interest in Green Construction</h3>
                                <div className="space-y-2"><Label>Interested in sustainable / green construction?</Label><Select value={interestedInGreen} onValueChange={setInterestedInGreen}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select></div>
                                <div className="space-y-2"><Label>Which areas interest you?</Label><div className="grid sm:grid-cols-2 gap-3">{workerGreenAreas.map((option) => <label key={option} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={greenInterestAreas.includes(option)} onChange={() => toggleValue(option, greenInterestAreas, setGreenInterestAreas)} className="rounded border-lime-300 text-lime-600 focus:ring-lime-500" />{option}</label>)}</div></div>
                            </div>
                            <div className="rounded-xl border border-lime-100 p-4 space-y-4">
                                <h3 className="font-semibold">8. Training Needs</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label>Do you want training?</Label><Select value={wantsTraining} onValueChange={(value) => { setWantsTraining(value); if (value !== "Yes") clearFieldError("preferredTrainingType"); }}><SelectTrigger className="rounded-xl h-12 border-emerald-200/50"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select></div>
                                    <div className="space-y-2"><Label>Preferred training type {wantsTraining === "Yes" ? "*" : ""}</Label><Select value={preferredTrainingType} onValueChange={(value) => { setPreferredTrainingType(value); clearFieldError("preferredTrainingType"); }}><SelectTrigger className={getFieldClass("preferredTrainingType", "rounded-xl h-12 border-emerald-200/50")}><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent>{workerTrainingTypeOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select>{renderFieldError("preferredTrainingType")}</div>
                                </div>
                            </div>
                            <div className="rounded-xl border border-lime-100 p-4 space-y-4">
                                <h3 className="font-semibold">9. Documents (Optional but powerful)</h3>
                                <div className="space-y-2"><Label>Upload CV (if available)</Label><Input placeholder="Paste CV link" value={cvLink} onChange={(event) => setCvLink(event.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                <div className="space-y-2"><Label>Upload certifications</Label><Input placeholder="Paste certifications link" value={workerCertificatesLink} onChange={(event) => setWorkerCertificatesLink(event.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                                <div className="space-y-2"><Label>Portfolio / photos of previous work</Label><Input placeholder="Paste portfolio/photos link" value={portfolioLink} onChange={(event) => setPortfolioLink(event.target.value)} className="rounded-xl h-12 border-emerald-200/50" /></div>
                            </div>
                            <div className="rounded-xl border border-lime-100 p-4 space-y-4">
                                <h3 className="font-semibold">10. Consent *</h3>
                                <label className="flex items-start gap-3 text-sm text-muted-foreground"><input type="checkbox" checked={consent} onChange={(event) => { setConsent(event.target.checked); clearFieldError("consent"); }} className="mt-0.5 rounded border-lime-300 text-lime-600 focus:ring-lime-500" /><span>Agreement to share data for job opportunities and training.</span></label>
                                {renderFieldError("consent")}
                            </div>
                        </>
                    ) : null}

                    {formStep === 5 ? (
                        <div className="space-y-6">
                            <PlanSelectedBanner
                                accent="worker"
                                name={selectedPlanName}
                                price={selectedPlanPrice}
                            />
                            <PlanSelectionCards
                                plans={workerSubscriptionPlans}
                                selectedPlan={selectedPlan}
                                onSelect={(planId) => { setSelectedPlan(planId); clearFieldError("selectedPlan"); }}
                                accent="worker"
                                className={selectedPlanError ? "rounded-2xl border border-red-500 p-3" : undefined}
                            />
                            {renderFieldError("selectedPlan")}
                        </div>
                    ) : null}

                    {error ? <p className="text-sm text-red-500 text-center">{error}</p> : null}

                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
                        <Button variant="outline" className="w-full rounded-full px-6 sm:w-auto" type="button" onClick={onBack} disabled={isLoading}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                        {formStep < 5 ? (
                            <Button type="button" className="w-full rounded-full bg-gradient-to-r from-lime-600 to-emerald-600 text-white px-8 shadow-lg shadow-lime-500/20 sm:w-auto" onClick={onNext}>
                                Next
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button className="ui-btn-worker w-full px-8 sm:w-auto" type="submit" disabled={isLoading}>
                                {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</> : <><Send className="w-4 h-4 mr-2" />Submit Profile</>}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </form>
        </Card>
    );
}
