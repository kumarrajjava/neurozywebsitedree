import React from 'react';
import neurozyLogo from '../assets/images/neurozy-logo.png';
import neurozyLogoWhite from '../assets/images/neurozy-logo-white.png';

export interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light'; // 'dark' for light backgrounds (default), 'light' for dark backgrounds
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: (e?: React.MouseEvent) => void;
  alt?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  onClick,
  alt = 'Neurozy Logo'
}) => {
  const logoSrc = variant === 'light' ? neurozyLogoWhite : neurozyLogo;

  const sizeClasses = {
    sm: 'h-8 sm:h-8 md:h-9',
    md: 'h-9 sm:h-10 md:h-10.5',
    lg: 'h-11 sm:h-12 md:h-14',
    xl: 'h-14 sm:h-16 md:h-20'
  };

  return (
    <div
      className={`inline-flex items-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <img
        src={logoSrc}
        alt={alt}
        className={`${sizeClasses[size]} w-auto object-contain transition-transform duration-200 hover:scale-[1.03] drop-shadow-2xs`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default Logo;
