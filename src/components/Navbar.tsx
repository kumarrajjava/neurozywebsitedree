import React from 'react';
import { Sparkles, LayoutDashboard, Palette, BookOpen } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'wizard' | 'editor' | 'dashboard' | 'published';
  onNavigate: (view: 'landing' | 'wizard' | 'editor' | 'dashboard' | 'published') => void;
  onOpenBlueprint: () => void;
  publishedCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenBlueprint,
  publishedCount = 1
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Brand Logo with 'N' gradient icon & tagline */}
          <div 
            className="flex items-center gap-3 shrink-0 cursor-pointer" 
            onClick={() => onNavigate('landing')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <span className="font-extrabold text-xl tracking-tighter">N</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">Neurozy</span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 tracking-wide uppercase">From Idea to Code</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onNavigate('landing')}
              className={`hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'landing' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-1.5 hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'dashboard' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              <span>Dashboard</span>
              {publishedCount > 0 && (
                <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">
                  {publishedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onNavigate('editor')}
              className={`flex items-center gap-1.5 hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'editor' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              <Palette className="w-4 h-4 text-slate-400" />
              <span>Website Editor</span>
            </button>
            <button
              onClick={onOpenBlueprint}
              className="flex items-center gap-1.5 text-slate-700 hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-md text-xs font-semibold"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>CTO Specs & PRD</span>
            </button>
          </nav>

          {/* Primary Action Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('wizard')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create Your Website</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
