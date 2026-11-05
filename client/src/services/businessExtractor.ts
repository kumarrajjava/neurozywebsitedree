import { BusinessData, TemplateCategory, ProductItem } from '../types';

interface SamplePresets {
  label: string;
  category: TemplateCategory;
  language: string;
  transcript: string;
}

export const SAMPLE_VOICE_PRESETS: SamplePresets[] = [
  {
    label: 'Bakery (Hazratganj, Lucknow)',
    category: 'bakery',
    language: 'Hinglish',
    transcript: 'Meri Hazratganj Lucknow mein Sweet Bites naam se bakery hai. Hum chocolate cakes, pastries aur customized birthday cakes banate hain. WhatsApp order available hai 9876543210 par. Timing subah 9 se raat 10 baje tak.'
  },
  {
    label: 'Boutique & Chikankari',
    category: 'clothing',
    language: 'Hindi',
    transcript: 'Hamari Aminabad mein Noor Chikankari and Boutique ki dukaan hai. Pure cotton kurtis, designer lehengas aur festive suits milte hain. Call ya WhatsApp kijiye 9123456789 par, subah 10:30 se raat 9 baje tak open.'
  },
  {
    label: 'Luxury Unisex Salon',
    category: 'salon',
    language: 'English/Hinglish',
    transcript: 'We run Glow & Glam Unisex Salon in Gomti Nagar, Lucknow. We provide modern haircuts, bridal makeup, revitalizing facials and keratin spa treatments. WhatsApp appointment booking at 9988776655. Open 10 AM to 8:30 PM.'
  },
  {
    label: 'Awadhi Restaurant & Cafe',
    category: 'restaurant',
    language: 'Hinglish',
    transcript: 'Humara Chowk Lucknow mein Dawat-e-Khaas restaurant hai. Dum biryani, Galawati kebabs, Rumali roti aur Awadhi desserts serve karte hain. Family seating aur home delivery available hai 8877665544 par.'
  },
  {
    label: 'NEET/JEE Coaching Institute',
    category: 'coaching',
    language: 'Hinglish',
    transcript: 'Aliganj Lucknow mein Apex Career Institute hai. Class 9 to 12 CBSE, ICSE, aur NEET, JEE ki coaching provide karte hain. Expert faculty and test series available. Contact 9450012345 for free demo batch.'
  },
  {
    label: 'AC & Electrical Service Pro',
    category: 'service',
    language: 'Hinglish',
    transcript: 'FixMaster Home Services Lucknow. Hum AC repair, deep cleaning, electrical wiring aur plumbing ka fast doorstep service dete hain. Call or WhatsApp 9839011223. Verified technician within 45 minutes.'
  }
];

