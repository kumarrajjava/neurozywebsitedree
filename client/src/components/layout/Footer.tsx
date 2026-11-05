import React from 'react';
import { Heart, Sparkles, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 relative overflow-hidden pt-16 pb-12 border-t border-slate-800">
      
      {/* Decorative Lucknow Skyline Silhouette SVG */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 fill-indigo-400">
          <path d="M0,120 L0,100 L30,100 L35,80 L45,80 L50,100 L90,100 L95,60 L105,50 L115,60 L120,100 L180,100 L185,40 L195,30 L205,40 L210,100 L260,100 L270,70 L285,70 L295,100 L350,100 L360,50 L370,40 L380,40 L390,50 L400,100 L470,100 L475,30 L485,20 L495,20 L505,30 L510,100 L560,100 L570,75 L585,75 L595,100 L650,100 L655,45 L670,30 L685,45 L690,100 L760,100 L770,60 L785,60 L795,100 L850,100 L860,35 L870,25 L885,25 L895,35 L905,100 L960,100 L970,70 L985,70 L995,100 L1050,100 L1060,40 L1075,30 L1090,40 L1100,100 L1200,100 L1200,120 Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6366F1] to-[#9333EA] p-[2px]">
                <div className="w-full h-full bg-[#1E1B4B] rounded-[10px] flex items-center justify-center">
                  <span className="text-white font-extrabold text-xl italic">N</span>
                </div>
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">Neurozy</span>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">From Idea to Code.</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering local Indian business owners with voice-first AI website generation in Hindi, Hinglish, and English.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-indigo-300">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Proudly Built in Hazratganj, Lucknow (UP), India</span>
            </div>
          </div>

          {/* Product Col */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#how-it-works" className="hover:text-indigo-400 transition">Voice-to-Website</a></li>
              <li><a href="#templates" className="hover:text-indigo-400 transition">Template Gallery</a></li>
              <li><a href="#features" className="hover:text-indigo-400 transition">WhatsApp Ordering</a></li>
              <li><a href="#pricing" className="hover:text-indigo-400 transition">Pricing Plans</a></li>
            </ul>
          </div>

          {/* Templates Col */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Industries</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#templates" className="hover:text-indigo-400 transition">Bakeries & Pastry Cafes</a></li>
              <li><a href="#templates" className="hover:text-indigo-400 transition">Clothing & Chikankari Boutiques</a></li>
              <li><a href="#templates" className="hover:text-indigo-400 transition">Salons & Beauty Spas</a></li>
              <li><a href="#templates" className="hover:text-indigo-400 transition">Restaurants & Food Corners</a></li>
              <li><a href="#templates" className="hover:text-indigo-400 transition">Coaching Centres & Tutors</a></li>
            </ul>
          </div>

          {/* Highlight Badge Col */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-800/50 space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                <Sparkles className="w-3.5 h-3.5" />
                Zero Coding Guarantee
              </span>
              <p className="text-xs text-slate-300">
                Speak for 30 seconds. Your professional mobile website goes live with your phone and WhatsApp connected.
              </p>
            </div>
            <div className="text-right">
              <span className="font-serif italic text-lg text-indigo-300 tracking-wide block">
                “Empowering Every Small Business”
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Neurozy Technologies. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Indian MSMEs & Local Shopkeepers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

