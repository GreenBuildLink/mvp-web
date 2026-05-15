import type { ReactNode } from "react";

import { Plus, Shield, Trash2, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
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
    companyCertificationOptions,
    companyCollaborationOptions,
    companyMarketOptions,
    CompanyProductForm,
    companySalesModelOptions,
    companyUseCaseOptions,
} from "@/lib/company-registration";
import { PRODUCT_CATEGORIES } from "@/lib/types";

interface CompanyProfileStepTwoProps {
    products: CompanyProductForm[];
    collaborationInterests: string[];
    publishConsent: boolean;
    updateProduct: (index: number, field: keyof CompanyProductForm, value: string | string[]) => void;
    removeProduct: (index: number) => void;
    addProduct: () => void;
    toggleProductMulti: (
        index: number,
        field: "certifications" | "useCases" | "availableMarkets" | "salesModels",
        value: string,
    ) => void;
    toggleCollaborationInterest: (value: string) => void;
    setPublishConsent: (checked: boolean) => void;
    clearFieldError: (field: string) => void;
    getFieldClass: (field: string, defaultClassName: string) => string;
    renderFieldError: (field: string) => ReactNode;
}

export function CompanyProfileStepTwo({
    products,
    collaborationInterests,
    publishConsent,
    updateProduct,
    removeProduct,
    addProduct,
    toggleProductMulti,
    toggleCollaborationInterest,
    setPublishConsent,
    clearFieldError,
    getFieldClass,
    renderFieldError,
}: CompanyProfileStepTwoProps) {
    return (
        <>
            {products.map((product, index) => (
                <div key={index} className="rounded-xl border border-emerald-100 p-4 space-y-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Package className="w-4 h-4 text-emerald-600" />
                            Product {index + 1}
                        </h3>
                        {products.length > 1 ? (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="rounded-full text-destructive hover:bg-destructive/10"
                                onClick={() => removeProduct(index)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        ) : null}
                    </div>

                    <div className="space-y-2">
                        <Label>3. Product / Solution Name</Label>
                        <Input
                            placeholder="Ex: EcoTherm Panel X"
                            value={product.name}
                            onChange={(event) => {
                                updateProduct(index, "name", event.target.value);
                                clearFieldError(`product-${index}-name`);
                            }}
                            className={getFieldClass(`product-${index}-name`, "rounded-xl h-12 border-emerald-200/50")}
                        />
                        {renderFieldError(`product-${index}-name`)}
                    </div>

                    <div className="space-y-2">
                        <Label>Category</Label>
                        <Select
                            value={product.category}
                            onValueChange={(value) => {
                                updateProduct(index, "category", value);
                                clearFieldError(`product-${index}-category`);
                            }}
                        >
                            <SelectTrigger className={getFieldClass(`product-${index}-category`, "rounded-xl h-12 border-emerald-200/50")}>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {PRODUCT_CATEGORIES.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {renderFieldError(`product-${index}-category`)}
                    </div>

                    <div className="space-y-2">
                        <Label>Description (short but clear)</Label>
                        <Textarea
                            placeholder="Briefly describe the product and its sustainability value."
                            value={product.description}
                            onChange={(event) => updateProduct(index, "description", event.target.value)}
                            className="rounded-xl min-h-[100px] border-emerald-200/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Key features / specifications</Label>
                        <Textarea
                            placeholder="List technical specs: performance, materials, dimensions, etc."
                            value={product.keyFeatures}
                            onChange={(event) => updateProduct(index, "keyFeatures", event.target.value)}
                            className="rounded-xl min-h-[100px] border-emerald-200/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Scope of works (Designation of works)</Label>
                        <Textarea
                            placeholder="Where this solution applies (facade, roofing, HVAC, etc.)."
                            value={product.scopeOfWorks}
                            onChange={(event) => updateProduct(index, "scopeOfWorks", event.target.value)}
                            className="rounded-xl min-h-[100px] border-emerald-200/50"
                        />
                    </div>

                    <div className="rounded-lg border border-emerald-100 p-3 space-y-3">
                        <h4 className="font-medium flex items-center gap-2">
                            <Shield className="w-4 h-4 text-emerald-600" />
                            4. Certifications & Compliance
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {companyCertificationOptions.map((option) => (
                                <label key={option} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <input
                                        type="checkbox"
                                        checked={product.certifications.includes(option)}
                                        onChange={() => toggleProductMulti(index, "certifications", option)}
                                        className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                        {product.certifications.includes("Other") ? (
                            <div className="space-y-2">
                                <Label>Other certification</Label>
                                <Input
                                    placeholder="Ex: Local eco-label XYZ"
                                    value={product.otherCertification}
                                    onChange={(event) => {
                                        updateProduct(index, "otherCertification", event.target.value);
                                        clearFieldError(`product-${index}-otherCertification`);
                                    }}
                                    className={getFieldClass(`product-${index}-otherCertification`, "rounded-xl h-12 border-emerald-200/50")}
                                />
                                {renderFieldError(`product-${index}-otherCertification`)}
                            </div>
                        ) : null}
                        <div className="space-y-2">
                            <Label>Technical datasheets upload</Label>
                            <Input
                                placeholder="Paste datasheet URL or file reference"
                                value={product.technicalDatasheet}
                                onChange={(event) => updateProduct(index, "technicalDatasheet", event.target.value)}
                                className="rounded-xl h-12 border-emerald-200/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Test reports (optional)</Label>
                            <Input
                                placeholder="Paste test report URL or file reference"
                                value={product.testReports}
                                onChange={(event) => updateProduct(index, "testReports", event.target.value)}
                                className="rounded-xl h-12 border-emerald-200/50"
                            />
                        </div>
                    </div>

                    <div className="rounded-lg border border-emerald-100 p-3 space-y-3">
                        <h4 className="font-medium">5. Application & Use Cases</h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {companyUseCaseOptions.map((option) => (
                                <label key={option} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <input
                                        type="checkbox"
                                        checked={product.useCases.includes(option)}
                                        onChange={() => toggleProductMulti(index, "useCases", option)}
                                        className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                        <div className="space-y-2">
                            <Label>Example projects (if any)</Label>
                            <Textarea
                                placeholder="Ex: Green Office Tower, 2024, Tunis"
                                value={product.exampleProjects}
                                onChange={(event) => updateProduct(index, "exampleProjects", event.target.value)}
                                className="rounded-xl min-h-[90px] border-emerald-200/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Clients / references (optional)</Label>
                            <Textarea
                                placeholder="List major clients, sectors, or references."
                                value={product.clientsReferences}
                                onChange={(event) => updateProduct(index, "clientsReferences", event.target.value)}
                                className="rounded-xl min-h-[90px] border-emerald-200/50"
                            />
                        </div>
                    </div>

                    <div className="rounded-lg border border-emerald-100 p-3 space-y-3">
                        <h4 className="font-medium">6. Availability & Market</h4>
                        <div className="flex flex-wrap gap-4">
                            {companyMarketOptions.map((option) => (
                                <label key={option} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <input
                                        type="checkbox"
                                        checked={product.availableMarkets.includes(option)}
                                        onChange={() => toggleProductMulti(index, "availableMarkets", option)}
                                        className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg border border-emerald-100 p-3 space-y-3">
                        <h4 className="font-medium">7. Pricing & Business Model</h4>
                        <div className="space-y-2">
                            <Label>Price range</Label>
                            <Input
                                placeholder="Ex: 30-45 EUR / m2"
                                value={product.priceRange}
                                onChange={(event) => updateProduct(index, "priceRange", event.target.value)}
                                className="rounded-xl h-12 border-emerald-200/50"
                            />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {companySalesModelOptions.map((option) => (
                                <label key={option} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <input
                                        type="checkbox"
                                        checked={product.salesModels.includes(option)}
                                        onChange={() => toggleProductMulti(index, "salesModels", option)}
                                        className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg border border-emerald-100 p-3 space-y-3">
                        <h4 className="font-medium">8. Media & Documents</h4>
                        <div className="space-y-2">
                            <Label>Product images</Label>
                            <Input
                                placeholder="Paste image gallery URL or drive folder link"
                                value={product.productImages}
                                onChange={(event) => updateProduct(index, "productImages", event.target.value)}
                                className="rounded-xl h-12 border-emerald-200/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Catalog / brochure upload</Label>
                            <Input
                                placeholder="Paste brochure URL or file link"
                                value={product.brochure}
                                onChange={(event) => updateProduct(index, "brochure", event.target.value)}
                                className="rounded-xl h-12 border-emerald-200/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Video demo (if available)</Label>
                            <Input
                                placeholder="Paste video URL (YouTube, Vimeo, etc.)"
                                value={product.videoDemo}
                                onChange={(event) => updateProduct(index, "videoDemo", event.target.value)}
                                className="rounded-xl h-12 border-emerald-200/50"
                            />
                        </div>
                    </div>
                </div>
            ))}

            <Button type="button" variant="outline" className="w-full rounded-xl border-dashed border-2 border-emerald-200 h-12" onClick={addProduct}>
                <Plus className="w-4 h-4 mr-2" />
                Add another product
            </Button>

            <div className="rounded-xl border border-emerald-100 p-4 space-y-4">
                <h3 className="font-semibold">9. Collaboration Interest</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                    {companyCollaborationOptions.map((option) => (
                        <label key={option} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <input
                                type="checkbox"
                                checked={collaborationInterests.includes(option)}
                                onChange={() => toggleCollaborationInterest(option)}
                                className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            </div>

            <div className="rounded-xl border border-emerald-100 p-4">
                <h3 className="font-semibold mb-3">10. Consent *</h3>
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                    <input
                        type="checkbox"
                        checked={publishConsent}
                        onChange={(event) => {
                            setPublishConsent(event.target.checked);
                            clearFieldError("publishConsent");
                        }}
                        className="mt-0.5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Agreement to publish product information on platform.</span>
                </label>
                {renderFieldError("publishConsent")}
            </div>
        </>
    );
}
