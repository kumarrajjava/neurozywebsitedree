import React, { useState } from 'react';
import { 
  AppWindow, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Globe, 
  ArrowRight, 
  Sparkles, 
  Code, 
  Layers, 
  CheckCircle2,
  Play
} from 'lucide-react';

interface WebAiAppPageProps {
  onOpenContact: () => void;
  onNavigate: (view: string) => void;
}

export const WebAiAppPage: React.FC<WebAiAppPageProps> = ({ onOpenContact, onNavigate }) => {
  const [selectedDemo, setSelectedDemo] = useState<'summarize' | 'vision' | 'agent'>('summarize');
  const [demoOutput, setDemoOutput] = useState('Neural Web Runtime initialized in 14ms via client WebGPU.');
  const [isRunning, setIsRunning] = useState(false);

  const runSimulation = () => {
    setIsRunning(true);
    setDemoOutput('Compiling WebGPU compute shaders inside active browser tab...');
    setTimeout(() => {
      if (selectedDemo === 'summarize') {
        setDemoOutput('✓ Web Application Context: Analyzed 24,000 DOM tokens client-side. Zero data egress.');
      } else if (selectedDemo === 'vision') {
        setDemoOutput('✓ In-Browser Vision: Detected 14 UI elements at 60 FPS directly within HTML5 canvas.');
      } else {
        setDemoOutput('✓ Web Autonomous Agent: Executed 3 workflow steps in the current web application tab.');
      }
      setIsRunning(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 animate-in fade-in duration-300">
      {/* Breadcrumb / Back button */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 font-mono">
        <button 
          onClick={() => onNavigate('home')} 
          className="hover:text-black hover:underline cursor-pointer"
        >
          Home
        </button>
        <span>/</span>
        <span className="text-slate-400">Platform</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">webAI App</span>
      </div>

      {/* Hero Badge - Core Focus on Web Apps */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-[#fff566] text-xs font-semibold uppercase tracking-wider mb-5">
        <Globe size={14} />
        Dedicated Web Application Runtime
      </div>

      {/* Main Title & Value Prop */}
      <div className="max-w-4xl mb-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-slate-950 mb-6 leading-[1.1]">
          The Intelligent Operating Layer for <span className="bg-[#fff566] px-2 rounded-lg">Web Applications</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-3xl">
          We build exclusively for the web. <strong>webAI App</strong> embeds an ultra-lean, client-side neural engine directly inside modern SaaS, e-commerce, and enterprise web applications—running local inference with zero server latency, zero cloud costs per token, and uncompromising privacy.
        </p>
      </div>

      {/* Interactive Web App Live Sandbox */}
      <div className="bg-[#18191c] text-white rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-wider uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live In-Browser WebGPU Sandbox
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display">Experience Real-Time Web AI Execution</h3>
          </div>
          
          {/* Preset Buttons */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setSelectedDemo('summarize')}
              className={`px-3 py-1.5 rounded-lg transition-all ${selectedDemo === 'summarize' ? 'bg-[#fff566] text-black font-semibold' : 'text-slate-300 hover:text-white'}`}
            >
              DOM Text Analysis
            </button>
            <button
              onClick={() => setSelectedDemo('vision')}
              className={`px-3 py-1.5 rounded-lg transition-all ${selectedDemo === 'vision' ? 'bg-[#fff566] text-black font-semibold' : 'text-slate-300 hover:text-white'}`}
            >
              Canvas Vision
            </button>
            <button
              onClick={() => setSelectedDemo('agent')}
              className={`px-3 py-1.5 rounded-lg transition-all ${selectedDemo === 'agent' ? 'bg-[#fff566] text-black font-semibold' : 'text-slate-300 hover:text-white'}`}
            >
              Web Agent
            </button>
          </div>
        </div>

        {/* Sandbox Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-black/60 border border-white/10 rounded-2xl p-4 sm:p-6 font-mono text-xs sm:text-sm text-slate-300 flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="text-slate-500 text-xs mb-3 flex items-center justify-between">
                <span>web-worker-thread #01 [WebAssembly + WebGPU]</span>
                <span className="text-emerald-400">LATENCY: 0.8ms</span>
              </div>
              <p className="text-slate-100 font-sans text-base mb-2">
                {selectedDemo === 'summarize' && "Instant client-side content distillation embedded in browser sessions."}
                {selectedDemo === 'vision' && "High-fps real-time visual inspection in HTML5 WebGL/Canvas context."}
                {selectedDemo === 'agent' && "Autonomous web tab operator handling multistep web app forms & actions."}
              </p>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-emerald-300 mt-4">
                {demoOutput}
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10 text-xs">
              <span className="text-slate-400">Memory footprint: &lt; 48MB RAM</span>
              <button
                onClick={runSimulation}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-sans font-semibold hover:bg-[#fff566] transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <Play size={14} className={isRunning ? 'animate-spin' : ''} />
                {isRunning ? 'Processing in Browser...' : 'Trigger Web Inference'}
              </button>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Why Web Apps Choose webAI:</h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100% Client Execution:</strong> Compute runs on user hardware via WebGPU.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Server Overhead:</strong> Avoid $0.03/token API bills across millions of users.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Offline Capable:</strong> PWA & web apps retain full AI smarts without internet.</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={() => onNavigate('sdks')}
                className="w-full flex items-center justify-between text-xs text-[#fff566] hover:underline"
              >
                <span>Explore TypeScript Web SDK</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Pillar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:border-black/20 transition-all">
          <div className="w-12 h-12 rounded-xl bg-black text-[#fff566] flex items-center justify-center mb-5">
            <Cpu size={22} />
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900 mb-2">WebGPU Accelerated</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Harness client graphics hardware directly through modern browser WebGPU pipelines for 40x speedups over pure JavaScript.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:border-black/20 transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#294d3c] text-emerald-300 flex items-center justify-center mb-5">
            <ShieldCheck size={22} />
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900 mb-2">Zero-Data-Egress Security</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            User inputs and enterprise data never exit the browser boundary. Meet HIPAA, GDPR, and strict confidential data standards effortlessly.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:border-black/20 transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#fff566] text-black flex items-center justify-center mb-5">
            <Zap size={22} />
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900 mb-2">One-Line Script Injection</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Integrate with React, Next.js, Vue, or vanilla HTML with just one package install. Deploy full intelligence in minutes.
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#294d3c] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-emerald-300 font-mono text-xs tracking-wider uppercase">Ship AI in your Web App</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display mt-1">Ready to upgrade your web application?</h2>
          <p className="text-emerald-100/80 text-sm max-w-xl mt-2">
            Schedule an architectural review with our Web AI engineers or explore our developer documentation.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onOpenContact}
            className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-[#fff566] transition-all cursor-pointer shadow-sm"
          >
            Get in touch
          </button>
          <button
            onClick={() => onNavigate('sdks')}
            className="px-6 py-3 rounded-full bg-black/40 text-white font-semibold hover:bg-black/60 transition-all cursor-pointer border border-white/20"
          >
            View SDK Docs
          </button>
        </div>
      </div>
    </div>
  );
};
