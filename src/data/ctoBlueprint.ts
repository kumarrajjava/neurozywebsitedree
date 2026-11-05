export interface BlueprintSection {
  id: string;
  title: string;
  badge: string;
  summary: string;
  contentMarkdown: string;
}

export const CTO_BLUEPRINT: BlueprintSection[] = [
  {
    id: 'prd',
    title: '1. Product Requirements Document (PRD)',
    badge: 'PRD Core',
    summary: 'Executive problem statement, user personas (Lucknow pilot), core value proposition, and non-functional requirements.',
    contentMarkdown: `### 1. Product Requirements Document (PRD)

#### 1.1 Executive Summary
- **Product Name:** Neurozy Voice-to-Website
- **Tagline:** Speak Your Business. Get Your Website.
- **Mission:** Democratize the web for India's 63+ million MSMEs by turning natural spoken speech (Hindi, Hinglish, English) into responsive, high-converting digital storefronts in under 60 seconds without writing a single line of code.

#### 1.2 The Problem
1. **Technical Barrier:** 92% of local shopkeepers and service professionals in Tier-2/3 cities (e.g., Lucknow, Kanpur) find traditional website builders (Wix, WordPress, Squarespace) too intimidating, overly complex, and English-centric.
2. **Agency Cost & Lock-in:** Local web agencies charge ₹15,000–₹40,000 upfront with weeks of delay and ongoing maintenance fees for static pages.
3. **Commerce Gap:** Most small businesses rely solely on WhatsApp and offline footfall, losing customer trust and local search discovery.

#### 1.3 Target Audience & Personas (Lucknow Pilot)
- **Persona A (Retail/Bakery):** "Ramesh Bhaiya", 38, runs an artisan bakery in Hazratganj. Speaks conversational Hindi/Hinglish. Wants to showcase designer cakes and receive direct WhatsApp orders.
- **Persona B (Hospitality/Cafe):** "Pooja & Kabir", 26, opened a cozy specialty coffee cafe in Gomti Nagar. Want aesthetic menu showcase, Google Maps directions, and Instagram integration.
- **Persona C (Apparel Boutique):** "Smt. Shashi Gupta", 45, runs a Chikankari showroom in Aminabad. Wants bridal catalog display and phone inquiries.
- **Persona D (Home Services):** "Vipin Kumar", 34, runs an AC repair & electrician agency in Indira Nagar. Needs simple contact booking and 60-minute doorstep service badge.

#### 1.4 Success Metrics (KPIs)
- **Voice-to-Draft Rate:** > 80% of voice sessions convert to a rendered website draft in < 45 seconds.
- **Publish Rate:** > 40% of completed drafts get published to a live \`.neurozy.site\` subdomain.
- **First-Time Setup Time:** Under 3 minutes from landing page to published URL.
- **Customer Acquisition Cost (CAC):** < ₹150 per verified business via local merchant community onboarding.`
  },
  {
    id: 'system-architecture',
    title: '2. System Architecture Diagram',
    badge: 'Architecture',
    summary: 'Decoupled 3-tier architecture: React SPA frontend, Spring Boot 3 REST API backend, PostgreSQL database, and pluggable Speech/AI layer.',
    contentMarkdown: `### 2. System Architecture

\`\`\`
+-----------------------------------------------------------------------------------+
|                           CLIENT LAYER (PWA / Mobile / Web)                       |
|  - React 19 + TypeScript + Vite + Tailwind CSS                                    |
|  - Web Speech API (hi-IN, en-IN, en-US) with fallback manual input                |
|  - Audio Visualizer & Waveform Analyzer                                          |
|  - Live Visual Customizer & Viewport Simulator (Desktop 1440px / Mobile 375px)     |
+------------------------------------------+----------------------------------------+
                                           | HTTPS / JSON REST APIs
                                           v
+-----------------------------------------------------------------------------------+
|                        API GATEWAY / SPRING BOOT 3 BACKEND                        |
|                                                                                   |
|  +--------------------+  +----------------------+  +---------------------------+  |
|  | AuthController     |  | BusinessController   |  | WebsiteController         |  |
|  | (JWT / Spring Sec) |  | (CRUD & Onboarding)  |  | (Template Engine & Pub)   |  |
|  +--------------------+  +----------------------+  +---------------------------+  |
|  +--------------------+  +----------------------+  +---------------------------+  |
|  | VoiceParserService |  | ProductController    |  | AnalyticsService          |  |
|  | (NLP / Heuristic / |  | (Catalog Management) |  | (Visits, WhatsApp Clicks) |  |
|  | Gemini Provider)   |  |                      |  |                           |  |
|  +--------------------+  +----------------------+  +---------------------------+  |
|                                                                                   |
|  Service Layer: Interceptors, Rate Limiters (Bucket4j), Hibernate ORM / JPA      |
+------------------------------------------+----------------------------------------+
                                           | JDBC Connection Pool (HikariCP)
                                           v
+-----------------------------------------------------------------------------------+
|                       DATA PERSISTENCE & CLOUD SERVICES                           |
|  - PostgreSQL 16 (Managed on Supabase / Neon Free Tier / Self-hosted on VPS)       |
|  - Object Storage: Cloudflare R2 / AWS S3 Free Tier (for product images & logos)  |
|  - Edge Routing: Cloudflare Pages / CNAME DNS for Subdomains (*.neurozy.site)     |
|  - Speech/NLP Provider Abstraction: Web Speech -> Heuristic Regex -> Gemini API   |
+-----------------------------------------------------------------------------------+
\`\`\`

#### Key Architectural Principles
1. **Provider Neutrality:** The backend defines an interface \`ContentExtractionService\`. It can be backed by Gemini 2.5 Flash, an open-source NLP model, or our deterministic rule-based tokenizer for zero API cost.
2. **Stateless Scalability:** Spring Boot stateless JWT authentication enables instant container replication behind a load balancer.
3. **Edge Fast-Path for Published Sites:** Published websites render static-optimized JSON components, caching responses at CDN edges for < 200ms latency.`
  },
  {
    id: 'database-erd',
    title: '3. Database ER Diagram & PostgreSQL Schema',
    badge: 'PostgreSQL DDL',
    summary: '11 normalized tables with primary keys, foreign keys, constraints, and performance indexes.',
    contentMarkdown: `### 3. Database ER Diagram & PostgreSQL DDL

The database contains 11 core tables designed for high integrity and scalability.

\`\`\`sql
-- 1. USERS TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(20),
    role VARCHAR(30) DEFAULT 'ROLE_BUSINESS_OWNER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. SUBSCRIPTIONS TABLE
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_tier VARCHAR(50) NOT NULL DEFAULT 'FREE', -- FREE, STARTER, BUSINESS, PRO
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',  -- ACTIVE, CANCELLED, PAST_DUE
    billing_cycle VARCHAR(20) DEFAULT 'MONTHLY',
    amount_inr NUMERIC(10, 2) DEFAULT 0.00,
    current_period_start TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. BUSINESSES TABLE
CREATE TABLE businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL, -- bakery, cafe, clothing, salon, coaching, services
    tagline VARCHAR(300),
    description TEXT,
    address_line TEXT,
    city VARCHAR(100) DEFAULT 'Lucknow',
    state VARCHAR(100) DEFAULT 'Uttar Pradesh',
    pincode VARCHAR(10),
    primary_phone VARCHAR(20) NOT NULL,
    whatsapp_number VARCHAR(20),
    email VARCHAR(255),
    opening_hours VARCHAR(200),
    google_maps_query VARCHAR(300),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. WEBSITE_TEMPLATES TABLE
CREATE TABLE website_templates (
    id VARCHAR(50) PRIMARY KEY, -- e.g. bakery-sweetbites, cafe-bliss
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    default_primary_color VARCHAR(10),
    default_accent_color VARCHAR(10),
    preview_thumbnail_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. WEBSITES TABLE
CREATE TABLE websites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    template_id VARCHAR(50) REFERENCES website_templates(id),
    subdomain VARCHAR(80) UNIQUE NOT NULL, -- e.g. sweetbites (-> sweetbites.neurozy.site)
    custom_domain VARCHAR(255) UNIQUE,    -- e.g. sweetbiteslucknow.com
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    theme_config JSONB DEFAULT '{}'::jsonb, -- colors, fonts, radius
    section_visibility JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. PRODUCTS TABLE (Catalog items)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100),
    price_inr NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    description TEXT,
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    badge VARCHAR(50),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. DOMAINS TABLE
CREATE TABLE domains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    website_id UUID NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
    domain_name VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(30) DEFAULT 'PENDING_DNS', -- PENDING_DNS, VERIFIED, FAILED
    ssl_status VARCHAR(30) DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. WEBSITE_ANALYTICS TABLE
CREATE TABLE website_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    website_id UUID NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
    recorded_date DATE NOT NULL,
    page_views INT DEFAULT 0,
    unique_visitors INT DEFAULT 0,
    whatsapp_clicks INT DEFAULT 0,
    call_clicks INT DEFAULT 0,
    CONSTRAINT uq_site_date UNIQUE(website_id, recorded_date)
);

-- 9. REVIEWS TABLE
CREATE TABLE customer_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    website_id UUID NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. VOICE_TRANSCRIPTS TABLE (Audit & NLP learning)
CREATE TABLE voice_transcripts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    language_code VARCHAR(10) NOT NULL, -- hi-IN, en-IN, en-US
    raw_transcript TEXT NOT NULL,
    extracted_json JSONB NOT NULL,
    confidence_score NUMERIC(4, 3),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. MEDIA_ASSETS TABLE
CREATE TABLE media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    asset_url TEXT NOT NULL,
    asset_type VARCHAR(30), -- LOGO, HERO, PRODUCT, GALLERY
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR PRODUCTION QUERY PERFORMANCE
CREATE INDEX idx_websites_subdomain ON websites(subdomain);
CREATE INDEX idx_websites_business ON websites(business_id);
CREATE INDEX idx_products_business ON products(business_id);
CREATE INDEX idx_analytics_website_date ON website_analytics(website_id, recorded_date);
CREATE INDEX idx_businesses_user ON businesses(user_id);
\`\`\``
  },
  {
    id: 'folder-structures',
    title: '4 & 5. Frontend & Backend Folder Structures',
    badge: 'Code Architecture',
    summary: 'Standardized production structures for React 19 Frontend and Spring Boot 3 Backend.',
    contentMarkdown: `### 4. Frontend Folder Structure (React + Vite + Tailwind + TypeScript)

\`\`\`
neurozy-web/
├── public/
│   ├── favicon.svg
│   └── assets/aistudio/             # Verified visual hero assets
├── src/
│   ├── assets/                      # Icons, logos, and vector illustrations
│   ├── components/
│   │   ├── common/                  # Navbar, Footer, DeviceToggle, Badge, Modal
│   │   ├── landing/                 # Hero, TrustBar, VoiceDemo, FeatureGrid, Pricing, Testimonials
│   │   ├── wizard/                  # VoiceMicInput, TranscriptPreview, ExtractedForm, TemplatePicker
│   │   ├── editor/                  # LeftCustomizerPanel, VisualPreviewFrame, SectionManager, ThemePicker
│   │   ├── catalog/                 # ProductList, AddProductModal, PriceFormatter
│   │   ├── published/               # StandalonePublicSite, FloatingWhatsApp, ReviewSubmitForm
│   │   └── dashboard/               # OverviewCards, AnalyticsChart, SubdomainSettings, BillingTab
│   ├── data/
│   │   ├── sampleTemplates.ts       # 6 Pre-configured industry templates
│   │   └── ctoBlueprint.ts          # Comprehensive PRD & System documentation
│   ├── services/
│   │   ├── voiceProcessor.ts        # Web Speech API + Speech-to-Business Parser
│   │   ├── api.ts                   # Backend REST client abstraction
│   │   └── storage.ts               # LocalStorage sync & state persistence
│   ├── types/
│   │   └── index.ts                 # Full TypeScript definitions
│   ├── App.tsx                      # Root coordinator with view router
│   ├── main.tsx                     # React root mount
│   └── index.css                    # Tailwind CSS v4 directives
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
\`\`\`

---

### 5. Backend Folder Structure (Spring Boot 3 + Spring Security + PostgreSQL)

\`\`\`
neurozy-backend/
├── src/main/java/com/neurozy/
│   ├── NeurozyApplication.java
│   ├── config/
│   │   ├── SecurityConfig.java          # Spring Security 6 & JWT Filter
│   │   ├── WebCorsConfig.java           # Cross-origin policies
│   │   └── CloudflareDnsConfig.java     # Subdomain provisioning
│   ├── controller/
│   │   ├── AuthController.java          # /api/v1/auth
│   │   ├── BusinessController.java      # /api/v1/business
│   │   ├── VoiceController.java         # /api/v1/voice/parse & speech
│   │   ├── WebsiteController.java       # /api/v1/websites & /publish
│   │   ├── ProductController.java       # /api/v1/products
│   │   └── AnalyticsController.java     # /api/v1/analytics
│   ├── dto/
│   │   ├── request/                     # VoiceTranscriptRequest, BusinessUpdateRequest
│   │   └── response/                    # ExtractedBusinessResponse, WebsiteDto, AuthResponse
│   ├── entity/
│   │   ├── User.java, Business.java, Website.java, Product.java, Subscription.java...
│   ├── repository/                      # Spring Data JPA repositories with query methods
│   ├── service/
│   │   ├── VoiceExtractionService.java  # NLP extraction interface
│   │   ├── WebsiteGenerationService.java
│   │   ├── ProductService.java
│   │   └── SubdomainService.java        # Subdomain validation & routing
│   └── exception/                       # GlobalExceptionHandler & API error models
├── src/main/resources/
│   ├── application.yml                  # Config (DB connection pool, JWT secret, AI keys)
│   └── db/migration/V1__init_schema.sql # Flyway migration
├── pom.xml (or build.gradle)
└── Dockerfile
\`\`\``
  },
  {
    id: 'api-specs',
    title: '6. Backend REST API Specifications',
    badge: 'API Contracts',
    summary: 'Full JSON payloads, endpoints, HTTP methods, headers, and validation rules for all key flows.',
    contentMarkdown: `### 6. Backend REST API Contracts

All endpoints return JSON and adhere to standard HTTP status codes (\`200 OK\`, \`201 Created\`, \`400 Bad Request\`, \`401 Unauthorized\`, \`404 Not Found\`).

#### 6.1 Authentication
- \`POST /api/v1/auth/register\`
  - Request: \`{ "email": "ramesh@sweetbites.in", "password": "...", "fullName": "Ramesh Kumar", "phone": "9876543210" }\`
  - Response (201): \`{ "token": "jwt_token_here", "user": { "id": "uuid", "fullName": "Ramesh Kumar" } }\`

- \`POST /api/v1/auth/login\`
  - Request: \`{ "email": "ramesh@sweetbites.in", "password": "..." }\`
  - Response (200): \`{ "token": "jwt_token_here", "user": { ... } }\`

#### 6.2 Voice & Extraction (Core Engine)
- \`POST /api/v1/voice/parse\`
  - Request:
\`\`\`json
{
  "transcript": "Meri bakery hai Lucknow Hazratganj mein, naam hai Sweet Bites, fresh cakes aur pastries banate hain, phone 9876543210",
  "language": "hi-IN"
}
\`\`\`
  - Response (200):
\`\`\`json
{
  "businessName": "Sweet Bites",
  "category": "bakery",
  "tagline": "Freshly Baked with Love · Cakes & Pastries",
  "description": "Artisan bakery in Hazratganj, Lucknow serving freshly baked cakes, pastries, and custom orders.",
  "address": "Hazratganj",
  "city": "Lucknow",
  "state": "Uttar Pradesh",
  "phone": "9876543210",
  "whatsapp": "9876543210",
  "openingHours": "10:00 AM – 10:00 PM",
  "suggestedTemplateId": "bakery-sweetbites",
  "servicesOrProducts": ["Cakes", "Pastries", "Custom Birthday Cakes"],
  "confidence": 0.94
}
\`\`\`

#### 6.3 Website Publishing
- \`POST /api/v1/websites/{id}/publish\`
  - Request: \`{ "subdomain": "sweetbites" }\`
  - Response (200):
\`\`\`json
{
  "websiteId": "uuid",
  "subdomain": "sweetbites",
  "publishedUrl": "https://sweetbites.neurozy.site",
  "qrCodeUrl": "https://neurozy.site/qr/sweetbites.svg",
  "isPublished": true,
  "publishedAt": "2026-11-05T04:00:00Z"
}
\`\`\`

#### 6.4 Products CRUD
- \`GET /api/v1/businesses/{id}/products\` -> List of items
- \`POST /api/v1/businesses/{id}/products\` -> Create product with name, priceInr, category, badge
- \`PUT /api/v1/products/{id}\` -> Update item
- \`DELETE /api/v1/products/{id}\` -> Delete item

#### 6.5 Analytics Tracking
- \`POST /api/v1/websites/{id}/track\` -> \`{ "eventType": "WHATSAPP_CLICK" | "CALL_CLICK" | "PAGE_VIEW" }\``
  },
  {
    id: 'screen-plan',
    title: '7. UI/UX Screen-by-Screen Plan',
    badge: '15 Screens',
    summary: 'Detailed interaction mapping for all 15 screens specified in Section 4 of the requirements.',
    contentMarkdown: `### 7. UI/UX Screen-by-Screen Plan

1. **Landing Page:** Hero with "Speak Your Business. Get Your Website.", mic recording demonstration, trust badges, Lucknow business showcase (Bakery & Cafe toggle), 5 core feature pillars, template carousel, and responsive skyline footer.
2. **Sign Up / Login Modal:** Lightweight OTP/Phone or Email signup without long friction forms.
3. **Onboarding Welcome Screen:** Introduces the 4-step flow: 1. Describe -> 2. Review -> 3. Pick Style -> 4. Publish.
4. **Voice Input Screen:** Full-screen microphone experience with live soundwave pulsation, multi-language selector (Hindi / Hinglish / English), and click-to-speak Hindi prompt cards.
5. **Business Information Review Form:** Structured review showing detected Name, Category, City, Phone/WhatsApp, Hours, and quick-add fields for missing info.
6. **Template Selection Screen:** Grid of 6 tailor-made templates (Bakery, Cafe, Fashion, Salon, Coaching, Services) with live preview cards.
7. **Website Generation Loading Screen:** Multi-step animated progress indicators ("Analyzing speech nuances...", "Assembling responsive mobile layouts...", "Integrating WhatsApp ordering...", "Done!").
8. **Website Preview (Dual-Viewport):** Seamless toggle between Desktop (1440px) and Mobile (375px) with live scroll and working buttons.
9. **Beginner-Friendly Website Editor:** No complex drag-and-drop; clean visual property controls for Headline, Story, Colors, Fonts, Hours, and Section switches.
10. **Product Management Screen:** Add, edit, reorder, and toggle availability of products/services with ₹ INR prices and badges.
11. **Business Dashboard:** Quick metrics (Visits, WhatsApp leads, Call clicks), active site preview card, and quick action shortcuts.
12. **Publishing Screen & Modal:** Generates \`{subdomain}.neurozy.site\`, presents instant printable QR code for shop counters, and WhatsApp share link.
13. **Domain Management:** Free Neurozy subdomain display with CNAME DNS records configuration for custom domains (e.g. \`sweetbites.in\`).
14. **Subscription & Billing Screen:** Free (₹0), Starter (₹199), Business (₹499), Pro (₹999) with plan features and upgrade actions.
15. **User Profile & Store Settings:** Shop contact details, UPI ID for payments, and account security.`
  },
  {
    id: 'roadmap-costs-priorities',
    title: '8, 9 & 10. 30-Day Roadmap, Costs & MoSCoW Prioritization',
    badge: 'Execution & Budget',
    summary: 'Day 1–30 milestone plan, frugal infrastructure cost budget (₹0–₹3,200/mo), and MoSCoW feature breakdown.',
    contentMarkdown: `### 8. 30-Day Development Roadmap

| Phase | Days | Milestones | Deliverables |
|---|---|---|---|
| **Phase 1: Foundation & Voice MVP** | Days 1–7 | Web Speech API integration, Hindi/Hinglish token parser, basic React UI shell. | Working voice-to-JSON engine with audio visualizer. |
| **Phase 2: Templates & Generation** | Days 8–15 | 6 industry templates, dynamic section renderer, WhatsApp ordering button generator. | Live site preview generated from voice input. |
| **Phase 3: Editor & Catalog** | Days 16–21 | Visual property editor, product catalog manager (CRUD), responsive viewport switcher. | Shopkeeper can edit cakes, coffees, and prices. |
| **Phase 4: Publishing & Subdomains**| Days 22–26 | Subdomain routing (*.neurozy.site), counter QR code generator, WhatsApp share modal. | Live shareable URL on mobile phones. |
| **Phase 5: Pilot & Launch** | Days 27–30 | Test with 5–10 Lucknow shops (Janpath Hazratganj, Gomti Nagar), collect real feedback. | Verified real business websites live in market. |

---

### 9. Estimated Monthly Infrastructure Costs (Frugal Budget: ₹2,000–₹5,000 Target)

| Component | Provider / Tier | Cost (USD) | Cost (INR) | Notes |
|---|---|---|---|---|
| **Frontend Hosting** | Cloudflare Pages / Vercel | $0.00 | ₹0 | Free tier includes unlimited bandwidth and global CDN |
| **Backend & Compute** | Railway / Render / Hetzner Cloud VPS | $4.00 – $7.00 | ₹350 – ₹600 | 2 vCPU, 2GB RAM container for Spring Boot |
| **Database** | Neon / Supabase PostgreSQL | $0.00 | ₹0 | Free tier handles 500MB storage & thousands of rows |
| **Subdomain & Wildcard DNS** | Cloudflare DNS (Free) + .site / .in domain | ~$10/year | ~₹80/mo | Base domain registration (\`neurozy.site\`) |
| **Speech & AI Engine** | Browser Web Speech + Local Regex / Gemini Free | $0.00 | ₹0 | Web Speech runs 100% on client; Gemini free tier covers MVP |
| **Object Storage** | Cloudflare R2 | $0.00 | ₹0 | Free 10GB storage with 0 egress fees for product photos |
| **Transactional SMS / WhatsApp** | Gupshup / Fast2SMS (Optional) | ~$10.00 | ₹850 | Pay-per-message for OTPs (can use email OTP first) |
| **TOTAL ESTIMATED MONTHLY** | | **~$15 – $20** | **~₹1,280 – ₹1,800/mo** | **Well within the ₹2,000–₹5,000 bootstrap constraint!** |

---

### 10. MVP Feature Prioritization (MoSCoW Matrix)

- **Must Have (Day 1 MVP):**
  - Voice recording in Hindi/Hinglish/English with live waveform.
  - Automatic extraction of Business Name, Category, Location, Phone/WhatsApp, Services.
  - 6 Pre-configured, high-conversion industry templates.
  - 1-Click WhatsApp Ordering button pre-filled with customer item request.
  - Desktop & Mobile responsive preview.
  - Subdomain publishing (\`sweetbites.neurozy.site\`) and Printable QR Code.
- **Should Have (Next Sprint):**
  - Custom domain connection (CNAME).
  - Basic analytics dashboard (page visits, WhatsApp clicks).
  - Multi-tier subscription switcher.
- **Could Have (Phase 2):**
  - UPI QR Code payment integration for direct counter payments.
  - Multi-lingual site toggle (visitor can read in Hindi or English).
- **Won't Have (Post-MVP):**
  - Complex inventory warehouses, multi-vendor shipping, or heavy ERP features.`
  }
];
