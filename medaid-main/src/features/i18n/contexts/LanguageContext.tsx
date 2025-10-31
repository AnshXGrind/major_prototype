import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SupportedLanguage = 'hi' | 'en' | 'te' | 'kn' | 'ml' | 'ta';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Comprehensive translations
const translations = {
  hi: {
    'app.title': 'MedAid',
    'nav.home': 'होम',
    'nav.chat': 'चैट',
    'nav.reminders': 'रिमाइंडर',
    'nav.sos': 'SOS',
    'nav.settings': 'सेटिंग्स',
    'home.welcome': 'MedAid में आपका स्वागत है',
    'home.subtitle': 'आपकी भाषा में स्वास्थ्य सहायता',
    'home.features.ai.title': 'AI स्वास्थ्य सहायक',
    'home.features.ai.desc': 'अपनी भाषा में स्वास्थ्य मार्गदर्शन पाएं',
    'home.features.reminders.title': 'दवा रिमाइंडर',
    'home.features.reminders.desc': 'अपनी दवाएं कभी न भूलें',
    'home.features.sos.title': 'आपातकालीन SOS',
    'home.features.sos.desc': 'जरूरत के समय तुरंत मदद पाएं',
    'home.status.online': 'ऑनलाइन',
    'home.status.offline': 'ऑफलाइन',
    'home.status.fast': 'तेज़',
    'home.status.slow': 'धीमा',
    'home.stats.languages': 'भाषाएं',
    'home.stats.available': 'उपलब्ध',
    'home.stats.offline': 'ऑफलाइन तैयार',
    'chat.placeholder': 'अपने लक्षण बताएं...',
    'chat.disclaimer': '⚠️ यह केवल सामान्य जानकारी है। डॉक्टर की सलाह लें।',
    'chat.voice.title': 'आवाज़ इनपुट',
    'chat.send.title': 'संदेश भेजें',
    'chat.offline.mode': 'ऑफलाइन मोड - सीमित उत्तर उपलब्ध',
    'offline.banner': 'आप ऑफ़लाइन हैं। कुछ सुविधाएं सीमित हैं।',
    'sos.button': 'आपातकाल',
    'sos.description': 'तत्काल सहायता के लिए दबाएं',
    'reminders.add': 'रिमाइंडर जोड़ें',
    'reminders.title': 'दवा का नाम',
    'reminders.time': 'समय',
    'reminders.frequency': 'आवृत्ति',
    'reminders.save': 'सहेजें',
    'reminders.cancel': 'रद्द करें',
    'reminders.edit': 'संपादित करें',
    'reminders.delete': 'हटाएं',
    'common.ok': 'ठीक है',
    'common.cancel': 'रद्द करें',
    'common.save': 'सहेजें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.add': 'जोड़ें',
    'common.back': 'वापस',
    'common.next': 'आगे',
    'common.done': 'पूरा हुआ',
    'sos.title': 'आपातकालीन सहायता',
    'sos.subtitle': 'तत्काल मदद के लिए नीचे दिए गए बटन का उपयोग करें',
    'sos.sending': 'भेज रहे हैं...',
    'sos.emergency': 'आपातकाल',
    'sos.ambulance': 'एम्बुलेंस',
    'sos.police': 'पुलिस',
    'sos.fire': 'अग्निशमन',
    'sos.health': 'मुफ्त स्वास्थ्य',
    'sos.contacts': 'आपातकालीन संपर्क',
    'sos.call': 'कॉल करें',
    'sos.location': 'स्थान प्राप्त हुआ',
    'sos.instructions': 'उपयोग निर्देश',
    'sos.instruction1': 'SOS बटन दबाने से आपका स्थान और मदद का संदेश भेजा जाएगा',
    'sos.instruction2': 'गंभीर आपातकाल में तुरंत 108 डायल करें',
    'sos.instruction3': 'अपने आपातकालीन संपर्क सेटिंग्स में अपडेट करते रहें'
  },
  en: {
    'app.title': 'MedAid',
    'nav.home': 'Home',
    'nav.chat': 'Chat',
    'nav.reminders': 'Reminders',
    'nav.sos': 'SOS',
    'nav.settings': 'Settings',
    'home.welcome': 'Welcome to MedAid',
    'home.subtitle': 'Healthcare guidance in your language',
    'home.features.ai.title': 'AI Health Assistant',
    'home.features.ai.desc': 'Get health guidance in your language',
    'home.features.reminders.title': 'Medicine Reminders',
    'home.features.reminders.desc': 'Never miss your medications',
    'home.features.sos.title': 'Emergency SOS',
    'home.features.sos.desc': 'Get help when you need it most',
    'home.status.online': 'Online',
    'home.status.offline': 'Offline',
    'home.status.fast': 'Fast',
    'home.status.slow': 'Slow',
    'home.stats.languages': 'Languages',
    'home.stats.available': 'Available',
    'home.stats.offline': 'Offline Ready',
    'chat.placeholder': 'Describe your symptoms...',
    'chat.disclaimer': '⚠️ This is general information only. Consult a doctor.',
    'chat.voice.title': 'Voice Input',
    'chat.send.title': 'Send Message',
    'chat.offline.mode': 'Offline mode - Limited responses available',
    'offline.banner': 'You are offline. Some features are limited.',
    'sos.button': 'Emergency',
    'sos.description': 'Press for immediate help',
    'reminders.add': 'Add Reminder',
    'reminders.title': 'Medicine Name',
    'reminders.time': 'Time',
    'reminders.frequency': 'Frequency',
    'reminders.save': 'Save',
    'reminders.cancel': 'Cancel',
    'reminders.edit': 'Edit',
    'reminders.delete': 'Delete',
    'common.ok': 'OK',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.done': 'Done',
    'sos.title': 'Emergency Assistance',
    'sos.subtitle': 'Use the button below for immediate help',
    'sos.sending': 'Sending...',
    'sos.emergency': 'EMERGENCY',
    'sos.ambulance': 'Ambulance',
    'sos.police': 'Police',
    'sos.fire': 'Fire',
    'sos.health': 'Free Health',
    'sos.contacts': 'Emergency Contacts',
    'sos.call': 'Call',
    'sos.location': 'Location Acquired',
    'sos.instructions': 'Usage Instructions',
    'sos.instruction1': 'Pressing SOS will send your location and help message',
    'sos.instruction2': 'For serious emergencies, immediately dial 108',
    'sos.instruction3': 'Keep your emergency contacts updated in Settings'
  },
  te: {
    'app.title': 'MedAid',
    'nav.home': 'హోమ్',
    'nav.chat': 'చాట్',
    'nav.reminders': 'రిమైండర్లు',
    'nav.sos': 'SOS',
    'nav.settings': 'సెట్టింగ్స్',
    'home.welcome': 'MedAid కు స్వాగతం',
    'home.subtitle': 'మీ భాషలో ఆరోగ్య మార్గదర్శకత్వం',
    'home.features.ai.title': 'AI ఆరోగ్య సహాయకుడు',
    'home.features.ai.desc': 'మీ భాషలో ఆరోగ్య మార్గదర్శకత్వం పొందండి',
    'home.features.reminders.title': 'మందుల రిమైండర్లు',
    'home.features.reminders.desc': 'మీ మందులను ఎప్పుడూ మరువకండి',
    'home.features.sos.title': 'అత్యవసర SOS',
    'home.features.sos.desc': 'అవసరమైనప్పుడు వెంటనే సహాయం పొందండి',
    'home.status.online': 'ఆన్‌లైన్',
    'home.status.offline': 'ఆఫ్‌లైన్',
    'home.status.fast': 'వేగంగా',
    'home.status.slow': 'నెమ్మదిగా',
    'home.stats.languages': 'భాషలు',
    'home.stats.available': 'అందుబాటులో',
    'home.stats.offline': 'ఆఫ్‌లైన్ సిద్ధం',
    'chat.placeholder': 'మీ లక్షణాలను వివరించండి...',
    'chat.disclaimer': '⚠️ ఇది సాధారణ సమాచారం మాత్రమే. వైద్యుని సలహా తీసుకోండి.',
    'chat.voice.title': 'వాయిస్ ఇన్‌పుట్',
    'chat.send.title': 'సందేశం పంపండి',
    'chat.offline.mode': 'ఆఫ్‌లైన్ మోడ్ - పరిమిత ప్రతిస్పందనలు అందుబాటులో ఉన్నాయి',
    'reminders.add': 'రిమైండర్ జోడించండి',
    'reminders.title': 'మందు పేరు',
    'reminders.time': 'సమయం',
    'reminders.frequency': 'ఫ్రీక్వెన్సీ',
    'reminders.save': 'సేవ్ చేయండి',
    'reminders.cancel': 'రద్దు చేయండి',
    'reminders.edit': 'సవరించండి',
    'reminders.delete': 'తొలగించండి',
    'common.ok': 'సరే',
    'common.cancel': 'రద్దు చేయండి',
    'common.save': 'సేవ్ చేయండి',
    'common.edit': 'సవరించండి',
    'common.delete': 'తొలగించండి',
    'common.add': 'జోడించండి',
    'common.back': 'వెనుకకు',
    'common.next': 'తదుపరి',
    'common.done': 'పూర్తయింది'
  },
  kn: {
    'app.title': 'MedAid',
    'nav.home': 'ಮುಖ್ಯಪುಟ',
    'nav.chat': 'ಚಾಟ್',
    'nav.reminders': 'ನೆನಪಿಸುವಿಕೆಗಳು',
    'nav.sos': 'SOS',
    'nav.settings': 'ಸಂಯೋಜನೆಗಳು',
    'home.welcome': 'MedAid ಗೆ ಸ್ವಾಗತ',
    'home.subtitle': 'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನ',
    'home.features.ai.title': 'AI ಆರೋಗ್ಯ ಸಹಾಯಕ',
    'home.features.ai.desc': 'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ',
    'home.features.reminders.title': 'ಔಷಧಿ ನೆನಪಿಸುವಿಕೆಗಳು',
    'home.features.reminders.desc': 'ನಿಮ್ಮ ಔಷಧಿಗಳನ್ನು ಎಂದಿಗೂ ಮರೆಯಬೇಡಿ',
    'home.features.sos.title': 'ತುರ್ತು SOS',
    'home.features.sos.desc': 'ಅಗತ್ಯದ ಸಮಯದಲ್ಲಿ ತಕ್ಷಣ ಸಹಾಯ ಪಡೆಯಿರಿ',
    'home.status.online': 'ಆನ್‌ಲೈನ್',
    'home.status.offline': 'ಆಫ್‌ಲೈನ್',
    'home.status.fast': 'ವೇಗವಾಗಿ',
    'home.status.slow': 'ನಿಧಾನವಾಗಿ',
    'home.stats.languages': 'ಭಾಷೆಗಳು',
    'home.stats.available': 'ಲಭ್ಯವಿದೆ',
    'home.stats.offline': 'ಆಫ್‌ಲೈನ್ ಸಿದ್ಧ',
    'chat.placeholder': 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ...',
    'chat.disclaimer': '⚠️ ಇದು ಸಾಮಾನ್ಯ ಮಾಹಿತಿ ಮಾತ್ರ. ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    'chat.voice.title': 'ಧ್ವನಿ ಇನ್‌ಪುಟ್',
    'chat.send.title': 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
    'chat.offline.mode': 'ಆಫ್‌ಲೈನ್ ಮೋಡ್ - ಸೀಮಿತ ಪ್ರತಿಕ್ರಿಯೆಗಳು ಲಭ್ಯವಿವೆ',
    'reminders.add': 'ನೆನಪಿಸುವಿಕೆ ಸೇರಿಸಿ',
    'reminders.title': 'ಔಷಧಿ ಹೆಸರು',
    'reminders.time': 'ಸಮಯ',
    'reminders.frequency': 'ಆವರ್ತನೆ',
    'reminders.save': 'ಉಳಿಸಿ',
    'reminders.cancel': 'ರದ್ದುಗೊಳಿಸಿ',
    'reminders.edit': 'ಸಂಪಾದಿಸಿ',
    'reminders.delete': 'ಅಳಿಸಿ',
    'common.ok': 'ಸರಿ',
    'common.cancel': 'ರದ್ದುಗೊಳಿಸಿ',
    'common.save': 'ಉಳಿಸಿ',
    'common.edit': 'ಸಂಪಾದಿಸಿ',
    'common.delete': 'ಅಳಿಸಿ',
    'common.add': 'ಸೇರಿಸಿ',
    'common.back': 'ಹಿಂದೆ',
    'common.next': 'ಮುಂದೆ',
    'common.done': 'ಮುಗಿದಿದೆ'
  },
  ml: {
    'app.title': 'MedAid',
    'nav.home': 'ഹോം',
    'nav.chat': 'ചാറ്റ്',
    'nav.reminders': 'റിമൈൻഡറുകൾ',
    'nav.sos': 'SOS',
    'nav.settings': 'ക്രമീകരണങ്ങൾ',
    'home.welcome': 'MedAid ലേക്ക് സ്വാഗതം',
    'home.subtitle': 'നിങ്ങളുടെ ഭാഷയിൽ ആരോഗ്യ മാർഗ്ഗനിർദ്ദേശം',
    'home.features.ai.title': 'AI ആരോഗ്യ സഹായി',
    'home.features.ai.desc': 'നിങ്ങളുടെ ഭാഷയിൽ ആരോഗ്യ മാർഗ്ഗനിർദ്ദേശം നേടുക',
    'home.features.reminders.title': 'മരുന്ന് റിമൈൻഡറുകൾ',
    'home.features.reminders.desc': 'നിങ്ങളുടെ മരുന്നുകൾ ഒരിക്കലും മറക്കരുത്',
    'home.features.sos.title': 'അടിയന്തിര SOS',
    'home.features.sos.desc': 'ആവശ്യമുള്ളപ്പോൾ ഉടനടി സഹായം നേടുക',
    'home.status.online': 'ഓൺലൈൻ',
    'home.status.offline': 'ഓഫ്‌ലൈൻ',
    'home.status.fast': 'വേഗത്തിൽ',
    'home.status.slow': 'പതുക്കെ',
    'home.stats.languages': 'ഭാഷകൾ',
    'home.stats.available': 'ലഭ്യമാണ്',
    'home.stats.offline': 'ഓഫ്‌ലൈൻ റെഡി',
    'chat.placeholder': 'നിങ്ങളുടെ ലക്ഷണങ്ങൾ വിവരിക്കുക...',
    'chat.disclaimer': '⚠️ ഇത് പൊതു വിവരങ്ങൾ മാത്രമാണ്. ഡോക്ടറെ സമീപിക്കുക.',
    'chat.voice.title': 'വോയിസ് ഇൻപുട്ട്',
    'chat.send.title': 'സന്ദേശം അയയ്ക്കുക',
    'chat.offline.mode': 'ഓഫ്‌ലൈൻ മോഡ് - പരിമിതമായ പ്രതികരണങ്ങൾ ലഭ്യമാണ്',
    'reminders.add': 'റിമൈൻഡർ ചേർക്കുക',
    'reminders.title': 'മരുന്നിന്റെ പേര്',
    'reminders.time': 'സമയം',
    'reminders.frequency': 'ആവൃത്തി',
    'reminders.save': 'സേവ് ചെയ്യുക',
    'reminders.cancel': 'റദ്ദാക്കുക',
    'reminders.edit': 'എഡിറ്റ് ചെയ്യുക',
    'reminders.delete': 'ഇല്ലാതാക്കുക',
    'common.ok': 'ശരി',
    'common.cancel': 'റദ്ദാക്കുക',
    'common.save': 'സേവ് ചെയ്യുക',
    'common.edit': 'എഡിറ്റ് ചെയ്യുക',
    'common.delete': 'ഇല്ലാതാക്കുക',
    'common.add': 'ചേർക്കുക',
    'common.back': 'തിരികെ',
    'common.next': 'അടുത്തത്',
    'common.done': 'പൂർത്തിയായി'
  },
  ta: {
    'app.title': 'MedAid',
    'nav.home': 'முகப்பு',
    'nav.chat': 'அரட்டை',
    'nav.reminders': 'நினைவூட்டல்கள்',
    'nav.sos': 'SOS',
    'nav.settings': 'அமைப்புகள்',
    'home.welcome': 'MedAid க்கு வரவேற்கிறோம்',
    'home.subtitle': 'உங்கள் மொழியில் சுகாதார வழிகாட்டுதல்',
    'home.features.ai.title': 'AI சுகாதார உதவியாளர்',
    'home.features.ai.desc': 'உங்கள் மொழியில் சுகாதார வழிகாட்டுதல் பெறுங்கள்',
    'home.features.reminders.title': 'மருந்து நினைவூட்டல்கள்',
    'home.features.reminders.desc': 'உங்கள் மருந்துகளை ஒருபோதும் மறக்காதீர்கள்',
    'home.features.sos.title': 'அவசர SOS',
    'home.features.sos.desc': 'தேவையான போது உடனடி உதவி பெறுங்கள்',
    'home.status.online': 'ஆன்லைன்',
    'home.status.offline': 'ஆஃப்லைன்',
    'home.status.fast': 'வேகமாக',
    'home.status.slow': 'மெதுவாக',
    'home.stats.languages': 'மொழிகள்',
    'home.stats.available': 'கிடைக்கிறது',
    'home.stats.offline': 'ஆஃப்லைன் தயார்',
    'chat.placeholder': 'உங்கள் அறிகுறிகளை விவரிக்கவும்...',
    'chat.disclaimer': '⚠️ இது பொதுவான தகவல் மட்டுமே. மருத்துவரை அணுகவும்.',
    'chat.voice.title': 'குரல் உள்ளீடு',
    'chat.send.title': 'செய்தி அனுப்பு',
    'chat.offline.mode': 'ஆஃப்லைன் பயன்முறை - மட்டுப்படுத்தப்பட்ட பதில்கள் கிடைக்கின்றன',
    'reminders.add': 'நினைவூட்டல் சேர்க்கவும்',
    'reminders.title': 'மருந்தின் பெயர்',
    'reminders.time': 'நேரம்',
    'reminders.frequency': 'அதிர்வெண்',
    'reminders.save': 'சேமிக்கவும்',
    'reminders.cancel': 'ரத்து செய்யவும்',
    'reminders.edit': 'திருத்தவும்',
    'reminders.delete': 'நீக்கவும்',
    'common.ok': 'சரி',
    'common.cancel': 'ரத்து செய்யவும்',
    'common.save': 'சேமிக்கவும்',
    'common.edit': 'திருத்தவும்',
    'common.delete': 'நீக்கவும்',
    'common.add': 'சேர்க்கவும்',
    'common.back': 'பின்',
    'common.next': 'அடுத்தது',
    'common.done': 'முடிந்தது'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('hi');

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('medaid-language') as SupportedLanguage;
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'hi' || browserLang === 'te' || browserLang === 'kn' || 
          browserLang === 'ml' || browserLang === 'ta') {
        setCurrentLanguage(browserLang as SupportedLanguage);
      }
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    localStorage.setItem('medaid-language', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    const langTranslations = translations[currentLanguage] as Record<string, string>;
    const englishTranslations = translations.en as Record<string, string>;
    return langTranslations?.[key] || englishTranslations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};