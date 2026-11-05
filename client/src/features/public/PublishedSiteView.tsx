import React from 'react';
import { ArrowLeft, Share2, ExternalLink, Sparkles } from 'lucide-react';
import { BusinessData } from '../../types';
import { WebsiteViewRenderer } from '../../templates/WebsiteViewRenderer';

interface PublishedSiteViewProps {
  businessData: BusinessData;
  onBackToEditor: () => void;
}

export const PublishedSiteView: React.FC<PublishedSiteViewProps> = ({
  businessData,
  onBackToEditor
}) => {
  const fullUrl = `https://${businessData.subdomain}.neurozy.site`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: businessData.name,
        text: `Check out our official business website: ${businessData.name}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(fullUrl);
      alert(`Link copied: ${fullUrl}`);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Top Founder Navigation Pill Banner */}
      <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-xs sticky top-0 z-50 border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToEditor}
            className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Editor / Dashboard</span>
          </button>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-slate-400">
            Viewing Live Public Website: <strong className="text-indigo-400 font-mono">{businessData.subdomain}.neurozy.site</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold flex items-center gap-1.5 transition text-[11px]"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share on WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Render Public Website */}
      <div className="flex-1">
        <WebsiteViewRenderer data={businessData} isMobilePreview={false} />
      </div>
    </div>
  );
};
