import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, Send, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [selectedService, setSelectedService] = useState<string>(
    initialService || 'Dual-Brain AI Engine'
  );
  const [budget, setBudget] = useState<string>('$15k - $30k');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const services = [
    'Dual-Brain AI Engine',
    'Full-Stack Web & Mobile',
    'Cloud Architecture & DevOps',
    'Cognitive Automation & Vision',
    'Architecture Review & Advisory'
  ];

  const budgets = ['<$15k', '$15k - $30k', '$30k - $60k', '$60k+'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playPop();
    setSubmitted(true);
  };

  const handleClose = () => {
    soundFx.playClick();
    onClose();
    setTimeout(() => {
      setSubmitted(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-[#fbf055] border border-slate-900" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                Project Discovery • Neurozy
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display mb-2">
              Start your project
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Connect directly with our lead architects. We will evaluate your timeline, tech stack, and roadmap within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Service Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Capability Focus
                </label>
                <div className="flex flex-wrap gap-2">
                  {services.map((srv) => (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedService(srv);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        selectedService === srv
                          ? 'bg-slate-950 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Estimated Budget
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setBudget(b);
                      }}
                      className={`py-2 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                        budget === b
                          ? 'bg-[#1761ff] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Project Brief / Goals</label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Tell us what you want to build or improve..."
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-black resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Submit Request</span>
                <Send size={16} />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold font-display text-slate-900 mb-2">
              Registration Received!
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto mb-6">
              Thank you, <span className="font-semibold text-slate-900">{name || 'there'}</span>. A lead software architect from Neurozy has received your request for <span className="font-semibold text-slate-900">{selectedService}</span> and will respond at <span className="font-mono text-slate-900">{email}</span> within 2 hours.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-slate-950 text-white text-sm font-semibold rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
