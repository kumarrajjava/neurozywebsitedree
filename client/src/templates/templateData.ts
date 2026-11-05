import { WebsiteTemplate } from '../types';

export const TEMPLATES: WebsiteTemplate[] = [
  {
    id: 'sweet-bites-bakery',
    name: 'Sweet Bites Bakery & Cafe',
    category: 'bakery',
    tagline: 'Freshly Baked with Love Every Morning',
    badge: 'Popular for Cafes',
    defaultPrimaryColor: '#E11D48', // rose-600
    previewImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    description: 'Perfect for local bakeries, pastry shops, cake artists, and dessert cafes with direct WhatsApp ordering.',
    features: ['Pastry & Cake Showcase', 'WhatsApp Custom Cake Orders', 'Opening Hours Badge', 'Eggless & Dietary Tags']
  },
  {
    id: 'royal-heritage-boutique',
    name: 'Royal Heritage Fashion',
    category: 'clothing',
    tagline: 'Elegance & Style for Every Occasion',
    badge: 'Best for Boutiques',
    defaultPrimaryColor: '#7C3AED', // violet-600
    previewImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    description: 'Tailored for apparel shops, Chikankari boutiques, ethnic wear, and modern clothing stores.',
    features: ['New Arrivals Carousel', 'Size Guide & Fabric Info', 'WhatsApp Order Inquiries', 'Festive Offer Banners']
  },
  {
    id: 'glow-glam-salon',
    name: 'Glow & Glam Luxury Salon',
    category: 'salon',
    tagline: 'Your Neighborhood Beauty & Wellness Haven',
    badge: 'Trending for Salons',
    defaultPrimaryColor: '#DB2777', // pink-600
    previewImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: 'Designed for beauty parlors, hair salons, nail studios, and men’s grooming lounges.',
    features: ['Service Rate Card', 'Stylist Highlights', 'Instant WhatsApp Appointment', 'Hygiene Assured Badge']
  },
  {
    id: 'zaika-lucknow-dine',
    name: 'Zaika Authentic Dine & Cafe',
    category: 'restaurant',
    tagline: 'Flavors of Heritage, Served with Heart',
    badge: 'Top for Food',
    defaultPrimaryColor: '#D97706', // amber-600
    previewImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    description: 'Designed for Indian restaurants, Awadhi dhabas, street food corners, and family bistros.',
    features: ['Digital Dine-in/Takeaway Menu', 'Chef Specials', 'Direct WhatsApp Table Booking', 'Delivery Links']
  },
  {
    id: 'apex-academy-coaching',
    name: 'Apex Academy Institute',
    category: 'coaching',
    tagline: 'Empowering Future Leaders & Toppers',
    badge: 'For Educators',
    defaultPrimaryColor: '#2563EB', // blue-600
    previewImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    description: 'Ideal for CBSE/ICSE tuitions, NEET/JEE test prep, computer institutes, and language tutors.',
    features: ['Courses & Batch Timetable', 'Faculty Credentials', 'Book Free Demo Class', 'Student Success Wall']
  },
  {
    id: 'fixmaster-local-services',
    name: 'FixMaster Pro Services',
    category: 'service',
    tagline: 'Fast, Trusted & Verified Home Services',
    badge: 'Top for Service Pros',
    defaultPrimaryColor: '#059669', // emerald-600
    previewImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    description: 'Engineered for AC repair, electricians, plumbers, interior painters, and local technicians.',
    features: ['Emergency Call-Now Button', 'Fixed Upfront Pricing', 'Verified Technician Badge', 'Customer Reviews']
  }
];
