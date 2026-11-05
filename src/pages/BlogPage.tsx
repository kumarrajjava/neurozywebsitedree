import React, { useState } from 'react';
import { 
  PenTool, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  Globe 
} from 'lucide-react';

interface BlogPageProps {
  onOpenContact: () => void;
  onNavigate: (view: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenContact, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'web-ai' | 'engineering' | 'case-studies'>('all');

  const posts = [
    {
      id: 'why-web-apps-are-the-future-of-ai',
      title: 'Why Web Applications are the True Future of Applied AI',
      subtitle: 'Moving past slow cloud API wrappers: How in-browser WebGPU runtimes deliver the sub-millisecond responsiveness users demand.',
      category: 'web-ai',
      date: 'September 24, 2026',
      readTime: '6 min read',
      author: 'Aria Chen, Principal Web Architect',
      tag: 'Architecture'
    },
    {
      id: 'webgpu-vs-cloud-apis',
      title: 'Benchmarking WebGPU vs. Cloud APIs in Modern Web Apps',
      subtitle: 'We measured 10,000 user sessions across React single-page apps. The verdict: client inference cuts operational cost by 98%.',
      category: 'engineering',
      date: 'September 18, 2026',
      readTime: '9 min read',
      author: 'Marcus Vance, Lead Performance Engineer',
      tag: 'Benchmarks'
    },
    {
      id: 'building-offline-first-pwas',
      title: 'Building 100% Offline Progressive Web Apps with Embedded Intelligence',
      subtitle: 'A step-by-step technical guide to caching neural weights in browser indexedDB for airplane-mode reliability.',
      category: 'engineering',
      date: 'September 10, 2026',
      readTime: '8 min read',
      author: 'Sophia Lindqvist, Systems Engineer',
      tag: 'Tutorial'
    },
    {
      id: 'enterprise-web-security',
      title: 'Zero Data Egress: How Web Apps Satisfy Enterprise Compliance',
      subtitle: 'When AI computes entirely inside the client’s browser sandbox, enterprise data never leaves company walls.',
      category: 'case-studies',
      date: 'August 29, 2026',
      readTime: '5 min read',
      author: 'Julian Reed, Security & Compliance Lead',
      tag: 'Enterprise'
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 font-mono">
        <button onClick={() => onNavigate('home')} className="hover:text-black hover:underline cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-slate-400">Resources</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Blog</span>
      </div>

      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-[#fff566] text-xs font-semibold uppercase tracking-wider mb-5">
        <PenTool size={14} />
        Web Engineering & Research Insights
      </div>

      {/* Title */}
      <div className="max-w-4xl mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-slate-950 mb-6 leading-[1.1]">
          The Neurozy <span className="bg-[#fff566] px-2 rounded-lg">Web AI</span> Dispatch
        </h1>
        <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-3xl">
          Deep-dive engineering articles, architectural patterns, and benchmarks on building, scaling, and optimizing intelligent <strong>web applications</strong>.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            selectedCategory === 'all' ? 'bg-black text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Articles
        </button>
        <button
          onClick={() => setSelectedCategory('web-ai')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            selectedCategory === 'web-ai' ? 'bg-black text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Web AI Philosophy
        </button>
        <button
          onClick={() => setSelectedCategory('engineering')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            selectedCategory === 'engineering' ? 'bg-black text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          WebGPU & Engineering
        </button>
        <button
          onClick={() => setSelectedCategory('case-studies')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            selectedCategory === 'case-studies' ? 'bg-black text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Web App Case Studies
        </button>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {filteredPosts.map((post) => (
          <article 
            key={post.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-black/30 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-4">
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-semibold">{post.tag}</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Calendar size={13} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {post.readTime}</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-950 mb-3 group-hover:text-black transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {post.subtitle}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">{post.author}</span>
              <button 
                onClick={onOpenContact}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>Read paper</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter / Web AI Engineering updates */}
      <div className="bg-[#18191c] text-white rounded-3xl p-8 sm:p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[#fff566] font-mono text-xs uppercase tracking-wider">Stay at the bleeding edge</span>
          <h3 className="text-2xl font-bold font-display mt-1">Subscribe to the Web AI Engineering Bulletin</h3>
          <p className="text-slate-400 text-sm mt-1">Zero spam. Only high-signal WebGPU, browser runtime, and WASM architectures.</p>
        </div>
        <div className="flex w-full md:w-auto items-center gap-2">
          <input 
            type="email" 
            placeholder="engineer@company.com" 
            className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#fff566] w-full md:w-64"
          />
          <button 
            onClick={onOpenContact}
            className="px-5 py-2.5 rounded-xl bg-[#fff566] text-black font-semibold text-sm hover:bg-white transition-all cursor-pointer shrink-0"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};
