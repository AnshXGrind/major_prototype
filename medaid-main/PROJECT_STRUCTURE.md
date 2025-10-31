# MedAid Project Structure

```
medaid/
├── README.md                   # Main project documentation
├── LICENSE                     # MIT License with medical disclaimer
├── CONTRIBUTING.md            # Contribution guidelines
├── .env.example               # Environment variables template
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.ts            # Vite build configuration
├── public/
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service worker
│   ├── icons/                # App icons (various sizes)
│   ├── fonts/                # Indic script fonts
│   └── audio/                # Pre-recorded TTS fallbacks
├── src/
│   ├── main.tsx              # App entry point
│   ├── App.tsx               # Root component
│   ├── index.css             # Global styles
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Basic UI components (Button, Input, etc.)
│   │   ├── LanguageSelector.tsx
│   │   ├── VoiceInput.tsx
│   │   ├── NotificationBanner.tsx
│   │   └── LoadingSpinner.tsx
│   ├── features/             # Feature-specific modules
│   │   ├── ai-assistant/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   ├── reminders/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   ├── sos/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   ├── i18n/
│   │   │   ├── locales/
│   │   │   ├── hooks/
│   │   │   └── services/
│   │   └── voice/
│   │       ├── hooks/
│   │       ├── services/
│   │       └── types/
│   ├── shared/               # Shared utilities and services
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API clients and utilities
│   │   ├── utils/           # Helper functions
│   │   ├── types/           # TypeScript type definitions
│   │   └── constants/       # App constants
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx
│   │   ├── ChatPage.tsx
│   │   ├── RemindersPage.tsx
│   │   ├── SOSPage.tsx
│   │   └── SettingsPage.tsx
│   └── assets/              # Static assets
│       ├── images/
│       ├── icons/
│       └── sounds/
├── docs/                    # Comprehensive documentation
│   ├── MVP_CRITERIA.md      # MVP definition and acceptance criteria
│   ├── ARCHITECTURE.md      # System architecture and design
│   ├── LOCALIZATION.md      # Localization and offline strategy
│   ├── SECURITY.md          # Security, privacy, and legal framework
│   ├── ROADMAP.md           # Development roadmap and next steps
│   └── API.md               # API documentation
├── tests/                   # Test files
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   └── e2e/               # End-to-end tests
├── scripts/                # Build and deployment scripts
│   ├── build.sh           # Production build script
│   ├── deploy.sh          # Deployment script
│   └── analyze-bundle.js  # Bundle size analysis
└── .github/               # GitHub configuration
    ├── workflows/         # CI/CD workflows
    ├── ISSUE_TEMPLATE/    # Issue templates
    └── PULL_REQUEST_TEMPLATE.md
```

## Key Files Description

### Core Application Files
- **src/main.tsx**: Application entry point with PWA service worker registration
- **src/App.tsx**: Root component with routing, language provider, and global state
- **src/components/**: Reusable UI components following atomic design principles
- **src/features/**: Feature modules with co-located components, hooks, and services

### Configuration Files
- **package.json**: Dependencies, scripts, and PWA configuration
- **vite.config.ts**: Build configuration with PWA plugin and optimization settings
- **tailwind.config.js**: Tailwind CSS with custom Indic font support
- **tsconfig.json**: Strict TypeScript configuration for better type safety

### PWA Files
- **public/manifest.json**: PWA manifest with app metadata and icons
- **public/sw.js**: Service worker for offline functionality and caching
- **public/icons/**: App icons for various platforms and sizes

### Documentation
- **docs/**: Comprehensive project documentation covering all aspects
- **README.md**: Main project overview and quick start guide
- **CONTRIBUTING.md**: Detailed contribution guidelines and processes

### Development Tools
- **tests/**: Test suites for unit, integration, and e2e testing
- **scripts/**: Automation scripts for building, deploying, and analyzing
- **.github/**: GitHub Actions workflows and issue templates

This structure supports:
- **Scalable Architecture**: Clear separation of concerns
- **Feature-Based Organization**: Related code stays together
- **Reusability**: Shared components and utilities
- **Type Safety**: Comprehensive TypeScript coverage
- **PWA Requirements**: Offline functionality and installability
- **Internationalization**: Proper i18n structure
- **Testing**: Comprehensive test coverage
- **Documentation**: Self-documenting codebase