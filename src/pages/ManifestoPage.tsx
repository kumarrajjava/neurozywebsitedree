import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  ShieldAlert, 
  Globe, 
  Check, 
  Flame, 
  ArrowRight,
  Heart
} from 'lucide-react';

interface ManifestoPageProps {
  onOpenContact: () => void;
  onNavigate: (view: string) => void;
}

export const ManifestoPage: React.FC<ManifestoPageProps> = ({ onOpenContact, onNavigate }) => {
  const [signed, setSigned] = useState(false);
  const [name, setName] = useState('');

  const tenets = [
    {
      num: '01',
      title: 'The Web Browser is the Sovereign Computer',
      body: 'Every modern computer on earth runs a hyper-optimized browser sandbox with direct access to GPU compute, memory sandboxes, and hardware acceleration. Artificial intelligence must live where humans live: inside the web browser.'
    },
    {
      num: '02',
      title: 'Latency is the Destroyer of Creativity',
      body: 'Waiting 3,000 milliseconds for a centralized server cluster to stream a completion destroys cognitive flow. Web applications must respond at 60 frames per second directly in the client document.'
    },
    {
      num: '03',
      title: 'Zero Data Egress is the Only True Privacy',
      body: 'Privacy policies and enterprise contracts are easily broken; mathematical local execution is impossible to breach. When neural inference happens in your local tab, your confidential DOM data is untouchable.'
    },
    {
      num: '04',
      title: 'Down with the Per-Token Cloud Tollbooth',
      body: 'The monetization model of charging companies $0.03 per 1,000 tokens taxes innovation and concentrates power in three hyper-scalers. Decentralized web execution democratizes AI economics forever.'
    },
    {
      num: '05',
      title: 'Offline-First is the Ultimate Standard of Software',
      body: 'An intelligent web application that stops working on a plane, train, or during a fiber outage is brittle software. True intelligence operates resiliently in offline indexedDB environments.'
    },
    {
      num: '06',
      title: 'Zero-Install Beats Monolithic App Stores',
      body: 'The open web is the only platform that allows instantaneous global deployment without gatekeepers, 30% revenue cuts, or multi-gigabyte installer downloads. A URL is all you need.'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 font-mono">
        <button onClick={() => onNavigate('home')} className="hover:text-black hover:underline cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-slate-400">Company</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Manifesto</span>
      </div>

      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-[#fff566] text-xs font-semibold uppercase tracking-wider mb-5">
          <Layers size={14} />
          The Web Application Constitution
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-slate-950 mb-6">
          The Web AI Manifesto
        </h1>
        <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto italic">
          "A declaration for decentralized, instant, and browser-native artificial intelligence."
        </p>
      </div>

      {/* Tenets List */}
      <div className="space-y-8 mb-16">
        {tenets.map((tenet) => (
          <div 
            key={tenet.num}
            className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm relative overflow-hidden group hover:border-black/30 transition-all"
          >
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-400 group-hover:text-black transition-colors">
                {tenet.num}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-950">
                {tenet.title}
              </h3>
            </div>
            <p className="text-slate-600 sm:text-base leading-relaxed pl-10 sm:pl-12">
              {tenet.body}
            </p>
          </div>
        ))}
      </div>

      {/* Sign the Manifesto Box */}
      <div className="bg-[#18191c] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl mb-16 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#fff566] text-black flex items-center justify-center mx-auto mb-4">
          <Flame size={24} />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold font-display mb-3">
          Stand With the Web AI Revolution
        </h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
          Over 4,200 web developers, founders, and browser engineers have co-signed the Web AI Manifesto. Add your name to the ledger.
        </p>

        {signed ? (
          <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 p-4 rounded-2xl max-w-md mx-auto flex items-center justify-center gap-2 font-mono text-sm">
            <Check size={18} />
            <span>Thank you, {name || 'Fellow Engineer'}. You have co-signed the Web AI Manifesto.</span>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name or handle"
              className="w-full sm:w-auto flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#fff566]"
            />
            <button
              onClick={() => {
                if (name.trim()) setSigned(true);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#fff566] text-black font-semibold text-sm hover:bg-white transition-all cursor-pointer shrink-0"
            >
              Sign Manifesto
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
