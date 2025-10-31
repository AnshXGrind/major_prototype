import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './features/i18n/contexts/LanguageContext';
import { NetworkProvider } from './shared/contexts/NetworkContext';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import LoadingSpinner from './components/LoadingSpinner';
import OfflineBanner from './components/OfflineBanner';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const RemindersPage = lazy(() => import('./pages/RemindersPage'));
const SOSPage = lazy(() => import('./pages/SOSPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const HealthRecordsPage = lazy(() => import('./pages/HealthRecordsPage'));
const SymptomCheckerPage = lazy(() => import('./pages/SymptomCheckerPage'));

function App() {
  return (
    <NetworkProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col safe-area-inset">
            <OfflineBanner />
            <Header />
            
            <main className="flex-1 pb-16">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/reminders" element={<RemindersPage />} />
                  <Route path="/sos" element={<SOSPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/health-records" element={<HealthRecordsPage />} />
                  <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
                </Routes>
              </Suspense>
            </main>
            
            <BottomNavigation />
          </div>
        </Router>
      </LanguageProvider>
    </NetworkProvider>
  );
}

export default App;