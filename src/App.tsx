import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PresentingSection } from './components/PresentingSection';
import { SolutionsOrbital } from './components/SolutionsOrbital';
import { CapabilitiesGrid } from './components/CapabilitiesGrid';
import { ContactCtaSection } from './components/ContactCtaSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CapabilityModal } from './components/CapabilityModal';
import { CapabilityItem } from './data/capabilities';
import { SolutionItem } from './data/solutions';
import { ScrollToTop } from './components/ScrollToTop';

// Dedicated Sub-Pages
import { WebAiAppPage } from './pages/WebAiAppPage';
import { PersonasPage } from './pages/PersonasPage';
import { SdksPage } from './pages/SdksPage';
import { IdnPage } from './pages/IdnPage';
import { FrontlinePage } from './pages/FrontlinePage';
import { BlogPage } from './pages/BlogPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { AboutPage } from './pages/AboutPage';
import { ManifestoPage } from './pages/ManifestoPage';
import { CareersPage } from './pages/CareersPage';

export type ViewType = 
  | 'home' 
  | 'webai-app' 
  | 'personas' 
  | 'sdks' 
  | 'idn' 
  | 'frontline' 
  | 'blog' 
  | 'help-center' 
  | 'about' 
  | 'manifesto' 
  | 'careers';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<CapabilityItem | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);
  const [isCapabilityModalOpen, setIsCapabilityModalOpen] = useState(false);

  // Sync hash routing on mount and hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validViews: ViewType[] = [
        'home', 
        'webai-app', 
        'personas', 
        'sdks', 
        'idn', 
        'frontline', 
        'blog', 
        'help-center', 
        'about', 
        'manifesto', 
        'careers'
      ];
      if (validViews.includes(hash as ViewType)) {
        setCurrentView(hash as ViewType);
      } else if (!hash) {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: string) => {
    setCurrentView(view as ViewType);
    if (view === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCapability = (cap: CapabilityItem) => {
    setSelectedCapability(cap);
    setSelectedSolution(null);
    setIsCapabilityModalOpen(true);
  };

  const handleOpenSolution = (sol: SolutionItem) => {
    setSelectedSolution(sol);
    setSelectedCapability(null);
    setIsCapabilityModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f6f1] paper-texture text-slate-900 selection:bg-[#fff566] selection:text-black flex flex-col justify-start relative overflow-x-hidden w-full max-w-full">
      {/* Sticky Header with "N Neurozy", full dropdowns, and "Get in touch" held on scroll */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Website Content */}
      <main className="relative w-full flex-1 pt-20 sm:pt-24 md:pt-28">
        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <HeroSection onOpenContact={() => setIsContactOpen(true)} />

            {/* Presenting Ourselves */}
            <PresentingSection />

            {/* Solution Spectrum - Green Orbital Playground */}
            <SolutionsOrbital onSelectSolution={handleOpenSolution} />

            {/* Flagship Capabilities - Yellow Grid */}
            <CapabilitiesGrid onSelectCapability={handleOpenCapability} />

            {/* Contact CTA Section */}
            <ContactCtaSection onOpenContact={() => setIsContactOpen(true)} />
          </>
        )}

        {/* Dedicated Pages */}
        {currentView === 'webai-app' && (
          <WebAiAppPage 
            onOpenContact={() => setIsContactOpen(true)} 
            onNavigate={navigateTo} 
          />
        )}

        {currentView === 'personas' && (
          <PersonasPage 
            onOpenContact={() => setIsContactOpen(true)} 
            onNavigate={navigateTo} 
          />
        )}

        {currentView === 'sdks' && (
          <SdksPage 
            onOpenContact={() => setIsContactOpen(true)} 
            onNavigate={navigateTo} 
          />
        )}

        {currentView === 'idn' && (
          <IdnPage 
            onOpenContact={() => setIsContactOpen(true)} 
            onNavigate={navigateTo} 
          />
        )}

        {currentView === 'frontline' && (
          <FrontlinePage 
            onOpenContact={() => setIsContactOpen(true)} 
            onNavigate={navigateTo} 
          />
        )}

        {currentView === 'blog' && (
          <BlogPage 
            onOpenContact={() => setIsContactOpen(true)} 
            onNavigate={navigateTo} 
          />
        )}

        {currentView === 'help-center' && (
          <HelpCenterPage 
            onOpenContact={() => setIsContactOpen(true)} 
            onNavigate={navigateTo} 
          />
        )}

        {currentView === 'about' && (
          <AboutPage 
            onOpenContact={() => setIsContactOpen(true)} 
            onNavigate={navigateTo} 
          />
        )}

        {currentView === 'manifesto' && (
          <ManifestoPage 
            onOpenContact={() => setIsContactOpen(true)} 
            onNavigate={navigateTo} 
          />
        )}

        {currentView === 'careers' && (
          <CareersPage 
            onOpenContact={() => setIsContactOpen(true)} 
            onNavigate={navigateTo} 
          />
        )}

        {/* Global Footer with links to all pages */}
        <Footer onNavigate={navigateTo} />
      </main>

      {/* Interactive Project Discovery / Consultation Modal */}
      <ProjectModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Capability / Solution Deep Dive Spec Modal */}
      <CapabilityModal
        isOpen={isCapabilityModalOpen}
        onClose={() => setIsCapabilityModalOpen(false)}
        capability={selectedCapability}
        solution={selectedSolution}
        onBookConsultation={() => {
          setIsContactOpen(true);
        }}
      />

      {/* Floating Scroll to Top button when scrolling down */}
      <ScrollToTop />
    </div>
  );
}
