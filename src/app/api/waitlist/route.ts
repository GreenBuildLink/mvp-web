import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { insertProjectSubmission, insertCompanySubmission, insertWorkerSubmission, insertConsultationSubmission } from "@/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.CONTACT_EMAIL;

type WaitlistType = "project" | "company" | "worker" | "consultation";
type FormDataMap = Record<string, unknown>;

const optionalShortText = z
    .string()
    .trim()
    .max(160)
    .optional()
    .or(z.literal(""));

const optionalLongText = z
    .string()
    .trim()
    .max(2000)
    .optional()
    .or(z.literal(""));

const projectPayloadSchema = z.object({
    type: z.literal("project"),
    fullName: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().min(1).max(50),
    country: z.string().trim().min(1).max(80),
    city: z.string().trim().min(1).max(80),
    jobTitle: z.string().trim().min(1).max(120),
    expertiseField: z.string().trim().min(1).max(120),
    yearsExperience: z.string().trim().min(1).max(20),
    organization: optionalShortText,
    educationLevel: z.string().trim().min(1).max(80),
    certifications: z.array(z.string().trim().min(1).max(80)).max(20).optional(),
    otherCertification: optionalShortText,
    tools: optionalLongText,
    sustainableDesignLevel: z.string().trim().min(1).max(40),
    keySkills: z.array(z.string().trim().min(1).max(120)).max(20).optional(),
    otherKeySkill: optionalShortText,
    greenProjectsWorked: z.enum(["Yes", "No"]),
    greenProjectDescription: optionalLongText,
    projectTypes: optionalShortText,
    knowledgeLevel: z.string().trim().min(1).max(80),
    joinReason: z.string().trim().min(1).max(2000),
    objectives: z.array(z.string().trim().min(1).max(120)).max(20).optional(),
    learningFormat: z.string().trim().min(1).max(40),
    availabilityPerWeek: z.string().trim().min(1).max(80),
    preferredSchedule: z.string().trim().min(1).max(120),
    portfolioLink: z.string().trim().max(300).optional().or(z.literal("")),
    consent: z.literal(true),
    selectedPlan: z.string().trim().max(80).optional().or(z.literal("")),
});

const companyProductSchema = z.object({
    name: z.string().trim().max(120).optional().or(z.literal("")),
    category: z.string().trim().max(120).optional().or(z.literal("")),
    characteristics: optionalLongText,
    keyFeatures: optionalLongText,
    scopeOfWorks: optionalLongText,
    certName: z.string().trim().max(120).optional().or(z.literal("")),
    certLevel: z.string().trim().max(40).optional().or(z.literal("")),
    certDescription: optionalLongText,
    certOther: optionalShortText,
    technicalDatasheet: z.string().trim().max(300).optional().or(z.literal("")),
    testReports: z.string().trim().max(300).optional().or(z.literal("")),
    useCases: z.array(z.string().trim().min(1).max(80)).max(20).optional(),
    exampleProjects: optionalLongText,
    clientsReferences: optionalLongText,
    availableMarkets: z.array(z.string().trim().min(1).max(80)).max(10).optional(),
    description: z.string().trim().max(1200).optional().or(z.literal("")),
    priceRange: optionalShortText,
    salesModels: z.array(z.string().trim().min(1).max(80)).max(10).optional(),
    productImages: z.string().trim().max(300).optional().or(z.literal("")),
    brochure: z.string().trim().max(300).optional().or(z.literal("")),
    videoDemo: z.string().trim().max(300).optional().or(z.literal("")),
});

