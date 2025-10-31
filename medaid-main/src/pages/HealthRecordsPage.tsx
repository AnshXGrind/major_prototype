import React, { useState } from 'react';
import { useLanguage } from '../features/i18n/contexts/LanguageContext';

interface HealthRecord {
  id: string;
  type: 'prescription' | 'lab-report' | 'vaccination' | 'medical-history' | 'document';
  title: string;
  date: Date;
  doctor?: string;
  hospital?: string;
  imageUrl?: string;
  notes?: string;
  tags: string[];
}

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  birthDate: Date;
  bloodGroup?: string;
  allergies: string[];
  chronicConditions: string[];
  avatar: string;
}

const HealthRecordsPage: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [selectedMember, setSelectedMember] = useState<string>('self');
  const [activeTab, setActiveTab] = useState<'records' | 'family' | 'scanner'>('records');
  const [showAddForm, setShowAddForm] = useState(false);

  const [familyMembers] = useState<FamilyMember[]>([
    {
      id: 'self',
      name: currentLanguage === 'hi' ? 'आप' : 'You',
      relation: currentLanguage === 'hi' ? 'स्वयं' : 'Self',
      birthDate: new Date('1990-01-01'),
      bloodGroup: 'B+',
      allergies: ['Peanuts'],
      chronicConditions: [],
      avatar: '👤'
    },
    {
      id: 'mother',
      name: currentLanguage === 'hi' ? 'माता जी' : 'Mother',
      relation: currentLanguage === 'hi' ? 'माता' : 'Mother',
      birthDate: new Date('1965-05-15'),
      bloodGroup: 'A+',
      allergies: ['Dust'],
      chronicConditions: ['Diabetes', 'Hypertension'],
      avatar: '👩'
    },
    {
      id: 'father',
      name: currentLanguage === 'hi' ? 'पिता जी' : 'Father',
      relation: currentLanguage === 'hi' ? 'पिता' : 'Father',
      birthDate: new Date('1962-08-20'),
      bloodGroup: 'O+',
      allergies: [],
      chronicConditions: ['High Cholesterol'],
      avatar: '👨'
    }
  ]);

  const [healthRecords] = useState<HealthRecord[]>([
    {
      id: '1',
      type: 'prescription',
      title: currentLanguage === 'hi' ? 'बुखार के लिए दवा' : 'Fever Medication',
      date: new Date('2024-10-25'),
      doctor: 'Dr. Sharma',
      hospital: 'City Hospital',
      notes: currentLanguage === 'hi' ? '3 दिन तक लें' : 'Take for 3 days',
      tags: ['fever', 'paracetamol']
    },
    {
      id: '2',
      type: 'lab-report',
      title: currentLanguage === 'hi' ? 'खून की जांच' : 'Blood Test Report',
      date: new Date('2024-10-20'),
      doctor: 'Dr. Patel',
      hospital: 'Metro Labs',
      notes: currentLanguage === 'hi' ? 'सभी रिपोर्ट सामान्य' : 'All reports normal',
      tags: ['blood-test', 'routine']
    },
    {
      id: '3',
      type: 'vaccination',
      title: currentLanguage === 'hi' ? 'COVID-19 बूस्टर' : 'COVID-19 Booster',
      date: new Date('2024-09-15'),
      hospital: 'Government Hospital',
      notes: currentLanguage === 'hi' ? 'कोई साइड इफेक्ट नहीं' : 'No side effects',
      tags: ['covid', 'vaccination', 'booster']
    }
  ]);

  const recordTypeIcons = {
    prescription: '💊',
    'lab-report': '🧪',
    vaccination: '💉',
    'medical-history': '📋',
    document: '📄'
  };

  const currentMember = familyMembers.find(m => m.id === selectedMember) || familyMembers[0];
  
  const filteredRecords = healthRecords.filter(record => 
    selectedMember === 'self' || record.tags.includes(selectedMember)
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server
      alert(`${currentLanguage === 'hi' ? 'फ़ाइल अपलोड हो गई' : 'File uploaded'}: ${file.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          📋 {currentLanguage === 'hi' ? 'स्वास्थ्य रिकॉर्ड' : 'Health Records'}
        </h1>
        <p className="text-gray-600">
          {currentLanguage === 'hi' 
            ? 'अपने और परिवार के स्वास्थ्य रिकॉर्ड प्रबंधित करें'
            : 'Manage your and family health records'}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
        {[
          { id: 'records', label: currentLanguage === 'hi' ? 'रिकॉर्ड' : 'Records', icon: '📋' },
          { id: 'family', label: currentLanguage === 'hi' ? 'परिवार' : 'Family', icon: '👨‍👩‍👧‍👦' },
          { id: 'scanner', label: currentLanguage === 'hi' ? 'स्कैनर' : 'Scanner', icon: '📷' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-blue-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Family Member Selector */}
      {activeTab === 'records' && (
        <div className="mb-6">
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {familyMembers.map(member => (
              <button
                key={member.id}
                onClick={() => setSelectedMember(member.id)}
                className={`flex flex-col items-center space-y-2 p-4 rounded-2xl min-w-[80px] transition-all duration-300 ${
                  selectedMember === member.id
                    ? 'bg-blue-500 text-white shadow-lg scale-105'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-blue-50'
                }`}
              >
                <div className="text-2xl">{member.avatar}</div>
                <div className="text-xs font-medium text-center">{member.name}</div>
                <div className="text-xs opacity-75">{member.relation}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Records Tab */}
      {activeTab === 'records' && (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg">
              <div className="text-2xl font-bold text-blue-600">{filteredRecords.length}</div>
              <div className="text-xs text-gray-600">
                {currentLanguage === 'hi' ? 'कुल रिकॉर्ड' : 'Total Records'}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg">
              <div className="text-2xl font-bold text-green-600">
                {filteredRecords.filter(r => r.type === 'vaccination').length}
              </div>
              <div className="text-xs text-gray-600">
                {currentLanguage === 'hi' ? 'टीकाकरण' : 'Vaccinations'}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg">
              <div className="text-2xl font-bold text-purple-600">
                {filteredRecords.filter(r => r.type === 'prescription').length}
              </div>
              <div className="text-xs text-gray-600">
                {currentLanguage === 'hi' ? 'प्रिस्क्रिप्शन' : 'Prescriptions'}
              </div>
            </div>
          </div>

          {/* Add Record Button */}
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-2xl shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 mb-6"
          >
            + {currentLanguage === 'hi' ? 'नया रिकॉर्ड जोड़ें' : 'Add New Record'}
          </button>

          {/* Records List */}
          <div className="space-y-4">
            {filteredRecords.map(record => (
              <div
                key={record.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <span className="text-xl">{recordTypeIcons[record.type]}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{record.title}</h3>
                      <p className="text-sm text-gray-600">
                        {record.date.toLocaleDateString(currentLanguage === 'hi' ? 'hi-IN' : 'en-IN')}
                      </p>
                    </div>
                  </div>
                  <button 
                    className="p-2 text-gray-400 hover:text-blue-500 rounded-xl hover:bg-blue-50 transition-all duration-300"
                    title={currentLanguage === 'hi' ? 'विकल्प' : 'Options'}
                    aria-label={currentLanguage === 'hi' ? 'विकल्प' : 'Options'}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>

                {(record.doctor || record.hospital) && (
                  <div className="text-sm text-gray-600 mb-2">
                    {record.doctor && <span>👨‍⚕️ {record.doctor}</span>}
                    {record.doctor && record.hospital && <span className="mx-2">•</span>}
                    {record.hospital && <span>🏥 {record.hospital}</span>}
                  </div>
                )}

                {record.notes && (
                  <div className="bg-gray-50 rounded-xl p-3 mb-3">
                    <p className="text-sm text-gray-700">{record.notes}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {record.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {filteredRecords.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  {currentLanguage === 'hi' ? 'कोई रिकॉर्ड नहीं मिला' : 'No Records Found'}
                </h3>
                <p className="text-gray-500">
                  {currentLanguage === 'hi' 
                    ? 'अपना पहला स्वास्थ्य रिकॉर्ड जोड़ें'
                    : 'Add your first health record'}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Family Tab */}
      {activeTab === 'family' && (
        <div className="space-y-4">
          {familyMembers.map(member => (
            <div
              key={member.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-2xl text-white">
                  {member.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-gray-600">{member.relation}</p>
                  <p className="text-sm text-gray-500">
                    {currentLanguage === 'hi' ? 'जन्म तारीख:' : 'DOB:'} {' '}
                    {member.birthDate.toLocaleDateString(currentLanguage === 'hi' ? 'hi-IN' : 'en-IN')}
                  </p>
                </div>
                <button 
                  className="p-2 text-gray-400 hover:text-blue-500 rounded-xl hover:bg-blue-50 transition-all duration-300"
                  title={currentLanguage === 'hi' ? 'संपादित करें' : 'Edit'}
                  aria-label={currentLanguage === 'hi' ? 'संपादित करें' : 'Edit'}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-xl p-3">
                  <h4 className="font-medium text-red-800 mb-2">
                    🩸 {member.bloodGroup || 'Unknown'}
                  </h4>
                  <p className="text-xs text-red-600">
                    {currentLanguage === 'hi' ? 'रक्त समूह' : 'Blood Group'}
                  </p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-3">
                  <h4 className="font-medium text-yellow-800 mb-2">
                    ⚠️ {member.allergies.length || 0}
                  </h4>
                  <p className="text-xs text-yellow-600">
                    {currentLanguage === 'hi' ? 'एलर्जी' : 'Allergies'}
                  </p>
                </div>
              </div>

              {member.allergies.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">
                    {currentLanguage === 'hi' ? 'एलर्जी:' : 'Allergies:'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.allergies.map(allergy => (
                      <span
                        key={allergy}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs"
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {member.chronicConditions.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">
                    {currentLanguage === 'hi' ? 'मुख्य बीमारियां:' : 'Chronic Conditions:'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.chronicConditions.map(condition => (
                      <span
                        key={condition}
                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105">
            + {currentLanguage === 'hi' ? 'परिवार का सदस्य जोड़ें' : 'Add Family Member'}
          </button>
        </div>
      )}

      {/* Scanner Tab */}
      {activeTab === 'scanner' && (
        <div className="space-y-6">
          {/* Document Scanner */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              📷 {currentLanguage === 'hi' ? 'डॉक्यूमेंट स्कैनर' : 'Document Scanner'}
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="bg-blue-50 hover:bg-blue-100 p-6 rounded-2xl transition-all duration-300 text-center">
                <div className="text-3xl mb-2">💊</div>
                <div className="font-medium text-blue-800">
                  {currentLanguage === 'hi' ? 'प्रिस्क्रिप्शन' : 'Prescription'}
                </div>
              </button>
              <button className="bg-green-50 hover:bg-green-100 p-6 rounded-2xl transition-all duration-300 text-center">
                <div className="text-3xl mb-2">🧪</div>
                <div className="font-medium text-green-800">
                  {currentLanguage === 'hi' ? 'लैब रिपोर्ट' : 'Lab Report'}
                </div>
              </button>
              <button className="bg-purple-50 hover:bg-purple-100 p-6 rounded-2xl transition-all duration-300 text-center">
                <div className="text-3xl mb-2">💉</div>
                <div className="font-medium text-purple-800">
                  {currentLanguage === 'hi' ? 'टीकाकरण कार्ड' : 'Vaccination Card'}
                </div>
              </button>
              <button className="bg-orange-50 hover:bg-orange-100 p-6 rounded-2xl transition-all duration-300 text-center">
                <div className="text-3xl mb-2">📄</div>
                <div className="font-medium text-orange-800">
                  {currentLanguage === 'hi' ? 'अन्य डॉक्यूमेंट' : 'Other Document'}
                </div>
              </button>
            </div>

            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            
            <label
              htmlFor="file-upload"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-2xl shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>📁</span>
              <span>{currentLanguage === 'hi' ? 'फ़ाइल चुनें या कैमरा खोलें' : 'Choose File or Open Camera'}</span>
            </label>
          </div>

          {/* Recent Scans */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              📱 {currentLanguage === 'hi' ? 'हाल ही के स्कैन' : 'Recent Scans'}
            </h3>
            
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📷</div>
              <p>{currentLanguage === 'hi' ? 'अभी तक कोई स्कैन नहीं' : 'No scans yet'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthRecordsPage;