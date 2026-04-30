import { describe, it, expect } from 'vitest';
import type { ProjectSubmission, CompanySubmission, WorkerSubmission, ConsultationSubmission } from '@/lib/types';

describe('Database Types', () => {
    describe('ProjectSubmission', () => {
        it('has required fields', () => {
            const submission: ProjectSubmission = {
                id: '123',
                full_name: 'John Doe',
                email: 'john@example.com',
                phone: '+1234567890',
                country: 'France',
                city: 'Paris',
                job_title: 'Architect',
                expertise_field: 'Sustainable Design',
                years_experience: '5',
                organization: null,
                education_level: 'Master',
                certifications: [],
                other_certification: null,
                tools: null,
                sustainable_design_level: 'Advanced',
                key_skills: [],
                other_key_skill: null,
                green_projects_worked: 'Yes',
                green_project_description: null,
                project_types: null,
                knowledge_level: 'Intermediate',
                join_reason: 'Join green projects',
                objectives: [],
                learning_format: 'Online',
                availability_per_week: '10 hours',
                preferred_schedule: 'Weekdays',
                portfolio_link: null,
                selected_plan: null,
                created_at: new Date().toISOString(),
            };
            expect(submission.full_name).toBe('John Doe');
            expect(submission.email).toBe('john@example.com');
        });
    });

    describe('CompanySubmission', () => {
        it('has required fields', () => {
            const submission: CompanySubmission = {
                id: '123',
                company_name: 'Green Corp',
                company_description: 'Sustainable building materials',
                company_address: null,
                company_city: null,
                company_country: null,
                company_location: null,
                company_email: null,
                company_phone: null,
                company_website: null,
                social_media_links: {},
                linkedin_url: null,
                facebook_url: null,
                pinterest_url: null,
                instagram_url: null,
                youtube_url: null,
                company_type: null,
                years_of_operation: null,
                main_sector: null,
                collaboration_interests: [],
                publish_consent: false,
                selected_plan: null,
                products: [],
                created_at: new Date().toISOString(),
            };
            expect(submission.company_name).toBe('Green Corp');
        });
    });

    describe('WorkerSubmission', () => {
        it('has required fields', () => {
            const submission: WorkerSubmission = {
                id: '123',
                name: 'Jane Worker',
                email: 'jane@example.com',
                phone: null,
                location: 'Berlin',
                age: null,
                occupation: null,
                trade: 'Carpenter',
                other_trade: null,
                years_experience: null,
                tasks: [],
                other_task: null,
                worked_on_sites: null,
                green_project_experience: null,
                trade_level: null,
                tools_machines: null,
                technical_training: null,
                worker_certifications: null,
                currently_available: null,
                work_type: null,
                mobility: null,
                interested_in_green: null,
                green_interest_areas: [],
                wants_training: null,
                preferred_training_type: null,
                cv_link: null,
                worker_certificates_link: null,
                portfolio_link: null,
                consent: true,
                selected_plan: null,
                created_at: new Date().toISOString(),
            };
            expect(submission.name).toBe('Jane Worker');
            expect(submission.trade).toBe('Carpenter');
        });
    });

    describe('ConsultationSubmission', () => {
        it('has required fields', () => {
            const submission: ConsultationSubmission = {
                id: '123',
                first_name: 'John',
                last_name: 'Client',
                phone: '+1234567890',
                email: 'john@example.com',
                address: '123 Main St',
                position: 'Project Manager',
                project_country: 'Germany',
                project_city: 'Berlin',
                climate_zone: 'Temperate',
                project_type: 'Commercial',
                project_stage: 'Planning',
                land_area: '500',
                built_up_area: '300',
                timeline_start: 'Q2 2026',
                timeline_delivery: 'Q4 2027',
                required_services: ['Design', 'Consulting'],
                estimated_quote: true,
                created_at: new Date().toISOString(),
            };
            expect(submission.first_name).toBe('John');
            expect(submission.required_services).toContain('Design');
        });
    });
});