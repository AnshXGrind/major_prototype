# Localization & Offline Strategy

## 🌍 Localization Architecture

MedAid supports **6 languages** with a comprehensive localization strategy that works both online and offline, ensuring healthcare guidance is accessible in users' native languages.

### Supported Languages
| Language | Script | ISO Code | Native Name | Market Priority |
|----------|--------|----------|-------------|-----------------|
| Hindi | Devanagari | hi-IN | हिंदी | High (40%+ users) |
| English | Latin | en-IN | English | High (30%+ users) |
| Telugu | Telugu | te-IN | తెలుగు | Medium (10%+ users) |
| Kannada | Kannada | kn-IN | ಕನ್ನಡ | Medium (8%+ users) |
| Malayalam | Malayalam | ml-IN | മലയാളം | Medium (6%+ users) |
| Tamil | Tamil | ta-IN | தமிழ் | Medium (6%+ users) |

## 📝 Content Localization Pipeline

### 1. UI String Management
```typescript
// i18n structure
interface LocaleStrings {
  common: {
    loading: string;
    error: string;
    retry: string;
    cancel: string;
    confirm: string;
  };
  navigation: {
    home: string;
    chat: string;
    reminders: string;
    sos: string;
    settings: string;
  };
  ai: {
    placeholder: string;
    disclaimer: string;
    thinking: string;
    offline_message: string;
  };
  reminders: {
    add_reminder: string;
    medicine_name: string;
    dosage: string;
    frequency: string;
    time: string;
  };
  sos: {
    emergency_button: string;
    confirm_message: string;
    location_sharing: string;
    contacts_empty: string;
  };
}

// Locale files
// locales/hi-IN.json
{
  "common": {
    "loading": "लोड हो रहा है...",
    "error": "त्रुटि हुई",
    "retry": "फिर से कोशिश करें",
    "cancel": "रद्द करें",
    "confirm": "पुष्टि करें"
  },
  "ai": {
    "disclaimer": "⚠️ यह केवल सामान्य जानकारी है। डॉक्टर की सलाह का विकल्प नहीं।"
  }
}
```

### 2. Translation Workflow
```mermaid
graph TD
    A[Source Strings (EN)] --> B[Professional Translation]
    B --> C[Native Speaker Review]
    C --> D{Medical Accuracy?}
    D -->|No| E[Medical Expert Review]
    D -->|Yes| F[Technical QA]
    E --> F
    F --> G[Integration Testing]
    G --> H[Production Release]
    
    I[User Feedback] --> J[Translation Updates]
    J --> C
```

### 3. Medical Content Localization
```typescript
// Medical content with cultural sensitivity
interface MedicalContent {
  symptoms: {
    [key: string]: {
      en: string;
      hi: string;
      te: string;
      kn: string;
      ml: string;
      ta: string;
      cultural_notes?: string;
    };
  };
  treatments: {
    [key: string]: LocalizedTreatment;
  };
}

// Example: Fever guidance
const feverGuidance: LocalizedTreatment = {
  en: {
    summary: "Fever may indicate infection. Monitor temperature.",
    actions: [
      "Rest and stay hydrated",
      "Take paracetamol if needed", 
      "Monitor temperature every 4 hours"
    ],
    red_flags: "Seek immediate care if fever >102°F or persistent >3 days"
  },
  hi: {
    summary: "बुखार संक्रमण का संकेत हो सकता है। तापमान की निगरानी करें।",
    actions: [
      "आराम करें और पानी पिएं",
      "जरूरत पड़ने पर पैरासिटामोल लें",
      "हर 4 घंटे में तापमान देखें"
    ],
    red_flags: "102°F से ज्यादा बुखार या 3 दिन से ज्यादा रहने पर तुरंत डॉक्टर से मिलें"
  }
};
```

## 🗣️ Voice & Speech Strategy

