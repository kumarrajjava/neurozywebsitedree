import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight, 
  User as UserIcon, 
  ChevronDown, 
  Settings, 
  LayoutDashboard, 
  Edit3, 
  Globe, 
  LogOut 
} from 'lucide-react';
import { AppViewMode, User } from '../../types';

interface NavbarProps {
  currentView: AppViewMode;
  user: User | null;
  onNavigateHome: () => void;
  onNavigateDashboard: () => void;
  onNavigateProfile: () => void;
  onNavigateEditor: () => void;
  onNavigateLiveSite: () => void;
  onOpenCreateModal: () => void;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  user,
  onNavigateHome,
  onNavigateDashboard,
  onNavigateProfile,
  onNavigateEditor,
  onNavigateLiveSite,
  onOpenCreateModal,
  onOpenAuthModal,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
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
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <button 
            onClick={onNavigateHome} 
            className={`transition ${currentView === 'landing' ? 'text-indigo-600 font-bold' : 'hover:text-indigo-600'}`}
          >
            Home
          </button>
          
          {user && (
            <>
              <button
                onClick={onNavigateDashboard}
                className={`flex items-center gap-1.5 transition ${
                  currentView === 'dashboard' ? 'text-indigo-600 font-bold border-b-2 border-indigo-600 pb-0.5' : 'hover:text-indigo-600'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={onNavigateProfile}
                className={`flex items-center gap-1.5 transition ${
                  currentView === 'profile' ? 'text-indigo-600 font-bold border-b-2 border-indigo-600 pb-0.5' : 'hover:text-indigo-600'
                }`}
              >
                <UserIcon className="w-4 h-4" />
                <span>My Profile</span>
              </button>
            </>
          )}

          <a href="#templates" className="hover:text-indigo-600 transition">
            Templates
          </a>
          <a href="#pricing" className="hover:text-indigo-600 transition">
            Pricing
          </a>
          <a href="#how-it-works" className="hover:text-indigo-600 transition">
            How it Works
          </a>
        </div>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition shadow-sm ${
                  currentView === 'profile' 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  {user.fullName?.charAt(0) || 'U'}
                </div>
                <span>{user.fullName || 'My Account'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 text-xs font-semibold text-slate-700">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="font-extrabold text-slate-900 truncate">{user.fullName}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => { onNavigateProfile(); setUserDropdownOpen(false); }}
                    className={`w-full px-4 py-2.5 flex items-center gap-2 hover:bg-slate-50 transition text-left ${
                      currentView === 'profile' ? 'text-indigo-600 font-bold bg-indigo-50/50' : ''
                    }`}
                  >
                    <Settings className="w-4 h-4 text-indigo-600" />
                    <span>My Profile & Settings</span>
                  </button>

                  <button
                    onClick={() => { onNavigateDashboard(); setUserDropdownOpen(false); }}
                    className={`w-full px-4 py-2.5 flex items-center gap-2 hover:bg-slate-50 transition text-left ${
                      currentView === 'dashboard' ? 'text-indigo-600 font-bold bg-indigo-50/50' : ''
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                    <span>Founder Dashboard</span>
                  </button>

                  <button
                    onClick={() => { onNavigateEditor(); setUserDropdownOpen(false); }}
                    className="w-full px-4 py-2.5 flex items-center gap-2 hover:bg-slate-50 transition text-left"
                  >
                    <Edit3 className="w-4 h-4 text-slate-500" />
                    <span>Live Website Editor</span>
                  </button>

                  <button
                    onClick={() => { onNavigateLiveSite(); setUserDropdownOpen(false); }}
                    className="w-full px-4 py-2.5 flex items-center gap-2 hover:bg-slate-50 transition text-left"
                  >
                    <Globe className="w-4 h-4 text-slate-500" />
                    <span>View Public Website</span>
                  </button>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                    className="w-full px-4 py-2.5 flex items-center gap-2 text-rose-600 hover:bg-rose-50 transition text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
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
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#9333EA] text-white font-bold text-sm shadow-md hover:shadow-glow hover:opacity-95 transition transform active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create Website</span>
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
          <div className="flex flex-col space-y-3 font-semibold text-slate-700 text-sm">
            <button 
              onClick={() => { onNavigateHome(); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-indigo-600"
            >
              Home Overview
            </button>
            {user ? (
              <>
                <button
                  onClick={() => { onNavigateProfile(); setMobileMenuOpen(false); }}
                  className="text-left py-2 text-indigo-600 font-bold flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>My Profile & Settings ({user.fullName})</span>
                </button>
                <button
                  onClick={() => { onNavigateDashboard(); setMobileMenuOpen(false); }}
                  className="text-left py-2 text-slate-800 font-semibold flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Founder Dashboard</span>
                </button>
                <button
                  onClick={() => { onNavigateEditor(); setMobileMenuOpen(false); }}
                  className="text-left py-2 text-slate-800 font-semibold flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Open Website Editor</span>
                </button>
                <button
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="text-left py-2 text-rose-600 font-semibold flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
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
