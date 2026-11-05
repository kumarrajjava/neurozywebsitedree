import React, { useState } from 'react';
import { 
  MonitorSmartphone, 
  Activity, 
  Cpu, 
  ShieldAlert, 
  CheckCircle, 
  Gauge, 
  Sliders, 
  BarChart3, 
  Layers, 
  Globe 
} from 'lucide-react';

interface FrontlinePageProps {
  onOpenContact: () => void;
  onNavigate: (view: string) => void;
}

export const FrontlinePage: React.FC<FrontlinePageProps> = ({ onOpenContact, onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'latency' | 'hardware'>('all');

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 font-mono">
        <button onClick={() => onNavigate('home')} className="hover:text-black hover:underline cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-slate-400">Platform</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">webAI Frontline</span>
      </div>

      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-[#fff566] text-xs font-semibold uppercase tracking-wider mb-5">
        <MonitorSmartphone size={14} />
        Real-Time Web Application Observability
      </div>

      {/* Title */}
      <div className="max-w-4xl mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-slate-950 mb-6 leading-[1.1]">
          Operational Mission Control for <span className="bg-[#fff566] px-2 rounded-lg">Web Applications</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-3xl">
          <strong>webAI Frontline</strong> is the dedicated monitoring and fleet management suite built for web apps. Observe distributed in-browser WebGPU health, client inference latency percentiles, model drift, and real-time user session health across millions of active browser tabs.
        </p>
      </div>

      {/* Interactive Mock Dashboard */}
      <div className="bg-[#18191c] text-white rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Web Telemetry Feed
            </div>
            <h3 className="text-2xl font-bold font-display mt-1">Fleet Performance: 1.4M Active Web Tabs</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-mono text-slate-300">
              Uptime: 99.998%
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/30">
              WebGPU adoption: 94.2%
            </span>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="text-slate-400 text-xs font-mono uppercase mb-1">Median Web Latency</div>
            <div className="text-2xl font-bold text-white flex items-baseline gap-2">
              <span>1.2 ms</span>
              <span className="text-xs text-emerald-400 font-normal">-40% vs cloud</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-2">Zero network hop execution</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="text-slate-400 text-xs font-mono uppercase mb-1">In-Tab Memory Peak</div>
            <div className="text-2xl font-bold text-white flex items-baseline gap-2">
              <span>38.4 MB</span>
              <span className="text-xs text-emerald-400 font-normal">Lean footprint</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-2">Garbage collection safe</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="text-slate-400 text-xs font-mono uppercase mb-1">Browser GPU Fallback</div>
            <div className="text-2xl font-bold text-white flex items-baseline gap-2">
              <span>5.8 %</span>
              <span className="text-xs text-blue-400 font-normal">WASM SIMD mode</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-2">Graceful legacy browser safety</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="text-slate-400 text-xs font-mono uppercase mb-1">Zero-Egress Security</div>
            <div className="text-2xl font-bold text-emerald-400 flex items-baseline gap-2">
              <span>100 %</span>
              <span className="text-xs text-emerald-300 font-normal">Compliant</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-2">0 bytes transmitted off device</div>
          </div>
        </div>

        {/* Live Event Stream Simulation */}
        <div className="bg-black/50 border border-white/10 rounded-2xl p-4 sm:p-6 font-mono text-xs text-slate-300">
          <div className="text-slate-500 uppercase tracking-wider text-[11px] mb-3 flex items-center justify-between">
            <span>Recent In-Browser Web Events (Real-Time)</span>
            <span className="text-emerald-400">STATUS: HEALTHY</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-1.5 px-3 bg-white/5 rounded-lg border border-white/5">
              <span className="text-slate-300">Client #us-east-81 [Chrome 124, Apple M3]</span>
              <span className="text-emerald-400">WebGPU Inference: 0.9ms (DOM parsing)</span>
            </div>
            <div className="flex items-center justify-between py-1.5 px-3 bg-white/5 rounded-lg border border-white/5">
              <span className="text-slate-300">Client #eu-central-14 [Firefox 125, RTX 4070]</span>
              <span className="text-emerald-400">Shader Compile: 14ms (IndexedDB Cache hit)</span>
            </div>
            <div className="flex items-center justify-between py-1.5 px-3 bg-white/5 rounded-lg border border-white/5">
              <span className="text-slate-300">Client #ap-south-09 [Safari 17.4, Apple A17]</span>
              <span className="text-blue-400">Mobile WebApp Form Agent completed in 2.1ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
          <h4 className="font-bold text-slate-900 mb-2">Automated Fallback Routing</h4>
          <p className="text-slate-600 text-xs leading-relaxed">
            If a client browser doesn't have WebGPU enabled, Frontline dynamically redirects execution to multi-threaded WebAssembly SIMD shaders without a hitch.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
          <h4 className="font-bold text-slate-900 mb-2">Private Differential Telemetry</h4>
          <p className="text-slate-600 text-xs leading-relaxed">
            Aggregate performance telemetry is collected via k-anonymity and differential privacy, ensuring end-user session contents remain strictly secret.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
          <h4 className="font-bold text-slate-900 mb-2">Instant Web Feature Flags</h4>
          <p className="text-slate-600 text-xs leading-relaxed">
            Remotely toggle neural personas, swap model quantizations, or tune temperature parameters across your web app user base in seconds.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#294d3c] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold font-display">Equip your web application team with Frontline</h3>
          <p className="text-emerald-100/80 text-sm mt-1">Book an interactive demo with our web solutions architect.</p>
        </div>
        <button
          onClick={onOpenContact}
          className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-[#fff566] transition-all cursor-pointer shrink-0"
        >
          Request Frontline Demo
        </button>
      </div>
    </div>
  );
};
