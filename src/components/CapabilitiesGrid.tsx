import React, { useState } from 'react';
import { CAPABILITIES_DATA, CapabilityItem } from '../data/capabilities';
import { ChevronsRight, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface CapabilitiesGridProps {
  onSelectCapability: (cap: CapabilityItem) => void;
}

export const CapabilitiesGrid: React.FC<CapabilitiesGridProps> = ({ onSelectCapability }) => {
  // Card 1 active by default or hover/click to active (as seen at 0:14 in video)
  const [activeCardId, setActiveCardId] = useState<string>('cloud-architecture');

  const handleCardClick = (cap: CapabilityItem) => {
    soundFx.playPop();
    setActiveCardId(cap.id);
    onSelectCapability(cap);
  };

  return (
    <section id="flagship-capabilities" className="relative px-4 sm:px-8 md:px-12 py-16 md:py-24 bg-[#f6f194] yellow-board-texture text-slate-950 overflow-hidden w-full max-w-full">
      
      {/* Decorative top doodles */}
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center mb-12 relative z-10">
        
        {/* Playful Doodles / Cards (0:11 in video) */}
        <div className="flex items-center gap-4 mb-2">
          {/* Curved doodle squiggle */}
          <svg className="w-10 h-10 text-slate-700/60" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M10 20 C 20 10, 30 35, 45 20" />
          </svg>

          {/* Cards doodle icon */}
          <div className="relative w-8 h-8">
            <div className="absolute top-0 right-1 w-6 h-6 border-2 border-slate-900 bg-white rounded-md transform rotate-12" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-2 border-slate-900 bg-[#fbf055] rounded-md transform -rotate-6 flex items-center justify-center">
              <Sparkles size={12} className="text-slate-900" />
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-slate-950">
          Flagship topics
        </h2>
      </div>

      {/* Grid of 6 Cards (2 rows of 3) - Video 0:12 - 0:15 */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {CAPABILITIES_DATA.map((cap) => {
          const isActive = activeCardId === cap.id;

          return (
            <div
              key={cap.id}
              onClick={() => handleCardClick(cap)}
              onMouseEnter={() => {
                if (activeCardId !== cap.id) {
                  soundFx.playClick();
                }
              }}
              className={`rounded-3xl p-4 sm:p-5 transition-all duration-300 cursor-pointer shadow-md flex flex-col justify-between group ${
                isActive
                  ? 'bg-[#1761ff] text-white scale-[1.02] shadow-2xl ring-2 ring-black/10'
                  : 'bg-white text-slate-950 hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              <div>
                {/* Image slot with rounded corners */}
                <div className="w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-4 bg-slate-100 relative">
                  <img
                    src={cap.image}
                    alt={cap.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute top-2.5 left-2.5 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full ${
                    isActive ? 'bg-black text-white' : 'bg-white/90 text-slate-800 backdrop-blur-xs'
                  }`}>
                    {cap.category}
                  </div>
                </div>

                {/* Lesson / Module Count */}
                <div className={`text-xs font-semibold mb-1 tracking-wide ${
                  isActive ? 'text-blue-100' : 'text-slate-400'
                }`}>
                  {cap.metric}
                </div>

                {/* Card Title */}
                <h3 className={`text-lg sm:text-xl font-bold font-display tracking-tight leading-snug mb-3 ${
                  isActive ? 'text-white' : 'text-slate-950'
                }`}>
                  {cap.title}
                </h3>
              </div>

              {/* Bottom Row with Chevrons Action Button (Matches 0:14 in video) */}
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-current/10">
                <span className={`text-xs font-medium ${isActive ? 'text-blue-200' : 'text-slate-500'}`}>
                  Deep-dive spec
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(cap);
                  }}
                  className={`w-12 h-9 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-black text-white hover:bg-slate-900 shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 group-hover:bg-[#1761ff] group-hover:text-white'
                  }`}
                  aria-label={`Open details for ${cap.title}`}
                >
                  <ChevronsRight size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action: "More topics" pill button (0:15 in video) */}
      <div className="max-w-6xl mx-auto flex justify-center mt-10 relative z-10">
        <button
          onClick={() => {
            soundFx.playPop();
            onSelectCapability(CAPABILITIES_DATA[1]);
          }}
          className="px-8 py-3 bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <span>More topics</span>
        </button>
      </div>

    </section>
  );
};
