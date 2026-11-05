import React, { useState } from 'react';
import { 
  BookOpen, 
  Database, 
  Server, 
  FolderTree, 
  Code2, 
  Calendar, 
  Coins, 
  CheckSquare, 
  Layers, 
  Copy, 
  Check, 
  X,
  ExternalLink
} from 'lucide-react';
import { CTO_BLUEPRINT } from '../data/ctoBlueprint';

interface CtoBlueprintModalProps {
  onClose: () => void;
}

export const CtoBlueprintModal: React.FC<CtoBlueprintModalProps> = ({ onClose }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('prd');
  const [copied, setCopied] = useState(false);

  const activeSection = CTO_BLUEPRINT.find((s) => s.id === activeSectionId) || CTO_BLUEPRINT[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSection.contentMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIconForSection = (id: string) => {
    switch (id) {
      case 'prd':
        return <BookOpen className="w-4 h-4" />;
      case 'system-architecture':
        return <Server className="w-4 h-4" />;
      case 'database-erd':
        return <Database className="w-4 h-4" />;
      case 'folder-structures':
        return <FolderTree className="w-4 h-4" />;
      case 'api-specs':
        return <Code2 className="w-4 h-4" />;
      case 'screen-plan':
        return <Layers className="w-4 h-4" />;
      case 'roadmap-costs-priorities':
        return <Coins className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              CTO
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Neurozy Technical Blueprint & PRD Spec</h2>
                <span className="text-[10px] font-mono bg-indigo-900/80 text-indigo-200 px-2 py-0.5 rounded border border-indigo-700">
                  Deliverable 1 Specification
                </span>
              </div>
              <p className="text-xs text-slate-400">System Architecture, PostgreSQL ERD, REST APIs & 30-Day Roadmap</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Markdown' : 'Copy Section'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body Split: Left Navigation + Right Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Navigation Sidebar */}
          <div className="w-full md:w-72 bg-slate-50 border-r border-slate-200 p-3 space-y-1 overflow-y-auto shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2 block">
              Architectural Chapters
            </span>

            {CTO_BLUEPRINT.map((section) => {
              const isActive = activeSectionId === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSectionId(section.id)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className={`shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {getIconForSection(section.id)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block truncate">{section.title}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{section.badge}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Content Viewport */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-white text-slate-900 space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{activeSection.badge}</span>
              <h1 className="text-xl font-black text-slate-950 mt-1">{activeSection.title}</h1>
              <p className="text-xs text-slate-500 mt-1">{activeSection.summary}</p>
            </div>

            {/* Markdown Body Viewer */}
            <div className="prose prose-sm max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed">
              <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 overflow-x-auto text-xs font-mono border border-slate-800 whitespace-pre-wrap leading-relaxed">
                {activeSection.contentMarkdown}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