### Text-to-Speech (TTS) Architecture
```typescript
class TTSManager {
  private voices: Map<string, SpeechSynthesisVoice[]>;
  private fallbackAudio: Map<string, AudioBuffer[]>;
  
  async speak(text: string, language: string): Promise<void> {
    // Try native browser TTS first
    const voice = this.getBestVoice(language);
    if (voice && this.isVoiceQualityAcceptable(voice)) {
      return this.speakWithBrowserTTS(text, voice);
    }
    
    // Fallback to pre-recorded audio for key phrases
    const audioClip = await this.getPreRecordedAudio(text, language);
    if (audioClip) {
      return this.playAudio(audioClip);
    }
    
    // Last resort: show text only
    this.showTextFallback(text);
  }
  
  private getBestVoice(language: string): SpeechSynthesisVoice | null {
    const voices = this.voices.get(language) || [];
    // Prefer local voices over network voices for offline capability
    return voices.find(v => v.localService) || voices[0] || null;
  }
}
```

### Speech Recognition (ASR) Strategy
```typescript
class ASRManager {
  private recognition: SpeechRecognition;
  private languageModels: Map<string, OfflineASR>;
  
  async startListening(language: string): Promise<string> {
    // Configure recognition for Indian languages
    this.recognition.lang = language;
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    
    // Handle Indian English accent
    if (language === 'en-IN') {
      this.recognition.lang = 'en-IN';
    }
    
    return new Promise((resolve, reject) => {
      this.recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        // Post-process for common Indian language patterns
        const corrected = this.correctCommonMistakes(result, language);
        resolve(corrected);
      };
      
      this.recognition.onerror = (error) => {
        // Fallback to text input
        this.showTextInputFallback();
        reject(error);
      };
      
      this.recognition.start();
    });
  }
  
  private correctCommonMistakes(text: string, language: string): string {
    // Language-specific corrections
    const corrections = {
      'hi-IN': [
        ['बुकार', 'बुखार'], // Common mishearing
        ['सिरदर्द', 'सिर दर्द'],
      ],
      'en-IN': [
        ['loose motion', 'diarrhea'],
        ['tummy pain', 'stomach ache'],
      ]
    };
    
    let corrected = text;
    (corrections[language] || []).forEach(([wrong, right]) => {
      corrected = corrected.replace(new RegExp(wrong, 'gi'), right);
    });
    
    return corrected;
  }
}
```

### Voice Quality Matrix
| Language | Browser Support | Quality | Pre-recorded Fallback |
|----------|----------------|---------|----------------------|
| Hindi | Chrome ✓, Safari ✓ | Good | Common phrases |
| English | Universal ✓ | Excellent | Emergency only |
| Telugu | Chrome ✓, Safari ✗ | Fair | Key medical terms |
| Kannada | Chrome ✓, Safari ✗ | Fair | Key medical terms |
| Malayalam | Chrome ✓, Safari ✗ | Fair | Key medical terms |
| Tamil | Chrome ✓, Safari ✓ | Good | Common phrases |

## 💾 Translation & Storage Strategy

### 1. Offline Translation Architecture
```typescript
// Translation service with offline capability
class TranslationService {
  private onlineTranslator: GoogleTranslate;
  private offlineTranslator: IndicTrans2;
  private translationCache: TranslationCache;
  
  async translate(text: string, from: string, to: string): Promise<string> {
    // Check cache first
    const cached = await this.translationCache.get(text, from, to);
    if (cached) return cached;
    
    try {
      // Try offline translation for supported pairs
      if (this.offlineTranslator.supports(from, to)) {
        const result = await this.offlineTranslator.translate(text, from, to);
        await this.translationCache.set(text, from, to, result);
        return result;
      }
      
      // Fallback to online translation
      if (navigator.onLine) {
        const result = await this.onlineTranslator.translate(text, from, to);
        await this.translationCache.set(text, from, to, result);
        return result;
      }
      
      // Last resort: show original text with language indicator
      return `[${from}] ${text}`;
    } catch (error) {
      return this.handleTranslationError(text, from, to, error);
    }
  }
}
```

