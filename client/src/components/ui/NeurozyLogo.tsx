import React from 'react';

interface NeurozyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const NeurozyLogo: React.FC<NeurozyLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  const heights = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Neurozy Brand Logo Image */}
      <img
        src="/neurozy-logo.png"
        alt="Neurozy Logo"
        className={`${heights[size]} w-auto object-contain mix-blend-multiply transition-transform duration-200 hover:scale-105`}
      />

      {showTagline && (
        <div className="hidden sm:flex flex-col border-l border-slate-200 pl-3">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 leading-tight">
            From Idea to Code.
          </span>
          <span className="text-[9px] font-semibold text-slate-400">
            Voice-to-Website
          </span>
        </div>
      )}
    </div>
  );
};
