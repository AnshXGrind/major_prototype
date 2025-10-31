# MedAid — Your Health, Your Language, Your Aid

> "Healthcare that speaks your language" — bringing medical help to every village, every voice.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-green.svg)](https://web.dev/progressive-web-apps/)
[![Offline First](https://img.shields.io/badge/Offline-First-blue.svg)](#offline-capabilities)

## 🎯 Mission

MedAid is a lightweight, multilingual, AI-powered Progressive Web App (PWA) that brings basic, reliable health guidance to rural and semi-urban India — even on low-speed connections. It supports voice and text in six languages, works offline for core features, provides medicine reminders and an Emergency SOS, and minimizes data usage so healthcare info is accessible to everyone.

## 🚨 Important Disclaimer

**MedAid provides general informational health guidance only. It is not a substitute for professional medical advice, diagnosis, or treatment. In case of a medical emergency, call local emergency services immediately. Do not rely solely on MedAid for medical decisions.**

## 🌟 Problem & Solution

### The Problem
- **Access Gap**: Vast parts of India lack reliable access to doctors and emergency services
- **Language Barrier**: Most digital health information is English-first; regional languages are underserved
- **Connectivity Issues**: Poor/unstable internet (2G/low data) makes many health apps unusable
- **Digital Divide**: Elderly and illiterate users struggle with text-based interfaces

### Our Solution
MedAid provides:
- 🩺 **Multilingual AI Health Assistant** (Hindi, English, Telugu, Kannada, Malayalam, Tamil) — general guidance and triage
- 💊 **Medicine Reminder System** with offline storage and local notifications
- 🚑 **Emergency SOS** that shares live location with nearby hospitals and trusted contacts
- 🗣️ **Voice Input & Text-to-Speech** to support illiterate and elderly users
- 🌐 **Offline-capable core features** via PWA + service worker
- ⚡ **Optimized for low-bandwidth** (<200 KB main bundle target)

## 🎪 Core Features (MVP)

### ✅ Completed Features
- [ ] Multilingual UI (6 languages)
- [ ] AI Symptom Guidance
- [ ] Medicine Reminders
- [ ] Emergency SOS Button
- [ ] Voice Input + TTS
- [ ] Offline Mode (PWA)
- [ ] Low-bandwidth optimization

### 🔮 Planned Features
- [ ] Hospital Locator with GPS
- [ ] Telemedicine Integration
- [ ] Government Health API Integration (Ayushman Bharat)
- [ ] Community Health Dashboard

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React.js + Tailwind CSS | Lightweight, responsive UI |
| **State & Storage** | React + IndexedDB (localForage) | Offline-first data persistence |
| **PWA** | Workbox Service Worker | Caching, background sync |
| **AI Assistant** | OpenAI API / Hugging Face | Health guidance (with safety) |
| **Translation** | IndicTrans2 + Google Translate API | Multilingual support |
| **Voice** | Web Speech API | Speech-to-text and text-to-speech |
| **Backend** | Firebase / Supabase | Auth, database, hosting |
| **Maps & SOS** | Google Maps API + Geolocation | Location services |
| **SMS Fallback** | Twilio / MSG91 | Emergency notifications |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account (optional for backend)

### Installation

```bash
# Clone the repository
git clone https://github.com/AnshXGrind/medaid.git
cd medaid

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Setup

```bash
# .env.local
REACT_APP_FIREBASE_API_KEY=your_firebase_key
REACT_APP_OPENAI_API_KEY=your_openai_key
REACT_APP_GOOGLE_MAPS_API_KEY=your_maps_key
```

## 📱 PWA Installation

MedAid can be installed as a Progressive Web App:

1. Open the app in your mobile browser
2. Tap "Add to Home Screen" when prompted
3. The app will work offline with cached content

## 🌍 Supported Languages

- 🇮🇳 **Hindi** (हिंदी)
- 🇬🇧 **English**
- 🇮🇳 **Telugu** (తెలుగు)
- 🇮🇳 **Kannada** (ಕನ್ನಡ)
- 🇮🇳 **Malayalam** (മലയാളം)
- 🇮🇳 **Tamil** (தமிழ்)

## 🔒 Privacy & Security

- **Minimal Data Collection**: Only essential information is stored
- **End-to-End Encryption**: Sensitive data encrypted in transit and at rest
- **Offline-First**: Personal data stays on your device when possible
- **Transparent Privacy Policy**: Available in all supported languages

## 📖 Documentation

- [MVP & Acceptance Criteria](docs/MVP_CRITERIA.md)
- [System Architecture](docs/ARCHITECTURE.md)
- [Localization Strategy](docs/LOCALIZATION.md)
- [Security & Privacy](docs/SECURITY.md)
- [Development Roadmap](docs/ROADMAP.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## 🎯 Target Users

- **Primary**: Rural & semi-urban residents with limited internet access
- **Secondary**: Elderly users who prefer voice over typing
- **Tertiary**: Non-English speakers needing reliable health support

## 📊 Success Metrics

- Monthly Active Users in target geographies
- Percentage of queries handled offline vs online
- Time-to-first-answer on 2G networks
- SOS delivery success rate
- User satisfaction scores in local languages

## 🛣️ Roadmap

### Phase 0: Foundations (2-4 weeks)
- ✅ Basic React PWA setup
- ✅ Multi-language UI shell
- ✅ Service worker caching
- ✅ Local reminders system

### Phase 1: Core MVP (6-10 weeks)
- 🔄 AI Assistant integration
- 🔄 Voice input/output
- 🔄 SOS emergency system
- 🔄 Offline capabilities

### Phase 2: Enhance & Scale (6-8 weeks)
- 📋 Full localization testing
- 📋 Performance optimization
- 📋 Accessibility improvements
- 📋 Beta user testing

### Phase 3: Production & Partnerships
- 📋 Government API integration
- 📋 Telemedicine features
- 📋 Community health tools

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and development process.

### Development Setup

```bash
# Run tests
npm test

# Build for production
npm run build

# Serve production build locally
npm run serve
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **IndicTrans2** team for multilingual NLP models
- **Indian healthcare workers** for domain expertise
- **Rural beta testers** for valuable feedback
- **Open source community** for foundational tools

## 📞 Contact & Support

- **Project Lead**: [AnshXGrind](https://github.com/AnshXGrind)
- **Issues**: [GitHub Issues](https://github.com/AnshXGrind/medaid/issues)
- **Discussions**: [GitHub Discussions](https://github.com/AnshXGrind/medaid/discussions)

---

**Made with ❤️ in India, for India 🇮🇳**

> "Because healthcare shouldn't depend on connectivity"