import React, { useState } from 'react';
import { useLanguage } from '../features/i18n/contexts/LanguageContext';

interface Reminder {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  time: string;
  isActive: boolean;
  nextDue: Date;
}

const RemindersPage: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      medicineName: currentLanguage === 'hi' ? 'पैरासिटामोल' : 'Paracetamol',
      dosage: '500mg',
      frequency: currentLanguage === 'hi' ? 'दिन में दो बार' : 'Twice daily',
      time: '09:00, 21:00',
      isActive: true,
      nextDue: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours from now
    },
    {
      id: '2',
      medicineName: currentLanguage === 'hi' ? 'विटामिन डी' : 'Vitamin D',
      dosage: '1000 IU',
      frequency: currentLanguage === 'hi' ? 'रोज सुबह' : 'Once daily',
      time: '08:00',
      isActive: true,
      nextDue: new Date(Date.now() + 18 * 60 * 60 * 1000) // 18 hours from now
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    medicineName: '',
    dosage: '',
    frequency: '',
    time: ''
  });

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { ...reminder, isActive: !reminder.isActive }
        : reminder
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const addReminder = () => {
    if (!newReminder.medicineName || !newReminder.time) {
      alert('Please fill in medicine name and time');
      return;
    }

    const reminder: Reminder = {
      id: Date.now().toString(),
      ...newReminder,
      isActive: true,
      nextDue: new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now
    };

    setReminders(prev => [...prev, reminder]);
    setNewReminder({ medicineName: '', dosage: '', frequency: '', time: '' });
    setShowAddForm(false);
  };

  const formatNextDue = (date: Date): string => {
    const now = new Date();
    const diffHours = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60));
    const diffMins = Math.floor((date.getTime() - now.getTime()) / (1000 * 60)) % 60;

    if (diffHours < 0) {
      return currentLanguage === 'hi' ? 'समय निकल गया' : 'Overdue';
    } else if (diffHours === 0) {
      return currentLanguage === 'hi' ? `${diffMins} मिनट में` : `In ${diffMins} min`;
    } else {
      return currentLanguage === 'hi' ? `${diffHours} घंटे में` : `In ${diffHours}h`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          💊 {t('nav.reminders')}
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          + {t('reminders.add')}
        </button>
      </div>

      {/* Modern Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
          <div className="text-3xl font-bold text-green-600">{reminders.filter(r => r.isActive).length}</div>
          <div className="text-sm text-gray-600 font-medium">
            {currentLanguage === 'hi' ? 'सक्रिय रिमाइंडर' : 'Active Reminders'}
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
          <div className="text-3xl font-bold text-blue-600">{reminders.length}</div>
          <div className="text-sm text-gray-600 font-medium">
            {currentLanguage === 'hi' ? 'कुल दवाएं' : 'Total Medicines'}
          </div>
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className={`bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-l-4 hover:shadow-xl transition-all duration-300 ${
              reminder.isActive ? 'border-green-500' : 'border-gray-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {reminder.medicineName}
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>📊 {reminder.dosage}</div>
                  <div>🔄 {reminder.frequency}</div>
                  <div>⏰ {reminder.time}</div>
                  <div className={`font-medium ${
                    reminder.nextDue.getTime() < Date.now() ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    📅 {formatNextDue(reminder.nextDue)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleReminder(reminder.id)}
                  className={`w-12 h-6 rounded-full ${
                    reminder.isActive ? 'bg-green-500' : 'bg-gray-300'
                  } relative transition-colors`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    reminder.isActive ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
                
                <button
                  onClick={() => deleteReminder(reminder.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 hover:shadow-md"
                  title={t('reminders.delete')}
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reminders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💊</div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            {currentLanguage === 'hi' ? 'कोई रिमाइंडर नहीं' : 'No Reminders Yet'}
          </h3>
          <p className="text-gray-500 mb-4">
            {currentLanguage === 'hi' 
              ? 'अपनी पहली दवा का रिमाइंडर जोड़ें' 
              : 'Add your first medicine reminder'}
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-2xl shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            + {t('reminders.add')}
          </button>
        </div>
      )}

      {/* Add Reminder Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 w-full max-w-md shadow-2xl border border-white/20">
            <h2 className="text-xl font-bold mb-4">
              {t('reminders.add')}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('reminders.title')}
                </label>
                <input
                  type="text"
                  value={newReminder.medicineName}
                  onChange={(e) => setNewReminder(prev => ({...prev, medicineName: e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-all duration-300"
                  placeholder={t('reminders.title')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLanguage === 'hi' ? 'खुराक' : 'Dosage'}
                </label>
                <input
                  type="text"
                  value={newReminder.dosage}
                  onChange={(e) => setNewReminder(prev => ({...prev, dosage: e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="500mg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLanguage === 'hi' ? 'आवृत्ति' : 'Frequency'}
                </label>
                <select
                  value={newReminder.frequency}
                  onChange={(e) => setNewReminder(prev => ({...prev, frequency: e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">
                    {currentLanguage === 'hi' ? 'आवृत्ति चुनें' : 'Select frequency'}
                  </option>
                  <option value={currentLanguage === 'hi' ? 'दिन में एक बार' : 'Once daily'}>
                    {currentLanguage === 'hi' ? 'दिन में एक बार' : 'Once daily'}
                  </option>
                  <option value={currentLanguage === 'hi' ? 'दिन में दो बार' : 'Twice daily'}>
                    {currentLanguage === 'hi' ? 'दिन में दो बार' : 'Twice daily'}
                  </option>
                  <option value={currentLanguage === 'hi' ? 'दिन में तीन बार' : 'Three times daily'}>
                    {currentLanguage === 'hi' ? 'दिन में तीन बार' : 'Three times daily'}
                  </option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('reminders.time')}
                </label>
                <input
                  type="text"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder(prev => ({...prev, time: e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-all duration-300"
                  placeholder="09:00, 21:00"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={addReminder}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
              >
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemindersPage;