import React from 'react';
import logoSrc from '../../assets/branding/neurozy-logo.png';

interface NeurozyLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const NeurozyLogo: React.FC<NeurozyLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  const heights = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-18 sm:h-20'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Neurozy Brand Logo Image (Tightly cropped, prominent & sharp) */}
      <img
        src={logoSrc}
        alt="Neurozy Logo"
        className={`${heights[size]} w-auto object-contain mix-blend-multiply transition-transform duration-200 hover:scale-105 drop-shadow-xs`}
      />

      {showTagline && (
        <div className="hidden sm:flex flex-col border-l-2 border-slate-200 pl-3.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700 leading-tight">
            From Idea to Code.
          </span>
          <span className="text-[10px] font-bold text-slate-500">
            Voice-to-Website
          </span>
        </div>
      )}
    </div>
  );
};
