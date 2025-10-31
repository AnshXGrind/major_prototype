import React from 'react';
import { useLanguage, SupportedLanguage } from '../features/i18n/contexts/LanguageContext';

const Header: React.FC = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();

  const languages: { code: SupportedLanguage; name: string; native: string }[] = [
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'en', name: 'English', native: 'English' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' }
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl">🩺</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">{t('app.title')}</h1>
              <p className="text-blue-100 text-xs">Healthcare in your language</p>
            </div>
          </div>
          
          <div className="relative">
            <select
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-white/30 transition-all duration-300"
              title="Select Language"
              aria-label="Select Language"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="text-gray-800">
                  {lang.native}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;