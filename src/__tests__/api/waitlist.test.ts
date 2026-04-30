import { describe, it, expect } from 'vitest';
import { z } from 'zod';

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
    estimatedQuote: z.boolean(),
});

const waitlistSchema = z.discriminatedUnion("type", [
    projectPayloadSchema,
    consultationPayloadSchema,
]);

describe('Waitlist API Schema Validation', () => {
    describe('Project Type', () => {
        it('validates correct project payload', () => {
            const validPayload = {
                type: "project",
                fullName: "John Doe",
                email: "john@example.com",
                phone: "+1234567890",
                country: "France",
                city: "Paris",
                jobTitle: "Architect",
                expertiseField: "Sustainable Design",
                yearsExperience: "5",
                organization: "Green Studio",
                educationLevel: "Master",
                sustainableDesignLevel: "Advanced",
                joinReason: "Want to join green projects",
                learningFormat: "Online",
                availabilityPerWeek: "10 hours",
                preferredSchedule: "Weekdays",
                consent: true,
                greenProjectsWorked: "Yes",
                knowledgeLevel: "Intermediate",
            };
            const result = projectPayloadSchema.safeParse(validPayload);
            expect(result.success).toBe(true);
        });

        it('rejects invalid email format', () => {
            const invalidPayload = {
                type: "project",
                fullName: "John Doe",
                email: "not-an-email",
                phone: "+1234567890",
                country: "France",
                city: "Paris",
                jobTitle: "Architect",
                expertiseField: "Sustainable Design",
                yearsExperience: "5",
                educationLevel: "Master",
                sustainableDesignLevel: "Advanced",
                joinReason: "Want to join green projects",
                learningFormat: "Online",
                availabilityPerWeek: "10 hours",
                preferredSchedule: "Weekdays",
                consent: true,
            };
            const result = projectPayloadSchema.safeParse(invalidPayload);
            expect(result.success).toBe(false);
        });

        it('rejects missing required fields', () => {
            const incompletePayload = {
                type: "project",
                fullName: "John Doe",
                email: "john@example.com",
            };
            const result = projectPayloadSchema.safeParse(incompletePayload);
            expect(result.success).toBe(false);
        });
    });

    describe('Consultation Type', () => {
        it('validates correct consultation payload', () => {
            const validPayload = {
                type: "consultation",
                firstName: "Jane",
                lastName: "Smith",
                phone: "+1234567890",
                email: "jane@example.com",
                address: "123 Main St",
                position: "Project Manager",
                projectCountry: "Germany",
                projectCity: "Berlin",
                climateZone: "Temperate",
                projectType: "Commercial",
                projectStage: "Planning",
                landArea: "500",
                builtUpArea: "300",
                timelineStart: "Q2 2026",
                timelineDelivery: "Q4 2027",
                requiredServices: ["Design", "Consulting"],
                estimatedQuote: true,
            };
            const result = consultationPayloadSchema.safeParse(validPayload);
            expect(result.success).toBe(true);
        });

        it('rejects invalid consultation type', () => {
            const invalidPayload = {
                type: "invalid-type",
                firstName: "Jane",
                lastName: "Smith",
            };
            const result = waitlistSchema.safeParse(invalidPayload);
            expect(result.success).toBe(false);
        });
    });
});