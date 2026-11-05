import React, { useState } from 'react';
import { Check, Send, Sparkles, ShieldCheck, Cpu, Zap, Award } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    soundFx.playPop();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 4500);
  };

  return (
    <section className="relative px-6 md:px-12 pt-8 pb-20 md:pb-28 overflow-hidden w-full max-w-full">
      {/* Decorative Hand-drawn Squiggle 1 (Top Left) */}
      <svg
        className="absolute top-12 left-10 md:left-24 w-12 h-12 text-slate-400/60 pointer-events-none hidden sm:block"
        viewBox="0 0 50 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M10 25 Q 25 10, 40 25 T 45 40" />
      </svg>

      {/* Decorative Hand-drawn Squiggle 2 (Hero Center Accent) */}
      <svg
        className="absolute top-36 right-12 md:right-28 w-14 h-14 text-slate-400/50 pointer-events-none hidden sm:block"
        viewBox="0 0 60 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M15 15 C 30 5, 45 35, 40 50" />
      </svg>

      {/* Main Headline Container */}
      <div className="max-w-4xl mx-auto text-center relative z-10 pt-4 md:pt-8">
        <h1 className="text-4xl sm:text-5xl md:text-[4.25rem] lg:text-[4.75rem] font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6 select-none font-display">
          {/* Line 1 */}
          <span className="inline-flex items-center flex-wrap justify-center gap-x-3 gap-y-2">
            <span>Build</span>
            
            {/* Inline Oval Photo Badge */}
            <span className="inline-flex items-center align-middle mx-1 my-0.5">
              <span className="relative w-24 sm:w-28 md:w-32 h-10 sm:h-12 md:h-14 rounded-full overflow-hidden border-2 border-slate-900 shadow-sm inline-block transform hover:scale-105 transition-transform duration-200">
                <img
                  src="/src/assets/images/hero_team_lab_1790448345228.jpg"
                  alt="Neurozy AI Engineering Lab"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </span>
            </span>

            <span>intelligent</span>
          </span>

          <br className="hidden sm:inline" />

          {/* Line 2 */}
          <span className="inline-flex items-center flex-wrap justify-center gap-x-3 gap-y-2 mt-1 md:mt-2">
            <span>software</span>
            
            {/* Inline Yellow '&' Badge */}
            <span className="inline-flex items-center justify-center w-9 sm:w-11 md:w-12 h-9 sm:h-11 md:h-12 rounded-full bg-[#fbf055] text-slate-950 font-bold text-xl sm:text-2xl border-2 border-slate-900 shadow-xs transform rotate-[-6deg] hover:rotate-6 transition-transform">
              &amp;
            </span>

            <span>AI systems</span>

            {/* Inline Circular Avatar */}
            <span className="inline-flex items-center align-middle mx-1 my-0.5">
              <span className="relative w-11 sm:w-13 md:w-14 h-11 sm:h-13 md:h-14 rounded-full overflow-hidden border-2 border-slate-900 shadow-sm inline-block transform hover:scale-105 transition-transform duration-200">
                <img
                  src="/src/assets/images/hero_founder_lead_1790448361902.jpg"
                  alt="Lead Architect"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </span>
            </span>
          </span>
        </h1>

        {/* Subtitle / Question */}
        <p className="max-w-xl mx-auto text-base sm:text-lg text-slate-600 font-medium mb-9 leading-relaxed text-balance">
          Do you want to build scalable applications that make your business faster, smarter, or create an unfair market advantage?
        </p>

        {/* Interactive Consultation / Email Form */}
        <div className="max-w-md mx-auto relative mb-12 sm:mb-16">
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white border border-slate-300 rounded-full p-1.5 shadow-sm focus-within:border-black focus-within:ring-2 focus-within:ring-black/10 transition-all"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              required
              className="flex-1 bg-transparent px-4 py-2 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm transition-all duration-200 active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              {submitted ? (
                <>
                  <Check size={16} className="text-emerald-400" />
                  <span>Sent!</span>
                </>
              ) : (
                <>
                  <span>Send</span>
                </>
              )}
            </button>
          </form>

          {/* Submission feedback pill */}
          {submitted && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-4 py-2 bg-emerald-950 text-emerald-100 rounded-xl text-xs font-medium shadow-lg animate-in fade-in slide-in-from-top-1 whitespace-nowrap">
              ✨ Received! A senior architect from Neurozy will reach out within 2 hours.
            </div>
          )}
        </div>
      </div>

      {/* Surrounding Whimsical Elements Exactly Like the Video */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pt-4 relative">
        {/* Bottom Left: Black Badge Card (Akademia style in video) */}
        <div className="w-full md:w-64 bg-[#141517] text-white p-5 rounded-2xl shadow-xl border border-white/10 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3.5 h-3.5 rounded-full bg-[#fbf055]" />
            <h4 className="font-extrabold text-sm tracking-tight font-display text-white">
              Neurozy
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 font-medium">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Implementation guarantee</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Dual-Brain Gemini & Python</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Sub-100ms Zero-latency rule</span>
            </li>
          </ul>
        </div>

        {/* Bottom Center / Right: Circular Spinning Stamp Badge */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {/* Rotating Stamp */}
          <div 
            className="relative w-28 h-28 flex items-center justify-center cursor-pointer group"
            onClick={() => {
              soundFx.playPop();
              onOpenContact();
            }}
          >
            {/* Spinning Text SVG Ring */}
            <svg
              className="w-full h-full animate-spin-slow text-slate-800"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text fontSize="8.2" fontWeight="700" letterSpacing="2.2" fill="currentColor">
                <textPath href="#circlePath" startOffset="0%">
                  • NEUROZY • BEST QUALITY • PROVEN TECH •
                </textPath>
              </text>
            </svg>

            {/* Center Star / Symbol */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border border-slate-900 flex items-center justify-center bg-white group-hover:scale-110 transition-transform">
                <Sparkles size={16} className="text-slate-900" />
              </div>
            </div>
          </div>

          {/* Green Origami Folded Polygon with Black Tag 'Management' (as in video) */}
          <div className="relative group cursor-pointer" onClick={() => soundFx.playSwoosh()}>
            {/* Origami Paper Fold Shape */}
            <div className="relative w-36 h-20">
              {/* Back fold */}
              <div className="absolute top-0 right-2 w-28 h-12 bg-[#1b6b3b] rounded-md transform rotate-12" />
              {/* Front main polygon fold */}
              <div className="absolute bottom-1 left-2 w-28 h-14 bg-[#23924e] rounded-lg shadow-md transform -rotate-6 transition-transform duration-300 group-hover:rotate-0" />
              
              {/* Black floating tag badge */}
              <div className="absolute -top-1 left-4 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 whitespace-nowrap transform group-hover:scale-105 transition-transform">
                Architecture
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
