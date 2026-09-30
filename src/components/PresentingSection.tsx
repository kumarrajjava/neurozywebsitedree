import React from 'react';
import { Globe2, Layers, CheckCircle2, Terminal } from 'lucide-react';
import { soundFx } from '../utils/sound';

export const PresentingSection: React.FC = () => {
  return (
    <section id="presenting-ourselves" className="relative px-6 md:px-12 py-16 md:py-24 border-t border-slate-200/60 bg-[#f9f8f4]/80 overflow-hidden w-full max-w-full">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Tilted Stack of Floating Cards (0:04 in video) */}
        <div className="lg:col-span-6 relative flex justify-center items-center min-h-[380px] sm:min-h-[440px]">
          
          {/* Card 1: Top Tilted Polaroid - "Modern Lab / Comfortable rooms" */}
          <div 
            className="absolute -top-4 sm:top-2 left-4 sm:left-12 w-48 sm:w-56 bg-white p-3 rounded-2xl shadow-xl border border-slate-200 transform -rotate-12 hover:-rotate-6 hover:scale-105 transition-all duration-300 z-20 cursor-pointer"
            onClick={() => soundFx.playPop()}
          >
            {/* Blue pill header */}
            <div className="bg-[#1761ff] text-white text-[11px] font-bold px-3 py-1 rounded-full w-fit mb-2">
              Collaborative Labs
            </div>
            {/* Image */}
            <div className="w-full h-32 sm:h-36 rounded-xl overflow-hidden bg-slate-100 mb-2">
              <img
                src="/src/assets/images/office_lab_room_1790448377845.jpg"
                alt="Neurozy Research Lab"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-[11px] font-semibold text-slate-700 text-center">
              London & Distributed Teams
            </p>
          </div>

          {/* Card 2: Center Phone Mockup - "Online Education / Real-time Apps" */}
          <div 
            className="relative w-44 sm:w-52 bg-slate-900 p-2.5 rounded-3xl shadow-2xl border-4 border-slate-800 transform rotate-8 hover:rotate-3 hover:scale-105 transition-all duration-300 z-10 cursor-pointer ml-16 sm:ml-24"
            onClick={() => soundFx.playClick()}
          >
            <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-slate-950 relative">
              <img
                src="/src/assets/images/mobile_app_preview_1790448390677.jpg"
                alt="Neurozy Mobile Platform"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10">
                Live App Preview
              </div>
            </div>
          </div>

          {/* Card 3: Bottom Tilted Badge - "From Colleague to Leader" */}
          <div 
            className="absolute -bottom-6 sm:-bottom-4 left-6 sm:left-16 bg-white p-2.5 pr-4 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3 transform -rotate-4 hover:rotate-0 hover:scale-105 transition-all duration-300 z-30 cursor-pointer"
            onClick={() => soundFx.playPop()}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-300">
              <img
                src="/src/assets/images/hero_founder_lead_1790448361902.jpg"
                alt="Lead Architect"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Full-Lifecycle
              </div>
              <div className="text-xs font-bold text-slate-900">
                From prototype to production
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Copy & Highlighted Typography (0:05 in video) */}
        <div className="lg:col-span-6 relative z-10">
          {/* Whimsical squiggle above icon */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-300 shadow-xs flex items-center justify-center text-slate-800">
              <Globe2 size={24} className="stroke-[1.75]" />
            </div>
            <svg
              className="w-8 h-8 text-slate-400"
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M5 20 Q 20 5, 35 20" />
            </svg>
          </div>

          {/* Heading with yellow highlighter pill accent */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 font-display mb-6">
            <span className="relative inline-block mr-2.5">
              <span className="relative z-10">Presenting</span>
              <span className="absolute inset-x-0 bottom-1 h-3.5 bg-[#fbf055] -rotate-1 rounded-sm -z-0" />
            </span>
            <span>ourselves</span>
          </h2>

          {/* Primary description paragraph */}
          <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed mb-6">
            We are an engineering studio and AI collective that builds intelligent, scalable applications for high-growth enterprises and visionary teams. Our digital systems operate with zero latency, elegant user experiences, and bulletproof uptime.
          </p>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-8">
            Headquartered in London with distributed engineering hubs, we deliver high-performance web platforms, cross-platform mobile apps, and custom Gemini neural reasoning engines across the UK, Europe, North America, and Asia.
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-white/80 border border-slate-200/80 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 mt-0.5">
                <CheckCircle2 size={16} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Zero Latency Render</h4>
                <p className="text-xs text-slate-500">Sub-second paint &amp; optimistic mutations</p>
              </div>
            </div>

            <div className="bg-white/80 border border-slate-200/80 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs">
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 mt-0.5">
                <Terminal size={16} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Dual-Brain Engine</h4>
                <p className="text-xs text-slate-500">Gemini reasoning + native Python execution</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
