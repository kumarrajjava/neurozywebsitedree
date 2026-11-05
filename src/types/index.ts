export type BusinessCategory = 
  | 'bakery'
  | 'cafe'
  | 'clothing'
  | 'salon'
  | 'coaching'
  | 'services'
  | 'retail'
  | 'other';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  isAvailable: boolean;
  badge?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  category: BusinessCategory;
  categoryLabel: string;
  description: string;
  aboutStory: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: string;
  isPureVeg?: boolean;
  googleMapsQuery: string;
  socials: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  features: string[];
  heroImageUrl: string;
  logoUrl?: string;
  logoSvg?: string;
  logoType?: 'svg' | 'image' | 'monogram';
  logoBgColor?: string;
}

export interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  font: string;
  buttonStyle: 'rounded' | 'pill' | 'square';
  darkMode: boolean;
}

export interface SectionVisibility {
  hero: boolean;
  about: boolean;
  products: boolean;
  hours: boolean;
  reviews: boolean;
  contact: boolean;
  map: boolean;
  whatsappButton: boolean;
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  robotsIndex: boolean;
  structuredDataType?: 'LocalBusiness' | 'Bakery' | 'Restaurant' | 'ClothingStore' | 'BeautySalon' | 'EducationalOrganization';
}

export interface WebsiteData {
  id: string;
  subdomain: string;
  customDomain?: string;
  business: BusinessInfo;
  products: ProductItem[];
  reviews: ReviewItem[];
  templateId: string;
  theme: ThemeConfig;
  sections: SectionVisibility;
  seo?: SeoConfig;
  isPublished: boolean;
  publishedAt?: string;
  visits: number;
  whatsappClicks: number;
  callClicks: number;
  updatedAt: string;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  category: BusinessCategory;
  categoryName: string;
  tagline: string;
  description: string;
  previewHeroUrl: string;
  defaultPrimary: string;
  defaultAccent: string;
  fontFamily: string;
  demoData: Partial<BusinessInfo>;
  demoProducts: ProductItem[];
}

export type PlanType = 'FREE' | 'STARTER' | 'BUSINESS' | 'PRO';

export interface PlanPricing {
  id: PlanType;
  name: string;
  priceInrMonthly: number;
  priceInrAnnual: number;
  description: string;
  maxWebsites: number;
  maxProducts: number;
  customDomain: boolean;
  analytics: 'basic' | 'standard' | 'advanced';
  removeNeurozyBranding: boolean;
  support: string;
  recommended?: boolean;
}
