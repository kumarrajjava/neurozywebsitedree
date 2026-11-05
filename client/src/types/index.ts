export type TemplateCategory = 
  | 'bakery' 
  | 'clothing' 
  | 'salon' 
  | 'restaurant' 
  | 'coaching' 
  | 'service';

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
}

export interface OperatingHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface BusinessData {
  id?: string;
  name: string;
  category: TemplateCategory;
  tagline: string;
  description: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  googleMapsUrl?: string;
  operatingHours: OperatingHours;
  products: ProductItem[];
  templateId: string;
  primaryColor: string;
  subdomain: string;
  isPublished?: boolean;
  publishedUrl?: string;
  visitsCount?: number;
  whatsappClicksCount?: number;
}

export interface WebsiteTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  tagline: string;
  previewImage: string;
  badge: string;
  defaultPrimaryColor: string;
  description: string;
  features: string[];
}

export type ViewportMode = 'desktop' | 'mobile';

export type AppViewMode = 'landing' | 'dashboard' | 'profile' | 'editor' | 'published-site';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  planTier: 'FREE' | 'STARTER' | 'BUSINESS' | 'PRO';
}
