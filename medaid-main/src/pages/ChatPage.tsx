import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../features/i18n/contexts/LanguageContext';
import { useNetwork } from '../shared/contexts/NetworkContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  offline?: boolean;
}

const ChatPage: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const { isOnline } = useNetwork();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: currentLanguage === 'hi' 
        ? 'नमस्ते! मैं MedAid AI असिस्टेंट हूं। आप अपने स्वास्थ्य के बारे में कोई भी सवाल पूछ सकते हैं।'
        : 'Hello! I\'m the MedAid AI Assistant. You can ask me any health-related questions.',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock AI responses for demo
  const getMockResponse = (query: string, lang: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('fever') || lowerQuery.includes('बुखार')) {
      return lang === 'hi' 
        ? 'बुखार के लिए: आराम करें, खूब पानी पिएं, पैरासिटामोल ले सकते हैं। 102°F से ज्यादा बुखार हो या 3 दिन से ज्यादा रहे तो डॉक्टर से मिलें।'
        : 'For fever: Rest, drink plenty of fluids, you can take paracetamol. See a doctor if fever >102°F or persists >3 days.';
    }
    
    if (lowerQuery.includes('headache') || lowerQuery.includes('सिरदर्द')) {
      return lang === 'hi'
        ? 'सिरदर्द के लिए: आराम करें, पानी पिएं, अंधेरे में आराम करें। बहुत तेज दर्द हो या बार-बार हो तो डॉक्टर से मिलें।'
        : 'For headache: Rest, hydrate, rest in a dark room. See a doctor if severe or recurring.';
    }

    if (lowerQuery.includes('cold') || lowerQuery.includes('cough') || lowerQuery.includes('खांसी')) {
      return lang === 'hi'
        ? 'खांसी-जुकाम के लिए: गर्म पानी पिएं, भाप लें, आराम करें। 1 सप्ताह से ज्यादा हो तो डॉक्टर से मिलें।'
        : 'For cold/cough: Drink warm water, take steam, rest. See a doctor if persists >1 week.';
    }

    return lang === 'hi'
      ? 'मुझे खुशी होगी अगर आप अपने लक्षण और अधिक विस्तार से बता सकें। कृपया याद रखें कि यह केवल सामान्य जानकारी है।'
      : 'I\'d be happy to help if you can describe your symptoms in more detail. Please remember this is general information only.';
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getMockResponse(inputText, currentLanguage),
        sender: 'ai',
        timestamp: new Date(),
        offline: !isOnline
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, isOnline ? 1000 : 500);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input not supported in this browser');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert('Voice recognition failed. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  : 'bg-white/90 backdrop-blur-sm text-gray-800 border border-white/20'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <div className="flex items-center justify-between mt-1">
                <p className={`text-xs ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                {message.offline && (
                  <span className="text-xs text-yellow-600">📱 Offline</span>
                )}
              </div>
              {message.sender === 'ai' && (
                <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-600">
                  {t('chat.disclaimer')}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-white/20 bg-white/80 backdrop-blur-sm p-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleVoiceInput}
            disabled={isListening}
            className={`p-3 rounded-full ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse shadow-lg' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg'
            } transition-all duration-300 transform hover:scale-105`}
            title={t('chat.voice.title')}
          >
            {isListening ? '🔴' : '🎤'}
          </button>
          
          <div className="flex-1">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chat.placeholder')}
              className="w-full p-3 border border-white/30 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm shadow-inner"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '100px' }}
            />
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            title={t('chat.send.title')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
        {!isOnline && (
          <div className="mt-2 text-sm text-yellow-600 text-center bg-yellow-50 rounded-lg py-2 px-4">
            📱 {t('chat.offline.mode')}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;