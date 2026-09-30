import React, { useState } from 'react';
import { 
  Headphones, 
  Search, 
  BookOpen, 
  LifeBuoy, 
  FileCode2, 
  HelpCircle, 
  ArrowRight, 
  ChevronRight, 
  Check, 
  MessageSquare,
  Globe
} from 'lucide-react';

interface HelpCenterPageProps {
  onOpenContact: () => void;
  onNavigate: (view: string) => void;
}

export const HelpCenterPage: React.FC<HelpCenterPageProps> = ({ onOpenContact, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Does webAI require any backend Python or GPU servers for my web app?',
      a: 'No! The fundamental breakthrough of webAI is client-side WebGPU acceleration. The model executes directly within your end-users’ modern web browsers (Chrome, Edge, Safari, Firefox). You incur zero server compute bills and no GPU infrastructure maintenance.'
    },
    {
      q: 'How does webAI perform on low-end laptops and mobile web browsers?',
      a: 'Our engine features dynamic hardware tiering. On machines with dedicated GPUs or modern integrated chips (Apple Silicon M-series, Intel Iris, Snapdragon), it executes via WebGPU shaders. On legacy or low-power browsers, it seamlessly falls back to 4-bit WebAssembly SIMD kernels.'
    },
    {
      q: 'What is the initial load time for a web application using webAI?',
      a: 'Using our Intelligence Delivery Network (IDN), model shards are compressed to ~40MB total and streamed progressively via HTTP/3. In addition, once loaded, the model weights are persistently saved in the client browser’s indexedDB cache, resulting in 0ms network overhead on subsequent visits.'
    },
    {
      q: 'How do we comply with strict corporate data governance (HIPAA/GDPR)?',
      a: 'Because zero bytes of DOM context or user prompts are transmitted across the internet to third-party model providers, compliance is trivial. Data stays strictly inside the user’s local browser memory space.'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 font-mono">
        <button onClick={() => onNavigate('home')} className="hover:text-black hover:underline cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-slate-400">Resources</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Help Center</span>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-[#fff566] text-xs font-semibold uppercase tracking-wider mb-4">
          <Headphones size={14} />
          Web App Developer Support & Docs
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-950 mb-4">
          How can we help your <span className="bg-[#fff566] px-2 rounded-lg">Web App</span> team?
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mb-8">
          Search guides, implementation tutorials, and WebGPU deployment FAQs for web applications.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search WebGPU setup, React hooks, offline caching..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-slate-300 shadow-sm text-sm focus:outline-none focus:border-black transition-all"
          />
        </div>
      </div>

      {/* Documentation Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div 
          onClick={() => onNavigate('sdks')}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 hover:border-black transition-all cursor-pointer group shadow-sm"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-4 group-hover:bg-[#fff566] transition-colors">
            <BookOpen size={22} />
          </div>
          <h3 className="text-lg font-bold font-display text-slate-950 mb-2">Web App Quickstart Guide</h3>
          <p className="text-slate-600 text-xs leading-relaxed mb-4">
            Initialize the runtime inside React, Next.js, or Vite in under 5 minutes with our step-by-step onboarding walkthrough.
          </p>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 group-hover:underline">
            Read Quickstart <ArrowRight size={13} />
          </span>
        </div>

        <div 
          onClick={() => onNavigate('sdks')}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 hover:border-black transition-all cursor-pointer group shadow-sm"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-4 group-hover:bg-[#fff566] transition-colors">
            <FileCode2 size={22} />
          </div>
          <h3 className="text-lg font-bold font-display text-slate-950 mb-2">Browser API Reference</h3>
          <p className="text-slate-600 text-xs leading-relaxed mb-4">
            Complete TypeScript reference for DOM binders, token streaming, canvas transformers, and indexedDB cache settings.
          </p>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 group-hover:underline">
            View API Docs <ArrowRight size={13} />
          </span>
        </div>

        <div 
          onClick={onOpenContact}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 hover:border-black transition-all cursor-pointer group shadow-sm"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-4 group-hover:bg-[#fff566] transition-colors">
            <LifeBuoy size={22} />
          </div>
          <h3 className="text-lg font-bold font-display text-slate-950 mb-2">24/7 Dedicated Support</h3>
          <p className="text-slate-600 text-xs leading-relaxed mb-4">
            Direct Slack and ticketing channel with our core WebGPU and browser runtime engineering architects.
          </p>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 group-hover:underline">
            Open Support Ticket <ArrowRight size={13} />
          </span>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm mb-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-950 mb-8">
          Frequently Answered Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={faq.q}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between font-bold text-slate-900 text-base hover:bg-slate-50 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronRight 
                  size={18} 
                  className={`text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-90' : ''}`} 
                />
              </button>
              {activeFaq === idx && (
                <div className="p-5 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Direct Contact Help Banner */}
      <div className="bg-[#18191c] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#fff566] text-black flex items-center justify-center shrink-0">
            <MessageSquare size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display">Need immediate engineering assistance?</h3>
            <p className="text-slate-400 text-sm">Our Web AI specialists are on standby to unblock your build.</p>
          </div>
        </div>
        <button
          onClick={onOpenContact}
          className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-[#fff566] transition-all cursor-pointer shrink-0"
        >
          Contact Support Team
        </button>
      </div>
    </div>
  );
};