const companyPayloadSchema = z.object({
    type: z.literal("company"),
    companyName: z.string().trim().min(1).max(120),
    companyDescription: z.string().trim().min(1).max(2000),
    companyAddress: z.string().trim().min(1).max(160),
    companyCity: z.string().trim().min(1).max(160),
    companyCountry: z.string().trim().min(1).max(160),
    companyLocation: z.string().trim().min(1).max(160),
    companyEmail: z.string().trim().email().max(254),
    companyPhone: z.string().trim().min(1).max(160),
    companyWebsite: z.string().trim().max(200).optional().or(z.literal("")),
    socialMediaLinks: optionalLongText,
    linkedInUrl: z.string().trim().max(250).optional().or(z.literal("")),
    facebookUrl: z.string().trim().max(250).optional().or(z.literal("")),
    pinterestUrl: z.string().trim().max(250).optional().or(z.literal("")),
    instagramUrl: z.string().trim().max(250).optional().or(z.literal("")),
    youtubeUrl: z.string().trim().max(250).optional().or(z.literal("")),
    companyType: optionalShortText,
    yearsOfOperation: optionalShortText,
    mainSector: optionalShortText,
    collaborationInterests: z.array(z.string().trim().min(1).max(120)).max(20).optional(),
    publishConsent: z.literal(true),
    selectedPlan: z.string().trim().max(80).optional().or(z.literal("")),
    products: z.array(companyProductSchema).max(100).optional(),
});

const workerPayloadSchema = z.object({
    type: z.literal("worker"),
    name: z.string().trim().min(1).max(120),
    phone: z.string().trim().min(1).max(50),
    email: z.string().trim().email().max(254),
    age: optionalShortText,
    occupation: optionalShortText,
    trade: z.string().trim().min(1).max(120),
    otherTrade: optionalShortText,
    yearsExperience: optionalShortText,
    tasks: z.array(z.string().trim().min(1).max(120)).max(20).optional(),
    otherTask: optionalShortText,
    workedOnSites: z.enum(["Yes", "No"]).optional(),
    greenProjectExperience: z.enum(["Yes", "No"]).optional(),
    tradeLevel: optionalShortText,
    toolsMachines: optionalLongText,
    technicalTraining: optionalLongText,
    workerCertifications: optionalLongText,
    currentlyAvailable: z.enum(["Yes", "No"]).optional(),
    workType: optionalShortText,
    mobility: optionalShortText,
    interestedInGreen: z.enum(["Yes", "No"]).optional(),
    greenInterestAreas: z.array(z.string().trim().min(1).max(120)).max(20).optional(),
    wantsTraining: z.enum(["Yes", "No"]).optional(),
    preferredTrainingType: optionalShortText,
    cvLink: z.string().trim().max(300).optional().or(z.literal("")),
    workerCertificatesLink: z.string().trim().max(300).optional().or(z.literal("")),
    portfolioLink: z.string().trim().max(300).optional().or(z.literal("")),
    consent: z.literal(true),
    selectedPlan: z.string().trim().max(80).optional().or(z.literal("")),
    location: z.string().trim().min(1).max(200),
});

const consultationPayloadSchema = z.object({
    type: z.literal("consultation"),
    firstName: z.string().trim().min(1).max(80),
    lastName: z.string().trim().min(1).max(80),
    phone: z.string().trim().min(1).max(50),
    email: z.string().trim().email().max(254),
    address: z.string().trim().min(1).max(200),
    position: z.string().trim().min(1).max(120),
    projectCountry: z.string().trim().min(1).max(80),
    projectCity: z.string().trim().min(1).max(80),
    climateZone: z.string().trim().min(1).max(80),
    projectType: z.string().trim().min(1).max(120),
    projectStage: z.string().trim().min(1).max(80),
    landArea: z.string().trim().min(1).max(40),
    builtUpArea: z.string().trim().min(1).max(40),
    timelineStart: z.string().trim().min(1).max(40),
    timelineDelivery: z.string().trim().min(1).max(40),
    requiredServices: z.array(z.string().trim().min(1).max(160)).min(1).max(20),
    estimatedQuote: z.literal(true),
});

const waitlistSchema = z.discriminatedUnion("type", [
    projectPayloadSchema,
    companyPayloadSchema,
    workerPayloadSchema,
    consultationPayloadSchema,
]);

function esc(value: unknown) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function text(value: unknown) {
    return String(value ?? "").trim();
}

