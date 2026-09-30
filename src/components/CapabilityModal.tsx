import React from 'react';
import { X, CheckCircle, Clock, Zap, Layers, ArrowRight } from 'lucide-react';
import { CapabilityItem } from '../data/capabilities';
import { SolutionItem } from '../data/solutions';
import { soundFx } from '../utils/sound';

interface CapabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  capability?: CapabilityItem | null;
  solution?: SolutionItem | null;
  onBookConsultation: () => void;
}

export const CapabilityModal: React.FC<CapabilityModalProps> = ({
  isOpen,
  onClose,
  capability,
  solution,
  onBookConsultation,
}) => {
  if (!isOpen || (!capability && !solution)) return null;

  const handleClose = () => {
    soundFx.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* If Capability selected */}
        {capability && (
          <div>
            <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden mb-6 bg-slate-100 relative">
              <img
                src={capability.image}
                alt={capability.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-black text-white text-xs font-mono font-bold px-3 py-1 rounded-full">
                {capability.category} • {capability.metric}
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display mb-3">
              {capability.title}
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {capability.deepDive.overview}
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Core Architectural Modules
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {capability.deepDive.keyModules.map((mod, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                    <CheckCircle size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{mod}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-blue-50 border border-blue-200 rounded-2xl mb-6">
              <div>
                <span className="text-[11px] font-bold text-blue-900 uppercase">Guaranteed Impact</span>
                <p className="text-xs sm:text-sm font-semibold text-blue-950 mt-0.5">
                  {capability.deepDive.outcomes}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-blue-800 bg-white/80 px-3 py-1.5 rounded-lg shrink-0">
                <Clock size={14} />
                <span>Ready in {capability.deepDive.readinessTime}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleClose}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-black cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  soundFx.playPop();
                  onClose();
                  onBookConsultation();
                }}
                className="px-6 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm rounded-full transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Engage this capability</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* If Solution selected */}
        {solution && !capability && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#fbf055] text-slate-950 text-xs font-bold">
                {solution.badge}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display mb-3">
              {solution.headline}
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              {solution.description}
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3">
                Key Deliverables
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {solution.deliverables.map((del, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-800">
                    <CheckCircle size={15} className="text-emerald-600 shrink-0" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {solution.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-slate-100 text-slate-800 font-mono text-xs rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleClose}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-black cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  soundFx.playPop();
                  onClose();
                  onBookConsultation();
                }}
                className="px-6 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm rounded-full transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Request consultation</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
