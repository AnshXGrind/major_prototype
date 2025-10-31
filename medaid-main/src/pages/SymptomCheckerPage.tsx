import React, { useState } from 'react';
import { useLanguage } from '../features/i18n/contexts/LanguageContext';

interface Symptom {
  id: string;
  name: string;
  severity: number; // 1-10 scale
  bodyPart: string;
  duration: string;
  description?: string;
  timestamp: Date;
}

interface BodyPart {
  id: string;
  name: string;
  position: { x: number; y: number };
  symptoms?: string[];
}

const SymptomCheckerPage: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [activeTab, setActiveTab] = useState<'body-map' | 'history' | 'analysis'>('body-map');
  const [showAddSymptom, setShowAddSymptom] = useState(false);
  const [newSymptom, setNewSymptom] = useState({
    name: '',
    severity: 5,
    bodyPart: '',
    duration: '',
    description: ''
  });

  const bodyParts: BodyPart[] = [
    { id: 'head', name: currentLanguage === 'hi' ? 'सिर' : 'Head', position: { x: 50, y: 15 } },
    { id: 'neck', name: currentLanguage === 'hi' ? 'गर्दन' : 'Neck', position: { x: 50, y: 25 } },
    { id: 'chest', name: currentLanguage === 'hi' ? 'छाती' : 'Chest', position: { x: 50, y: 40 } },
    { id: 'abdomen', name: currentLanguage === 'hi' ? 'पेट' : 'Abdomen', position: { x: 50, y: 55 } },
    { id: 'left-arm', name: currentLanguage === 'hi' ? 'बाएं हाथ' : 'Left Arm', position: { x: 25, y: 45 } },
    { id: 'right-arm', name: currentLanguage === 'hi' ? 'दाएं हाथ' : 'Right Arm', position: { x: 75, y: 45 } },
    { id: 'left-leg', name: currentLanguage === 'hi' ? 'बाएं पैर' : 'Left Leg', position: { x: 40, y: 80 } },
    { id: 'right-leg', name: currentLanguage === 'hi' ? 'दाएं पैर' : 'Right Leg', position: { x: 60, y: 80 } },
  ];

  const commonSymptoms = [
    { hi: 'सिरदर्द', en: 'Headache', bodyPart: 'head' },
    { hi: 'बुखार', en: 'Fever', bodyPart: 'head' },
    { hi: 'खांसी', en: 'Cough', bodyPart: 'chest' },
    { hi: 'सांस की तकलीफ', en: 'Breathing difficulty', bodyPart: 'chest' },
    { hi: 'पेट में दर्द', en: 'Stomach pain', bodyPart: 'abdomen' },
    { hi: 'जी मिचलाना', en: 'Nausea', bodyPart: 'abdomen' },
    { hi: 'जोड़ों में दर्द', en: 'Joint pain', bodyPart: 'left-arm' },
    { hi: 'मांसपेशियों में दर्द', en: 'Muscle pain', bodyPart: 'left-leg' }
  ];

  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return 'text-green-600 bg-green-100';
    if (severity <= 6) return 'text-yellow-600 bg-yellow-100';
    if (severity <= 8) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getSeverityLabel = (severity: number) => {
    if (severity <= 3) return currentLanguage === 'hi' ? 'हल्का' : 'Mild';
    if (severity <= 6) return currentLanguage === 'hi' ? 'मध्यम' : 'Moderate';
    if (severity <= 8) return currentLanguage === 'hi' ? 'गंभीर' : 'Severe';
    return currentLanguage === 'hi' ? 'अत्यधिक गंभीर' : 'Very Severe';
  };

  const addSymptom = () => {
    if (!newSymptom.name || !newSymptom.bodyPart) return;

    const symptom: Symptom = {
      id: Date.now().toString(),
      name: newSymptom.name,
      severity: newSymptom.severity,
      bodyPart: newSymptom.bodyPart,
      duration: newSymptom.duration,
      description: newSymptom.description,
      timestamp: new Date()
    };

    setSymptoms(prev => [...prev, symptom]);
    setNewSymptom({
      name: '',
      severity: 5,
      bodyPart: '',
      duration: '',
      description: ''
    });
    setShowAddSymptom(false);
  };

  const getBodyPartSymptoms = (bodyPartId: string) => {
    return symptoms.filter(s => s.bodyPart === bodyPartId);
  };

  const analyzeSymptoms = () => {
    if (symptoms.length === 0) return null;

    const highSeveritySymptoms = symptoms.filter(s => s.severity >= 7);
    const recentSymptoms = symptoms.filter(s => 
      Date.now() - s.timestamp.getTime() < 24 * 60 * 60 * 1000 // Last 24 hours
    );

    return {
      totalSymptoms: symptoms.length,
      highSeverity: highSeveritySymptoms.length,
      recentSymptoms: recentSymptoms.length,
      avgSeverity: symptoms.reduce((sum, s) => sum + s.severity, 0) / symptoms.length
    };
  };

  const analysis = analyzeSymptoms();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          🩺 {currentLanguage === 'hi' ? 'लक्षण जांचकर्ता' : 'Symptom Checker'}
        </h1>
        <p className="text-gray-600">
          {currentLanguage === 'hi' 
            ? 'अपने लक्षणों को ट्रैक करें और विश्लेषण करें'
            : 'Track and analyze your symptoms'}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
        {[
          { id: 'body-map', label: currentLanguage === 'hi' ? 'बॉडी मैप' : 'Body Map', icon: '🎯' },
          { id: 'history', label: currentLanguage === 'hi' ? 'इतिहास' : 'History', icon: '📊' },
          { id: 'analysis', label: currentLanguage === 'hi' ? 'विश्लेषण' : 'Analysis', icon: '🔬' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-purple-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Body Map Tab */}
      {activeTab === 'body-map' && (
        <div className="space-y-6">
          {/* Interactive Body Map */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              🎯 {currentLanguage === 'hi' ? 'शरीर के हिस्से का चुनाव करें' : 'Select Body Part'}
            </h3>
            
            <div className="relative mx-auto w-[200px] h-[400px]">
              {/* Simple body outline SVG */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full border-2 border-gray-200 rounded-2xl bg-blue-50"
              >
                {/* Body parts as interactive circles */}
                {bodyParts.map(part => {
                  const partSymptoms = getBodyPartSymptoms(part.id);
                  const hasSymptoms = partSymptoms.length > 0;
                  const maxSeverity = hasSymptoms 
                    ? Math.max(...partSymptoms.map(s => s.severity))
                    : 0;
                  
                  return (
                    <g key={part.id}>
                      <circle
                        cx={part.position.x}
                        cy={part.position.y}
                        r="8"
                        className={`cursor-pointer transition-all duration-300 ${
                          selectedBodyPart === part.id
                            ? 'fill-purple-500 stroke-purple-700'
                            : hasSymptoms
                            ? maxSeverity >= 7 ? 'fill-red-400 stroke-red-600' :
                              maxSeverity >= 5 ? 'fill-orange-400 stroke-orange-600' :
                              'fill-yellow-400 stroke-yellow-600'
                            : 'fill-blue-300 stroke-blue-500 hover:fill-blue-400'
                        }`}
                        strokeWidth="2"
                        onClick={() => {
                          setSelectedBodyPart(part.id);
                          setNewSymptom(prev => ({ ...prev, bodyPart: part.id }));
                        }}
                      />
                      <text
                        x={part.position.x}
                        y={part.position.y + 15}
                        textAnchor="middle"
                        className="text-xs font-medium fill-gray-700"
                      >
                        {part.name}
                      </text>
                      {hasSymptoms && (
                        <text
                          x={part.position.x}
                          y={part.position.y - 12}
                          textAnchor="middle"
                          className="text-xs font-bold fill-white"
                        >
                          {partSymptoms.length}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {selectedBodyPart && (
              <div className="mt-4 p-4 bg-purple-50 rounded-2xl">
                <h4 className="font-bold text-purple-800 mb-2">
                  {bodyParts.find(p => p.id === selectedBodyPart)?.name}
                </h4>
                <p className="text-sm text-purple-600 mb-3">
                  {currentLanguage === 'hi' 
                    ? 'इस हिस्से में लक्षण जोड़ें या मौजूदा लक्षण देखें'
                    : 'Add symptoms to this part or view existing ones'}
                </p>
                
                {getBodyPartSymptoms(selectedBodyPart).length > 0 ? (
                  <div className="space-y-2 mb-3">
                    {getBodyPartSymptoms(selectedBodyPart).map(symptom => (
                      <div key={symptom.id} className="bg-white rounded-xl p-3 flex justify-between items-center">
                        <div>
                          <span className="font-medium">{symptom.name}</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getSeverityColor(symptom.severity)}`}>
                            {getSeverityLabel(symptom.severity)}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {symptom.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-purple-600 mb-3">
                    {currentLanguage === 'hi' ? 'कोई लक्षण नहीं' : 'No symptoms'}
                  </p>
                )}

                <button
                  onClick={() => setShowAddSymptom(true)}
                  className="w-full bg-purple-500 text-white py-2 rounded-xl hover:bg-purple-600 transition-colors"
                >
                  + {currentLanguage === 'hi' ? 'लक्षण जोड़ें' : 'Add Symptom'}
                </button>
              </div>
            )}
          </div>

          {/* Quick Symptoms */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              ⚡ {currentLanguage === 'hi' ? 'सामान्य लक्षण' : 'Common Symptoms'}
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {commonSymptoms.map((symptom, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setNewSymptom(prev => ({
                      ...prev,
                      name: currentLanguage === 'hi' ? symptom.hi : symptom.en,
                      bodyPart: symptom.bodyPart
                    }));
                    setSelectedBodyPart(symptom.bodyPart);
                    setShowAddSymptom(true);
                  }}
                  className="bg-gray-50 hover:bg-purple-50 p-3 rounded-xl transition-all duration-300 text-left hover:shadow-md"
                >
                  <div className="font-medium text-gray-800">
                    {currentLanguage === 'hi' ? symptom.hi : symptom.en}
                  </div>
                  <div className="text-xs text-gray-500">
                    {bodyParts.find(p => p.id === symptom.bodyPart)?.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {symptoms.length > 0 ? (
            symptoms
              .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
              .map(symptom => (
                <div
                  key={symptom.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800">{symptom.name}</h3>
                      <p className="text-sm text-gray-600">
                        📍 {bodyParts.find(p => p.id === symptom.bodyPart)?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(symptom.severity)}`}>
                        {getSeverityLabel(symptom.severity)} ({symptom.severity}/10)
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {symptom.timestamp.toLocaleDateString()} {symptom.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  {symptom.duration && (
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">
                        ⏱️ {currentLanguage === 'hi' ? 'अवधि:' : 'Duration:'} {symptom.duration}
                      </span>
                    </div>
                  )}

                  {symptom.description && (
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-sm text-gray-700">{symptom.description}</p>
                    </div>
                  )}
                </div>
              ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {currentLanguage === 'hi' ? 'कोई लक्षण इतिहास नहीं' : 'No Symptom History'}
              </h3>
              <p className="text-gray-500">
                {currentLanguage === 'hi' 
                  ? 'अपना पहला लक्षण जोड़ें'
                  : 'Add your first symptom'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="space-y-6">
          {analysis ? (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{analysis.totalSymptoms}</div>
                  <div className="text-sm text-gray-600">
                    {currentLanguage === 'hi' ? 'कुल लक्षण' : 'Total Symptoms'}
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-center">
                  <div className="text-2xl font-bold text-red-600">{analysis.highSeverity}</div>
                  <div className="text-sm text-gray-600">
                    {currentLanguage === 'hi' ? 'गंभीर लक्षण' : 'Severe Symptoms'}
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">{analysis.recentSymptoms}</div>
                  <div className="text-sm text-gray-600">
                    {currentLanguage === 'hi' ? 'हाल के लक्षण' : 'Recent (24h)'}
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {analysis.avgSeverity.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {currentLanguage === 'hi' ? 'औसत गंभीरता' : 'Avg Severity'}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  💡 {currentLanguage === 'hi' ? 'सुझाव' : 'Recommendations'}
                </h3>
                
                <div className="space-y-3">
                  {analysis.highSeverity > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <h4 className="font-bold text-red-800 mb-2">
                        🚨 {currentLanguage === 'hi' ? 'तत्काल चिकित्सा सहायता की सिफारिश' : 'Immediate Medical Attention Recommended'}
                      </h4>
                      <p className="text-sm text-red-700">
                        {currentLanguage === 'hi' 
                          ? 'आपके पास गंभीर लक्षण हैं। कृपया तुरंत डॉक्टर से संपर्क करें।'
                          : 'You have severe symptoms. Please consult a doctor immediately.'}
                      </p>
                    </div>
                  )}
                  
                  {analysis.avgSeverity > 5 && analysis.highSeverity === 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <h4 className="font-bold text-yellow-800 mb-2">
                        ⚠️ {currentLanguage === 'hi' ? 'चिकित्सा परामर्श की सिफारिश' : 'Medical Consultation Recommended'}
                      </h4>
                      <p className="text-sm text-yellow-700">
                        {currentLanguage === 'hi' 
                          ? 'आपके लक्षण निरंतर हैं। डॉक्टर से सलाह लेना अच्छा होगा।'
                          : 'Your symptoms are persistent. Consider consulting a doctor.'}
                      </p>
                    </div>
                  )}
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h4 className="font-bold text-blue-800 mb-2">
                      📋 {currentLanguage === 'hi' ? 'निरंतर निगरानी' : 'Continue Monitoring'}
                    </h4>
                    <p className="text-sm text-blue-700">
                      {currentLanguage === 'hi' 
                        ? 'अपने लक्षणों को ट्रैक करते रहें और कोई बदलाव हो तो रिकॉर्ड करें।'
                        : 'Keep tracking your symptoms and record any changes.'}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔬</div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {currentLanguage === 'hi' ? 'कोई विश्लेषण उपलब्ध नहीं' : 'No Analysis Available'}
              </h3>
              <p className="text-gray-500">
                {currentLanguage === 'hi' 
                  ? 'विश्लेषण के लिए कुछ लक्षण जोड़ें'
                  : 'Add some symptoms to see analysis'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Add Symptom Modal */}
      {showAddSymptom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 w-full max-w-md shadow-2xl border border-white/20">
            <h2 className="text-xl font-bold mb-4">
              {currentLanguage === 'hi' ? 'नया लक्षण जोड़ें' : 'Add New Symptom'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLanguage === 'hi' ? 'लक्षण का नाम' : 'Symptom Name'}
                </label>
                <input
                  type="text"
                  value={newSymptom.name}
                  onChange={(e) => setNewSymptom(prev => ({...prev, name: e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={currentLanguage === 'hi' ? 'जैसे: सिरदर्द' : 'e.g., Headache'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLanguage === 'hi' ? 'गंभीरता (1-10)' : 'Severity (1-10)'}
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newSymptom.severity}
                    onChange={(e) => setNewSymptom(prev => ({...prev, severity: Number(e.target.value)}))}
                    className="flex-1"
                    title={currentLanguage === 'hi' ? 'गंभीरता स्लाइडर' : 'Severity Slider'}
                    aria-label={currentLanguage === 'hi' ? 'गंभीरता स्लाइडर' : 'Severity Slider'}
                  />
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(newSymptom.severity)}`}>
                    {newSymptom.severity}/10
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLanguage === 'hi' ? 'अवधि' : 'Duration'}
                </label>
                <select
                  value={newSymptom.duration}
                  onChange={(e) => setNewSymptom(prev => ({...prev, duration: e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  title={currentLanguage === 'hi' ? 'अवधि चुनें' : 'Select Duration'}
                  aria-label={currentLanguage === 'hi' ? 'अवधि चुनें' : 'Select Duration'}
                >
                  <option value="">{currentLanguage === 'hi' ? 'अवधि चुनें' : 'Select duration'}</option>
                  <option value={currentLanguage === 'hi' ? '1 घंटे से कम' : 'Less than 1 hour'}>
                    {currentLanguage === 'hi' ? '1 घंटे से कम' : 'Less than 1 hour'}
                  </option>
                  <option value={currentLanguage === 'hi' ? '1-6 घंटे' : '1-6 hours'}>
                    {currentLanguage === 'hi' ? '1-6 घंटे' : '1-6 hours'}
                  </option>
                  <option value={currentLanguage === 'hi' ? '1 दिन' : '1 day'}>
                    {currentLanguage === 'hi' ? '1 दिन' : '1 day'}
                  </option>
                  <option value={currentLanguage === 'hi' ? '2-3 दिन' : '2-3 days'}>
                    {currentLanguage === 'hi' ? '2-3 दिन' : '2-3 days'}
                  </option>
                  <option value={currentLanguage === 'hi' ? '1 सप्ताह से अधिक' : 'More than 1 week'}>
                    {currentLanguage === 'hi' ? '1 सप्ताह से अधिक' : 'More than 1 week'}
                  </option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLanguage === 'hi' ? 'विवरण (वैकल्पिक)' : 'Description (Optional)'}
                </label>
                <textarea
                  value={newSymptom.description}
                  onChange={(e) => setNewSymptom(prev => ({...prev, description: e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  placeholder={currentLanguage === 'hi' ? 'अतिरिक्त विवरण...' : 'Additional details...'}
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddSymptom(false)}
                className="flex-1 px-4 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300"
              >
                {currentLanguage === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                onClick={addSymptom}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300"
              >
                {currentLanguage === 'hi' ? 'जोड़ें' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomCheckerPage;