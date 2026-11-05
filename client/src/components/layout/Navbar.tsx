import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowRight, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  onOpenCreateModal: () => void;
  onOpenAuthModal: () => void;
  onNavigateHome: () => void;
  onOpenDashboard: () => void;
  user: any;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCreateModal,
  onOpenAuthModal,
  onNavigateHome,
  onOpenDashboard,
  user
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo matching artwork */}
        <div 
          onClick={onNavigateHome}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          {/* Stylized Violet 'N' Badge */}
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#6366F1] via-[#7C3AED] to-[#9333EA] p-[2px] shadow-glow group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-[#1E1B4B] rounded-[14px] flex items-center justify-center">
              <span className="text-white font-extrabold text-2xl tracking-tighter italic">N</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900 tracking-tight leading-none group-hover:text-indigo-600 transition-colors">
              Neurozy
            </span>
            <span className="text-[11px] font-semibold text-indigo-600 tracking-wider uppercase mt-1">
              From Idea to Code.
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button 
            onClick={onNavigateHome} 
            className="hover:text-indigo-600 transition"
          >
            Product
          </button>
          <a 
            href="#templates" 
            className="hover:text-indigo-600 transition"
          >
            Templates
          </a>
          <a 
            href="#pricing" 
            className="hover:text-indigo-600 transition"
          >
            Pricing
          </a>
          <a 
            href="#how-it-works" 
            className="hover:text-indigo-600 transition"
          >
            How it Works
          </a>
          {user && (
            <button
              onClick={onOpenDashboard}
              className="text-indigo-600 font-bold hover:text-indigo-700 transition"
            >
              My Dashboard
            </button>
          )}
        </div>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <button
              onClick={onOpenDashboard}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <UserIcon className="w-4 h-4 text-indigo-600" />
              <span>{user.fullName || 'Dashboard'}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="text-sm font-bold text-slate-700 hover:text-indigo-600 px-3 py-2 transition"
            >
              Sign In
            </button>
          )}

          <button
            onClick={onOpenCreateModal}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#9333EA] text-white font-bold text-sm shadow-md hover:shadow-glow hover:opacity-95 transition transform active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create Your Website</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 font-semibold text-slate-700">
            <button 
              onClick={() => { onNavigateHome(); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-indigo-600"
            >
              Product Overview
            </button>
            <a 
              href="#templates" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2 hover:text-indigo-600"
            >
              Templates
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2 hover:text-indigo-600"
            >
              Pricing
            </a>
            {user ? (
              <button
                onClick={() => { onOpenDashboard(); setMobileMenuOpen(false); }}
                className="text-left py-2 text-indigo-600 font-bold"
              >
                Dashboard ({user.fullName})
              </button>
            ) : (
              <button
                onClick={() => { onOpenAuthModal(); setMobileMenuOpen(false); }}
                className="text-left py-2 hover:text-indigo-600"
              >
                Sign In
              </button>
            )}
          </div>
          
          <button
            onClick={() => { onOpenCreateModal(); setMobileMenuOpen(false); }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#7C3AED] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create Your Website</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </nav>
  );
};
