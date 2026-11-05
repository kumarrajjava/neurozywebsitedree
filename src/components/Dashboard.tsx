import React from 'react';
import { 
  Globe2, 
  Eye, 
  MessageCircle, 
  PhoneCall, 
  TrendingUp, 
  Plus, 
  Edit3, 
  ExternalLink, 
  Sparkles, 
  QrCode, 
  ShoppingBag,
  CreditCard,
  Settings,
  CheckCircle2
} from 'lucide-react';
import { WebsiteData, PlanType } from '../types';

interface DashboardProps {
  websites: WebsiteData[];
  onSelectWebsite: (site: WebsiteData) => void;
  onEditWebsite: (site: WebsiteData) => void;
  onOpenLive: (site: WebsiteData) => void;
  onOpenPublish: (site: WebsiteData) => void;
  onCreateNew: () => void;
  currentPlan: PlanType;
  onOpenPricing: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  websites,
  onSelectWebsite,
  onEditWebsite,
  onOpenLive,
  onOpenPublish,
  onCreateNew,
  currentPlan,
  onOpenPricing,
}) => {
  // Aggregate mock metrics across sites
  const totalVisits = websites.reduce((acc, s) => acc + (s.visits || 0), 1420);
  const totalWhatsApp = websites.reduce((acc, s) => acc + (s.whatsappClicks || 0), 184);
  const totalCalls = websites.reduce((acc, s) => acc + (s.callClicks || 0), 92);
  const conversionRate = Math.round(((totalWhatsApp + totalCalls) / totalVisits) * 1000) / 10;

  return (
    <div className="min-h-screen bg-[#fafbfe] py-8 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-950 tracking-tight">Merchant Business Dashboard</h1>
            <p className="text-xs text-slate-500 mt-0.5">Manage your digital storefronts, orders, and WhatsApp visitor leads.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPricing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
              <span>Plan: {currentPlan}</span>
            </button>

            <button
              onClick={onCreateNew}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm hover:shadow transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Website</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards with Tabular Numerals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>Total Store Visits</span>
              <Eye className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl font-black text-slate-950 font-mono tabular-nums">
              {totalVisits.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +24% this week
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>WhatsApp Inquiries</span>
              <MessageCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-950 font-mono tabular-nums">
              {totalWhatsApp.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Direct item orders received</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>Call Clicks</span>
              <PhoneCall className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-slate-950 font-mono tabular-nums">
              {totalCalls.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Direct phone conversations</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>Inquiry Conversion</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-950 font-mono tabular-nums">
              {conversionRate}%
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Industry leading for MSMEs</p>
          </div>
        </div>

        {/* My Websites List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">My Live Websites</h2>
              <p className="text-xs text-slate-500">Active storefronts powered by Neurozy voice generation.</p>
            </div>
            <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg">
              {websites.length} Active Store{websites.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {websites.map((site) => (
              <div
                key={site.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <img
                      src={site.business.heroImageUrl}
                      alt={site.business.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900">{site.business.name}</h3>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Live
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-0.5">
                      {site.business.categoryLabel} · {site.business.city} · {site.products.length} Products
                    </p>

                    <a
                      href={`https://${site.subdomain}.neurozy.site`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-indigo-600 hover:text-indigo-800 mt-1"
                    >
                      <Globe2 className="w-3 h-3" />
                      <span>{site.subdomain}.neurozy.site</span>
                    </a>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 self-start md:self-center">
                  <button
                    onClick={() => onEditWebsite(site)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Edit Site</span>
                  </button>

                  <button
                    onClick={() => onOpenPublish(site)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5 text-indigo-600" />
                    <span>QR Code</span>
                  </button>

                  <button
                    onClick={() => onOpenLive(site)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Live</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lucknow MSME Pilot Notice */}
        <div className="p-5 bg-gradient-to-r from-indigo-50 via-violet-50 to-amber-50 rounded-2xl border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600">
              Founder & CTO Pilot Program · Lucknow, UP
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              Piloting with 5–10 real retail and dining businesses in Hazratganj & Gomti Nagar
            </h4>
            <p className="text-xs text-slate-600">
              Need on-ground help setting up your shop's counter standee and custom WhatsApp menu? Our local team is here to assist.
            </p>
          </div>

          <button
            onClick={() => window.open('https://wa.me/919876543210?text=Hi%2C+I+want+to+join+the+Neurozy+Lucknow+pilot', '_blank')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shrink-0 shadow-xs"
          >
            Connect with Pilot Team
          </button>
        </div>
      </div>
    </div>
  );
};
