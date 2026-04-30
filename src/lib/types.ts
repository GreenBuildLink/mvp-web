// ==========================================
// Company Types
// ==========================================

export interface Product {
  id: string;
  name: string;
  category: string;
  characteristics: string[];
  certification: {
    name: string;
    level: "A+" | "A" | "B" | "C" | "D";
    description: string;
  };
  description: string;
  image?: string;
  price?: string;
}

export type SubscriptionPack = "starter" | "professional" | "enterprise";

export interface Company {
  id: string;
  name: string;
  image: string;
  description: string;
  products: Product[];
  subscription: SubscriptionPack;
  location?: string;
  website?: string;
  email?: string;
  phone?: string;
  specialties?: string[];
}

// ==========================================
// Concepteur Types
// ==========================================

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export interface ProjectSpecification {
  description?: string;
  location: string;
  surface: number;
  facadeDimensions: {
    width: number;
    height: number;
  };
  services: string[];
  wwr: number; // Window Wall Ratio (0-100)
}

export type ConcepteurMode = "free" | "subscription" | "project";

export interface Concepteur {
  id: string;
  personalInfo: PersonalInfo;
  mode: ConcepteurMode;
  projects: ProjectData[];
}

export interface ProjectData {
  id: string;
  personalInfo: PersonalInfo;
  specification?: string;
  location: string;
  surface: number;
  facadeDimensions: {
    width: number;
    height: number;
  };
  services: string[];
  wwr: number;
  status: "draft" | "submitted" | "in_progress" | "completed";
  createdAt: string;
}

// ==========================================
// Product Categories
// ==========================================

export const PRODUCT_CATEGORIES = [
  "Building Enveloppe",
  "Insulation",
  "Home automation",
  "HVAC",
  "Domestic Hot Water",
  "Water treatment",
  "Waterproofing",
  "Artificial lightning",
  "Floor covering",
  "Eco-friendly paints",
  "Carpentry",
  "Solar Panel",
  "Wood",
  "Furniture",
  "Faucets",
  "Equipments",
  "Other",
] as const;

export const CERTIFICATION_LEVELS = [
  { value: "A+", label: "A+ — Minimal impact", color: "bg-emerald-500" },
  { value: "A", label: "A — Very low impact", color: "bg-emerald-400" },
  { value: "B", label: "B — Low impact", color: "bg-teal-400" },
  { value: "C", label: "C — Moderate impact", color: "bg-amber-400" },
  { value: "D", label: "D — High impact", color: "bg-red-400" },
] as const;

export const SERVICES = [
  "Building Certification (EDGE, LEED, HQE)",
  "Environmental Design",
  "Environmental Expertise",
  "Energy Simulation",
  "Green practices recommandations",
  "Materials Consultancy",
  "Carbon footprint Assessment",
  "Training",
] as const;
