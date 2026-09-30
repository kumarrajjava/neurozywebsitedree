import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  Terminal, 
  Layers, 
  Zap, 
  Sparkles, 
  Globe, 
  FileCode2,
  Box
} from 'lucide-react';

interface SdksPageProps {
  onOpenContact: () => void;
  onNavigate: (view: string) => void;
}

export const SdksPage: React.FC<SdksPageProps> = ({ onOpenContact, onNavigate }) => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'react' | 'ts' | 'vue'>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const reactSnippet = `import { useWebAI, WebAIProvider } from '@neurozy/webai-react';

// 1. Wrap your web application root
export function App() {
  return (
    <WebAIProvider config={{ acceleration: 'webgpu', model: 'neurozy-web-7b' }}>
      <DashboardView />
    </WebAIProvider>
  );
}

// 2. Consume in any React component with zero latency
function DashboardView() {
  const { runInference, isReady, fps } = useWebAI();

  const handleAnalyzeDOM = async () => {
    const result = await runInference({
      target: document.getElementById('report-container'),
      mode: 'synthesize'
    });
    console.log('Client-side web inference complete:', result);
  };

  return (
    <button onClick={handleAnalyzeDOM}>
      Analyze in Web Browser (60 FPS: {fps})
    </button>
  );
}`;

  const tsSnippet = `import { NeurozyWebEngine } from '@neurozy/webai-core';

// Initialize the in-browser neural engine inside your web app
const engine = new NeurozyWebEngine({
  backend: 'webgpu-wasm',
  cacheStrategy: 'indexedDB',
  precision: 'int4'
});

await engine.init();

// Execute client-side web inference
const output = await engine.generate({
  prompt: "Synthesize the user's active table selections",
  maxTokens: 128
});`;

  const vueSnippet = `<script setup lang="ts">
import { useNeurozyWeb } from '@neurozy/webai-vue';

const { inference, status, isLocalGPU } = useNeurozyWeb();

async function handleAction() {
  const res = await inference.execute('summarize-cart');
}
</script>

<template>
  <div class="web-app-view">
    <button @click="handleAction">Run In-Browser AI</button>
  </div>
</template>`;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 font-mono">
        <button onClick={() => onNavigate('home')} className="hover:text-black hover:underline cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-slate-400">Platform</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">SDKs</span>
      </div>

      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-[#fff566] text-xs font-semibold uppercase tracking-wider mb-5">
        <Code2 size={14} />
        Developer SDKs for Web Applications
      </div>

      {/* Title */}
      <div className="max-w-4xl mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-slate-950 mb-6 leading-[1.1]">
          Engineered from the ground up for <span className="bg-[#fff566] px-2 rounded-lg">Web Developers</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-3xl">
          Integrate browser-native intelligence into any modern web stack with zero friction. Our SDKs are written natively in TypeScript and WebAssembly, designed specifically for web applications running on React, Next.js, Vue, Angular, or Vite.
        </p>
      </div>

      {/* Quick Install Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-3">
          <Terminal size={20} className="text-slate-700" />
          <span className="text-xs sm:text-sm font-mono text-slate-800">npm install @neurozy/webai-core @neurozy/webai-react</span>
        </div>
        <button
          onClick={() => copyToClipboard('npm install @neurozy/webai-core @neurozy/webai-react', 'npm-install')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-black transition-all cursor-pointer"
        >
          {copiedSnippet === 'npm-install' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          <span>{copiedSnippet === 'npm-install' ? 'Copied to clipboard!' : 'Copy command'}</span>
        </button>
      </div>

      {/* Interactive Code Switcher */}
      <div className="bg-[#18191c] text-white rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('react')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'react' ? 'bg-[#fff566] text-black' : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              React / Next.js
            </button>
            <button
              onClick={() => setActiveTab('ts')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'ts' ? 'bg-[#fff566] text-black' : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              TypeScript / Vanilla
            </button>
            <button
              onClick={() => setActiveTab('vue')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'vue' ? 'bg-[#fff566] text-black' : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Vue 3 / Nuxt
            </button>
          </div>

          <button
            onClick={() => {
              const code = activeTab === 'react' ? reactSnippet : activeTab === 'ts' ? tsSnippet : vueSnippet;
              copyToClipboard(code, 'code-tab');
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-slate-200 transition-colors"
          >
            {copiedSnippet === 'code-tab' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copiedSnippet === 'code-tab' ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        <pre className="font-mono text-xs sm:text-sm text-slate-300 bg-black/50 p-6 rounded-2xl overflow-x-auto border border-white/10 leading-relaxed">
          <code>
            {activeTab === 'react' && reactSnippet}
            {activeTab === 'ts' && tsSnippet}
            {activeTab === 'vue' && vueSnippet}
          </code>
        </pre>
      </div>

      {/* Web SDK Benchmarks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
          <div className="text-3xl font-extrabold font-display text-slate-900 mb-1">0.8ms</div>
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">Invocation Overhead</div>
          <p className="text-slate-600 text-xs leading-relaxed">
            Eliminates TLS handshakes, HTTP roundtrips, and queue delays. Direct memory bridge via WebAssembly.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
          <div className="text-3xl font-extrabold font-display text-slate-900 mb-1">&lt; 12KB</div>
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">Client Bundle Size</div>
          <p className="text-slate-600 text-xs leading-relaxed">
            Tree-shakable client stub with progressive dynamic chunk loading when the web application needs it.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
          <div className="text-3xl font-extrabold font-display text-slate-900 mb-1">100%</div>
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">TypeScript Typed</div>
          <p className="text-slate-600 text-xs leading-relaxed">
            End-to-end strict type safety with IDE autocompletion for prompts, schemas, and DOM element binders.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#294d3c] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold font-display">Ready to build your next web application with AI?</h3>
          <p className="text-emerald-100/80 text-sm mt-1">Get immediate developer API keys and sandbox access.</p>
        </div>
        <button
          onClick={onOpenContact}
          className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-[#fff566] transition-all cursor-pointer shrink-0"
        >
          Request SDK Access
        </button>
      </div>
    </div>
  );
};