### 2. IndicTrans2 Integration
```typescript
// Lightweight Indic translation model
class IndicTrans2Offline {
  private model: WebAssemblyModel;
  private vocabulary: Map<string, number>;
  
  async loadModel(languages: string[]): Promise<void> {
    // Load compressed WASM model (<5MB)
    const modelBuffer = await fetch('/models/indictrans2-lite.wasm');
    this.model = await WebAssembly.instantiate(modelBuffer);
    
    // Load vocabulary for target languages
    for (const lang of languages) {
      const vocab = await this.loadVocabulary(lang);
      this.vocabulary.set(lang, vocab);
    }
  }
  
  supports(from: string, to: string): boolean {
    // Supported translation pairs (Indic ↔ English primarily)
    const supportedPairs = [
      ['en', 'hi'], ['hi', 'en'],
      ['en', 'te'], ['te', 'en'],
      ['en', 'kn'], ['kn', 'en'],
      ['en', 'ml'], ['ml', 'en'],
      ['en', 'ta'], ['ta', 'en'],
    ];
    
    return supportedPairs.some(([s, t]) => s === from && t === to);
  }
  
  async translate(text: string, from: string, to: string): Promise<string> {
    // Tokenize input
    const tokens = this.tokenize(text, from);
    
    // Run inference
    const outputTokens = await this.model.translate(tokens, from, to);
    
    // Detokenize output
    return this.detokenize(outputTokens, to);
  }
}
```

### 3. Translation Caching Strategy
```typescript
// IndexedDB cache for translations
class TranslationCache {
  private db: IDBDatabase;
  
  async set(text: string, from: string, to: string, translation: string): Promise<void> {
    const key = this.generateKey(text, from, to);
    const entry: CacheEntry = {
      key,
      text,
      from,
      to,
      translation,
      timestamp: Date.now(),
      access_count: 1,
    };
    
    const transaction = this.db.transaction(['translations'], 'readwrite');
    await transaction.objectStore('translations').put(entry);
  }
  
  async get(text: string, from: string, to: string): Promise<string | null> {
    const key = this.generateKey(text, from, to);
    const transaction = this.db.transaction(['translations'], 'readonly');
    const entry = await transaction.objectStore('translations').get(key);
    
    if (entry) {
      // Update access count for LRU eviction
      entry.access_count++;
      entry.last_accessed = Date.now();
      await this.set(text, from, to, entry.translation);
      return entry.translation;
    }
    
    return null;
  }
  
  private generateKey(text: string, from: string, to: string): string {
    // Generate deterministic hash for cache key
    return btoa(`${from}:${to}:${text.toLowerCase().trim()}`).slice(0, 32);
  }
}
```

## 📱 Offline-First Strategy

### 1. Data Storage Architecture
```typescript
// Offline storage layers
interface OfflineStorage {
  // Critical app data (always cached)
  essential: {
    ui_strings: LocaleStrings;
    canned_responses: MedicalResponse[];
    emergency_numbers: EmergencyContact[];
  };
  
  // User data (persistent)
  user: {
    preferences: UserPreferences;
    reminders: Reminder[];
    chat_history: ChatMessage[];
  };
  
  // Cached data (TTL-based)
  cache: {
    ai_responses: Map<string, CachedResponse>;
    translations: Map<string, Translation>;
    hospital_data: Hospital[];
  };
}

class OfflineStorageManager {
  private essential: EssentialDataStore;
  private user: UserDataStore;
  private cache: CacheStore;
  
  async initialize(): Promise<void> {
    // Load essential data during app initialization
    await this.essential.load();
    
    // Load user data
    await this.user.load();
    
    // Initialize cache with size limits
    await this.cache.initialize({
      maxSizeMB: 50, // Limit cache to 50MB
      evictionPolicy: 'LRU',
    });
  }
  
  async sync(): Promise<void> {
    if (!navigator.onLine) return;
    
    // Sync user data to backend
    await this.user.sync();
    
    // Update essential data if newer version available
    await this.essential.checkForUpdates();
    
    // Preload high-priority cache items
    await this.cache.preload();
  }
}
```

