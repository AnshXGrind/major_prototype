import React from 'react';
import { useNetwork } from '../shared/contexts/NetworkContext';
import { useLanguage } from '../features/i18n/contexts/LanguageContext';

const OfflineBanner: React.FC = () => {
  const { isOnline } = useNetwork();
  const { t } = useLanguage();

  if (isOnline) return null;

  return (
    <div className="bg-yellow-500 text-white px-4 py-2 text-center text-sm">
      📱 {t('offline.banner')}
    </div>
  );
};

export default OfflineBanner;