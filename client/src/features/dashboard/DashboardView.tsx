import React from 'react';
import { 
  Plus, 
  ExternalLink, 
  Edit3, 
  MessageCircle, 
  Eye, 
  Globe, 
  Share2, 
  Sparkles,
  ShoppingBag,
  User as UserIcon,
  Settings
} from 'lucide-react';
import { BusinessData, User } from '../../types';

interface DashboardViewProps {
  businessData: BusinessData;
  onOpenEditor: () => void;
  onOpenCreateModal: () => void;
  onViewPublishedSite: () => void;
  onNavigateProfile: () => void;
  user: User | null;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  businessData,
  onOpenEditor,
  onOpenCreateModal,
  onViewPublishedSite,
  onNavigateProfile,
  user
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-16">
      
      {/* Dashboard Top Banner */}
      <div className="bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#4338CA] text-white pt-10 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold backdrop-blur-sm border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Founder Control Hub</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Namaste, {user?.fullName || 'Business Owner'}! 👋
            </h1>
            <p className="text-sm text-indigo-200">
              Manage your websites, WhatsApp leads, product catalog, and subdomains in one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateProfile}
              className="px-4 py-3 rounded-xl bg-indigo-900/60 hover:bg-indigo-900 text-white border border-indigo-400/30 font-bold text-xs transition flex items-center gap-2 shadow-sm"
            >
              <UserIcon className="w-4 h-4 text-indigo-300" />
              <span>My Profile & Settings</span>
            </button>

            <button
              onClick={onOpenCreateModal}
              className="px-5 py-3 rounded-xl bg-white text-indigo-900 font-bold text-xs shadow-lg hover:bg-indigo-50 transition transform active:scale-95 flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-indigo-600" />
              <span>Generate New Website (Voice)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-8 space-y-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-indigo-600" /> My Websites
            </span>
            <div className="text-2xl font-extrabold text-slate-900">1 Live</div>
            <span className="text-[11px] text-emerald-600 font-semibold">● 100% Mobile Ready</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-blue-600" /> Total Visitors
            </span>
            <div className="text-2xl font-extrabold text-slate-900">142</div>
            <span className="text-[11px] text-slate-400 font-medium">+24 this week</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-600" /> WhatsApp Clicks
            </span>
            <div className="text-2xl font-extrabold text-emerald-600">38</div>
            <span className="text-[11px] text-emerald-700 font-semibold">High Buying Intent 🔥</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-purple-600" /> Catalog Items
            </span>
            <div className="text-2xl font-extrabold text-slate-900">{businessData.products.length}</div>
            <span className="text-[11px] text-indigo-600 font-semibold">Active & Orderable</span>
          </div>
        </div>

        {/* Primary Website Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Primary Business Website
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                {businessData.name}
              </h2>
              <p className="text-xs text-slate-500">
                Category: <strong className="capitalize text-slate-700">{businessData.category}</strong> • City: <strong>{businessData.city || 'Lucknow'}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Published & Online
              </span>
            </div>
          </div>

          {/* Website Preview Banner & Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            <div className="md:col-span-1 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner group relative">
              <img 
                src={businessData.products?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80'} 
                alt="Website Preview" 
                className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
                <button
                  onClick={onViewPublishedSite}
                  className="px-4 py-2 bg-white text-slate-900 rounded-xl font-bold text-xs shadow"
                >
                  View Full Site
                </button>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-semibold">Your Live Web Address:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://${businessData.subdomain}.neurozy.site`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-sm md:text-base font-bold text-indigo-600 hover:underline flex items-center gap-1.5"
                  >
                    <span>https://{businessData.subdomain}.neurozy.site</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenEditor}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Open Visual Editor</span>
                </button>

                <button
                  onClick={onViewPublishedSite}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                  <span>Open Public Website</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(`https://${businessData.subdomain}.neurozy.site`);
                    alert('Website URL copied to clipboard! Share it with your customers on WhatsApp.');
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center gap-1.5"
                >
                  <Share2 className="w-4 h-4 text-slate-500" />
                  <span>Copy Share Link</span>
                </button>
              </div>
            </div>

          </div>

          {/* Quick Domain Connection Notice */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-800">Want to connect your own domain (e.g. www.{businessData.subdomain}lucknow.com)?</span>
              <p className="text-slate-500">Free SSL certificate and 1-click DNS configuration included with Starter & Business plans.</p>
            </div>
            <button 
              onClick={() => alert('Domain settings: Point your domain CNAME record to cname.neurozy.site. DNS will verify automatically within 1 hour.')}
              className="px-3.5 py-1.5 bg-white border border-slate-300 font-bold text-slate-700 rounded-xl hover:bg-slate-50 transition self-start sm:self-auto"
            >
              Domain Settings
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
