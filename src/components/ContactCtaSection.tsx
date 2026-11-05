import React from 'react';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface ContactCtaSectionProps {
  onOpenContact: () => void;
}

export const ContactCtaSection: React.FC<ContactCtaSectionProps> = ({ onOpenContact }) => {
  return (
    <section id="contact-section" className="relative px-6 md:px-12 py-20 md:py-28 bg-[#f7f6f1] paper-texture text-slate-950 overflow-hidden w-full max-w-full">
      
      {/* Decorative top-right doodle (Notebook / sketch - 0:17 in video) */}
      <div className="absolute top-10 right-10 md:right-24 hidden sm:block text-slate-700/60 pointer-events-none">
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8 H 36 A 4 4 0 0 1 40 12 V 36 A 4 4 0 0 1 36 40 H 12 A 4 4 0 0 1 8 36 V 12 A 4 4 0 0 1 12 8 Z" />
          <path d="M16 16 H 32" />
          <path d="M16 24 H 28" />
          <path d="M16 32 H 24" />
        </svg>
      </div>

      {/* Decorative Squiggle top left */}
      <svg className="absolute top-12 left-16 w-8 h-8 text-slate-400 pointer-events-none hidden md:block" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M5 25 Q 20 10, 35 25" />
      </svg>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Playful Headline Layout with Inline Badges (0:16 in video) */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-950 font-display leading-[1.18] mb-8 select-none">
          {/* Line 1 */}
          <span className="inline-flex items-center flex-wrap justify-center gap-x-3 gap-y-2">
            <span>We're</span>

            {/* Inline Avatar Badge */}
            <span className="inline-flex items-center align-middle mx-1">
              <span className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-full overflow-hidden border-2 border-slate-900 shadow-md inline-block transform hover:scale-105 transition-transform">
                <img
                  src="/src/assets/images/cta_architect_contact_1790448345228.jpg"
                  onError={(e) => {
                    // Fallback to architect image
                    (e.target as HTMLImageElement).src = '/src/assets/images/cta_architect_contact_1790448438367.jpg';
                  }}
                  alt="Senior Architect"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </span>
            </span>

            <span>waiting</span>

            {/* Yellow pill tag: 'for' */}
            <span className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-[#fbf055] text-slate-950 font-bold text-lg sm:text-2xl border-2 border-slate-900 shadow-xs transform rotate-2">
              for
            </span>
          </span>

          <br className="hidden sm:inline" />

          {/* Line 2 */}
          <span className="inline-flex items-center flex-wrap justify-center gap-x-3 gap-y-2 mt-2">
            <span>you</span>

            {/* Blue icon pill: Calendar / 2026 */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#1761ff] text-white font-bold text-sm sm:text-base border-2 border-slate-900 shadow-xs transform -rotate-3">
              <Calendar size={16} />
              <span>2026</span>
            </span>

            <span>to</span>

            <span>contact</span>

            {/* Yellow pill tag: 'us' */}
            <span className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-[#fbf055] text-slate-950 font-bold text-lg sm:text-2xl border-2 border-slate-900 shadow-xs transform -rotate-2">
              us
            </span>
          </span>
        </h2>

        {/* Descriptive Body Text */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 font-medium leading-relaxed mb-10 text-balance">
          You register directly with our engineering team online. We evaluate your requirements, map the neural and software architecture, and provide a transparent roadmap with direct access to lead developers.
        </p>

        {/* Primary "Register now" Button (0:18 in video) */}
        <div>
          <button
            onClick={() => {
              soundFx.playPop();
              onOpenContact();
            }}
            className="px-10 py-4 bg-slate-950 hover:bg-slate-800 text-white font-bold text-base rounded-full shadow-xl transition-all duration-200 active:scale-95 cursor-pointer inline-flex items-center gap-3 group"
          >
            <span>Register now</span>
            <ArrowRight size={18} className="text-[#fbf055] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
