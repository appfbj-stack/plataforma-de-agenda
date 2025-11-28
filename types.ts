
export interface Profession {
  id: string;
  name: string;
  icon: any; // Lucide Icon
  emoji: string;
  description: string;
  color: string;
  image: string;
  tags: string[];
  screenshots?: string[];
  active: boolean; // New: to toggle visibility from admin
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  recommended?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  business: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface FieldConfig {
  label: string;
  type: string;
  icon: any;
  color: string;
}

export enum AppStep {
  LANDING = 'LANDING',
  SIGNUP = 'SIGNUP',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  ADMIN = 'ADMIN' // New Step
}

export interface AppConfig {
  landing: {
    heroTitle: string;
    heroSubtitle: string;
    heroButtonText: string;
  };
  professions: Profession[];
  fieldConfigs: Record<string, FieldConfig[]>; // New: Dynamic fields configuration
}