// ─── Shared email shell ───────────────────────────────────────────────────────
function shell(title: string, badge: string, badgeColor: string, body: string) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f0fdf4;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#16a34a,#0d9488);padding:32px 40px;text-align:center;">
            <p style="margin:0 0 8px;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">
              GreenBuild<span style="color:#86efac;">Link</span>
            </p>
            <span style="display:inline-block;background:${badgeColor};color:#fff;font-size:12px;font-weight:600;padding:4px 14px;border-radius:999px;letter-spacing:0.5px;">
              ${esc(badge)}
            </span>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td style="padding:32px 40px 0;text-align:center;">
            <h1 style="margin:0;font-size:22px;font-weight:700;color:#064e3b;">${esc(title)}</h1>
            <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Received on ${new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr><td style="padding:28px 40px;">${body}</td></tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">GreenBuildLink · contact@greenbuildlink.com</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Row helper ───────────────────────────────────────────────────────────────
function row(label: string, value: string | undefined) {
    if (!value?.trim()) return "";
    return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;width:38%;vertical-align:top;">
        <span style="font-size:13px;color:#6b7280;font-weight:500;">${esc(label)}</span>
      </td>
      <td style="padding:10px 0 10px 12px;border-bottom:1px solid #f3f4f6;vertical-align:top;">
        <span style="font-size:13px;color:#111827;font-weight:600;">${esc(value)}</span>
      </td>
    </tr>`;
}

function section(title: string, rows: string) {
    return `
    <div style="margin-bottom:24px;">
      <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.8px;">${esc(title)}</p>
      <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    </div>`;
}

function pill(text: string) {
    return `<span style="display:inline-block;background:#d1fae5;color:#065f46;font-size:12px;font-weight:600;padding:3px 10px;border-radius:999px;margin:3px 3px 3px 0;">${esc(text)}</span>`;
}

// ─── Email builders ───────────────────────────────────────────────────────────
function buildProjectEmail(data: FormDataMap) {
    const certifications = (data.certifications as string[]) ?? [];
    const keySkills = (data.keySkills as string[]) ?? [];
    const objectives = (data.objectives as string[]) ?? [];
    const body = `
    ${section("Personal Information", `
      ${row("Full name", data.fullName as string)}
      ${row("Email", data.email as string)}
      ${row("Phone", data.phone as string)}
      ${row("Country", data.country as string)}
      ${row("City", data.city as string)}
      ${row("Current position", data.jobTitle as string)}
    `)}
    ${section("Professional Background", `
      ${row("Field of expertise", data.expertiseField as string)}
      ${row("Years of experience", data.yearsExperience as string)}
      ${row("Organization", data.organization as string)}
      ${row("Education level", data.educationLevel as string)}
      ${row("Sustainable design level", data.sustainableDesignLevel as string)}
      ${row("Tools", data.tools as string)}
      ${row("Other certification", data.otherCertification as string)}
      ${row("Other key skill", data.otherKeySkill as string)}
    `)}
    ${certifications.length ? `
    <div style="margin-bottom:24px;">
      <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.8px;">Certifications</p>
      <div>${certifications.map(pill).join("")}</div>
    </div>` : ""}
    ${keySkills.length ? `
    <div style="margin-bottom:24px;">
      <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.8px;">Key Skills</p>
      <div>${keySkills.map(pill).join("")}</div>
    </div>` : ""}
    ${section("Green Experience", `
      ${row("Worked on green projects", data.greenProjectsWorked as string)}
      ${row("Project description", data.greenProjectDescription as string)}
      ${row("Project types", data.projectTypes as string)}
      ${row("Knowledge level", data.knowledgeLevel as string)}
    `)}
    ${section("Goals & Availability", `
      ${row("Join reason", data.joinReason as string)}
      ${row("Learning format", data.learningFormat as string)}
      ${row("Availability per week", data.availabilityPerWeek as string)}
      ${row("Preferred schedule", data.preferredSchedule as string)}
      ${row("Portfolio link", data.portfolioLink as string)}
      ${row("Plan selected", data.selectedPlan as string)}
      ${row("Data consent", data.consent ? "Yes" : "No")}
    `)}
    ${objectives.length ? `
    <div style="margin-bottom:24px;">
      <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.8px;">Objectives</p>
      <div>${objectives.map(pill).join("")}</div>
    </div>` : ""}
    `;

    return shell(
        "New Green Designer Registration",
        "Green Designers Hub",
        "rgba(255,255,255,0.25)",
        body
    );
}

function buildCompanyEmail(data: FormDataMap) {
    const products = (data.products as Record<string, unknown>[]) ?? [];
    const collaborationInterests = (data.collaborationInterests as string[]) ?? [];
    const body = `
    ${section("Company", `
      ${row("Name", data.companyName as string)}
      ${row("Type", data.companyType as string)}
      ${row("Years of operation", data.yearsOfOperation as string)}
      ${row("Main activity / sector", data.mainSector as string)}
      ${row("Address", data.companyAddress as string)}
      ${row("City", data.companyCity as string)}
      ${row("Country", data.companyCountry as string)}
      ${row("Location", data.companyLocation as string)}
      ${row("Email", data.companyEmail as string)}
      ${row("Phone", data.companyPhone as string)}
      ${row("Website", data.companyWebsite as string)}
      ${row("Social media", data.socialMediaLinks as string)}
      ${row("LinkedIn", data.linkedInUrl as string)}
      ${row("Facebook", data.facebookUrl as string)}
      ${row("Pinterest", data.pinterestUrl as string)}
      ${row("Instagram", data.instagramUrl as string)}
      ${row("Youtube", data.youtubeUrl as string)}
      ${row("Plan selected", data.selectedPlan as string)}
      ${row("Description", data.companyDescription as string)}
    `)}
    ${products.length ? `
    <div style="margin-bottom:24px;">
      <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.8px;">Products (${products.length})</p>
      ${products.map((p, i) => `
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:14px;margin-bottom:10px;">
          <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#111827;">${i + 1}. ${esc(p.name || "Unnamed product")}</p>
          ${p.category ? `<p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Category: <strong>${esc(p.category)}</strong></p>` : ""}
          ${Array.isArray(p.useCases) && p.useCases.length ? `<p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Use cases: <strong>${esc(p.useCases.join(", "))}</strong></p>` : ""}
          ${p.keyFeatures ? `<p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Key features: <strong>${esc(p.keyFeatures)}</strong></p>` : ""}
          ${p.scopeOfWorks ? `<p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Scope of works: <strong>${esc(p.scopeOfWorks)}</strong></p>` : ""}
          ${p.certName ? `<p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Certification: <strong>${esc(p.certName)}</strong>${p.certLevel ? ` — Level ${esc(p.certLevel)}` : ""}</p>` : ""}
          ${p.certOther ? `<p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Other certification: <strong>${esc(p.certOther)}</strong></p>` : ""}
          ${Array.isArray(p.availableMarkets) && p.availableMarkets.length ? `<p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Markets: <strong>${esc(p.availableMarkets.join(", "))}</strong></p>` : ""}
          ${Array.isArray(p.salesModels) && p.salesModels.length ? `<p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Sales models: <strong>${esc(p.salesModels.join(", "))}</strong></p>` : ""}
          ${p.priceRange ? `<p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Price range: <strong>${esc(p.priceRange)}</strong></p>` : ""}
          ${p.technicalDatasheet ? `<p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Technical datasheet: <strong>${esc(p.technicalDatasheet)}</strong></p>` : ""}
          ${p.testReports ? `<p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Test reports: <strong>${esc(p.testReports)}</strong></p>` : ""}
          ${p.exampleProjects ? `<p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Example projects: <strong>${esc(p.exampleProjects)}</strong></p>` : ""}
          ${p.clientsReferences ? `<p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Clients / references: <strong>${esc(p.clientsReferences)}</strong></p>` : ""}
          ${p.productImages ? `<p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Product images: <strong>${esc(p.productImages)}</strong></p>` : ""}
          ${p.brochure ? `<p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Brochure: <strong>${esc(p.brochure)}</strong></p>` : ""}
          ${p.videoDemo ? `<p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Video demo: <strong>${esc(p.videoDemo)}</strong></p>` : ""}
          ${p.description ? `<p style="margin:4px 0 0;font-size:12px;color:#374151;">${esc(p.description)}</p>` : ""}
        </div>`).join("")}
    </div>` : ""}
    ${collaborationInterests.length ? `
    <div style="margin-bottom:24px;">
      <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.8px;">Collaboration Interest</p>
      <div>${collaborationInterests.map(pill).join("")}</div>
    </div>` : ""}
    ${section("Consent", `${row("Publish product information", data.publishConsent ? "Yes" : "No")}`)}
    `;

    return shell(
        "New Green Industry Registration",
        "Green Industry Space",
        "rgba(255,255,255,0.25)",
        body
    );
}

function buildWorkerEmail(data: FormDataMap) {
    const tasks = (data.tasks as string[]) ?? [];
    const greenAreas = (data.greenInterestAreas as string[]) ?? [];
    const body = `
    ${section("1. Personal Information", `
      ${row("Full name", data.name as string)}
      ${row("Phone", data.phone as string)}
      ${row("Email", data.email as string)}
      ${row("City / Region", data.location as string)}
      ${row("Age", data.age as string)}
    `)}
    ${section("2. Professional Profile", `
      ${row("Current occupation", data.occupation as string)}
      ${row("Trade", data.trade as string)}
      ${row("Other trade", data.otherTrade as string)}
      ${row("Years of experience", data.yearsExperience as string)}
    `)}
    ${section("3-4. Skills & Technical Level", `
      ${row("Worked on construction sites", data.workedOnSites as string)}
      ${row("Green projects experience", data.greenProjectExperience as string)}
      ${row("Trade level", data.tradeLevel as string)}
      ${row("Tools / machines", data.toolsMachines as string)}
      ${row("Other task", data.otherTask as string)}
    `)}
    ${tasks.length ? `
    <div style="margin-bottom:24px;">
      <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.8px;">Tasks</p>
      <div>${tasks.map(pill).join("")}</div>
    </div>` : ""}
    ${section("5-6. Training & Work Preferences", `
      ${row("Technical training", data.technicalTraining as string)}
      ${row("Certifications", data.workerCertifications as string)}
      ${row("Currently available", data.currentlyAvailable as string)}
      ${row("Type of work", data.workType as string)}
      ${row("Mobility", data.mobility as string)}
    `)}
    ${section("7-8. Green Interest & Training Needs", `
      ${row("Interested in green construction", data.interestedInGreen as string)}
      ${row("Wants training", data.wantsTraining as string)}
      ${row("Preferred training type", data.preferredTrainingType as string)}
    `)}
    ${greenAreas.length ? `
    <div style="margin-bottom:24px;">
      <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.8px;">Green Interest Areas</p>
      <div>${greenAreas.map(pill).join("")}</div>
    </div>` : ""}
    ${section("9-10. Documents & Consent", `
      ${row("CV link", data.cvLink as string)}
      ${row("Certifications link", data.workerCertificatesLink as string)}
      ${row("Portfolio link", data.portfolioLink as string)}
      ${row("Plan selected", data.selectedPlan as string)}
      ${row("Consent", data.consent ? "Yes" : "No")}
    `)}
    `;

    return shell(
        "New Green Worker Application",
        "Green Workers Space",
        "rgba(255,255,255,0.25)",
        body
    );
}

function buildConsultationEmail(data: FormDataMap) {
    const requiredServices = (data.requiredServices as string[]) ?? [];
    const fullName = `${text(data.firstName)} ${text(data.lastName)}`.trim();
    const body = `
    ${section("Personal Information", `
      ${row("First name", data.firstName as string)}
      ${row("Last name", data.lastName as string)}
      ${row("Full name", fullName)}
      ${row("Phone", data.phone as string)}
      ${row("Email", data.email as string)}
      ${row("Address", data.address as string)}
      ${row("Position", data.position as string)}
    `)}
    ${section("Project Information", `
      ${row("Country", data.projectCountry as string)}
      ${row("City", data.projectCity as string)}
      ${row("Climate zone", data.climateZone as string)}
      ${row("Project type", data.projectType as string)}
      ${row("Project stage", data.projectStage as string)}
      ${row("Land area (m2)", data.landArea as string)}
      ${row("Built-up area (m2)", data.builtUpArea as string)}
      ${row("Timeline start", data.timelineStart as string)}
      ${row("Timeline delivery", data.timelineDelivery as string)}
    `)}
    ${requiredServices.length ? `
    <div style="margin-bottom:24px;">
      <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.8px;">Required Services</p>
      <div>${requiredServices.map(pill).join("")}</div>
    </div>` : ""}
    ${section("Consultation", `${row("Estimated quote", data.estimatedQuote ? "Yes" : "No")}`)}
    `;

    return shell(
        "New Consultation Request",
        "Consultation Form",
        "rgba(255,255,255,0.25)",
        body
    );
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const rawData = await req.json();
        const parsed = waitlistSchema.safeParse(rawData);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid payload", details: parsed.error.flatten() },
                { status: 400 },
            );
        }

        const { type, ...rest } = parsed.data as { type: WaitlistType } & FormDataMap;

        let subject = "";
        let html = "";

        if (type === "project") {
            subject = `🎯 New Green Designer — ${text(rest.fullName)}`.trim();
            html = buildProjectEmail(rest);
        } else if (type === "company") {
            subject = `🏗️ New Green Industry — ${text(rest.companyName)}`;
            html = buildCompanyEmail(rest);
        } else if (type === "worker") {
            subject = `👷 New Green Worker — ${text(rest.name)} (${text(rest.trade)})`;
            html = buildWorkerEmail(rest);
        } else if (type === "consultation") {
            subject = `🧩 New Consultation Request — ${text(rest.firstName)} ${text(rest.lastName)}`.trim();
            html = buildConsultationEmail(rest);
        } else {
            return NextResponse.json({ error: "Unknown form type" }, { status: 400 });
        }

        try {
            if (type === "project") {
                await insertProjectSubmission({
                    full_name: text(rest.fullName),
                    email: text(rest.email),
                    phone: text(rest.phone),
                    country: text(rest.country),
                    city: text(rest.city),
                    job_title: text(rest.jobTitle),
                    expertise_field: text(rest.expertiseField),
                    years_experience: text(rest.yearsExperience),
                    organization: text(rest.organization) || null,
                    education_level: text(rest.educationLevel),
                    certifications: (rest.certifications as string[]) || [],
                    other_certification: text(rest.otherCertification) || null,
                    tools: text(rest.tools) || null,
                    sustainable_design_level: text(rest.sustainableDesignLevel),
                    key_skills: (rest.keySkills as string[]) || [],
                    other_key_skill: text(rest.otherKeySkill) || null,
                    green_projects_worked: text(rest.greenProjectsWorked),
                    green_project_description: text(rest.greenProjectDescription) || null,
                    project_types: text(rest.projectTypes) || null,
                    knowledge_level: text(rest.knowledgeLevel),
                    join_reason: text(rest.joinReason),
                    objectives: (rest.objectives as string[]) || [],
                    learning_format: text(rest.learningFormat),
                    availability_per_week: text(rest.availabilityPerWeek),
                    preferred_schedule: text(rest.preferredSchedule),
                    portfolio_link: text(rest.portfolioLink) || null,
                    selected_plan: text(rest.selectedPlan) || null,
                });
            } else if (type === "company") {
                await insertCompanySubmission({
                    company_name: text(rest.companyName),
                    company_description: text(rest.companyDescription),
                    company_address: text(rest.companyAddress),
                    company_city: text(rest.companyCity),
                    company_country: text(rest.companyCountry),
                    company_location: text(rest.companyLocation),
                    company_email: text(rest.companyEmail),
                    company_phone: text(rest.companyPhone),
                    company_website: text(rest.companyWebsite) || null,
                    social_media_links: {
                        linkedin: text(rest.linkedInUrl),
                        facebook: text(rest.facebookUrl),
                        pinterest: text(rest.pinterestUrl),
                        instagram: text(rest.instagramUrl),
                        youtube: text(rest.youtubeUrl),
                    },
                    linkedin_url: text(rest.linkedInUrl) || null,
                    facebook_url: text(rest.facebookUrl) || null,
                    pinterest_url: text(rest.pinterestUrl) || null,
                    instagram_url: text(rest.instagramUrl) || null,
                    youtube_url: text(rest.youtubeUrl) || null,
                    company_type: text(rest.companyType) || null,
                    years_of_operation: text(rest.yearsOfOperation) || null,
                    main_sector: text(rest.mainSector) || null,
                    collaboration_interests: (rest.collaborationInterests as string[]) || [],
                    publish_consent: Boolean(rest.publishConsent),
                    selected_plan: text(rest.selectedPlan) || null,
                    products: (rest.products as Record<string, unknown>[]) || [],
                });
            } else if (type === "worker") {
                await insertWorkerSubmission({
                    name: text(rest.name),
                    email: text(rest.email),
                    phone: text(rest.phone),
                    location: text(rest.location),
                    age: text(rest.age) || null,
                    occupation: text(rest.occupation) || null,
                    trade: text(rest.trade),
                    other_trade: text(rest.otherTrade) || null,
                    years_experience: text(rest.yearsExperience) || null,
                    tasks: (rest.tasks as string[]) || [],
                    other_task: text(rest.otherTask) || null,
                    worked_on_sites: text(rest.workedOnSites) || null,
                    green_project_experience: text(rest.greenProjectExperience) || null,
                    trade_level: text(rest.tradeLevel) || null,
                    tools_machines: text(rest.toolsMachines) || null,
                    technical_training: text(rest.technicalTraining) || null,
                    worker_certifications: text(rest.workerCertifications) || null,
                    currently_available: text(rest.currentlyAvailable) || null,
                    work_type: text(rest.workType) || null,
                    mobility: text(rest.mobility) || null,
                    interested_in_green: text(rest.interestedInGreen) || null,
                    green_interest_areas: (rest.greenInterestAreas as string[]) || [],
                    wants_training: text(rest.wantsTraining) || null,
                    preferred_training_type: text(rest.preferredTrainingType) || null,
                    cv_link: text(rest.cvLink) || null,
                    worker_certificates_link: text(rest.workerCertificatesLink) || null,
                    portfolio_link: text(rest.portfolioLink) || null,
                    consent: Boolean(rest.consent),
                    selected_plan: text(rest.selectedPlan) || null,
                });
            } else if (type === "consultation") {
                await insertConsultationSubmission({
                    first_name: text(rest.firstName),
                    last_name: text(rest.lastName),
                    phone: text(rest.phone),
                    email: text(rest.email),
                    address: text(rest.address),
                    position: text(rest.position),
                    project_country: text(rest.projectCountry),
                    project_city: text(rest.projectCity),
                    climate_zone: text(rest.climateZone),
                    project_type: text(rest.projectType),
                    project_stage: text(rest.projectStage),
                    land_area: text(rest.landArea),
                    built_up_area: text(rest.builtUpArea),
                    timeline_start: text(rest.timelineStart),
                    timeline_delivery: text(rest.timelineDelivery),
                    required_services: (rest.requiredServices as string[]) || [],
                    estimated_quote: Boolean(rest.estimatedQuote),
                });
            }
        } catch (dbError) {
            console.error("Database insert error:", dbError);
            return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
        }

        if (!TO || !process.env.RESEND_API_KEY) {
            console.warn("Waitlist email skipped: missing CONTACT_EMAIL or RESEND_API_KEY");
            return NextResponse.json({ success: true, emailSent: false });
        }

        const { error } = await resend.emails.send({
            from: "GreenBuildLink <onboarding@resend.dev>",
            to: TO,
            subject,
            html,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json({ success: true, emailSent: false });
        }

        return NextResponse.json({ success: true, emailSent: true });
    } catch (err) {
        console.error("Waitlist API error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
