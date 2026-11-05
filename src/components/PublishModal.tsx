import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  Share2, 
  Printer, 
  Globe2, 
  QrCode, 
  ArrowRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { WebsiteData } from '../types';

interface PublishModalProps {
  website: WebsiteData;
  onClose: () => void;
  onOpenLive: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  website,
  onClose,
  onOpenLive,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'subdomain' | 'custom'>('subdomain');
  const [customDomainInput, setCustomDomainInput] = useState('');
  const [domainVerified, setDomainVerified] = useState(false);

  const fullUrl = `https://${website.subdomain}.neurozy.site`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareToWhatsApp = () => {
    const text = `Namaste! Check out our official new digital store for ${website.business.name}: ${fullUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleVerifyCustomDomain = () => {
    if (!customDomainInput) return;
    setDomainVerified(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Website Published Successfully!</h3>
              <p className="text-xs text-emerald-100">Your site is live, fast, and mobile-ready worldwide.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('subdomain')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              activeTab === 'subdomain'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Free Subdomain Link
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              activeTab === 'custom'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Connect Custom Domain (.in / .com)
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {activeTab === 'subdomain' ? (
            <div className="space-y-6">
              {/* Published URL pill */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Your Free Live Web Address:
                </label>
                <div className="flex items-center gap-2 p-2.5 bg-slate-100 border border-slate-200 rounded-xl">
                  <Globe2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
                  <span className="font-mono text-xs font-bold text-slate-800 flex-1 truncate">
                    {fullUrl}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1 shadow-2xs active:scale-95"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* QR Code Card for Shop Counter */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-5">
                {/* Visual SVG QR Code */}
                <div className="w-24 h-24 bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
                  <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                    {/* Stylized QR Matrix */}
                    <rect x="10" y="10" width="24" height="24" rx="4" />
                    <rect x="14" y="14" width="16" height="16" fill="white" />
                    <rect x="18" y="18" width="8" height="8" />
                    
                    <rect x="66" y="10" width="24" height="24" rx="4" />
                    <rect x="70" y="14" width="16" height="16" fill="white" />
                    <rect x="74" y="18" width="8" height="8" />

                    <rect x="10" y="66" width="24" height="24" rx="4" />
                    <rect x="14" y="70" width="16" height="16" fill="white" />
                    <rect x="18" y="74" width="8" height="8" />

                    <rect x="42" y="14" width="6" height="6" />
                    <rect x="52" y="24" width="6" height="6" />
                    <rect x="42" y="38" width="8" height="8" />
                    <rect x="56" y="44" width="8" height="8" />
                    <rect x="70" y="52" width="6" height="6" />
                    <rect x="42" y="66" width="6" height="6" />
                    <rect x="52" y="78" width="8" height="8" />
                    <rect x="66" y="70" width="6" height="6" />
                    <rect x="80" y="80" width="10" height="10" />
                  </svg>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <QrCode className="w-4 h-4 text-indigo-600" />
                    <span>Print QR Code for Shop Counter</span>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Place this on your shop counter, billing desk, or delivery boxes so walk-in customers can scan and view your WhatsApp catalogue.
                  </p>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 pt-1"
                  >
                    <Printer className="w-3 h-3" />
                    <span>Print Standee / QR Flyer</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={onOpenLive}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Full-Screen Live Website</span>
                </button>

                <button
                  onClick={shareToWhatsApp}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Share2 className="w-4 h-4 text-emerald-600" />
                  <span>Share Storefront on WhatsApp</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 leading-relaxed">
                <strong>Business Plan Feature:</strong> Connect your custom domain like <code className="font-mono bg-white px-1.5 py-0.5 rounded">sweetbiteslucknow.com</code>.
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Enter your custom domain:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. sweetbiteslucknow.in"
                    value={customDomainInput}
                    onChange={(e) => setCustomDomainInput(e.target.value)}
                    className="flex-1 p-2.5 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                  <button
                    onClick={handleVerifyCustomDomain}
                    className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800"
                  >
                    Verify DNS
                  </button>
                </div>
              </div>

              {domainVerified && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-emerald-900">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>DNS Configuration Required in GoDaddy / Namecheap:</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-200 font-mono text-[11px] space-y-1">
                    <div><strong>Type:</strong> CNAME</div>
                    <div><strong>Host / Name:</strong> @ or www</div>
                    <div><strong>Value / Target:</strong> sites.neurozy.site</div>
                    <div><strong>TTL:</strong> Automatic / 300s</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
