import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './features/landing/LandingPage';
import { VoiceWebsiteModal } from './features/onboarding/VoiceWebsiteModal';
import { LiveEditor } from './features/editor/LiveEditor';
import { DashboardView } from './features/dashboard/DashboardView';
import { PublishedSiteView } from './features/public/PublishedSiteView';
import { AuthModal } from './features/auth/AuthModal';
import { BusinessData, User } from './types';
import { extractBusinessFromTranscript, SAMPLE_VOICE_PRESETS } from './services/businessExtractor';

export function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'editor' | 'published-site'>('landing');
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Authenticated User
  const [user, setUser] = useState<User | null>(null);

  // Active Business Data (Seeded initially with the Hazratganj Sweet Bites bakery from the design artwork)
  const [businessData, setBusinessData] = useState<BusinessData>(() => {
    const saved = localStorage.getItem('neurozy_active_business');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (_) {}
    }
    // Default matching reference graphic
    return extractBusinessFromTranscript(SAMPLE_VOICE_PRESETS[0].transcript);
  });

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('neurozy_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (_) {}
    }
  }, []);

  // Save business changes
  const handleUpdateBusiness = (updated: BusinessData) => {
    setBusinessData(updated);
    localStorage.setItem('neurozy_active_business', JSON.stringify(updated));
  };

  // Callback when voice generation finishes
  const handleWebsiteGenerated = (generated: BusinessData) => {
    handleUpdateBusiness(generated);
    setIsCreateModalOpen(false);
    setCurrentView('editor');
  };

  // Callback from landing page preset click
  const handleSelectPreset = (transcript: string) => {
    const generated = extractBusinessFromTranscript(transcript);
    handleUpdateBusiness(generated);
    setIsCreateModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      
      {/* Navbar rendered on Landing and Dashboard views */}
      {(currentView === 'landing' || currentView === 'dashboard') && (
        <Navbar
          user={user}
          onNavigateHome={() => setCurrentView('landing')}
          onOpenDashboard={() => setCurrentView('dashboard')}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            user={user}
            businessData={businessData}
            onOpenEditor={() => setCurrentView('editor')}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
            onViewPublishedSite={() => setCurrentView('published-site')}
          />
        )}

        {currentView === 'editor' && (
          <LiveEditor
            businessData={businessData}
            onUpdateBusiness={handleUpdateBusiness}
            onBackToDashboard={() => setCurrentView('dashboard')}
            onViewPublishedSite={() => setCurrentView('published-site')}
          />
        )}

        {currentView === 'published-site' && (
          <PublishedSiteView
            businessData={businessData}
            onBackToEditor={() => setCurrentView('editor')}
          />
        )}
      </main>

      {/* Footer rendered on Landing view */}
      {currentView === 'landing' && <Footer />}

      {/* Voice-to-Website Wizard Modal */}
      <VoiceWebsiteModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onWebsiteGenerated={handleWebsiteGenerated}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
        }}
      />

    </div>
  );
}

export default App;
