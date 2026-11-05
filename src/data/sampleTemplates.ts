import { TemplateDefinition, BusinessCategory, PlanPricing } from '../types';
import { PRESET_LOGOS } from './presetLogos';

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'bakery-sweetbites',
    name: 'Artisan Bakery & Cake Shop',
    category: 'bakery',
    categoryName: 'Bakery & Confectionery',
    tagline: 'Freshly Baked with Love',
    description: 'Perfect for bakeries, patisseries, home bakers, and sweet shops with WhatsApp cake ordering.',
    previewHeroUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
    defaultPrimary: '#ec4899', // rose/pink
    defaultAccent: '#f43f5e',
    fontFamily: 'Plus Jakarta Sans',
    demoData: {
      name: 'Sweet Bites Bakery',
      tagline: 'Freshly Baked with Love · Cakes, Pastries & More',
      category: 'bakery',
      categoryLabel: 'Bakery & Patisserie',
      description: 'Lucknow’s beloved artisan bakery serving 100% eggless custom designer cakes, flaky pastries, and artisanal breads baked fresh every morning.',
      aboutStory: 'Founded in Hazratganj, Sweet Bites started with a simple passion: to bring European-style baking with pure Indian warmth. We use fresh dairy cream, Belgian cocoa, and zero artificial preservatives.',
      address: 'Shop 14, Janpath Market, Hazratganj',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226001',
      phone: '+91 98765 43210',
      whatsapp: '+91 98765 43210',
      email: 'hello@sweetbiteslucknow.com',
      openingHours: 'Everyday: 10:00 AM – 10:30 PM',
      isPureVeg: true,
      googleMapsQuery: 'Janpath Market Hazratganj Lucknow',
      features: ['100% Pure Veg Available', 'Same Day 2-Hour Delivery', 'Custom Photo & Fondant Cakes', 'Midnight Surprise Deliveries'],
      heroImageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
      logoSvg: PRESET_LOGOS[0].svgCode,
      logoType: 'svg',
      socials: {
        instagram: 'sweetbites_lko',
        facebook: 'sweetbiteslucknow'
      }
    },
    demoProducts: [
      {
        id: 'p1',
        name: 'Belgian Chocolate Truffle Cake',
        category: 'Cakes',
        price: 650,
        description: 'Rich dark Belgian chocolate ganache layers with moist Dutch chocolate sponge.',
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
        isAvailable: true,
        badge: 'Bestseller'
      },
      {
        id: 'p2',
        name: 'Fresh Strawberry Cream Cake',
        category: 'Cakes',
        price: 599,
        description: 'Vanilla sponge layered with freshly chopped Mahabaleshwar strawberries and whipped cream.',
        imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80',
        isAvailable: true,
        badge: 'Seasonal'
      },
      {
        id: 'p3',
        name: 'Red Velvet Cupcake Duo',
        category: 'Pastries',
        price: 180,
        description: 'Classic velvety cupcakes with genuine cream cheese frosting and cocoa dust.',
        imageUrl: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        id: 'p4',
        name: 'Artisan Sourdough Loaf',
        category: 'Breads',
        price: 160,
        description: 'Naturally fermented 36-hour sourdough loaf with a crispy crust and chewy interior.',
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      }
    ]
  },
  {
    id: 'cafe-bliss',
    name: 'Artisan Cafe & Bistro',
    category: 'cafe',
    categoryName: 'Cafe & Restaurant',
    tagline: 'Good Coffee. Good Vibes.',
    description: 'Designed for specialty coffee roasters, modern cafes, restro-bars, and tea lounges.',
    previewHeroUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    defaultPrimary: '#d97706', // warm amber/coffee
    defaultAccent: '#b45309',
    fontFamily: 'Plus Jakarta Sans',
    demoData: {
      name: 'Cafe Bliss',
      tagline: 'Good Coffee. Good Vibes. · Freshly Brewed in Lucknow',
      category: 'cafe',
      categoryLabel: 'Specialty Cafe & Roastery',
      description: 'Your neighborhood sanctuary for freshly brewed single-origin Arabica coffee, stone-baked pizzas, artisanal sourdough toasts, and relaxing acoustic evenings.',
      aboutStory: 'Cafe Bliss was born in Gomti Nagar to create a warm community space where friends catch up, freelancers create, and coffee enthusiasts discover handcrafted espresso blends.',
      address: 'Plot 42, Vibhuti Khand, Gomti Nagar',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226010',
      phone: '+91 91234 56789',
      whatsapp: '+91 91234 56789',
      email: 'vibes@cafebliss.in',
      openingHours: 'Mon – Sun: 9:00 AM – 11:00 PM',
      isPureVeg: false,
      googleMapsQuery: 'Vibhuti Khand Gomti Nagar Lucknow Cafe',
      features: ['Single-Origin Arabica Beans', 'Free High-Speed Wi-Fi', 'Pet Friendly Outdoor Seating', 'Live Acoustic Weekends'],
      heroImageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
      logoSvg: PRESET_LOGOS[1].svgCode,
      logoType: 'svg',
      socials: {
        instagram: 'cafebliss_lko',
        facebook: 'cafeblisslucknow'
      }
    },
    demoProducts: [
      {
        id: 'c1',
        name: 'Signature Caramel Macchiato',
        category: 'Coffee',
        price: 240,
        description: 'Freshly pulled double espresso shot poured over velvety steamed milk and vanilla drizzle.',
        imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
        isAvailable: true,
        badge: 'Chef Choice'
      },
      {
        id: 'c2',
        name: 'Avocado Sourdough Toast',
        category: 'Food',
        price: 320,
        description: 'Hass avocado mash, cherry tomatoes, feta crumble, and toasted seeds on warm sourdough.',
        imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        id: 'c3',
        name: 'Belgian Waffle with Maple & Berries',
        category: 'Desserts',
        price: 280,
        description: 'Crispy golden waffle served with pure Canadian maple syrup, butter, and wild berry compote.',
        imageUrl: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80',
        isAvailable: true,
        badge: 'Popular'
      },
      {
        id: 'c4',
        name: 'Penne Arrabiata with Garlic Bread',
        category: 'Food',
        price: 340,
        description: 'Al dente penne tossed in fiery San Marzano tomato sauce, fresh basil, and extra virgin olive oil.',
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d62810ef?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      }
    ]
  },
  {
    id: 'fashion-boutique',
    name: 'Ethnic & Fashion Boutique',
    category: 'clothing',
    categoryName: 'Fashion & Retail',
    tagline: 'Timeless Elegance & Contemporary Grace',
    description: 'Showcase designer sarees, bridal wear, kurtis, menswear, or western apparel with seamless WhatsApp queries.',
    previewHeroUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    defaultPrimary: '#7c3aed', // royal violet
    defaultAccent: '#6d28d9',
    fontFamily: 'Plus Jakarta Sans',
    demoData: {
      name: 'Zari Heritage Boutique',
      tagline: 'Authentic Lucknowi Chikankari & Royal Bridal Wear',
      category: 'clothing',
      categoryLabel: 'Designer Ethnic Studio',
      description: 'Preserving generations of authentic hand-embroidered Lucknowi Chikankari, Banarasi silk sarees, and bespoke bridal couture.',
      aboutStory: 'Founded in the heart of Aminabad, Zari Heritage collaborates with over 150 local master artisans to bring regal Awadhi craftsmanship to discerning patrons worldwide.',
      address: 'Shop 7, Mohan Market, Aminabad',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226018',
      phone: '+91 94150 12345',
      whatsapp: '+91 94150 12345',
      email: 'orders@zariheritage.com',
      openingHours: 'Mon – Sat: 11:00 AM – 9:00 PM (Sunday Closed)',
      googleMapsQuery: 'Aminabad Lucknow Chikankari Market',
      features: ['100% Handcrafted Chikankari', 'Custom Tailoring & Stitching', 'Worldwide Express Shipping', 'Exclusive Bridal Consultations'],
      heroImageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
      logoSvg: PRESET_LOGOS[2].svgCode,
      logoType: 'svg',
      socials: {
        instagram: 'zariheritage_boutique',
        facebook: 'zariheritagelko'
      }
    },
    demoProducts: [
      {
        id: 'f1',
        name: 'Pure Georgette Chikankari Anarkali',
        category: 'Suits',
        price: 4850,
        description: 'Exquisite handcrafted Mukaish work with delicate shadow work on lightweight pure georgette.',
        imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
        isAvailable: true,
        badge: 'Exclusive'
      },
      {
        id: 'f2',
        name: 'Handloom Katan Silk Banarasi Saree',
        category: 'Sarees',
        price: 8900,
        description: 'Pure silk woven with antique gold zari motifs and rich pallu for weddings and grand festivities.',
        imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
        isAvailable: true,
        badge: 'Bridal Pick'
      },
      {
        id: 'f3',
        name: 'Pastel Chanderi Kurta Set',
        category: 'Kurti Sets',
        price: 2450,
        description: 'Breathable festive set with fine threadwork, organza dupatta, and straight fit trousers.',
        imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      }
    ]
  },
  {
    id: 'salon-luxury',
    name: 'Unisex Salon & Beauty Studio',
    category: 'salon',
    categoryName: 'Salon & Spa',
    tagline: 'Elevate Your Look & Glow',
    description: 'Tailored for hair salons, nail spas, bridal makeup artists, and grooming lounges with appointment booking.',
    previewHeroUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    defaultPrimary: '#059669', // emerald
    defaultAccent: '#047857',
    fontFamily: 'Plus Jakarta Sans',
    demoData: {
      name: 'Glamour Unisex Studio',
      tagline: 'Luxury Hair, Skin Care & Bridal Studio',
      category: 'salon',
      categoryLabel: 'Premium Salon & Spa',
      description: 'Lucknow’s destination for creative hair styling, organic skin therapies, and celebrity bridal makeup using world-class certified products.',
      aboutStory: 'With certified master stylists and dermatologically approved treatments, Glamour Studio guarantees you look and feel your absolute best for every occasion.',
      address: '2nd Floor, Apex Plaza, Aliganj Main Road',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226024',
      phone: '+91 97920 88888',
      whatsapp: '+91 97920 88888',
      email: 'care@glamourstudio.in',
      openingHours: 'Tue – Sun: 10:00 AM – 9:00 PM (Monday Closed)',
      googleMapsQuery: 'Aliganj Main Road Lucknow Salon',
      features: ['L’Oréal & Kérastase Certified', 'Hygienic Sanitized Stations', 'Air-Conditioned VIP Lounges', 'Complimentary Scalp Analysis'],
      heroImageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
      logoSvg: PRESET_LOGOS[3].svgCode,
      logoType: 'svg',
      socials: {
        instagram: 'glamour_unisex_lko'
      }
    },
    demoProducts: [
      {
        id: 's1',
        name: 'Keratin Hair Spa & Treatment',
        category: 'Hair Care',
        price: 2499,
        description: 'Deep nourishing therapy to tame frizz, replenish lost protein, and restore mirror shine.',
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
        isAvailable: true,
        badge: 'Trending'
      },
      {
        id: 's2',
        name: 'Hydra-Facial Deep Cleanse',
        category: 'Skin Care',
        price: 1899,
        description: 'Multi-step facial using ultrasonic vortex suction to extract impurities and infuse skin with antioxidants.',
        imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        id: 's3',
        name: 'HD Airbrush Bridal Makeup Package',
        category: 'Bridal',
        price: 14999,
        description: 'Complete bridal look with hair styling, saree draping, lash extensions, and camera-ready airbrush finish.',
        imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
        isAvailable: true,
        badge: 'Premium'
      }
    ]
  },
  {
    id: 'coaching-centre',
    name: 'Coaching Institute & Academy',
    category: 'coaching',
    categoryName: 'Education & Coaching',
    tagline: 'Inspiring Minds, Securing Top Ranks',
    description: 'Built for tuition centers, competitive exam academies (JEE/NEET/UPSC), and language schools.',
    previewHeroUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    defaultPrimary: '#2563eb', // royal blue
    defaultAccent: '#1d4ed8',
    fontFamily: 'Plus Jakarta Sans',
    demoData: {
      name: 'Apex Target Academy',
      tagline: 'Premier Coaching for IIT-JEE, NEET & CBSE Board Excellence',
      category: 'coaching',
      categoryLabel: 'Competitive Coaching Institute',
      description: 'Mentoring Lucknow’s brightest minds since 2014 with top faculty, small batch sizes, and comprehensive doubt-clearing sessions.',
      aboutStory: 'Founded by ex-IITians, Apex Target Academy has produced over 450+ selections in engineering and medical entrance exams with an unwavering focus on conceptual clarity.',
      address: 'Lane 3, Kapoorthala Commercial Complex',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226020',
      phone: '+91 99350 44556',
      whatsapp: '+91 99350 44556',
      email: 'admissions@apextarget.edu.in',
      openingHours: 'Mon – Sat: 8:00 AM – 8:00 PM',
      googleMapsQuery: 'Kapoorthala Commercial Complex Lucknow Coaching',
      features: ['Air-Conditioned Digital Smart Labs', 'Daily Practice Papers (DPP)', 'Weekly Mock Test Series', 'Bi-Monthly Parent-Teacher Reviews'],
      heroImageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      logoSvg: PRESET_LOGOS[4].svgCode,
      logoType: 'svg',
      socials: {
        youtube: 'ApexTargetAcademyLucknow'
      }
    },
    demoProducts: [
      {
        id: 'e1',
        name: 'JEE Mains & Advanced 2-Year Program',
        category: 'Engineering',
        price: 45000,
        description: 'Complete Physics, Chemistry & Math curriculum for Class 11 & 12 students with national test series.',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
        isAvailable: true,
        badge: 'High Success Rate'
      },
      {
        id: 'e2',
        name: 'NEET Comprehensive Dropper Batch',
        category: 'Medical',
        price: 52000,
        description: 'Intensive 1-year repeaters coaching with daily NCERT line-by-line revision and speed drill sessions.',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        id: 'e3',
        name: 'Class 10 CBSE Board Crash Course',
        category: 'Foundations',
        price: 12500,
        description: '3-Month rapid revision covering Science & Math with previous 10 years solved board papers.',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      }
    ]
  },
  {
    id: 'local-services',
    name: 'Home Services & Repairs',
    category: 'services',
    categoryName: 'Services & Contractors',
    tagline: 'Reliable Doorstep Service in 60 Mins',
    description: 'Ideal for AC repair, electricians, plumbers, car detailers, and home care specialists.',
    previewHeroUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    defaultPrimary: '#0284c7', // sky / ocean blue
    defaultAccent: '#0369a1',
    fontFamily: 'Plus Jakarta Sans',
    demoData: {
      name: 'ProFix Appliance & AC Care',
      tagline: 'Verified Doorstep AC, Refrigerator & RO Repair Services',
      category: 'services',
      categoryLabel: 'Doorstep Technical Services',
      description: 'Lucknow’s trusted home repair network with 30-day service warranty, transparent upfront pricing, and background-verified technicians.',
      aboutStory: 'Serving over 5,000 households across Lucknow, ProFix removes the headache of unreliable local mechanics by offering guaranteed 60-minute doorstep response.',
      address: 'Shop 19, Indira Nagar Commercial Hub',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226016',
      phone: '+91 96500 11223',
      whatsapp: '+91 96500 11223',
      email: 'booking@profixlucknow.in',
      openingHours: 'Mon – Sun: 7:00 AM – 10:00 PM (Emergency 24x7)',
      googleMapsQuery: 'Indira Nagar Lucknow Home Services',
      features: ['60-Minute Rapid Doorstep Visit', '30-Day Service Warranty', 'Genuine Spare Parts Only', 'Fixed Transparent Pricing'],
      heroImageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
      logoSvg: PRESET_LOGOS[5].svgCode,
      logoType: 'svg',
      socials: {
        facebook: 'profixapplianceservices'
      }
    },
    demoProducts: [
      {
        id: 'h1',
        name: 'Split AC Deep Jet Foam Servicing',
        category: 'AC Service',
        price: 499,
        description: 'Complete indoor & outdoor coil cleaning with pressure jet pump and antibacterial foam spray.',
        imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
        isAvailable: true,
        badge: 'Top Booked'
      },
      {
        id: 'h2',
        name: 'AC Gas Refill & Leak Inspection',
        category: 'AC Service',
        price: 1800,
        description: 'Nitrogen leak testing, brazing repair, vacuuming, and pure R32/R410A refrigerant charging.',
        imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        id: 'h3',
        name: 'RO Water Purifier Annual Service',
        category: 'Water Purifier',
        price: 799,
        description: 'Filter replacement, membrane flushing, TDS adjustment, and water purity test.',
        imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      }
    ]
  }
];

