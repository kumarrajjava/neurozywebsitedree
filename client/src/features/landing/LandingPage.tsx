import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Mic, 
  Check, 
  Zap, 
  ShieldCheck, 
  Globe, 
  MessageCircle, 
  Palette, 
  Edit3, 
  Rocket, 
  Star, 
  Phone, 
  MapPin, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { TEMPLATES } from '../../templates/templateData';
import { SAMPLE_VOICE_PRESETS } from '../../services/businessExtractor';

interface LandingPageProps {
  onOpenCreateModal: () => void;
  onSelectPreset: (presetTranscript: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenCreateModal,
  onSelectPreset
}) => {
  const [selectedTemplateTab, setSelectedTemplateTab] = useState<string>('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const filteredTemplates = selectedTemplateTab === 'all'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === selectedTemplateTab);

  const faqs = [
    {
      q: 'Do I really just have to speak to build my website?',
      a: 'Yes! Simply click the microphone and describe your business in Hindi, Hinglish, or English. For example: "Meri Hazratganj mein bakery hai, hum fresh cakes aur cookies banate hain...". Neurozy automatically extracts your shop name, offerings, timings, and location to create a full website.'
    },
    {
      q: 'Can customers order directly on WhatsApp from my site?',
      a: 'Absolutely! Every product and service on your generated website includes a 1-click WhatsApp order button. When a customer clicks it, their WhatsApp opens with a pre-filled message detailing the exact item and price.'
    },
    {
      q: 'Do I need any coding, hosting, or technical knowledge?',
      a: 'Zero coding or technical knowledge required. We provide you with a free subdomain (e.g. yourshop.neurozy.site) and fast cloud hosting out of the box.'
    },
    {
      q: 'Can I edit the photos, prices, or text after it is generated?',
      a: 'Yes! Our beginner-friendly Live Visual Editor lets you tap any text, change color themes, add or remove products, and update your phone number at any time from your phone or laptop.'
    },
    {
      q: 'Can I connect my own custom .com or .in domain?',
      a: 'Yes, on our Starter and Business plans you can easily link custom domains like www.yourshop.com with automated free SSL certificates.'
    }
  ];

  return (
    <div className="overflow-x-hidden font-sans">
      
      {/* ================= HERO SECTION (MATCHING ARTWORK) ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F3F0FF] via-[#FAF8FF] to-white pt-8 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6 lg:px-8">
        
        {/* Subtle background glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              {/* Brand Logo & Voice-to-Website Builder Pill */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <img src="/neurozy-logo.png" alt="Neurozy Logo" className="h-10 sm:h-11 w-auto object-contain mix-blend-multiply drop-shadow-xs" />
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0E7FF] text-[#4F46E5] text-xs font-bold shadow-xs">
                  <Mic className="w-3.5 h-3.5 text-[#6366F1] animate-pulse" />
                  <span>Voice-to-Website Builder</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Speak Your Business.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#9333EA] block mt-1">
                  Get Your Website.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                Create a professional website for your business just by speaking — in <strong>Hindi, Hinglish or English!</strong>
              </p>

              {/* Primary CTA Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={onOpenCreateModal}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#9333EA] text-white font-black text-base shadow-glow hover:shadow-glow-lg transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2.5"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Create Your Website</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Feature Badges (⚡ In Seconds, 🚫 No Coding, ✅ 100% Easy) */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-5 text-xs sm:text-sm font-extrabold text-slate-700 flex-wrap">
                <span className="flex items-center gap-1.5 text-indigo-700">
                  <Zap className="w-4 h-4 fill-amber-400 text-amber-500" /> In Seconds
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="text-rose-500 text-base">🚫</span> No Coding
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Easy
                </span>
              </div>

            </div>

            {/* Right Hero Column: Authentic Shopkeeper Graphic + SaaS Stepper Preview (Recreating Art) */}
            <div className="lg:col-span-6 relative">
              
              {/* Stepper Mockup Card */}
              <div className="relative rounded-3xl bg-white border border-slate-200/80 shadow-2xl p-4 sm:p-6 overflow-hidden">
                
                {/* Stepper Header (1 Describe, 2 Choose Template, 3 Preview, 4 Publish) */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-[11px] font-bold text-slate-500">
                  <div className="flex items-center gap-1 text-indigo-600">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px]">✓</span>
                    <span>Describe</span>
                  </div>
                  <span className="text-slate-300">→</span>
                  <div className="flex items-center gap-1 text-indigo-600">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px]">✓</span>
                    <span>Choose Template</span>
                  </div>
                  <span className="text-slate-300">→</span>
                  <div className="flex items-center gap-1 text-indigo-600">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px]">3</span>
                    <span>Preview</span>
                  </div>
                  <span className="text-slate-300">→</span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[9px]">4</span>
                    <span>Publish</span>
                  </div>
                </div>

                {/* Website Generated Pill Badge */}
                <div className="absolute top-3 right-4 sm:right-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4F46E5] text-white font-extrabold text-[11px] shadow-md">
                    <Check className="w-3.5 h-3.5" /> Website Generated!
                  </span>
                </div>

                {/* Subhead inside preview */}
                <div className="py-3 text-center sm:text-left">
                  <span className="text-xs font-bold text-purple-600 flex items-center gap-1 justify-center sm:justify-start">
                    <Sparkles className="w-3.5 h-3.5" /> Your Website is Ready!
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Take a look at your generated website below.
                  </p>
                </div>

                {/* Inner Browser Preview Card: Sweet Bites Bakery */}
                <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                  {/* Fake Browser Navbar */}
                  <div className="bg-[#FFF1F2] border-b border-rose-100 px-4 py-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🧁</span>
                      <strong className="text-slate-900 font-extrabold">Sweet Bites</strong>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-600 font-semibold">
                      <span>Home</span>
                      <span>About</span>
                      <span>Products</span>
                      <span>Contact</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                      Order Now
                    </span>
                  </div>

                  {/* Bakery Hero Banner */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-[#FFF5F5] to-white flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                        Freshly Baked with Love ❤️
                      </h3>
                      <p className="text-xs text-slate-500">
                        Cakes • Pastries • Artisanal Cookies
                      </p>
                      <button 
                        onClick={onOpenCreateModal}
                        className="px-3 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-bold shadow-sm inline-flex items-center gap-1"
                      >
                        <span>Order Now</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <img
                      src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80"
                      alt="Sweet Bites Cake"
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-md border-2 border-white flex-shrink-0"
                    />
                  </div>
                </div>

                {/* Authentic Shopkeeper Speech Bubble Overlay */}
                <div className="mt-4 p-3 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <Mic className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-indigo-950 italic">
                      “Meri bakery hai, Lucknow mein...”
                    </p>
                    <p className="text-[10px] text-indigo-600 font-semibold">
                      Spoken naturally in Hinglish • Converted in 3 seconds
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectPreset(SAMPLE_VOICE_PRESETS[0].transcript)}
                    className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition shadow-sm"
                  >
                    Try This Voice
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* 5 Bottom Feature Highlight Pills (Voice Input, AI Website Gen, Templates, Easy Editor, Publish in 1 Click) */}
          <div className="mt-14 pt-8 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            
            <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex flex-col items-center text-center space-y-1.5 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs text-slate-900">Voice Input</h4>
              <p className="text-[11px] text-slate-500 font-medium">(Hindi / English)</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex flex-col items-center text-center space-y-1.5 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs text-slate-900">AI Website</h4>
              <p className="text-[11px] text-slate-500 font-medium">Auto Generation</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex flex-col items-center text-center space-y-1.5 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs text-slate-900">Beautiful</h4>
              <p className="text-[11px] text-slate-500 font-medium">Templates</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex flex-col items-center text-center space-y-1.5 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Edit3 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs text-slate-900">Easy Editor</h4>
              <p className="text-[11px] text-slate-500 font-medium">No Code Needed</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex flex-col items-center text-center space-y-1.5 hover:shadow-md transition col-span-2 sm:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Rocket className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs text-slate-900">Publish</h4>
              <p className="text-[11px] text-slate-500 font-medium">in One Click</p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= INTERACTIVE VOICE PRESETS SECTION ================= */}
      <section id="how-it-works" className="py-16 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Try It Right Now
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              See How It Works With Real Indian Businesses
            </h2>
            <p className="text-sm text-slate-500">
              Pick any local shop below to test instant voice parsing and website generation:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SAMPLE_VOICE_PRESETS.map((preset, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-400 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                      {preset.label}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {preset.language}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 italic bg-white p-3 rounded-xl border border-slate-100">
                    “{preset.transcript}”
                  </p>
                </div>

                <button
                  onClick={() => onSelectPreset(preset.transcript)}
                  className="mt-4 w-full py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate This Website</span>
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= TEMPLATES SHOWCASE ================= */}
      <section id="templates" className="py-16 bg-[#F8FAFC] px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Industry Ready
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              Tailored Templates for Every Business Niche
            </h2>
            <p className="text-sm text-slate-500">
              Each template comes equipped with product catalog, WhatsApp ordering, business hours, and Google Maps.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 text-xs font-bold">
            {[
              { id: 'all', label: 'All Templates' },
              { id: 'bakery', label: 'Bakery & Cafe' },
              { id: 'clothing', label: 'Boutique & Retail' },
              { id: 'salon', label: 'Salon & Spa' },
              { id: 'restaurant', label: 'Restaurants' },
              { id: 'coaching', label: 'Coaching' },
              { id: 'service', label: 'Services' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTemplateTab(tab.id)}
                className={`px-4 py-2 rounded-xl transition ${
                  selectedTemplateTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(tmpl => (
              <div 
                key={tmpl.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={tmpl.previewImage} 
                      alt={tmpl.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-black/75 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {tmpl.badge}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                      {tmpl.category}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base">
                      {tmpl.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {tmpl.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {tmpl.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={onOpenCreateModal}
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-indigo-600 transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Use This Template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= PRICING SECTION ================= */}
      <section id="pricing" className="py-16 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Affordable MSME Plans
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              Simple, Transparent Pricing For Every Shop
            </h2>
            <p className="text-sm text-slate-500">
              Start 100% free with your voice. Upgrade only when you want custom domains or expanded catalog tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* FREE PLAN */}
            <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Free Forever</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">₹0</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="text-xs text-slate-500">Great for local testing and starting your digital presence.</p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> 1 Voice-generated website</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Free .neurozy.site subdomain</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp order button</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> 5 catalog items</li>
                </ul>
              </div>
              <button 
                onClick={onOpenCreateModal}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50"
              >
                Start Free
              </button>
            </div>

            {/* STARTER PLAN */}
            <div className="p-6 rounded-3xl border border-indigo-200 bg-indigo-50/30 shadow-md flex flex-col justify-between space-y-6 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </span>
              <div className="space-y-4">
                <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Starter</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">₹199</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="text-xs text-slate-500">Perfect for growing local shops, bakeries, and salons.</p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-600" /> Everything in Free</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-600" /> 25 catalog items</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-600" /> Basic visitor analytics</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-600" /> Remove Neurozy badge</li>
                </ul>
              </div>
              <button 
                onClick={onOpenCreateModal}
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-md"
              >
                Choose Starter
              </button>
            </div>

            {/* BUSINESS PLAN */}
            <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Business</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">₹499</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="text-xs text-slate-500">For established retailers wanting their own custom domain.</p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Custom domain (.com / .in)</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Unlimited catalog products</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Priority WhatsApp support</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Google Maps SEO optimization</li>
                </ul>
              </div>
              <button 
                onClick={onOpenCreateModal}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50"
              >
                Get Business
              </button>
            </div>

            {/* PRO PLAN */}
            <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-extrabold text-purple-700 uppercase tracking-wider">Pro Store</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">₹999</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="text-xs text-slate-500">Advanced multi-location and custom branding setup.</p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-600" /> Up to 3 live websites</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-600" /> Dedicated account manager</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-600" /> Advanced analytics & heatmaps</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-600" /> Early access to payment gateway</li>
                </ul>
              </div>
              <button 
                onClick={onOpenCreateModal}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50"
              >
                Contact Sales
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-16 bg-[#F8FAFC] px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Got Questions?
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left font-bold text-sm text-slate-800 flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-indigo-600 transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= FINAL CALL TO ACTION ================= */}
      <section className="py-16 bg-gradient-to-tr from-[#1E1B4B] via-[#312E81] to-[#4338CA] text-white px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-indigo-200 text-xs font-bold inline-flex items-center gap-1.5 backdrop-blur">
            <Mic className="w-4 h-4 text-amber-300" /> Start in 60 Seconds
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Take Your Business Online Today?
          </h2>
          <p className="text-sm sm:text-base text-indigo-200 max-w-xl mx-auto">
            No developer fees. No confusing drag-and-drop. Just speak your business details in Hindi or English and watch your website go live!
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={onOpenCreateModal}
              className="px-8 py-4 rounded-2xl bg-white text-indigo-900 font-extrabold text-base shadow-xl hover:bg-indigo-50 transition transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>Create Your Website Free</span>
              <ArrowRight className="w-5 h-5 text-indigo-600" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