### 2. Offline AI Response System
```typescript
// Canned medical responses for offline use
class OfflineResponseSystem {
  private responses: Map<string, CannedResponse[]>;
  
  constructor() {
    this.responses = new Map([
      ['fever', [
        {
          language: 'hi',
          symptoms: ['बुखार', 'गर्मी', 'तापमान'],
          response: {
            summary: 'बुखार आम समस्या है। आराम करें।',
            actions: ['पानी पिएं', 'आराम करें', 'पैरासिटामोल लें'],
            red_flags: '102°F से ज्यादा बुखार हो तो डॉक्टर से मिलें',
          }
        }
      ]],
      ['headache', [
        {
          language: 'hi',
          symptoms: ['सिरदर्द', 'सिर में दर्द', 'माथे में दर्द'],
          response: {
            summary: 'सिरदर्द के कई कारण हो सकते हैं।',
            actions: ['आराम करें', 'पानी पिएं', 'अंधेरे में आराम करें'],
            red_flags: 'तेज या लगातार दर्द हो तो डॉक्टर से मिलें',
          }
        }
      ]]
    ]);
  }
  
  async findResponse(query: string, language: string): Promise<CannedResponse | null> {
    // Simple keyword matching for offline responses
    const normalizedQuery = this.normalizeText(query, language);
    
    for (const [condition, responses] of this.responses) {
      const langResponse = responses.find(r => r.language === language);
      if (!langResponse) continue;
      
      const match = langResponse.symptoms.some(symptom => 
        normalizedQuery.includes(this.normalizeText(symptom, language))
      );
      
      if (match) {
        return {
          ...langResponse.response,
          disclaimer: this.getDisclaimer(language),
          offline: true,
        };
      }
    }
    
    return null;
  }
}
```

### 3. Progressive Sync Strategy
```typescript
// Background sync for offline actions
class BackgroundSyncManager {
  private syncQueue: SyncAction[];
  private isOnline: boolean;
  
  async queueAction(action: SyncAction): Promise<void> {
    this.syncQueue.push({
      ...action,
      timestamp: Date.now(),
      retryCount: 0,
    });
    
    // Try immediate sync if online
    if (this.isOnline) {
      await this.processSyncQueue();
    }
  }
  
  async processSyncQueue(): Promise<void> {
    if (!navigator.onLine || this.syncQueue.length === 0) return;
    
    const actions = [...this.syncQueue];
    this.syncQueue = [];
    
    for (const action of actions) {
      try {
        await this.executeAction(action);
      } catch (error) {
        // Retry with exponential backoff
        if (action.retryCount < 3) {
          action.retryCount++;
          setTimeout(() => {
            this.syncQueue.push(action);
            this.processSyncQueue();
          }, Math.pow(2, action.retryCount) * 1000);
        } else {
          console.error('Sync action failed permanently:', action);
        }
      }
    }
  }
  
  private async executeAction(action: SyncAction): Promise<void> {
    switch (action.type) {
      case 'CREATE_REMINDER':
        await this.api.createReminder(action.payload);
        break;
      case 'UPDATE_PROFILE':
        await this.api.updateProfile(action.payload);
        break;
      case 'LOG_CHAT':
        await this.api.logChatInteraction(action.payload);
        break;
    }
  }
}
```

## 🔤 Font & Typography Strategy

