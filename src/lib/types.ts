export type ProjectSubmission = {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    job_title: string;
    expertise_field: string;
    years_experience: string;
    organization: string | null;
    education_level: string;
    certifications: string[];
    other_certification: string | null;
    tools: string | null;
    sustainable_design_level: string;
    key_skills: string[];
    other_key_skill: string | null;
    green_projects_worked: string;
    green_project_description: string | null;
    project_types: string | null;
    knowledge_level: string;
    join_reason: string;
    objectives: string[];
    learning_format: string;
    availability_per_week: string;
    preferred_schedule: string;
    portfolio_link: string | null;
    selected_plan: string | null;
    created_at: string;
};

export type CompanySubmission = {
    id: string;
    company_name: string;
    company_description: string;
    company_address: string | null;
    company_city: string | null;
    company_country: string | null;
    company_location: string | null;
    company_email: string | null;
    company_phone: string | null;
    company_website: string | null;
    social_media_links: Record<string, string>;
    linkedin_url: string | null;
    facebook_url: string | null;
    pinterest_url: string | null;
    instagram_url: string | null;
    youtube_url: string | null;
    company_type: string | null;
    years_of_operation: string | null;
    main_sector: string | null;
    collaboration_interests: string[];
    publish_consent: boolean;
    selected_plan: string | null;
    products: Record<string, unknown>[];
    created_at: string;
};

export type WorkerSubmission = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    location: string;
    age: string | null;
    occupation: string | null;
    trade: string;
    other_trade: string | null;
    years_experience: string | null;
    tasks: string[];
    other_task: string | null;
    worked_on_sites: string | null;
    green_project_experience: string | null;
    trade_level: string | null;
    tools_machines: string | null;
    technical_training: string | null;
    worker_certifications: string | null;
    currently_available: string | null;
    work_type: string | null;
    mobility: string | null;
    interested_in_green: string | null;
    green_interest_areas: string[];
    wants_training: string | null;
    preferred_training_type: string | null;
    cv_link: string | null;
    worker_certificates_link: string | null;
    portfolio_link: string | null;
    consent: boolean;
    selected_plan: string | null;
    created_at: string;
};

export type ConsultationSubmission = {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    address: string;
    position: string;
    project_country: string;
    project_city: string;
    climate_zone: string | null;
    project_type: string;
    project_stage: string;
    land_area: string;
    built_up_area: string;
    timeline_start: string;
    timeline_delivery: string;
    required_services: string[];
    estimated_quote: boolean;
    created_at: string;
};

export type SubmissionType = 'project' | 'company' | 'worker' | 'consultation';

export type Certification = {
    name: string;
    level: string;
    description: string;
};

export type ProductData = {
    id: string;
    name: string;
    category: string;
    characteristics: string[];
    certification?: Certification;
    keyFeatures?: string[];
    scopeOfWorks?: string;
    useCases?: string[];
    exampleProjects?: string;
    clientsReferences?: string;
    availableMarkets?: string[];
    description?: string;
    price?: string;
    priceRange?: string;
    salesModels?: string[];
    technicalDatasheet?: string;
    testReports?: string;
    productImages?: string;
    brochure?: string;
    videoDemo?: string;
};

export type Company = {
    id: string;
    name: string;
    image: string;
    description: string;
    location: string;
    website: string;
    email: string;
    phone: string;
    specialties: string[];
    subscription: "free" | "professional" | "enterprise" | "starter";
    products: ProductData[];
};

export type ProjectData = {
    id: string;
    title?: string;
    description?: string;
    category?: string;
    location: string;
    status: string;
    createdAt: string;
    personalInfo?: {
        name?: string;
        firstName?: string;
        lastName?: string;
        email: string;
        phone: string;
        address?: string;
    };
    specification?: string;
    surface?: number;
    facadeDimensions?: { width: number; height: number };
    services?: string[];
    wwr?: number;
};

export const PRODUCT_CATEGORIES = [
    "Isolation Thermique",
    "Panneaux Solaires",
    "Peintures Écologiques",
    "Systèmes de Ventilation",
    "Revêtements de Sol",
    "Récupération d'Eau",
    "Toitures Végétalisées",
    "Matériaux de Construction",
    "Éclairage LED",
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];