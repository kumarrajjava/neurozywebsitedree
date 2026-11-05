import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Heart,
  Globe
} from 'lucide-react';

interface CareersPageProps {
  onOpenContact: () => void;
  onNavigate: (view: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onOpenContact, onNavigate }) => {
  const [selectedDept, setSelectedDept] = useState<'all' | 'engineering' | 'design' | 'product'>('all');

  const jobs = [
    {
      title: 'Senior WebGPU & Compute Shader Engineer',
      dept: 'engineering',
      location: 'Remote (Global) / San Francisco',
      type: 'Full-time',
      desc: 'Optimize custom WGSL compute shaders, memory barriers, and SIMD pipelines for high-performance neural inference inside V8 and WebKit browser engines.'
    },
    {
      title: 'Principal WebAssembly (Wasm) Systems Architect',
      dept: 'engineering',
      location: 'Remote (US/EU)',
      type: 'Full-time',
      desc: 'Architect our zero-copy multi-threaded WebAssembly runtime, compiling quantized tensor math with near-native execution efficiency in web apps.'
    },
    {
      title: 'Lead Frontend AI Systems Designer & UX',
      dept: 'design',
      location: 'Remote (Global)',
      type: 'Full-time',
      desc: 'Design reactive in-browser co-pilot surfaces, generative canvas interfaces, and state-machine interactions for next-generation web applications.'
    },
    {
      title: 'Developer Advocate – Web Ecosystem & TypeScript',
      dept: 'product',
      location: 'Remote (Global)',
      type: 'Full-time',
      desc: 'Champion Web AI across the React, Vue, Next.js, and web dev communities. Build open-source templates, author technical deep dives, and host hackathons.'
    }
  ];

  const filteredJobs = selectedDept === 'all' ? jobs : jobs.filter(j => j.dept === selectedDept);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 font-mono">
        <button onClick={() => onNavigate('home')} className="hover:text-black hover:underline cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-slate-400">Company</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Careers</span>
      </div>

      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-[#fff566] text-xs font-semibold uppercase tracking-wider mb-5">
        <Building2 size={14} />
        Join Our Web Engineering Team
      </div>

      {/* Main Title */}
      <div className="max-w-4xl mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-slate-950 mb-6 leading-[1.1]">
          Pioneer the Web-Native AI Frontier with <span className="bg-[#fff566] px-2 rounded-lg">Neurozy</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-3xl">
          We are assembling an extraordinary team of systems engineers, WebGPU hackers, and frontend craftspeople dedicated exclusively to bringing AI out of the cloud and straight into client <strong>web applications</strong>.
        </p>
      </div>

      {/* Culture & Perks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-4 font-bold">
            🌍
          </div>
          <h3 className="text-lg font-bold font-display text-slate-950 mb-2">Remote-First Culture</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Work from wherever you are most creative and productive. We support asynchronous communication and flexible working hours.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-4 font-bold">
            ⚡
          </div>
          <h3 className="text-lg font-bold font-display text-slate-950 mb-2">Bleeding Edge Web Tech</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Push the boundaries of WebGPU, W3C standards, V8 internal optimizations, and next-gen browser runtime capabilities.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-4 font-bold">
            💎
          </div>
          <h3 className="text-lg font-bold font-display text-slate-950 mb-2">Top Tier Compensation</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Competitive base salary, generous early-stage equity grants, comprehensive global health benefits, and home lab budgets.
          </p>
        </div>
      </div>

      {/* Open Roles Section */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Active Openings</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-950 mt-1">
              Open Positions
            </h2>
          </div>

          {/* Department Filters */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedDept('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                selectedDept === 'all' ? 'bg-black text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({jobs.length})
            </button>
            <button
              onClick={() => setSelectedDept('engineering')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                selectedDept === 'engineering' ? 'bg-black text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Engineering
            </button>
            <button
              onClick={() => setSelectedDept('design')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                selectedDept === 'design' ? 'bg-black text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Design
            </button>
          </div>
        </div>

        {/* Roles List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div 
              key={job.title}
              className="border border-slate-200 hover:border-black/30 rounded-2xl p-6 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div>
                <div className="flex items-center gap-3 text-xs font-mono text-slate-500 mb-2">
                  <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Briefcase size={13} /> {job.type}</span>
                </div>
                <h3 className="text-xl font-bold font-display text-slate-950 mb-2 group-hover:text-black">
                  {job.title}
                </h3>
                <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
                  {job.desc}
                </p>
              </div>

              <button
                onClick={onOpenContact}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-[#fff566] hover:text-black transition-all cursor-pointer shrink-0 self-start md:self-center"
              >
                Apply for Role
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* General Application */}
      <div className="bg-[#18191c] text-white rounded-3xl p-8 sm:p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold font-display">Don’t see your exact role?</h3>
          <p className="text-slate-400 text-sm mt-1 max-w-lg">
            We are always scouting exceptional web developers, compiler engineers, and systems hackers. Drop us a note with your GitHub profile.
          </p>
        </div>
        <button
          onClick={onOpenContact}
          className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-[#fff566] transition-all cursor-pointer shrink-0"
        >
          Send Open Application
        </button>
      </div>
    </div>
  );
};
