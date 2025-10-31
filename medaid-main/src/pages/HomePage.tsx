import React from 'react';
import { useLanguage } from '../features/i18n/contexts/LanguageContext';
import { useNetwork } from '../shared/contexts/NetworkContext';

const HomePage: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const { isOnline, connectionSpeed } = useNetwork();

  const features = [
    {
      icon: '🤖',
      title: t('home.features.ai.title'),
      description: t('home.features.ai.desc'),
      path: '/chat',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      icon: '💊',
      title: t('home.features.reminders.title'),
      description: t('home.features.reminders.desc'),
      path: '/reminders',
      gradient: 'from-green-400 to-green-600'
    },
    {
      icon: '🚨',
      title: t('home.features.sos.title'),
      description: t('home.features.sos.desc'),
      path: '/sos',
      gradient: 'from-red-400 to-red-600'
    },
    {
      icon: '📋',
      title: currentLanguage === 'hi' ? 'स्वास्थ्य रिकॉर्ड' : 'Health Records',
      description: currentLanguage === 'hi' ? 'अपने मेडिकल रिकॉर्ड प्रबंधित करें' : 'Manage your medical records',
      path: '/health-records',
      gradient: 'from-purple-400 to-purple-600'
    },
    {
      icon: '🩺',
      title: currentLanguage === 'hi' ? 'लक्षण जांचकर्ता' : 'Symptom Checker',
      description: currentLanguage === 'hi' ? 'अपने लक्षणों को ट्रैक करें' : 'Track your symptoms',
      path: '/symptom-checker',
      gradient: 'from-pink-400 to-pink-600'
    }
  ];

  const getLanguageFontClass = () => {
    switch (currentLanguage) {
      case 'hi': return 'font-hindi';
      case 'te': return 'font-telugu';
      case 'kn': return 'font-kannada';
      case 'ml': return 'font-malayalam';
      case 'ta': return 'font-tamil';
      default: return '';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ${getLanguageFontClass()}`}>
      {/* Hero Section */}
      <div className="pt-8 pb-12 px-4">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-pulse">🩺</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {t('home.welcome')}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {t('home.subtitle')}
          </p>
          
          {/* Status indicators */}
          <div className="flex justify-center items-center space-x-6 text-sm bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 max-w-fit mx-auto">
            <div className={`flex items-center space-x-1 ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
              <span className={isOnline ? 'animate-pulse' : ''}>{isOnline ? '🟢' : '🔴'}</span>
              <span className="font-medium">{t(`home.status.${isOnline ? 'online' : 'offline'}`)}</span>
            </div>
            {isOnline && (
              <div className="flex items-center space-x-1 text-gray-600">
                <span>📶</span>
                <span className="font-medium">{t(`home.status.${connectionSpeed === 'fast' ? 'fast' : 'slow'}`)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modern Feature Cards */}
        <div className="space-y-4 max-w-md mx-auto">
          {features.map((feature, index) => (
            <a
              key={index}
              href={feature.path}
              className="group block bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl hover:bg-white transition-all duration-300 border border-white/20 transform hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
          <div className="flex items-start space-x-2">
            <span className="text-yellow-600 text-lg mt-0.5">⚠️</span>
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Medical Disclaimer</p>
              <p>{t('chat.disclaimer')}</p>
            </div>
          </div>
        </div>

        {/* Modern Quick Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="text-3xl text-blue-600 mb-2 font-bold">6</div>
            <div className="text-xs text-gray-600 font-medium">{t('home.stats.languages')}</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="text-2xl text-green-600 mb-2 font-bold">24/7</div>
            <div className="text-xs text-gray-600 font-medium">{t('home.stats.available')}</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="text-3xl text-purple-600 mb-2">📱</div>
            <div className="text-xs text-gray-600 font-medium">{t('home.stats.offline')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;