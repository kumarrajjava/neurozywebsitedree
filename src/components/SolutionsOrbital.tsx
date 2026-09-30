import React, { useState } from 'react';
import { SOLUTIONS_DATA, SolutionItem } from '../data/solutions';
import { Sparkles, ArrowRight, CheckCircle, Code, Layers } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface SolutionsOrbitalProps {
  onSelectSolution: (sol: SolutionItem) => void;
}

export const SolutionsOrbital: React.FC<SolutionsOrbitalProps> = ({ onSelectSolution }) => {
  const [activeSolutionId, setActiveSolutionId] = useState<string>('ai-gemini');
  const activeSolution = SOLUTIONS_DATA.find((s) => s.id === activeSolutionId) || SOLUTIONS_DATA[0];

  const handleCircleClick = (solution: SolutionItem) => {
    soundFx.playPop();
    setActiveSolutionId(solution.id);
  };

  return (
    <section id="solution-spectrum" className="relative px-4 sm:px-8 md:px-12 py-16 md:py-24 bg-[#23854c] green-board-texture text-white overflow-hidden rounded-t-[2.5rem] md:rounded-t-[3rem] w-full max-w-full">
      {/* Top Bar inside Green Board */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-12 relative z-10">
        {/* Yellow Cutout Tag (0:08 in video) */}
        <div className="bg-[#fbf055] text-slate-950 font-bold text-sm sm:text-base px-4 py-1.5 rounded-lg shadow-sm font-display tracking-tight transform -rotate-1">
          solution spectrum
        </div>

        {/* Playful Doodles / Stack Icon */}
        <div className="flex items-center gap-2 text-white/80">
          <svg className="w-8 h-8 text-[#fbf055]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="6" y="8" width="20" height="5" rx="1.5" fill="white" />
            <rect x="4" y="15" width="24" height="5" rx="1.5" fill="#fbf055" />
            <rect x="8" y="22" width="16" height="5" rx="1.5" fill="white" />
          </svg>
        </div>
      </div>

      {/* Decorative grass / squiggles in green board */}
      <svg className="absolute top-24 right-1/4 w-10 h-10 text-white/20 pointer-events-none hidden md:block" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 35 C 10 20, 15 10, 20 5 C 20 20, 25 25, 30 35" />
      </svg>
      <svg className="absolute bottom-20 left-12 w-10 h-10 text-white/20 pointer-events-none hidden md:block" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 25 Q 20 10, 35 25" />
      </svg>

      {/* Interactive Orbital Bubble Network (Matching video 0:08 - 0:10) */}
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Mobile Grid Layout for Bubbles / Desktop Orbital Floating Layout */}
        <div className="relative min-h-[360px] md:min-h-[440px] flex items-center justify-center">
          
          {/* Orbital connection lines in background */}
          <div className="absolute inset-0 pointer-events-none hidden md:flex items-center justify-center">
            <div className="w-[500px] h-[340px] border border-dashed border-white/25 rounded-full" />
          </div>

          {/* Central Black Circle "Learn more / Explore all" (0:09 in video) */}
          <div 
            onClick={() => {
              soundFx.playSwoosh();
              onSelectSolution(activeSolution);
            }}
            className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-black text-white font-extrabold flex flex-col items-center justify-center p-3 text-center cursor-pointer shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 z-20 border-2 border-white/30 group"
          >
            <span className="text-sm md:text-base font-display">Learn more</span>
            <span className="text-[11px] text-white/60 font-normal mt-0.5 group-hover:text-[#fbf055] transition-colors">
              Click specs
            </span>
          </div>

          {/* Bubble 1: Top Left - Full-Stack Web & Mobile */}
          <button
            onClick={() => handleCircleClick(SOLUTIONS_DATA[0])}
            className={`absolute top-2 left-2 sm:left-12 md:left-20 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center p-3 text-center text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 cursor-pointer shadow-lg ${
              activeSolutionId === SOLUTIONS_DATA[0].id
                ? 'bg-[#fbf055] text-slate-950 scale-110 ring-4 ring-white/50 font-extrabold'
                : 'bg-white text-slate-900 hover:scale-105 hover:bg-slate-50'
            }`}
          >
            <span>{SOLUTIONS_DATA[0].name}</span>
          </button>

          {/* Bubble 2: Bottom Left - Face-to-face / Cloud Arch */}
          <button
            onClick={() => handleCircleClick(SOLUTIONS_DATA[2])}
            className={`absolute bottom-2 left-6 sm:left-24 md:left-32 w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center p-4 text-center text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 cursor-pointer shadow-lg ${
              activeSolutionId === SOLUTIONS_DATA[2].id
                ? 'bg-[#fbf055] text-slate-950 scale-110 ring-4 ring-white/50 font-extrabold'
                : 'bg-white text-slate-900 hover:scale-105 hover:bg-slate-50'
            }`}
          >
            <span>{SOLUTIONS_DATA[2].name}</span>
          </button>

          {/* Bubble 3: Top Right - Online Seminars / AI Gemini */}
          <button
            onClick={() => handleCircleClick(SOLUTIONS_DATA[1])}
            className={`absolute top-4 right-4 sm:right-16 md:right-28 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center p-3 text-center text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 cursor-pointer shadow-lg ${
              activeSolutionId === SOLUTIONS_DATA[1].id
                ? 'bg-[#fbf055] text-slate-950 scale-110 ring-4 ring-white/50 font-extrabold'
                : 'bg-white text-slate-900 hover:scale-105 hover:bg-slate-50'
            }`}
          >
            <span>{SOLUTIONS_DATA[1].name}</span>
          </button>

          {/* Bubble 4: Far Right - Business Coaching / High-Speed APIs */}
          <button
            onClick={() => handleCircleClick(SOLUTIONS_DATA[3])}
            className={`absolute bottom-8 right-2 sm:right-12 md:right-16 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center p-3 text-center text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 cursor-pointer shadow-lg ${
              activeSolutionId === SOLUTIONS_DATA[3].id
                ? 'bg-[#fbf055] text-slate-950 scale-110 ring-4 ring-white/50 font-extrabold'
                : 'bg-white text-slate-900 hover:scale-105 hover:bg-slate-50'
            }`}
          >
            <span>{SOLUTIONS_DATA[3].name}</span>
          </button>

          {/* Bubble 5: Bottom Center-Right - Development Programs / Automation */}
          <button
            onClick={() => handleCircleClick(SOLUTIONS_DATA[4])}
            className={`absolute bottom-0 md:bottom-2 right-32 sm:right-48 md:right-56 w-32 h-32 rounded-full flex items-center justify-center p-3 text-center text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 cursor-pointer shadow-lg hidden sm:flex ${
              activeSolutionId === SOLUTIONS_DATA[4].id
                ? 'bg-[#fbf055] text-slate-950 scale-110 ring-4 ring-white/50 font-extrabold'
                : 'bg-white text-slate-900 hover:scale-105 hover:bg-slate-50'
            }`}
          >
            <span>{SOLUTIONS_DATA[4].name}</span>
          </button>

        </div>

        {/* Selected Solution Quick Peek Card (Deepens interactivity) */}
        <div className="mt-8 bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 text-white max-w-3xl mx-auto shadow-2xl transition-all duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
            <div>
              <span className="text-xs font-mono text-[#fbf055] uppercase tracking-wider">
                Active Selection • {activeSolution.badge}
              </span>
              <h3 className="text-xl md:text-2xl font-bold font-display text-white mt-1">
                {activeSolution.headline}
              </h3>
            </div>
            
            {/* Metric pill */}
            <div className="bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-xl shrink-0">
              <div className="text-[10px] text-white/70 uppercase">{activeSolution.stats.label}</div>
              <div className="text-base font-bold font-mono text-emerald-400">{activeSolution.stats.value}</div>
            </div>
          </div>

          <p className="text-sm md:text-base text-white/80 leading-relaxed mb-6 font-normal">
            {activeSolution.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Tech stack badges */}
            <div className="flex flex-wrap items-center gap-2">
              {activeSolution.techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-white/10 text-white/90 text-xs px-2.5 py-1 rounded-md font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action button */}
            <button
              onClick={() => {
                soundFx.playPop();
                onSelectSolution(activeSolution);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fbf055] text-slate-950 font-bold text-xs sm:text-sm hover:bg-yellow-300 transition-colors shadow-md cursor-pointer shrink-0"
            >
              <span>Explore full specs</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
