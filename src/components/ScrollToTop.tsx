import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { soundFx } from '../utils/sound';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down more than 280px
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    soundFx.playPop();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Scroll to top"
      className="fixed bottom-6 right-6 z-40 p-3 sm:p-3.5 rounded-full bg-[#18191c] text-[#fff566] border border-white/20 shadow-2xl hover:bg-[#fff566] hover:text-black hover:border-black/30 hover:scale-110 active:scale-90 transition-all duration-300 flex items-center justify-center group cursor-pointer animate-in fade-in slide-in-from-bottom-4"
    >
      <ArrowUp size={20} className="transition-transform group-hover:-translate-y-0.5 duration-200" />
      <span className="sr-only">Scroll to top</span>
    </button>
  );
};
