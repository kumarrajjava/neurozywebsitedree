import React from 'react';
import { BusinessInfo } from '../types';
import { getDefaultLogoForCategory, generateMonogramSvg } from '../data/presetLogos';

interface LogoRendererProps {
  business: Partial<BusinessInfo>;
  sizeClass?: string;
  fallbackBg?: string;
  className?: string;
}

export const LogoRenderer: React.FC<LogoRendererProps> = ({
  business,
  sizeClass = 'w-10 h-10',
  fallbackBg = '#4f46e5',
  className = '',
}) => {
  const { name = 'Store', category = 'retail', logoSvg, logoUrl, logoType = 'svg', logoBgColor } = business;
  const [imgError, setImgError] = React.useState(false);

  // 1. If Image URL is chosen and no error
  if (logoType === 'image' && logoUrl && !imgError) {
    return (
      <div className={`${sizeClass} rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-slate-50 border border-slate-200/80 shadow-xs ${className}`}>
        <img
          src={logoUrl}
          alt={`${name} Logo`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-0.5"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // 2. If SVG code is provided
  if (logoType === 'svg' && logoSvg && logoSvg.includes('<svg')) {
    return (
      <div
        className={`${sizeClass} rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-0.5 shadow-xs transition-transform ${className}`}
        style={{ backgroundColor: logoBgColor || 'transparent' }}
        dangerouslySetInnerHTML={{ __html: logoSvg }}
      />
    );
  }

  // 3. Fallback: Category default SVG or Monogram code
  const effectiveSvg = logoSvg || getDefaultLogoForCategory(category) || generateMonogramSvg(name, fallbackBg);

  return (
    <div
      className={`${sizeClass} rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-0.5 shadow-xs transition-transform ${className}`}
      style={{ backgroundColor: logoBgColor || 'transparent' }}
      dangerouslySetInnerHTML={{ __html: effectiveSvg }}
    />
  );
};
