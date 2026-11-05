import React from 'react';
import { 
  Box, 
  Network, 
  Server, 
  Globe2, 
  Zap, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Database
} from 'lucide-react';

interface IdnPageProps {
  onOpenContact: () => void;
  onNavigate: (view: string) => void;
}

export const IdnPage: React.FC<IdnPageProps> = ({ onOpenContact, onNavigate }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 font-mono">
        <button onClick={() => onNavigate('home')} className="hover:text-black hover:underline cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-slate-400">Platform</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Intelligence Delivery Network</span>
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-[#fff566] text-xs font-semibold uppercase tracking-wider mb-5">
        <Network size={14} />
        Edge Neural Shard Distribution for Web Apps
      </div>

      {/* Title */}
      <div className="max-w-4xl mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-slate-950 mb-6 leading-[1.1]">
          Global Edge Distribution Built for <span className="bg-[#fff566] px-2 rounded-lg">Web Applications</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-3xl">
          Traditional CDNs cache static HTML and images. The <strong>Intelligence Delivery Network (IDN)</strong> is the world's first edge fabric engineered specifically to stream, chunk, and cache neural network weights directly to client web browsers in parallel sub-second bursts.
        </p>
      </div>

      {/* Edge Map Visual Representation */}
      <div className="bg-[#18191c] text-white rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl mb-16 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider">300+ Edge POPs Worldwide</span>
            <h3 className="text-2xl font-bold font-display mt-1">Direct-to-Browser Weight Streaming</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs border border-emerald-500/30">
              Avg TTFB: 8.2ms
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-mono text-xs border border-blue-500/30">
              HTTP/3 & QUIC
            </span>
          </div>
        </div>

        {/* Shard Streaming Pipeline Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#fff566] mb-4">
                <Database size={20} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">1. Neural Weight Sharding</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Large models are automatically quantized into 2MB INT4 micro-chunks optimized for incremental browser streaming.
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-400 mt-4">Chunk size: 2.048 MB</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400 mb-4">
                <Globe2 size={20} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">2. Anycast Edge Routing</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Client web applications are routed to the geographically closest edge point with pre-warmed memory shards.
              </p>
            </div>
            <div className="text-xs font-mono text-blue-400 mt-4">Edge locations: 310 PoPs</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 mb-4">
                <Zap size={20} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">3. Browser IndexedDB Hot Cache</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Subsequent web app page views execute 100% offline from local indexedDB storage without refetching network bytes.
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-400 mt-4">Repeat load: 0 network ms</div>
          </div>
        </div>
      </div>

      {/* Comparison: Traditional vs IDN for Web Apps */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm mb-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-950 mb-6">
          Architected for Web App Scale
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-red-50/50 border border-red-100">
            <h4 className="font-bold text-red-950 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              Traditional Cloud API Bottlenecks
            </h4>
            <ul className="space-y-2 text-xs text-red-900/80">
              <li>• Pay-per-token API pricing explodes with web application user traffic.</li>
              <li>• 800ms - 3500ms roundtrip delay destroys responsive web UI.</li>
              <li>• Cloud outages take down your entire web application's AI features.</li>
              <li>• Sensitive user inputs get transmitted across third-party servers.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <h4 className="font-bold text-emerald-950 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              The Neurozy IDN Web Advantage
            </h4>
            <ul className="space-y-2 text-xs text-emerald-900/80">
              <li>• Predictable CDN bandwidth billing—zero per-token inference charges.</li>
              <li>• Instant client-side execution running directly on the user's WebGPU.</li>
              <li>• Works offline as a Progressive Web App (PWA) with zero downtime.</li>
              <li>• 100% private: DOM inputs and enterprise documents never leave the browser.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#18191c] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold font-display">Deliver neural intelligence to your web app in &lt; 10ms</h3>
          <p className="text-slate-400 text-sm mt-1">Talk with our network infrastructure team to configure your IDN edge routes.</p>
        </div>
        <button
          onClick={onOpenContact}
          className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-[#fff566] transition-all cursor-pointer shrink-0"
        >
          Setup IDN Routing
        </button>
      </div>
    </div>
  );
};
