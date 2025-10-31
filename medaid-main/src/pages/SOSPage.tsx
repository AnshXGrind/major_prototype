import React, { useState } from 'react';
import { useLanguage } from '../features/i18n/contexts/LanguageContext';

const SOSPage: React.FC = () => {
  const { currentLanguage, t } = useLanguage();
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [emergencyContacts] = useState([
    { name: 'Dr. Sharma', phone: '+91-9876543210', relation: 'Family Doctor' },
    { name: 'Maya (Sister)', phone: '+91-9876543211', relation: 'Emergency Contact' }
  ]);

  const handleSOSActivation = async () => {
    if (isSOSActive) return;

    setIsSOSActive(true);

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(coords);
          sendSOSAlert(coords);
        },
        (error) => {
          console.error('Location error:', error);
          sendSOSAlert(null);
        }
      );
    } else {
      sendSOSAlert(null);
    }
  };

  const sendSOSAlert = (coords: { lat: number; lng: number } | null) => {
    const message = coords
      ? `🚨 EMERGENCY: Need immediate help. Location: https://maps.google.com/?q=${coords.lat},${coords.lng}`
      : '🚨 EMERGENCY: Need immediate help. Location not available.';

    // In a real app, this would send SMS or call emergency services
    setTimeout(() => {
      alert(`SOS Alert Sent!\n\nMessage: ${message}\n\nSent to: ${emergencyContacts.length} contacts`);
      setIsSOSActive(false);
    }, 3000);
  };

  const cancelSOS = () => {
    setIsSOSActive(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4">
      {/* Modern Emergency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-6 mb-8 text-center shadow-2xl">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
          <div className="text-3xl animate-pulse">🚨</div>
        </div>
        <h1 className="text-2xl font-bold mb-2 tracking-wide">
          {t('sos.title')}
        </h1>
        <p className="text-sm opacity-90 leading-relaxed">
          {t('sos.subtitle')}
        </p>
      </div>

      {/* Modern SOS Button */}
      <div className="text-center mb-8">
        <button
          onClick={handleSOSActivation}
          disabled={isSOSActive}
          className={`w-40 h-40 rounded-full text-white text-2xl font-bold shadow-2xl transition-all duration-300 ${
            isSOSActive 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:scale-95 hover:shadow-3xl transform hover:scale-105'
          }`}
        >
          {isSOSActive ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin text-4xl">⏳</div>
              <div className="text-sm mt-2">
                {t('sos.sending')}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-1">🆘</div>
              <div className="text-sm font-bold tracking-wider">
                {t('sos.emergency')}
              </div>
            </div>
          )}
        </button>

        {isSOSActive && (
          <div className="mt-6">
            <button
              onClick={cancelSOS}
              className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg"
            >
              {t('common.cancel')}
            </button>
          </div>
        )}
      </div>

      {/* Modern Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <a
          href="tel:108"
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20"
        >
          <div className="text-4xl mb-3">🚑</div>
          <div className="font-bold text-gray-800 text-lg">108</div>
          <div className="text-sm text-gray-600 font-medium">
            {t('sos.ambulance')}
          </div>
        </a>

        <a
          href="tel:100"
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20"
        >
          <div className="text-4xl mb-3">👮</div>
          <div className="font-bold text-gray-800 text-lg">100</div>
          <div className="text-sm text-gray-600 font-medium">
            {t('sos.police')}
          </div>
        </a>

        <a
          href="tel:101"
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20"
        >
          <div className="text-4xl mb-3">🔥</div>
          <div className="font-bold text-gray-800 text-lg">101</div>
          <div className="text-sm text-gray-600 font-medium">
            {t('sos.fire')}
          </div>
        </a>

        <a
          href="tel:102"
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20"
        >
          <div className="text-4xl mb-3">🏥</div>
          <div className="font-bold text-gray-800 text-lg">102</div>
          <div className="text-sm text-gray-600 font-medium">
            {t('sos.health')}
          </div>
        </a>
      </div>

      {/* Modern Emergency Contacts */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          📞 {t('sos.contacts')}
        </h2>
        
        {emergencyContacts.length > 0 ? (
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800">{contact.name}</div>
                  <div className="text-sm text-gray-600">{contact.relation}</div>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  📞 {t('sos.call')}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <div className="text-4xl mb-2">📝</div>
            <p>
              {currentLanguage === 'hi' 
                ? 'कोई आपातकालीन संपर्क नहीं मिला। सेटिंग्स में जाकर जोड़ें।'
                : 'No emergency contacts found. Add them in Settings.'}
            </p>
          </div>
        )}
      </div>

      {/* Modern Location Status */}
      {location && (
        <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl p-4 mb-6 shadow-lg">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white">📍</span>
            </div>
            <div>
              <div className="text-sm font-bold text-blue-800">
                {t('sos.location')}
              </div>
              <div className="text-xs text-blue-600 font-mono">
                {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern Instructions */}
      <div className="bg-yellow-50/80 backdrop-blur-sm border border-yellow-200/50 rounded-2xl p-6 shadow-lg">
        <h3 className="font-bold text-yellow-800 mb-4 text-lg flex items-center">
          ⚠️ {t('sos.instructions')}
        </h3>
        <ul className="text-sm text-yellow-700 space-y-3 leading-relaxed">
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2 mt-0.5">•</span>
            <span>{t('sos.instruction1')}</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2 mt-0.5">•</span>
            <span>{t('sos.instruction2')}</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2 mt-0.5">•</span>
            <span>{t('sos.instruction3')}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SOSPage;