export const PRICING_PLANS: PlanPricing[] = [
  {
    id: 'FREE',
    name: 'Free Forever',
    priceInrMonthly: 0,
    priceInrAnnual: 0,
    description: 'Ideal for local shops testing their first online presence.',
    maxWebsites: 1,
    maxProducts: 5,
    customDomain: false,
    analytics: 'basic',
    removeNeurozyBranding: false,
    support: 'Community Support'
  },
  {
    id: 'STARTER',
    name: 'Starter',
    priceInrMonthly: 199,
    priceInrAnnual: 1790, // ~₹149/mo
    description: 'Perfect for established bakeries, cafes, and boutiques ready to grow.',
    maxWebsites: 2,
    maxProducts: 25,
    customDomain: false,
    analytics: 'standard',
    removeNeurozyBranding: false,
    support: 'Email & WhatsApp Support',
    recommended: true
  },
  {
    id: 'BUSINESS',
    name: 'Business',
    priceInrMonthly: 499,
    priceInrAnnual: 4490,
    description: 'Connect your own domain (e.g. sweetbites.in) and remove all Neurozy branding.',
    maxWebsites: 5,
    maxProducts: 100,
    customDomain: true,
    analytics: 'advanced',
    removeNeurozyBranding: true,
    support: 'Priority 24/7 Phone Support'
  },
  {
    id: 'PRO',
    name: 'Pro Agency',
    priceInrMonthly: 999,
    priceInrAnnual: 8990,
    description: 'For business owners managing multiple locations or regional franchises.',
    maxWebsites: 15,
    maxProducts: 500,
    customDomain: true,
    analytics: 'advanced',
    removeNeurozyBranding: true,
    support: 'Dedicated Account Manager'
  }
];
