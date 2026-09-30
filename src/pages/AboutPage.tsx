import React from 'react';
import { 
  SquarePen, 
  Target, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Globe2, 
  ArrowRight,
  Cpu,
  Layers
} from 'lucide-react';

interface AboutPageProps {
  onOpenContact: () => void;
  onNavigate: (view: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenContact, onNavigate }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 font-mono">
        <button onClick={() => onNavigate('home')} className="hover:text-black hover:underline cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-slate-400">Company</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">About</span>
      </div>

      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-[#fff566] text-xs font-semibold uppercase tracking-wider mb-5">
        <SquarePen size={14} />
        Company Mission & Core Focus
      </div>

      {/* Main Headline */}
      <div className="max-w-4xl mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-slate-950 mb-6 leading-[1.1]">
          We Build the Future of AI Exclusively for <span className="bg-[#fff566] px-2 rounded-lg">Web Applications</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-3xl">
          At Neurozy / webAI, we believe the web browser is humanity's most extraordinary universal operating system. Our singular focus is eliminating the slow, costly cloud middleman—empowering web applications to run state-of-the-art neural intelligence directly on client machines.
        </p>
      </div>

      {/* Why Web Apps Matter - Manifesto Pillar */}
      <div className="bg-[#18191c] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
        <span className="text-[#fff566] font-mono text-xs uppercase tracking-wider">Our North Star</span>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display mt-2 mb-6">
          Why We Bet Everything on Web-Native Intelligence
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border-l border-white/20 pl-5">
            <h4 className="text-lg font-bold text-white mb-2">Universal Zero-Install</h4>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              No Python runtimes, no CUDA driver installations, no app store approvals. A single URL grants every user instant access to intelligent web software.
            </p>
          </div>

          <div className="border-l border-white/20 pl-5">
            <h4 className="text-lg font-bold text-white mb-2">Sub-Millisecond Physics</h4>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              When a user interacts with a web interface, latency must be imperceptible. Client WebGPU computes at the speed of human thought.
            </p>
          </div>

          <div className="border-l border-white/20 pl-5">
            <h4 className="text-lg font-bold text-white mb-2">Radical Data Privacy</h4>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              The safest network packet is the one never sent. By keeping computation inside the browser tab, user trust is mathematically preserved.
            </p>
          </div>
        </div>
      </div>

      {/* Story & Background */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-center">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">The Origin</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-950 mt-1 mb-4">
            Founded by Web Engineers, for Web Engineers
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            We started Neurozy after spending years watching web applications degrade into slow spinner-wheels while waiting for centralized cloud AI servers to reply. We asked a simple question:
          </p>
          <blockquote className="p-4 bg-slate-50 border-l-4 border-black rounded-r-xl font-medium text-slate-900 text-sm italic mb-4">
            "Modern client devices have incredible GPUs sitting idle right inside user laptops and phones. Why are we routing every keystroke to a data center across the continent?"
          </blockquote>
          <p className="text-slate-600 text-sm leading-relaxed">
            That revelation ignited our mission to forge the WebGPU compilers, quantized WASM kernels, and browser runtime engines powering millions of web apps today.
          </p>
        </div>

        {/* Company Numbers */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center">
            <div className="text-4xl sm:text-5xl font-extrabold font-display text-slate-950 mb-1">100%</div>
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Web-Focused</div>
            <p className="text-slate-600 text-xs mt-2">Zero distractions. Exclusively web applications.</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center">
            <div className="text-4xl sm:text-5xl font-extrabold font-display text-slate-950 mb-1">14ms</div>
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">WebGPU Init</div>
            <p className="text-slate-600 text-xs mt-2">Blazing fast in-browser startup.</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center">
            <div className="text-4xl sm:text-5xl font-extrabold font-display text-slate-950 mb-1">310+</div>
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Edge PoPs</div>
            <p className="text-slate-600 text-xs mt-2">Sub-second neural delivery globally.</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center">
            <div className="text-4xl sm:text-5xl font-extrabold font-display text-slate-950 mb-1">0 Byte</div>
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Data Egress</div>
            <p className="text-slate-600 text-xs mt-2">Uncompromising client confidentiality.</p>
          </div>
        </div>
      </div>

      {/* Leadership Values */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm mb-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-950 mb-8">
          Our Engineering Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-black text-[#fff566] flex items-center justify-center font-bold mb-4">
              1
            </div>
            <h4 className="font-bold text-slate-900 mb-2">The Web is First-Class</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              We never treat web apps as second-class mobile web wrappers. Every shader is hand-tuned for V8 and JavaScript thread workers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-black text-[#fff566] flex items-center justify-center font-bold mb-4">
              2
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Frugal Infrastructure</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Companies shouldn’t go bankrupt paying API token bills. We return sovereignty to software teams by computing on the edge.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-black text-[#fff566] flex items-center justify-center font-bold mb-4">
              3
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Open Standards</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Built squarely on W3C WebGPU, WebAssembly SIMD, and open ONNX quantization formats with no proprietary runtime lock-in.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#294d3c] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold font-display">Partner with our Web AI engineering studio</h3>
          <p className="text-emerald-100/80 text-sm mt-1">Let’s discuss your web application’s architecture and compute roadmap.</p>
        </div>
        <button
          onClick={onOpenContact}
          className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-[#fff566] transition-all cursor-pointer shrink-0"
        >
          Schedule Architectural Review
        </button>
      </div>
    </div>
  );
};
