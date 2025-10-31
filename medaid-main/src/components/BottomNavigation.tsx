import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../features/i18n/contexts/LanguageContext';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/', icon: '🏠', label: t('nav.home') },
    { path: '/chat', icon: '💬', label: t('nav.chat') },
    { path: '/reminders', icon: '💊', label: t('nav.reminders') },
    { path: '/sos', icon: '🚨', label: t('nav.sos') },
    { path: '/settings', icon: '⚙️', label: t('nav.settings') }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-white/20 px-4 py-2 shadow-2xl">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 transform ${
                isActive 
                  ? 'text-blue-600 bg-blue-100/80 scale-105 shadow-lg' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 hover:scale-105'
              }`}
            >
              <span className={`text-xl mb-1 transition-transform ${isActive ? 'scale-110' : ''}`}>
                {item.icon}
              </span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;