export function extractBusinessFromTranscript(rawTranscript: string): BusinessData {
  const text = rawTranscript.trim();
  const lower = text.toLowerCase();

  // 1. Detect Category
  let category: TemplateCategory = 'bakery';
  if (/cloth|boutique|kapde|saree|kurti|dress|suit|lehenga|fashion|garment|apparel|chikankari/i.test(text)) {
    category = 'clothing';
  } else if (/salon|parlour|parlor|beauty|makeup|haircut|facial|spa|grooming|barber|bridal/i.test(text)) {
    category = 'salon';
  } else if (/restaurant|dhaba|biryani|cafe|kebab|food|dine|khana|sweets|mithai|chai|pizza|burger|swaad|zaika/i.test(text)) {
    category = 'restaurant';
  } else if (/coaching|tuition|institute|academy|classes|neet|jee|cbse|study|education|faculty|batch|teacher|student/i.test(text)) {
    category = 'coaching';
  } else if (/service|repair|electrician|plumber|ac repair|cleaning|technician|carpenter|painter|fix/i.test(text)) {
    category = 'service';
  } else if (/bakery|cake|pastry|bakes|cookie|dessert|bread|confectionery/i.test(text)) {
    category = 'bakery';
  }

  // 2. Extract Business Name
  let name = '';
  // Patterns like "Sweet Bites naam se", "naam hai Sweet Bites", "named Sweet Bites", "called Sweet Bites"
  const namePatterns = [
    /([A-Z][A-Za-z0-9&'\s]{2,28})\s+(?:naam se|naam ki|named|called)/i,
    /(?:naam hai|named|called|shop name is|business is)\s+([A-Za-z0-9&'\s]{2,28})/i,
    /(?:mein|in)\s+([A-Za-z0-9&'\s]{2,25})\s+(?:hai|ki dukaan|store|shop|bakery|salon|restaurant|institute)/i
  ];

  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const candidate = match[1].replace(/(meri|hamari|humara|ek|ki|ka|hai|in|at)/gi, '').trim();
      if (candidate.length > 2 && candidate.length < 35) {
        name = candidate;
        break;
      }
    }
  }

  if (!name) {
    // Category-based fallback names
    const fallbackNames: Record<TemplateCategory, string> = {
      bakery: 'Sweet Bites Bakery',
      clothing: 'Royal Heritage Boutique',
      salon: 'Glow & Glam Unisex Salon',
      restaurant: 'Dawat-e-Khaas Restaurant',
      coaching: 'Apex Career Academy',
      service: 'FixMaster Pro Services'
    };
    name = fallbackNames[category];
  }

  // 3. Extract Phone / WhatsApp (10 digits starting with 6, 7, 8, 9)
  let phone = '9876543210';
  const phoneMatch = text.match(/(?:\+91[\s-]?)?([6-9]\d{9})/);
  if (phoneMatch && phoneMatch[1]) {
    phone = phoneMatch[1];
  }

  // 4. Extract Location / Area
  let area = 'Hazratganj';
  let city = 'Lucknow';
  const lucknowAreas = [
    'Hazratganj', 'Gomti Nagar', 'Alambagh', 'Aminabad', 'Chowk', 
    'Aliganj', 'Indira Nagar', 'Mahanagar', 'Jankipuram', 'Ashiyana'
  ];
  for (const loc of lucknowAreas) {
    if (new RegExp(loc, 'i').test(text)) {
      area = loc;
      break;
    }
  }

  // Check if other major city mentioned
  const cityMatch = text.match(/\b(Lucknow|Delhi|Mumbai|Kanpur|Varanasi|Noida|Bengaluru|Jaipur)\b/i);
  if (cityMatch && cityMatch[1]) {
    city = cityMatch[1];
  }

  // 5. Generate Tagline & Description based on Category
  const categoryMetadata: Record<TemplateCategory, { tagline: string; description: string; templateId: string; color: string }> = {
    bakery: {
      tagline: `Freshly Baked with Love in ${area}, ${city}`,
      description: `Artisanal bakery crafting fresh eggless cakes, celebratory pastries, handmade cookies, and savory treats for every milestone.`,
      templateId: 'sweet-bites-bakery',
      color: '#E11D48'
    },
    clothing: {
      tagline: `Elegance, Heritage & Contemporary Fashion in ${city}`,
      description: `Curated collection of authentic Chikankari, festive ethnic wear, designer sarees, and modern ready-to-wear apparel.`,
      templateId: 'royal-heritage-boutique',
      color: '#7C3AED'
    },
    salon: {
      tagline: `Premium Hair, Beauty & Wellness Sanctuary in ${area}`,
      description: `Professional unisex salon offering precision haircuts, bridal makeovers, soothing facials, and advanced hair spa treatments.`,
      templateId: 'glow-glam-salon',
      color: '#DB2777'
    },
    restaurant: {
      tagline: `Authentic Heritage Delights & Warm Hospitality in ${city}`,
      description: `Serving time-honored Awadhi delicacies, fragrant dum biryanis, succulent kebabs, and handcrafted desserts made with royal recipes.`,
      templateId: 'zaika-lucknow-dine',
      color: '#D97706'
    },
    coaching: {
      tagline: `Building Champions for Board Exams, NEET & JEE`,
      description: `Premier coaching academy with experienced faculty, comprehensive study material, regular doubt clinics, and test series.`,
      templateId: 'apex-academy-coaching',
      color: '#2563EB'
    },
    service: {
      tagline: `Quick, Verified & Reliable Doorstep Services in ${city}`,
      description: `Certified technicians for AC repair & maintenance, electrical troubleshooting, plumbing, and home appliance restoration.`,
      templateId: 'fixmaster-local-services',
      color: '#059669'
    }
  };

  const meta = categoryMetadata[category];

  // 6. Generate Products / Services for this category
  const sampleProductsByCategory: Record<TemplateCategory, ProductItem[]> = {
    bakery: [
      {
        id: 'p1',
        name: 'Belgian Dark Chocolate Cake (1/2 kg)',
        description: 'Rich Dutch cocoa sponge layered with silky ganache and dark chocolate shavings.',
        price: 499,
        category: 'Cakes',
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        id: 'p2',
        name: 'Red Velvet Cream Cheese Pastry',
        description: 'Velvety crimson sponge topped with light Philadelphia cream cheese frosting.',
        price: 99,
        category: 'Pastries',
        imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        id: 'p3',
        name: 'Customised Tier Birthday Cake',
        description: 'Handcrafted theme cakes tailored to your celebrations with eggless recipe.',
        price: 1099,
        category: 'Custom',
        imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        id: 'p4',
        name: 'Butterscotch Crunch Pastry',
        description: 'Golden caramel sponge infused with crunchy praline nuts and toffee cream.',
        price: 85,
        category: 'Pastries',
        imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      }
    ],
    clothing: [
      {
        id: 'p1',
        name: 'Handcrafted Cotton Chikankari Kurti',
        description: 'Fine shadow-work embroidery on pure breathable mulmul cotton.',
        price: 1450,
        category: 'Kurtis',
        imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        id: 'p2',
        name: 'Banarasi Silk Festive Saree',
        description: 'Rich zari woven borders with traditional floral motifs and contrast pallu.',
        price: 3499,
        category: 'Sarees',
        imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        id: 'p3',
        name: 'Embroidered Anarkali Suit Set',
        description: 'Three-piece designer ethnic ensemble with organza dupatta.',
        price: 2799,
        category: 'Suits',
        imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      }
    ],
    salon: [
      {
        id: 'p1',
        name: 'Advanced Haircut & Conditioning',
        description: 'Precision cut tailored to facial structure with therapeutic scalp wash.',
        price: 399,
        category: 'Hair Care',
        imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        id: 'p2',
        name: 'Hydra-Glow Brightening Facial',
        description: 'Deep pore detox, antioxidant serum infusion, and gold radiance mask.',
        price: 899,
        category: 'Skin Care',
        imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        id: 'p3',
        name: 'Keratin Smoothing & Protein Spa',
        description: 'Frizz-free silk finish lasting up to 4 months with zero damage.',
        price: 2499,
        category: 'Treatments',
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      }
    ],
    restaurant: [
      {
        id: 'p1',
        name: 'Lucknowi Dum Murgh Biryani (Handi)',
        description: 'Fragrant basmati rice slow-cooked in sealed earthen pot with aromatic spices.',
        price: 340,
        category: 'Biryani',
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        id: 'p2',
        name: 'Melt-in-Mouth Galawati Kebabs (4 Pcs)',
        description: 'Tender spiced minced patties served with Mughlai parathas and mint chutney.',
        price: 280,
        category: 'Starters',
        imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        id: 'p3',
        name: 'Shahi Shahi Tukda with Rabdi',
        description: 'Crisp ghee-fried brioche steeped in saffron syrup and smothered in thick saffron malai.',
        price: 150,
        category: 'Desserts',
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      }
    ],
    coaching: [
      {
        id: 'p1',
        name: 'NEET Foundation & Target Batch',
        description: 'Comprehensive Biology, Physics, and Chemistry prep with daily DPP tests.',
        price: 15000,
        category: 'Medical Prep',
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        id: 'p2',
        name: 'Class 10 CBSE Board Toppers Batch',
        description: 'Science and Mathematics mastery with 5 years previous board paper solving.',
        price: 8000,
        category: 'Board Exams',
        imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      }
    ],
    service: [
      {
        id: 'p1',
        name: 'Split AC Deep Foam Jet Servicing',
        description: 'High-pressure pump cleaning of indoor coil, outdoor unit, and gas pressure check.',
        price: 499,
        category: 'AC Service',
        imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        id: 'p2',
        name: 'Complete Home Electrical Safety Inspection',
        description: 'MCB checking, earthing test, loose wiring rectification by certified wireman.',
        price: 349,
        category: 'Electrical',
        imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      }
    ]
  };

  // 7. Clean subdomain slug
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'my-business';

  return {
    name,
    category,
    tagline: meta.tagline,
    description: meta.description,
    phone,
    whatsappNumber: phone,
    email: `${slug}@neurozy.site`,
    address: `${area}, ${city}, Uttar Pradesh`,
    city,
    state: 'Uttar Pradesh',
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + area + ' ' + city)}`,
    operatingHours: {
      monday: '9:00 AM - 10:00 PM',
      tuesday: '9:00 AM - 10:00 PM',
      wednesday: '9:00 AM - 10:00 PM',
      thursday: '9:00 AM - 10:00 PM',
      friday: '9:00 AM - 10:00 PM',
      saturday: '9:00 AM - 10:30 PM',
      sunday: '10:00 AM - 9:30 PM'
    },
    products: sampleProductsByCategory[category] || [],
    templateId: meta.templateId,
    primaryColor: meta.color,
    subdomain: slug,
    isPublished: true,
    publishedUrl: `https://${slug}.neurozy.site`,
    visitsCount: 142,
    whatsappClicksCount: 38
  };
}

