import React, { useState } from 'react';
import { 
  Mic, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Globe2, 
  ShoppingBag, 
  PhoneCall, 
  MessageSquare, 
  Star,
  Play
} from 'lucide-react';
import { TEMPLATES, PRICING_PLANS } from '../data/sampleTemplates';

interface LandingPageProps {
  onStartCreate: (initialPrompt?: string) => void;
  onPreviewTemplate: (templateId: string) => void;
  onOpenPricing: () => void;
  onOpenBlueprint: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartCreate,
  onPreviewTemplate,
  onOpenPricing,
  onOpenBlueprint,
}) => {
  const [activePersona, setActivePersona] = useState<'bakery' | 'cafe'>('bakery');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [demoPrompt, setDemoPrompt] = useState<string>('Meri bakery hai, Lucknow Hazratganj mein, Sweet Bites naam hai...');
  const [isPlayingDemoVoice, setIsPlayingDemoVoice] = useState(false);

  const samplePrompts = [
    {
      label: 'Bakery in Lucknow',
      text: 'Meri bakery hai, Lucknow Hazratganj mein. Naam hai Sweet Bites, fresh designer cakes aur pastries banate hain. Phone 9876543210.',
      persona: 'bakery' as const
    },
    {
      label: 'Specialty Cafe',
      text: 'Meri cafe ka website bana do, Cafe Bliss naam hai, Gomti Nagar Lucknow mein. Single-origin Arabica coffee, pizza, pasta milta hai, phone 9123456789.',
      persona: 'cafe' as const
    },
    {
      label: 'Ethnic Saree Boutique',
      text: 'Zari Heritage Boutique Aminabad Lucknow, authentic hand-embroidered Chikankari sarees and bridal suits. Call 9415012345.',
      persona: 'bakery' as const
    },
    {
      label: 'Home AC Service',
      text: 'ProFix Appliance Care Lucknow, 60-minute doorstep AC repair, RO service, 30 days guarantee. WhatsApp 9650011223.',
      persona: 'cafe' as const
    }
  ];

  const handleSimulateVoice = (promptText: string, persona: 'bakery' | 'cafe') => {
    setActivePersona(persona);
    setDemoPrompt(promptText);
    setIsPlayingDemoVoice(true);
    setTimeout(() => {
      setIsPlayingDemoVoice(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#fafbfe] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
        {/* Ambient gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-100/40 via-violet-50/20 to-transparent pointer-events-none -z-10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Persona View Switcher */}
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-semibold">
              <span className="text-slate-500 pl-2 pr-1">Try Story:</span>
              <button
                onClick={() => setActivePersona('bakery')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activePersona === 'bakery'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bakery in Lucknow (Sweet Bites)
              </button>
              <button
                onClick={() => setActivePersona('cafe')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activePersona === 'cafe'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cafe in Gomti Nagar (Cafe Bliss)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Value Prop, Audio Trigger, Speech Examples */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-semibold text-indigo-700">
                <Mic className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                <span>India's First Voice-to-Website Builder</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12]">
                Speak Your Business.{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-600 bg-clip-text text-transparent">
                  Get Your Website.
                </span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Describe your business naturally in <strong className="text-slate-900">Hindi, Hinglish, or English</strong>. Neurozy automatically generates a responsive, high-converting digital storefront with WhatsApp ordering, product menu, and Google Maps in seconds.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onStartCreate()}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg shadow-amber-400/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Mic className="w-4 h-4 fill-slate-950 stroke-[2.5]" />
                  <span>Create Your Website</span>
                  <ArrowRight className="w-4 h-4 ml-0.5 stroke-[2.5]" />
                </button>

                <button
                  onClick={() => onStartCreate('')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-indigo-700 bg-white hover:bg-indigo-50/80 border border-indigo-200 rounded-xl transition-all shadow-xs cursor-pointer group"
                >
                  <Mic className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
                  <span>Speak Into Microphone</span>
                </button>

                <button
                  onClick={() => handleSimulateVoice(samplePrompts[activePersona === 'bakery' ? 0 : 1].text, activePersona)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                  <span>Hear Demo Voice</span>
                </button>
              </div>

              {/* Guarantees Bar */}
              <div className="flex flex-wrap items-center gap-5 text-xs font-semibold text-slate-600 pt-1">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>In Seconds</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>No Coding Needed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-sky-500" />
                  <span>100% Mobile Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-500" />
                  <span>Free Subdomain</span>
                </div>
              </div>

              {/* Spoken Samples Pill Box */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-indigo-600" />
                    Spoken Voice Prompts (Click to test):
                  </span>
                  <span className="text-[11px] text-indigo-600 font-medium">Hinglish / Hindi</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {samplePrompts.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSimulateVoice(item.text, item.persona)}
                      className="text-left p-2.5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-indigo-50/70 hover:border-indigo-200 transition-all text-xs group"
                    >
                      <div className="font-semibold text-slate-800 group-hover:text-indigo-900 flex items-center justify-between">
                        <span>{item.label}</span>
                        <Play className="w-3 h-3 text-slate-400 group-hover:text-indigo-600" />
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.text}</p>
                    </button>
                  ))}
                </div>

                {/* Spoken Transcript Bubble */}
                <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Mic className={`w-4 h-4 ${isPlayingDemoVoice ? 'animate-bounce' : ''}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-indigo-900">
                      {isPlayingDemoVoice ? '🎙️ Recognizing Spoken Audio...' : 'Current Transcript Recognized:'}
                    </p>
                    <p className="text-xs text-slate-700 italic mt-0.5">
                      "{demoPrompt}"
                    </p>
                  </div>
                  <button
                    onClick={() => onStartCreate(demoPrompt)}
                    className="px-2.5 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shrink-0 self-center"
                  >
                    Generate This
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Showcase Matching Attached Designs */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-white">
                {/* Simulated Device Frame Top Header */}
                <div className="bg-slate-900 text-slate-200 px-4 py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-[11px] text-slate-400 ml-2 font-mono">
                      {activePersona === 'bakery' ? 'sweetbites.neurozy.site' : 'cafebliss.neurozy.site'}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Website Generated</span>
                  </div>
                </div>

                {/* Display Attached Asset or Interactive Preview */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden group">
                  <img
                    src={
                      activePersona === 'bakery'
                        ? '/assets/aistudio/image_498db834.png'
                        : '/assets/aistudio/image_75e2ccdb.png'
                    }
                    alt={activePersona === 'bakery' ? 'Sweet Bites Bakery generated by Neurozy' : 'Cafe Bliss generated by Neurozy'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Floating Action Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          {activePersona === 'bakery' ? 'Sweet Bites Bakery' : 'Cafe Bliss'}
                        </h4>
                        <p className="text-xs text-slate-200">
                          {activePersona === 'bakery'
                            ? 'Hazratganj, Lucknow · 100% Eggless Artisan Cakes'
                            : 'Gomti Nagar, Lucknow · Arabica Roasts & Cozy Vibe'}
                        </p>
                      </div>

                      <button
                        onClick={() => onPreviewTemplate(activePersona === 'bakery' ? 'bakery-sweetbites' : 'cafe-bliss')}
                        className="px-4 py-2 bg-white text-slate-900 rounded-lg text-xs font-bold shadow-md hover:bg-slate-100 active:scale-95 transition-transform whitespace-nowrap"
                      >
                        Inspect Live Site
                      </button>
                    </div>
                  </div>
                </div>

                {/* Steps progress strip */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 grid grid-cols-4 gap-2 text-center text-[11px] font-semibold text-slate-600">
                  <div className="flex items-center justify-center gap-1 text-indigo-600">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center">1</span>
                    <span>Describe</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-indigo-600">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center">2</span>
                    <span>Template</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-indigo-600">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center">3</span>
                    <span>Preview</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-emerald-600 font-bold">
                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center">4</span>
                    <span>Publish</span>
                  </div>
                </div>
              </div>

              {/* Trust Badge Below Hero */}
              <div className="mt-4 flex items-center justify-between px-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-[10px] text-white font-bold flex items-center justify-center border-2 border-white">R</span>
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-[10px] text-white font-bold flex items-center justify-center border-2 border-white">P</span>
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-[10px] text-white font-bold flex items-center justify-center border-2 border-white">S</span>
                  </div>
                  <span>Trusted by local merchants in UP</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>4.9 / 5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Core Feature Pillars */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Designed for MSMEs</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Everything a Small Business Owner Needs</h3>
            <p className="text-sm text-slate-600 mt-2">No complicated design settings. Speak what you sell, we handle the layout, hosting, and WhatsApp leads.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                <Mic className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">Voice Input</h4>
              <p className="text-xs text-slate-500">Speak naturally in Hindi, Hinglish, or English. No typing needed.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">AI Website Engine</h4>
              <p className="text-xs text-slate-500">Converts spoken sentences into structured catalog and address details.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">6+ Local Templates</h4>
              <p className="text-xs text-slate-500">Bakery, Cafe, Boutique, Salon, Coaching, and Repair Services.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">WhatsApp Ordering</h4>
              <p className="text-xs text-slate-500">Every product includes 1-click WhatsApp order buttons with price tags.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <Globe2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">Publish in 1 Click</h4>
              <p className="text-xs text-slate-500">Get a free .neurozy.site link and printable QR code for shop counters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Showcase Section */}
      <section className="py-16 bg-[#fafbfe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Industry Blueprints</span>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Pre-Built for Your Exact Trade</h3>
              <p className="text-sm text-slate-600 mt-1">Switch templates anytime without losing your business details or catalog.</p>
            </div>
            <button
              onClick={() => onStartCreate()}
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              <span>Explore all templates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEMPLATES.slice(0, 6).map((tpl) => (
              <div
                key={tpl.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={tpl.previewHeroUrl}
                    alt={tpl.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-semibold">
                    {tpl.categoryName}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {tpl.name}
                    </h4>
                    <p className="text-xs font-medium text-slate-500 italic mt-0.5">"{tpl.tagline}"</p>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">{tpl.description}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400">Includes {tpl.demoProducts.length} demo items</span>
                    <button
                      onClick={() => onPreviewTemplate(tpl.id)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                    >
                      <span>Preview</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Transparent Pricing</h2>
            <h3 className="text-3xl font-extrabold text-slate-900">Affordable for Every Local Business</h3>
            <p className="text-sm text-slate-600 mt-2">Start free. Upgrade only when you want custom domains or unlimited products.</p>

            <div className="mt-6 inline-flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  billingPeriod === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  billingPeriod === 'annual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {PRICING_PLANS.map((plan) => {
              const price = billingPeriod === 'annual' ? Math.round(plan.priceInrAnnual / 12) : plan.priceInrMonthly;
              return (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-6 border flex flex-col justify-between transition-all ${
                    plan.recommended
                      ? 'border-indigo-600 bg-indigo-50/20 shadow-md ring-2 ring-indigo-600/10'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    {plan.recommended && (
                      <span className="text-[10px] font-extrabold tracking-wider uppercase text-indigo-600 bg-indigo-100 px-2.5 py-0.5 rounded-full mb-3 inline-block">
                        Most Popular
                      </span>
                    )}
                    <h4 className="font-bold text-lg text-slate-900">{plan.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.description}</p>

                    <div className="my-5 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-slate-900">₹{price}</span>
                      <span className="text-xs text-slate-500 font-medium">/ month</span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Up to {plan.maxWebsites} Website{plan.maxWebsites > 1 ? 's' : ''}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{plan.maxProducts} Catalog Products</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.customDomain ? 'text-emerald-600' : 'text-slate-300'}`} />
                        <span>{plan.customDomain ? 'Custom Domain (.in / .com)' : 'Free .neurozy.site Subdomain'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>WhatsApp 1-Click Ordering</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.removeNeurozyBranding ? 'text-emerald-600' : 'text-slate-300'}`} />
                        <span>{plan.removeNeurozyBranding ? 'White-label (No Branding)' : 'Neurozy Footer Badge'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{plan.support}</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => onStartCreate()}
                    className={`mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                      plan.recommended
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {plan.priceInrMonthly === 0 ? 'Start Free' : `Choose ${plan.name}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Skyline Banner matching Image 1 */}
      <footer className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white py-12 border-t border-indigo-900/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-indigo-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-indigo-900 font-extrabold text-xl flex items-center justify-center">
                N
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">Neurozy</span>
                <p className="text-xs text-indigo-200">From Idea to Code. | Turn Your Ideas Into a Stunning Website</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-indigo-200">
              <button onClick={onOpenBlueprint} className="hover:text-white transition-colors underline underline-offset-4">
                CTO Architecture & PRD
              </button>
              <span>·</span>
              <button onClick={() => onStartCreate()} className="hover:text-white transition-colors">
                Launch Voice Builder
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-indigo-300 gap-4">
            <p className="italic">"Empowering Every Small Business in India."</p>
            <p>© {new Date().getFullYear()} Neurozy SaaS Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