### Font Loading Strategy
```typescript
// Optimized font loading for Indic scripts
class FontManager {
  private fontFaces: Map<string, FontFace>;
  
  async loadEssentialFonts(): Promise<void> {
    // Load critical fonts during app initialization
    const criticalFonts = [
      { family: 'Noto Sans Devanagari', script: 'hindi', size: '24KB' },
      { family: 'Noto Sans Telugu', script: 'telugu', size: '28KB' },
      { family: 'Noto Sans Kannada', script: 'kannada', size: '26KB' },
    ];
    
    await Promise.all(
      criticalFonts.map(font => this.loadFont(font))
    );
  }
  
  async loadFont(fontConfig: FontConfig): Promise<void> {
    const fontFace = new FontFace(
      fontConfig.family,
      `url('/fonts/${fontConfig.family}.woff2')`,
      { display: 'swap' }
    );
    
    try {
      await fontFace.load();
      document.fonts.add(fontFace);
      this.fontFaces.set(fontConfig.family, fontFace);
    } catch (error) {
      // Fallback to system fonts
      console.warn(`Failed to load ${fontConfig.family}, using system font`);
    }
  }
}
```

### CSS Font Stack
```css
/* Optimized font stacks for each script */
.text-hindi {
  font-family: 'Noto Sans Devanagari', -apple-system, BlinkMacSystemFont, sans-serif;
}

.text-telugu {
  font-family: 'Noto Sans Telugu', sans-serif;
}

.text-kannada {
  font-family: 'Noto Sans Kannada', sans-serif;
}

.text-malayalam {
  font-family: 'Noto Sans Malayalam', sans-serif;
}

.text-tamil {
  font-family: 'Noto Sans Tamil', sans-serif;
}

.text-english {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Responsive typography */
@media (max-width: 768px) {
  .text-base { font-size: 16px; } /* Minimum for readability */
  .text-lg { font-size: 18px; }
  .text-xl { font-size: 20px; }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .text-hindi, .text-telugu, .text-kannada, .text-malayalam, .text-tamil {
    font-weight: 600;
    text-shadow: 0 0 1px currentColor;
  }
}
```

## 📊 Localization Performance Metrics

### Bundle Size Targets
| Asset Type | Size Limit | Compression |
|------------|------------|-------------|
| Core UI strings | 15KB | Gzip |
| Medical content | 50KB per language | Brotli |
| Font files | 30KB per script | WOFF2 |
| Translation model | 5MB total | WebAssembly |
| Voice assets | 100KB per language | MP3/AAC |

### Loading Strategy
```typescript
// Lazy loading for non-critical languages
class LocalizationLoader {
  private loadedLanguages: Set<string> = new Set(['en']);
  
  async loadLanguage(language: string): Promise<void> {
    if (this.loadedLanguages.has(language)) return;
    
    // Load language pack
    const [strings, medicalContent, voice] = await Promise.all([
      import(`./locales/${language}.json`),
      import(`./medical/${language}.json`),
      this.loadVoiceAssets(language),
    ]);
    
    // Register with i18n system
    this.i18n.addResourceBundle(language, 'common', strings);
    this.i18n.addResourceBundle(language, 'medical', medicalContent);
    
    this.loadedLanguages.add(language);
  }
  
  async preloadUserLanguages(preferences: UserPreferences): Promise<void> {
    const { primaryLanguage, secondaryLanguages } = preferences;
    
    // Load primary language immediately
    await this.loadLanguage(primaryLanguage);
    
    // Preload secondary languages in background
    secondaryLanguages.forEach(lang => {
      setTimeout(() => this.loadLanguage(lang), 1000);
    });
  }
}
```

### Quality Assurance Checklist
- [ ] All UI strings translated by native speakers
- [ ] Medical content reviewed by healthcare professionals
- [ ] Cultural sensitivity review completed
- [ ] Voice quality tested on target devices
- [ ] Offline functionality validated for each language
- [ ] Font rendering tested across browsers
- [ ] Translation accuracy validated (>95%)
- [ ] Performance benchmarks met (<3s load time)

---

This comprehensive localization strategy ensures MedAid provides culturally appropriate, linguistically accurate healthcare guidance that works reliably offline across India's diverse language landscape.