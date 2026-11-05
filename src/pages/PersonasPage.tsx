import React, { useState } from 'react';
import { 
  CircleUserRound, 
  Bot, 
  Sparkles, 
  Compass, 
  Code2, 
  Check, 
  Workflow, 
  Sliders, 
  ArrowRight,
  Globe
} from 'lucide-react';

interface PersonasPageProps {
  onOpenContact: () => void;
  onNavigate: (view: string) => void;
}

export const PersonasPage: React.FC<PersonasPageProps> = ({ onOpenContact, onNavigate }) => {
  const [activePersona, setActivePersona] = useState<number>(0);

  const personas = [
    {
      name: 'DOM Navigator & Web Form Agent',
      tag: 'Browser Automation',
      desc: 'Autonomously completes complex multi-step web workflows, form validation, and transactional flows inside your web application without server handoffs.',
      capabilities: ['Dynamic DOM inspection', 'Zero-latency validation', 'Error auto-correction', 'Secure credential sandboxing'],
      color: 'bg-emerald-500'
    },
    {
      name: 'Real-time Web Analytics Sentinel',
      tag: 'In-Session Telemetry',
      desc: 'Monitors user interactions, drop-off signals, and client-side web application events to dynamically adapt UI components in real time.',
      capabilities: ['Client-side event clustering', 'Predictive UX routing', 'Rage-click mitigation', 'Zero cloud telemetry cost'],
      color: 'bg-blue-500'
    },
    {
      name: 'Contextual In-App Web Copilot',
      tag: 'Conversational Web Assistant',
      desc: 'Reads current web application state, open modals, and user document trees to answer complex domain questions natively in the browser.',
      capabilities: ['Document DOM embedding', 'Context-aware search', 'Markdown streaming', 'Offline local memory'],
      color: 'bg-amber-500'
    },
    {
      name: 'Web Creative & Graphic Assistant',
      tag: 'HTML5 Canvas Synthesis',
      desc: 'Generates client-side graphics, chart visual representations, and vector edits directly within SVG and Canvas web containers.',
      capabilities: ['SVG generation', 'Canvas filter shaders', 'Color harmony inference', 'Dynamic asset rendering'],
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 font-mono">
        <button onClick={() => onNavigate('home')} className="hover:text-black hover:underline cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-slate-400">Platform</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Personas</span>
      </div>

      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-[#fff566] text-xs font-semibold uppercase tracking-wider mb-5">
        <Globe size={14} />
        Web Application Agent Architecture
      </div>

      {/* Title */}
      <div className="max-w-4xl mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-slate-950 mb-6 leading-[1.1]">
          Pre-trained Neural Personas Built for <span className="bg-[#fff566] px-2 rounded-lg">Web Applications</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-3xl">
          Empower your web app with specialized autonomous personas that live and reason in the user's browser. Rather than generic LLMs that know nothing about your DOM or state, our Web Personas are specifically trained to perceive, assist, and navigate modern web software.
        </p>
      </div>

      {/* Interactive Persona Inspector */}
      <div className="bg-[#18191c] text-white rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl mb-16">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
          <div>
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider">Modular Web Agents</span>
            <h3 className="text-2xl font-bold font-display mt-1">Select an In-Browser Persona to Inspect</h3>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-slate-300">
            Runtime: WebGPU / WASM
          </span>
        </div>

        {/* Persona Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {personas.map((p, idx) => (
            <button
              key={p.name}
              onClick={() => setActivePersona(idx)}
              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                activePersona === idx
                  ? 'bg-white/15 border-[#fff566] shadow-lg translate-y-[-2px]'
                  : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">{p.tag}</span>
                <span className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
              </div>
              <h4 className="font-bold text-sm text-white line-clamp-1">{p.name}</h4>
            </button>
          ))}
        </div>

        {/* Selected Persona Detail View */}
        <div className="bg-black/40 border border-white/10 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
            <div>
              <div className="inline-block px-3 py-1 rounded-md bg-white/10 text-xs font-mono text-[#fff566] mb-3">
                {personas[activePersona].tag}
              </div>
              <h4 className="text-2xl font-extrabold font-display text-white mb-2">
                {personas[activePersona].name}
              </h4>
              <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                {personas[activePersona].desc}
              </p>
            </div>
            <button
              onClick={onOpenContact}
              className="px-5 py-2.5 rounded-xl bg-[#fff566] text-black font-semibold text-xs hover:bg-white transition-all cursor-pointer shrink-0"
            >
              Deploy in your Web App
            </button>
          </div>

          <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Engineered Web Capabilities:</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {personas[activePersona].capabilities.map(cap => (
              <div key={cap} className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center gap-2 text-xs text-slate-200">
                <Check size={14} className="text-emerald-400 shrink-0" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Walkthrough */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm mb-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-950 mb-4">
          How Web Apps Mount Personas
        </h2>
        <p className="text-slate-600 max-w-2xl text-sm mb-8">
          Mounting an AI persona into your Single Page App (SPA) or server-rendered website takes less than 5 lines of code.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
            <span className="w-8 h-8 rounded-full bg-black text-white font-mono text-sm flex items-center justify-center font-bold mb-4">1</span>
            <h4 className="font-bold text-slate-900 mb-2">Initialize In-Browser</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Load the lightweight WebAssembly weight shards into client indexedDB memory on user session launch.
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
            <span className="w-8 h-8 rounded-full bg-black text-white font-mono text-sm flex items-center justify-center font-bold mb-4">2</span>
            <h4 className="font-bold text-slate-900 mb-2">Bind to DOM & State</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Pass your React state, Redux store, or DOM query selectors directly to the persona context handler.
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
            <span className="w-8 h-8 rounded-full bg-black text-white font-mono text-sm flex items-center justify-center font-bold mb-4">3</span>
            <h4 className="font-bold text-slate-900 mb-2">Zero-Latency Execution</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Inference runs locally at 60fps with no roundtrip latency to AWS, OpenAI, or external cloud clusters.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#18191c] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold font-display">Need custom personas for your proprietary web app?</h3>
          <p className="text-slate-400 text-sm mt-1">Our team fine-tunes custom browser-native models on your exact enterprise schema.</p>
        </div>
        <button
          onClick={onOpenContact}
          className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-[#fff566] transition-all cursor-pointer shrink-0"
        >
          Request Custom Web Persona
        </button>
      </div>
    </div>
  );
};
