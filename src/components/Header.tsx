import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp, 
  SquarePen, 
  Layers, 
  Building2, 
  PenTool, 
  Headphones, 
  ArrowUpRight, 
  AppWindow, 
  CircleUserRound, 
  Box, 
  MonitorSmartphone 
} from 'lucide-react';
import { soundFx } from '../utils/sound';
import { Logo } from './Logo';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenContact: () => void;
}

type DropdownKey = 'platform' | 'resources' | 'company' | null;

export const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  onNavigate, 
  onOpenContact 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<{ [key: string]: boolean }>({});
  
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handlePageSelect = (view: string) => {
    soundFx.playClick();
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeAnchor = (anchorId: string) => {
    soundFx.playClick();
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          const yOffset = -70;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(anchorId);
      if (el) {
        const yOffset = -70;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const toggleDropdown = (key: DropdownKey) => {
    soundFx.playClick();
    setActiveDropdown(prev => prev === key ? null : key);
  };

  const toggleMobileSubmenu = (key: string) => {
    setMobileExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#f7f6f1]/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3 sm:py-3.5 px-4 sm:px-6 md:px-12' 
          : 'bg-[#f7f6f1]/80 backdrop-blur-sm py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-12'
      }`}
    >
      <div ref={navRef} className="max-w-6xl mx-auto flex items-center justify-between w-full relative">
        {/* Brand Wordmark: Official Company Logo */}
        <a 
          href="#" 
          className="flex items-center group cursor-pointer py-0.5"
          onClick={(e) => {
            e.preventDefault();
            soundFx.playPop();
            handlePageSelect('home');
          }}
          aria-label="Neurozy Home"
        >
          <Logo size="md" variant="dark" />
        </a>

        {/* Navigation Links: Business | Platform ˅ | Resources ˅ | Company ˅ */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5 text-[0.92rem] font-medium text-slate-800">
          
          {/* 1. Business */}
          <button
            onClick={() => handleHomeAnchor('solution-spectrum')}
            className="px-3.5 py-1.5 rounded-full hover:bg-black/5 hover:text-black transition-colors cursor-pointer"
          >
            Business
          </button>

          {/* 2. Platform Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('platform')}
              className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer font-medium ${
                activeDropdown === 'platform' || ['webai-app', 'personas', 'sdks', 'idn', 'frontline'].includes(currentView)
                  ? 'bg-[#18191c] text-white shadow-xs'
                  : 'hover:bg-black/5 text-slate-800 hover:text-black'
              }`}
            >
              <span>Platform</span>
              {activeDropdown === 'platform' ? (
                <ChevronUp size={15} className="text-slate-300" />
              ) : (
                <ChevronDown size={15} className="text-slate-500" />
              )}
            </button>

            {/* Platform Dropdown Menu */}
            {activeDropdown === 'platform' && (
              <div className="absolute top-full left-0 mt-2.5 w-68 bg-[#18191c] text-white rounded-2xl p-2 shadow-2xl border border-white/10 flex flex-col gap-0.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <button
                  onClick={() => handlePageSelect('webai-app')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-left text-[0.9rem] text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  <AppWindow size={17} className="text-slate-300 shrink-0" />
                  <span>webAI App</span>
                </button>
                <button
                  onClick={() => handlePageSelect('personas')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-left text-[0.9rem] text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  <CircleUserRound size={17} className="text-slate-300 shrink-0" />
                  <span>Personas</span>
                </button>
                <button
                  onClick={() => handlePageSelect('sdks')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-left text-[0.9rem] text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  <Layers size={17} className="text-slate-300 shrink-0" />
                  <span>SDKs</span>
                </button>
                <button
                  onClick={() => handlePageSelect('idn')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-left text-[0.9rem] text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  <Box size={17} className="text-slate-300 shrink-0" />
                  <span>Intelligence Delivery Network</span>
                </button>
                <button
                  onClick={() => handlePageSelect('frontline')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-left text-[0.9rem] text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  <MonitorSmartphone size={17} className="text-slate-300 shrink-0" />
                  <span>webAI Frontline</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. Resources Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('resources')}
              className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer font-medium ${
                activeDropdown === 'resources' || ['blog', 'help-center'].includes(currentView)
                  ? 'bg-[#18191c] text-white shadow-xs'
                  : 'hover:bg-black/5 text-slate-800 hover:text-black'
              }`}
            >
              <span>Resources</span>
              {activeDropdown === 'resources' ? (
                <ChevronUp size={15} className="text-slate-300" />
              ) : (
                <ChevronDown size={15} className="text-slate-500" />
              )}
            </button>

            {/* Resources Dropdown Menu */}
            {activeDropdown === 'resources' && (
              <div className="absolute top-full left-0 mt-2.5 w-56 bg-[#18191c] text-white rounded-2xl p-2 shadow-2xl border border-white/10 flex flex-col gap-0.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <button
                  onClick={() => handlePageSelect('blog')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-left text-[0.9rem] text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  <PenTool size={17} className="text-slate-300 shrink-0" />
                  <span>Blog</span>
                </button>
                <button
                  onClick={() => handlePageSelect('help-center')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/10 text-left text-[0.9rem] text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Headphones size={17} className="text-slate-300 shrink-0" />
                    <span>Help Center</span>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-400" />
                </button>
              </div>
            )}
          </div>

          {/* 4. Company Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('company')}
              className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer font-medium ${
                activeDropdown === 'company' || ['about', 'manifesto', 'careers'].includes(currentView)
                  ? 'bg-[#18191c] text-white shadow-xs'
                  : 'hover:bg-black/5 text-slate-800 hover:text-black'
              }`}
            >
              <span>Company</span>
              {activeDropdown === 'company' ? (
                <ChevronUp size={15} className="text-slate-300" />
              ) : (
                <ChevronDown size={15} className="text-slate-500" />
              )}
            </button>

            {/* Company Dropdown Menu */}
            {activeDropdown === 'company' && (
              <div className="absolute top-full left-0 mt-2.5 w-56 bg-[#18191c] text-white rounded-2xl p-2 shadow-2xl border border-white/10 flex flex-col gap-0.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <button
                  onClick={() => handlePageSelect('about')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-left text-[0.9rem] text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  <SquarePen size={17} className="text-slate-300 shrink-0" />
                  <span>About</span>
                </button>
                <button
                  onClick={() => handlePageSelect('manifesto')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-left text-[0.9rem] text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  <Layers size={17} className="text-slate-300 shrink-0" />
                  <span>Manifesto</span>
                </button>
                <button
                  onClick={() => handlePageSelect('careers')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-left text-[0.9rem] text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  <Building2 size={17} className="text-slate-300 shrink-0" />
                  <span>Careers</span>
                </button>
              </div>
            )}
          </div>

        </nav>

        {/* Action Zone: "Get in touch" held fixed on scroll */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Primary CTA Button: "Get in touch" */}
          <button
            onClick={() => {
              setActiveDropdown(null);
              onOpenContact();
            }}
            className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-white border border-slate-300 rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-200 shadow-xs active:scale-95 cursor-pointer shrink-0 whitespace-nowrap"
          >
            Get in touch
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-black/5"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with all links */}
      {mobileMenuOpen && (
        <div className="max-w-6xl mx-auto mt-3 bg-[#18191c] text-white border border-white/10 rounded-2xl p-4 shadow-2xl md:hidden flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[80vh] overflow-y-auto">
          {/* Home */}
          <button
            onClick={() => handlePageSelect('home')}
            className="text-left py-2 px-3 font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-xl"
          >
            Home
          </button>

          {/* Business */}
          <button
            onClick={() => handleHomeAnchor('solution-spectrum')}
            className="text-left py-2 px-3 font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-xl"
          >
            Business
          </button>

          {/* Platform Submenu */}
          <div>
            <button
              onClick={() => toggleMobileSubmenu('platform')}
              className="w-full flex items-center justify-between py-2 px-3 font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-xl"
            >
              <span>Platform</span>
              {mobileExpanded['platform'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {mobileExpanded['platform'] && (
              <div className="pl-4 pr-1 py-1 flex flex-col gap-1 border-l border-white/10 ml-3 mt-1">
                <button
                  onClick={() => handlePageSelect('webai-app')}
                  className="flex items-center gap-2.5 py-1.5 px-2 text-sm text-slate-300 hover:text-white text-left"
                >
                  <AppWindow size={15} />
                  <span>webAI App</span>
                </button>
                <button
                  onClick={() => handlePageSelect('personas')}
                  className="flex items-center gap-2.5 py-1.5 px-2 text-sm text-slate-300 hover:text-white text-left"
                >
                  <CircleUserRound size={15} />
                  <span>Personas</span>
                </button>
                <button
                  onClick={() => handlePageSelect('sdks')}
                  className="flex items-center gap-2.5 py-1.5 px-2 text-sm text-slate-300 hover:text-white text-left"
                >
                  <Layers size={15} />
                  <span>SDKs</span>
                </button>
                <button
                  onClick={() => handlePageSelect('idn')}
                  className="flex items-center gap-2.5 py-1.5 px-2 text-sm text-slate-300 hover:text-white text-left"
                >
                  <Box size={15} />
                  <span>Intelligence Delivery Network</span>
                </button>
                <button
                  onClick={() => handlePageSelect('frontline')}
                  className="flex items-center gap-2.5 py-1.5 px-2 text-sm text-slate-300 hover:text-white text-left"
                >
                  <MonitorSmartphone size={15} />
                  <span>webAI Frontline</span>
                </button>
              </div>
            )}
          </div>

          {/* Resources Submenu */}
          <div>
            <button
              onClick={() => toggleMobileSubmenu('resources')}
              className="w-full flex items-center justify-between py-2 px-3 font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-xl"
            >
              <span>Resources</span>
              {mobileExpanded['resources'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {mobileExpanded['resources'] && (
              <div className="pl-4 pr-1 py-1 flex flex-col gap-1 border-l border-white/10 ml-3 mt-1">
                <button
                  onClick={() => handlePageSelect('blog')}
                  className="flex items-center gap-2.5 py-1.5 px-2 text-sm text-slate-300 hover:text-white text-left"
                >
                  <PenTool size={15} />
                  <span>Blog</span>
                </button>
                <button
                  onClick={() => handlePageSelect('help-center')}
                  className="flex items-center justify-between py-1.5 px-2 text-sm text-slate-300 hover:text-white text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Headphones size={15} />
                    <span>Help Center</span>
                  </div>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            )}
          </div>

          {/* Company Submenu */}
          <div>
            <button
              onClick={() => toggleMobileSubmenu('company')}
              className="w-full flex items-center justify-between py-2 px-3 font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-xl"
            >
              <span>Company</span>
              {mobileExpanded['company'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {mobileExpanded['company'] && (
              <div className="pl-4 pr-1 py-1 flex flex-col gap-1 border-l border-white/10 ml-3 mt-1">
                <button
                  onClick={() => handlePageSelect('about')}
                  className="flex items-center gap-2.5 py-1.5 px-2 text-sm text-slate-300 hover:text-white text-left"
                >
                  <SquarePen size={15} />
                  <span>About</span>
                </button>
                <button
                  onClick={() => handlePageSelect('manifesto')}
                  className="flex items-center gap-2.5 py-1.5 px-2 text-sm text-slate-300 hover:text-white text-left"
                >
                  <Layers size={15} />
                  <span>Manifesto</span>
                </button>
                <button
                  onClick={() => handlePageSelect('careers')}
                  className="flex items-center gap-2.5 py-1.5 px-2 text-sm text-slate-300 hover:text-white text-left"
                >
                  <Building2 size={15} />
                  <span>Careers</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
