import React from 'react';
import { useLanguage, SupportedLanguage } from '../features/i18n/contexts/LanguageContext';

const SettingsPage: React.FC = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();

  const languages: { code: SupportedLanguage; name: string; native: string }[] = [
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'en', name: 'English', native: 'English' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' }
  ];

  const settings = [
    {
      title: currentLanguage === 'hi' ? 'भाषा सेटिंग्स' : 'Language Settings',
      items: [
        {
          icon: '🌐',
          label: currentLanguage === 'hi' ? 'ऐप की भाषा' : 'App Language',
          value: languages.find(l => l.code === currentLanguage)?.native,
          action: 'language'
        }
      ]
    },
    {
      title: currentLanguage === 'hi' ? 'सूचनाएं' : 'Notifications',
      items: [
        {
          icon: '🔔',
          label: currentLanguage === 'hi' ? 'दवा रिमाइंडर' : 'Medicine Reminders',
          value: currentLanguage === 'hi' ? 'चालू' : 'Enabled',
          action: 'notifications'
        },
        {
          icon: '📱',
          label: currentLanguage === 'hi' ? 'आपातकालीन अलर्ट' : 'Emergency Alerts',
          value: currentLanguage === 'hi' ? 'चालू' : 'Enabled',
          action: 'emergency-alerts'
        }
      ]
    },
    {
      title: currentLanguage === 'hi' ? 'गोपनीयता और सुरक्षा' : 'Privacy & Security',
      items: [
        {
          icon: '🔒',
          label: currentLanguage === 'hi' ? 'डेटा गोपनीयता' : 'Data Privacy',
          value: currentLanguage === 'hi' ? 'संरक्षित' : 'Protected',
          action: 'privacy'
        },
        {
          icon: '💾',
          label: currentLanguage === 'hi' ? 'ऑफ़लाइन डेटा' : 'Offline Data',
          value: '2.3 MB',
          action: 'offline-data'
        }
      ]
    },
    {
      title: currentLanguage === 'hi' ? 'सहायता और सहयोग' : 'Help & Support',
      items: [
        {
          icon: '❓',
          label: currentLanguage === 'hi' ? 'सहायता' : 'Help Center',
          value: '',
          action: 'help'
        },
        {
          icon: '📞',
          label: currentLanguage === 'hi' ? 'संपर्क करें' : 'Contact Us',
          value: '',
          action: 'contact'
        },
        {
          icon: '⭐',
          label: currentLanguage === 'hi' ? 'रेटिंग दें' : 'Rate App',
          value: '',
          action: 'rate'
        }
      ]
    },
    {
      title: currentLanguage === 'hi' ? 'ऐप की जानकारी' : 'App Information',
      items: [
        {
          icon: 'ℹ️',
          label: currentLanguage === 'hi' ? 'संस्करण' : 'Version',
          value: '1.0.0',
          action: 'version'
        },
        {
          icon: '📄',
          label: currentLanguage === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy',
          value: '',
          action: 'privacy-policy'
        },
        {
          icon: '📜',
          label: currentLanguage === 'hi' ? 'नियम और शर्तें' : 'Terms of Service',
          value: '',
          action: 'terms'
        }
      ]
    }
  ];

  const handleSettingClick = (action: string) => {
    switch (action) {
      case 'language':
        // Language selector is already handled by the dropdown in header
        break;
      case 'help':
        alert(currentLanguage === 'hi' 
          ? 'सहायता केंद्र जल्द ही आ रहा है!'
          : 'Help Center coming soon!');
        break;
      case 'contact':
        window.open('mailto:support@medaid.app');
        break;
      case 'privacy-policy':
        // In a real app, this would open the privacy policy
        alert(currentLanguage === 'hi'
          ? 'गोपनीयता नीति देखी जा रही है...'
          : 'Opening privacy policy...');
        break;
      case 'terms':
        alert(currentLanguage === 'hi'
          ? 'नियम और शर्तें देखी जा रही हैं...'
          : 'Opening terms of service...');
        break;
      case 'rate':
        alert(currentLanguage === 'hi'
          ? 'धन्यवाद! Play Store पर रेटिंग दें।'
          : 'Thank you! Please rate us on the Play Store.');
        break;
      case 'offline-data':
        const confirmClear = window.confirm(currentLanguage === 'hi'
          ? 'ऑफ़लाइन डेटा साफ़ करना चाहते हैं?'
          : 'Do you want to clear offline data?');
        if (confirmClear) {
          localStorage.clear();
          alert(currentLanguage === 'hi'
            ? 'ऑफ़लाइन डेटा साफ़ कर दिया गया।'
            : 'Offline data cleared.');
        }
        break;
      default:
        console.log('Setting clicked:', action);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          ⚙️ {t('nav.settings')}
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          {currentLanguage === 'hi' 
            ? 'अपनी प्राथमिकताओं को अनुकूलित करें'
            : 'Customize your preferences'}
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settings.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">{section.title}</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={() => handleSettingClick(item.action)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium text-gray-700">{item.label}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item.value && (
                      <span className="text-sm text-gray-500">{item.value}</span>
                    )}
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Language Selector Modal (if needed) */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-4">
        <h2 className="font-semibold text-gray-800 mb-3">
          🌐 {currentLanguage === 'hi' ? 'भाषा चुनें' : 'Select Language'}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`p-3 rounded-lg border transition-colors text-left ${
                currentLanguage === lang.code
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{lang.native}</div>
              <div className="text-sm text-gray-600">{lang.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* App Information Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span>🩺</span>
          <span>MedAid v1.0.0</span>
        </div>
        <p>
          {currentLanguage === 'hi'
            ? 'आपकी स्वास्थ्य, आपकी भाषा, आपकी सहायता'
            : 'Your Health, Your Language, Your Aid'}
        </p>
        <p className="mt-2">
          {currentLanguage === 'hi'
            ? 'भारत में निर्मित 🇮🇳'
            : 'Made in India 🇮🇳'}
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;