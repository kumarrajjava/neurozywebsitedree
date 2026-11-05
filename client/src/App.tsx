import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './features/landing/LandingPage';
import { VoiceWebsiteModal } from './features/onboarding/VoiceWebsiteModal';
import { LiveEditor } from './features/editor/LiveEditor';
import { DashboardView } from './features/dashboard/DashboardView';
import { PublishedSiteView } from './features/public/PublishedSiteView';
import { ProfileView } from './features/profile/ProfileView';
import { AuthModal } from './features/auth/AuthModal';
import { BusinessData, User, AppViewMode } from './types';
import { extractBusinessFromTranscript, SAMPLE_VOICE_PRESETS } from './services/businessExtractor';

export function App() {
  // Navigation View State — landing page always shows fresh on load,
  // but dashboard/profile persist so user is not bounced out unexpectedly
  const [currentView, setCurrentViewState] = useState<AppViewMode>(() => {
    const saved = localStorage.getItem('neurozy_active_view') as AppViewMode;
    // Only persist dashboard and profile across reloads; always start fresh for editor/published-site
    if (saved && ['dashboard', 'profile'].includes(saved)) {
      return saved;
    }
    return 'landing';
  });

  const setCurrentView = (view: AppViewMode) => {
    setCurrentViewState(view);
    localStorage.setItem('neurozy_active_view', view);
  };
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Authenticated User with persistence
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('neurozy_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (_) {}
    }
    // Default demo user so profile is immediately active for testing
    return {
      id: 'usr_lucknow_founder',
      fullName: 'Rajesh Kumar',
      email: 'rajesh@sweetbites.com',
      phoneNumber: '9876543210',
      planTier: 'STARTER'
    };
  });

  // Active Business Data (Seeded initially with the Hazratganj Sweet Bites bakery from the design artwork)
  const [businessData, setBusinessData] = useState<BusinessData>(() => {
    const saved = localStorage.getItem('neurozy_active_business');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (_) {}
    }
    return extractBusinessFromTranscript(SAMPLE_VOICE_PRESETS[0].transcript);
  });

  // Save business changes
  const handleUpdateBusiness = (updated: BusinessData) => {
    setBusinessData(updated);
    localStorage.setItem('neurozy_active_business', JSON.stringify(updated));
  };

  // Save user changes
  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('neurozy_user', JSON.stringify(updatedUser));
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('neurozy_user');
    setUser(null);
    setCurrentView('landing');
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
      
      {/* Top Navbar rendered on Landing, Dashboard, and Profile views */}
      {(currentView === 'landing' || currentView === 'dashboard' || currentView === 'profile') && (
        <Navbar
          currentView={currentView}
          user={user}
          onNavigateHome={() => setCurrentView('landing')}
          onNavigateDashboard={() => setCurrentView('dashboard')}
          onNavigateProfile={() => setCurrentView('profile')}
          onNavigateEditor={() => setCurrentView('editor')}
          onNavigateLiveSite={() => setCurrentView('published-site')}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
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
            onNavigateProfile={() => setCurrentView('profile')}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView
            user={user}
            businessData={businessData}
            onUpdateUser={handleUpdateUser}
            onUpdateBusiness={handleUpdateBusiness}
            onNavigateDashboard={() => setCurrentView('dashboard')}
            onNavigateEditor={() => setCurrentView('editor')}
            onLogout={handleLogout}
          />
        )}

        {currentView === 'editor' && (
          <LiveEditor
            businessData={businessData}
            onUpdateBusiness={handleUpdateBusiness}
            onBackToDashboard={() => setCurrentView('dashboard')}
            onViewPublishedSite={() => setCurrentView('published-site')}
            onNavigateProfile={() => setCurrentView('profile')}
          />
        )}

        {currentView === 'published-site' && (
          <PublishedSiteView
            businessData={businessData}
            onBackToEditor={() => setCurrentView('editor')}
            onBackToDashboard={() => setCurrentView('dashboard')}
            onNavigateProfile={() => setCurrentView('profile')}
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
        user={user}
        onUpdateUserPlan={(plan) => {
          if (user) {
            handleUpdateUser({ ...user, planTier: plan });
          }
        }}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          setCurrentView('dashboard');
        }}
      />

    </div>
  );
}

export default App;
