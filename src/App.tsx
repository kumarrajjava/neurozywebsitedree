import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { VoiceWizard } from './components/VoiceWizard';
import { WebsiteEditor } from './components/WebsiteEditor';
import { LiveWebsiteRenderer } from './components/LiveWebsiteRenderer';
import { Dashboard } from './components/Dashboard';
import { PublishModal } from './components/PublishModal';
import { CtoBlueprintModal } from './components/CtoBlueprintModal';
import { PricingModal } from './components/PricingModal';
import { TEMPLATES } from './data/sampleTemplates';
import { WebsiteData, PlanType } from './types';
import { ArrowLeft, Edit3, QrCode, Globe } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'wizard' | 'editor' | 'dashboard' | 'published'>('landing');

  // Initial seed websites: Sweet Bites Bakery (Screenshot 1) and Cafe Bliss (Screenshot 2)
  const [websites, setWebsites] = useState<WebsiteData[]>(() => {
    const bakeryTpl = TEMPLATES[0];
    const cafeTpl = TEMPLATES[1];

    const initialBakery: WebsiteData = {
      id: 'site_sweetbites',
      subdomain: 'sweetbites',
      business: bakeryTpl.demoData as any,
      products: bakeryTpl.demoProducts,
      reviews: [
        {
          id: 'r1',
          author: 'Priya Sharma (Hazratganj)',
          rating: 5,
          comment: 'Ordered a custom truffle cake for my daughter’s birthday on WhatsApp. Delivered in 45 mins, so fresh and delicious!',
          date: '2 days ago'
        },
        {
          id: 'r2',
          author: 'Aditya Srivastava',
          rating: 5,
          comment: 'Best eggless bakery in Lucknow. Their sourdough breads and chocolate pastries are unmatched.',
          date: '1 week ago'
        }
      ],
      templateId: bakeryTpl.id,
      theme: {
        primaryColor: bakeryTpl.defaultPrimary,
        accentColor: bakeryTpl.defaultAccent,
        font: bakeryTpl.fontFamily,
        buttonStyle: 'rounded',
        darkMode: false
      },
      sections: {
        hero: true,
        about: true,
        products: true,
        hours: true,
        reviews: true,
        contact: true,
        map: true,
        whatsappButton: true
      },
      seo: {
        metaTitle: 'Sweet Bites Bakery | 100% Eggless Cakes in Hazratganj, Lucknow',
        metaDescription: 'Order freshly baked artisan cakes, custom birthday fondant cakes, and sourdough breads from Sweet Bites in Hazratganj, Lucknow. Fast 45-min WhatsApp delivery!',
        keywords: [
          'Sweet Bites Bakery',
          'Bakery in Lucknow',
          'Hazratganj cake shop',
          'Eggless cakes Lucknow',
          'Birthday cakes WhatsApp order',
          'Custom fondant cakes'
        ],
        ogImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
        canonicalUrl: 'https://sweetbites.neurozy.site',
        robotsIndex: true,
        structuredDataType: 'Bakery'
      },
      isPublished: true,
      publishedAt: '2026-11-04T12:00:00Z',
      visits: 894,
      whatsappClicks: 112,
      callClicks: 56,
      updatedAt: '2026-11-04T12:00:00Z'
    };

    const initialCafe: WebsiteData = {
      id: 'site_cafebliss',
      subdomain: 'cafebliss',
      business: cafeTpl.demoData as any,
      products: cafeTpl.demoProducts,
      reviews: [
        {
          id: 'c1',
          author: 'Kabir & Sanya (Gomti Nagar)',
          rating: 5,
          comment: 'Cozy ambiance, great Arabica brew, and lovely live acoustic music on weekends!',
          date: '3 days ago'
        }
      ],
      templateId: cafeTpl.id,
      theme: {
        primaryColor: cafeTpl.defaultPrimary,
        accentColor: cafeTpl.defaultAccent,
        font: cafeTpl.fontFamily,
        buttonStyle: 'rounded',
        darkMode: false
      },
      sections: {
        hero: true,
        about: true,
        products: true,
        hours: true,
        reviews: true,
        contact: true,
        map: true,
        whatsappButton: true
      },
      seo: {
        metaTitle: 'Cafe Bliss | Specialty Arabica Coffee in Gomti Nagar, Lucknow',
        metaDescription: 'Specialty single-origin Arabica coffee roastery, artisanal pizzas, and relaxed acoustic atmosphere in Gomti Nagar, Lucknow. Open daily from 9:00 AM.',
        keywords: [
          'Cafe Bliss',
          'Cafe in Gomti Nagar',
          'Specialty coffee Lucknow',
          'Arabica brew cafe',
          'Best cafe for work Lucknow',
          'Acoustic cafe Gomti Nagar'
        ],
        ogImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
        canonicalUrl: 'https://cafebliss.neurozy.site',
        robotsIndex: true,
        structuredDataType: 'Restaurant'
      },
      isPublished: true,
      publishedAt: '2026-11-03T10:00:00Z',
      visits: 526,
      whatsappClicks: 72,
      callClicks: 36,
      updatedAt: '2026-11-03T10:00:00Z'
    };

    return [initialBakery, initialCafe];
  });

  const [currentWebsite, setCurrentWebsite] = useState<WebsiteData>(websites[0]);
  const [wizardInitialPrompt, setWizardInitialPrompt] = useState<string>('');
  const [showBlueprintModal, setShowBlueprintModal] = useState<boolean>(false);
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);
  const [showPricingModal, setShowPricingModal] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState<PlanType>('STARTER');

  // Handle Wizard finish
  const handleWizardFinish = (newWebsite: WebsiteData) => {
    setWebsites((prev) => [newWebsite, ...prev]);
    setCurrentWebsite(newWebsite);
    setCurrentView('editor');
    setShowPublishModal(true);
  };

  // Handle updating an existing website
  const handleUpdateWebsite = (updatedWebsite: WebsiteData) => {
    setCurrentWebsite(updatedWebsite);
    setWebsites((prev) =>
      prev.map((site) => (site.id === updatedWebsite.id ? updatedWebsite : site))
    );
  };

  // Preview template directly from landing page
  const handlePreviewTemplate = (templateId: string) => {
    const matched = websites.find((w) => w.templateId === templateId);
    if (matched) {
      setCurrentWebsite(matched);
      setCurrentView('published');
    } else {
      const tpl = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
      const previewSite: WebsiteData = {
        id: 'preview_' + tpl.id,
        subdomain: tpl.id.split('-')[0],
        business: tpl.demoData as any,
        products: tpl.demoProducts,
        reviews: [
          {
            id: 'r_demo',
            author: 'Verified Customer',
            rating: 5,
            comment: 'Outstanding quality and service! Very easy to order via WhatsApp.',
            date: 'Recently'
          }
        ],
        templateId: tpl.id,
        theme: {
          primaryColor: tpl.defaultPrimary,
          accentColor: tpl.defaultAccent,
          font: tpl.fontFamily,
          buttonStyle: 'rounded',
          darkMode: false
        },
        sections: {
          hero: true,
          about: true,
          products: true,
          hours: true,
          reviews: true,
          contact: true,
          map: true,
          whatsappButton: true
        },
        isPublished: true,
        visits: 120,
        whatsappClicks: 14,
        callClicks: 6,
        updatedAt: new Date().toISOString()
      };
      setCurrentWebsite(previewSite);
      setCurrentView('published');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfe] text-slate-900 flex flex-col font-sans">
      {/* Show Navbar unless user is viewing full-screen published storefront */}
      {currentView !== 'published' && (
        <Navbar
          currentView={currentView}
          onNavigate={setCurrentView}
          onOpenBlueprint={() => setShowBlueprintModal(true)}
          publishedCount={websites.length}
        />
      )}

      {/* Main Viewport Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onStartCreate={(prompt) => {
              setWizardInitialPrompt(prompt || '');
              setCurrentView('wizard');
            }}
            onPreviewTemplate={handlePreviewTemplate}
            onOpenPricing={() => setShowPricingModal(true)}
            onOpenBlueprint={() => setShowBlueprintModal(true)}
          />
        )}

        {currentView === 'wizard' && (
          <VoiceWizard
            initialPrompt={wizardInitialPrompt}
            onFinish={handleWizardFinish}
            onCancel={() => setCurrentView('landing')}
          />
        )}

        {currentView === 'editor' && (
          <WebsiteEditor
            website={currentWebsite}
            onSave={handleUpdateWebsite}
            onPublish={() => setShowPublishModal(true)}
            onBackToDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard
            websites={websites}
            onSelectWebsite={(site) => {
              setCurrentWebsite(site);
              setCurrentView('editor');
            }}
            onEditWebsite={(site) => {
              setCurrentWebsite(site);
              setCurrentView('editor');
            }}
            onOpenLive={(site) => {
              setCurrentWebsite(site);
              setCurrentView('published');
            }}
            onOpenPublish={(site) => {
              setCurrentWebsite(site);
              setShowPublishModal(true);
            }}
            onCreateNew={() => {
              setWizardInitialPrompt('');
              setCurrentView('wizard');
            }}
            currentPlan={currentPlan}
            onOpenPricing={() => setShowPricingModal(true)}
          />
        )}

        {/* Full-Screen Standalone Published Storefront View */}
        {currentView === 'published' && (
          <div className="relative">
            {/* Merchant Quick Return Banner */}
            <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-xs sticky top-0 z-50 shadow-md">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('editor')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Editor</span>
                </button>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 font-semibold"
                >
                  <span>Dashboard</span>
                </button>
                <div className="hidden sm:flex items-center gap-1.5 ml-2 font-mono text-[11px] text-emerald-400">
                  <Globe className="w-3.5 h-3.5" />
                  <span>https://{currentWebsite.subdomain}.neurozy.site</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPublishModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white font-bold"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Shop QR Code</span>
                </button>
              </div>
            </div>

            <LiveWebsiteRenderer
              website={currentWebsite}
              isStandalone={true}
              onUpdateWebsite={handleUpdateWebsite}
            />
          </div>
        )}
      </main>

      {/* MODALS */}
      {showPublishModal && (
        <PublishModal
          website={currentWebsite}
          onClose={() => setShowPublishModal(false)}
          onOpenLive={() => {
            setShowPublishModal(false);
            setCurrentView('published');
          }}
        />
      )}

      {showBlueprintModal && (
        <CtoBlueprintModal onClose={() => setShowBlueprintModal(false)} />
      )}

      {showPricingModal && (
        <PricingModal
          currentPlan={currentPlan}
          onSelectPlan={setCurrentPlan}
          onClose={() => setShowPricingModal(false)}
        />
      )}
    </div>
  );
}
