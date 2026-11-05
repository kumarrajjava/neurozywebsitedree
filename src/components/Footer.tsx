import React, { useState } from 'react';
import { Check, Send, Github, Twitter, Linkedin, Globe } from 'lucide-react';
import { soundFx } from '../utils/sound';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate?: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    soundFx.playPop();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  const handleLink = (view: string) => {
    soundFx.playClick();
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#0d0f10] text-white pt-16 pb-12 px-6 md:px-12 rounded-t-[2.5rem] md:rounded-t-[3rem] rounded-b-none w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start relative z-10">
        
        {/* Left: Brand Logo & Newsletter Subscription Box */}
        <div className="md:col-span-4">
          <div className="mb-6">
            <Logo 
              variant="light" 
              size="lg" 
              onClick={() => handleLink('home')} 
            />
          </div>

          <div className="bg-[#23854c] text-white text-xs font-bold px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4 shadow-sm">
            <Globe size={13} />
            Focused Exclusively on Web Apps
          </div>

          <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-2">
            Neurozy Engineering Dispatch
          </h3>
          <p className="text-sm text-slate-400 mb-6 font-normal">
            Monthly insights on WebGPU compute shaders, in-browser neural weights, and zero-latency web application engineering.
          </p>

          {/* Form */}
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#fbf055]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-white text-slate-950 font-bold text-sm rounded-full hover:bg-[#fbf055] transition-colors cursor-pointer shrink-0"
            >
              {subscribed ? <Check size={16} className="text-emerald-700" /> : 'Send'}
            </button>
          </form>

          {subscribed && (
            <p className="text-xs text-emerald-400 mt-2 font-mono">
              ✓ Subscribed! You will receive our next dispatch.
            </p>
          )}
        </div>

        {/* Center-Left: Platform Links */}
        <div className="md:col-span-3 flex flex-col space-y-2.5 text-xs text-slate-300">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
            Web AI Platform
          </span>
          <button onClick={() => handleLink('webai-app')} className="text-left hover:text-[#fbf055] transition-colors cursor-pointer">
            webAI App
          </button>
          <button onClick={() => handleLink('personas')} className="text-left hover:text-[#fbf055] transition-colors cursor-pointer">
            Personas (Web Agents)
          </button>
          <button onClick={() => handleLink('sdks')} className="text-left hover:text-[#fbf055] transition-colors cursor-pointer">
            Web SDKs & TypeScript
          </button>
          <button onClick={() => handleLink('idn')} className="text-left hover:text-[#fbf055] transition-colors cursor-pointer">
            Intelligence Delivery Network
          </button>
          <button onClick={() => handleLink('frontline')} className="text-left hover:text-[#fbf055] transition-colors cursor-pointer">
            webAI Frontline Observability
          </button>
        </div>

        {/* Center-Right: Resources & Company Links */}
        <div className="md:col-span-2 flex flex-col space-y-2.5 text-xs text-slate-300">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
            Company & Docs
          </span>
          <button onClick={() => handleLink('about')} className="text-left hover:text-[#fbf055] transition-colors cursor-pointer">
            About Neurozy
          </button>
          <button onClick={() => handleLink('manifesto')} className="text-left hover:text-[#fbf055] transition-colors cursor-pointer">
            The Web AI Manifesto
          </button>
          <button onClick={() => handleLink('careers')} className="text-left hover:text-[#fbf055] transition-colors cursor-pointer">
            Careers (Hiring!)
          </button>
          <button onClick={() => handleLink('blog')} className="text-left hover:text-[#fbf055] transition-colors cursor-pointer">
            Engineering Blog
          </button>
          <button onClick={() => handleLink('help-center')} className="text-left hover:text-[#fbf055] transition-colors cursor-pointer">
            Help Center & FAQ
          </button>
        </div>

        {/* Right: Badge with Cutout Photo & Socials */}
        <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between h-full">
          {/* Overlapping circular cutout badge */}
          <div className="relative mb-6">
            <div className="w-14 h-14 rounded-full bg-[#fbf055] absolute -top-2 -right-2 z-0" />
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white relative z-10 shadow-lg">
              <img
                src="/src/assets/images/hero_founder_lead_1790448361902.jpg"
                alt="Neurozy Badge"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-slate-400 mb-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>

          {/* Copyright & Legal */}
          <div className="text-xs text-slate-500 md:text-right">
            <div>© {new Date().getFullYear()} Neurozy Ltd.</div>
            <div className="text-[11px] text-[#fbf055] mt-1 font-mono">Dedicated to Web Applications</div>
            <div className="text-[11px] text-slate-600 mt-0.5">London, UK • Global Web Delivery</div>
          </div>
        </div>

      </div>
    </footer>
  );
};
