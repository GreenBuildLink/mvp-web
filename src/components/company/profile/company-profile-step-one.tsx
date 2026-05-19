import type { ReactNode } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { companyTypes } from "@/lib/company-registration";

interface CompanyProfileStepOneProps {
    companyName: string;
    setCompanyName: (value: string) => void;
    companyEmail: string;
    setCompanyEmail: (value: string) => void;
    companyPhone: string;
    setCompanyPhone: (value: string) => void;
    companyAddress: string;
    setCompanyAddress: (value: string) => void;
    companyCountry: string;
    setCompanyCountry: (value: string) => void;
    companyCity: string;
    setCompanyCity: (value: string) => void;
    companyWebsite: string;
    setCompanyWebsite: (value: string) => void;
    linkedInUrl: string;
    setLinkedInUrl: (value: string) => void;
    facebookUrl: string;
    setFacebookUrl: (value: string) => void;
    pinterestUrl: string;
    setPinterestUrl: (value: string) => void;
    instagramUrl: string;
    setInstagramUrl: (value: string) => void;
    youtubeUrl: string;
    setYoutubeUrl: (value: string) => void;
    companyType: string;
    setCompanyType: (value: string) => void;
    yearsOfOperation: string;
    setYearsOfOperation: (value: string) => void;
    mainSector: string;
    setMainSector: (value: string) => void;
    clearFieldError: (field: string) => void;
    getFieldClass: (field: string, defaultClassName: string) => string;
    renderFieldError: (field: string) => ReactNode;
}

export function CompanyProfileStepOne({
    companyName,
    setCompanyName,
    companyEmail,
    setCompanyEmail,
    companyPhone,
    setCompanyPhone,
    companyAddress,
    setCompanyAddress,
    companyCountry,
    setCompanyCountry,
    companyCity,
    setCompanyCity,
    companyWebsite,
    setCompanyWebsite,
    linkedInUrl,
    setLinkedInUrl,
    facebookUrl,
    setFacebookUrl,
    pinterestUrl,
    setPinterestUrl,
    instagramUrl,
    setInstagramUrl,
    youtubeUrl,
    setYoutubeUrl,
    companyType,
    setCompanyType,
    yearsOfOperation,
    setYearsOfOperation,
    mainSector,
    setMainSector,
    clearFieldError,
    getFieldClass,
    renderFieldError,
}: CompanyProfileStepOneProps) {
    return (
        <>
            <div className="ui-form-section">
                <h3 className="font-semibold">1. Company Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Company Name *</Label><Input placeholder="Ex: GreenBuild Materials" value={companyName} onChange={(e) => { setCompanyName(e.target.value); clearFieldError("companyName"); }} className={getFieldClass("companyName", "ui-field")} />{renderFieldError("companyName")}</div>
                    <div className="space-y-2"><Label>Email Address *</Label><Input type="email" placeholder="Ex: contact@company.com" value={companyEmail} onChange={(e) => { setCompanyEmail(e.target.value); clearFieldError("companyEmail"); clearFieldError("companyLocation"); }} className={getFieldClass("companyEmail", "ui-field")} />{renderFieldError("companyEmail")}</div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Phone Number *</Label><Input placeholder="Ex: +216 12 345 678" value={companyPhone} onChange={(e) => { setCompanyPhone(e.target.value); clearFieldError("companyPhone"); }} className={getFieldClass("companyPhone", "ui-field")} />{renderFieldError("companyPhone")}</div>
                    <div className="space-y-2"><Label>Website</Label><Input placeholder="Ex: https://company.com" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} className="ui-field" /></div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2"><Label>Address *</Label><Input placeholder="Ex: 12 Green Avenue" value={companyAddress} onChange={(e) => { setCompanyAddress(e.target.value); clearFieldError("companyAddress"); clearFieldError("companyLocation"); }} className={getFieldClass("companyAddress", "ui-field")} />{renderFieldError("companyAddress")}</div>
                    <div className="space-y-2"><Label>Country *</Label><Input placeholder="Ex: Tunisia" value={companyCountry} onChange={(e) => { setCompanyCountry(e.target.value); clearFieldError("companyCountry"); clearFieldError("companyLocation"); }} className={getFieldClass("companyCountry", "ui-field")} />{renderFieldError("companyCountry")}</div>
                    <div className="space-y-2"><Label>City *</Label><Input placeholder="Ex: Tunis" value={companyCity} onChange={(e) => { setCompanyCity(e.target.value); clearFieldError("companyCity"); clearFieldError("companyLocation"); }} className={getFieldClass("companyCity", "ui-field")} />{renderFieldError("companyCity")}</div>
                </div>
                {renderFieldError("companyLocation")}
                <div className="rounded-lg border border-emerald-100 p-3 space-y-3">
                    <h4 className="font-medium">Social Media (if available)</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label>LinkedIn</Label>
                            <Input placeholder="https://linkedin.com/company/..." value={linkedInUrl} onChange={(e) => setLinkedInUrl(e.target.value)} className="ui-field" />
                        </div>
                        <div className="space-y-2">
                            <Label>Facebook</Label>
                            <Input placeholder="https://facebook.com/..." value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} className="ui-field" />
                        </div>
                        <div className="space-y-2">
                            <Label>Pinterest</Label>
                            <Input placeholder="https://pinterest.com/..." value={pinterestUrl} onChange={(e) => setPinterestUrl(e.target.value)} className="ui-field" />
                        </div>
                        <div className="space-y-2">
                            <Label>Instagram</Label>
                            <Input placeholder="https://instagram.com/..." value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} className="ui-field" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Youtube</Label>
                        <Input placeholder="https://youtube.com/@..." value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} className="ui-field" />
                    </div>
                </div>
            </div>

            <div className="ui-form-section">
                <h3 className="font-semibold">2. Company Profile</h3>
                <div className="space-y-2">
                    <Label>Type of company *</Label>
                    <Select
                        value={companyType}
                        onValueChange={(value) => {
                            setCompanyType(value);
                            clearFieldError("companyType");
                        }}
                    >
                        <SelectTrigger className={getFieldClass("companyType", "ui-field")}><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>{companyTypes.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent>
                    </Select>
                    {renderFieldError("companyType")}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Years of experience *</Label><Input placeholder="Ex: 8 years" value={yearsOfOperation} onChange={(e) => { setYearsOfOperation(e.target.value); clearFieldError("yearsOfOperation"); }} className={getFieldClass("yearsOfOperation", "ui-field")} />{renderFieldError("yearsOfOperation")}</div>
                    <div className="space-y-2"><Label>Main activity sector *</Label><Input placeholder="Ex: Eco insulation and facade systems" value={mainSector} onChange={(e) => { setMainSector(e.target.value); clearFieldError("mainSector"); }} className={getFieldClass("mainSector", "ui-field")} />{renderFieldError("mainSector")}</div>
                </div>
            </div>
        </>
    );
}
