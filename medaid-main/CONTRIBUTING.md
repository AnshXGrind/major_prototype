# Contributing to MedAid

Thank you for your interest in contributing to MedAid! This guide will help you get started with contributing to our mission of making healthcare accessible to everyone in India.

## 🎯 Project Mission

MedAid brings healthcare guidance to rural and semi-urban India through a multilingual, offline-capable Progressive Web App. Your contributions help bridge the healthcare access gap for millions of people.

## 🤝 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Code**: Features, bug fixes, performance improvements
- **Documentation**: User guides, technical docs, translations
- **Design**: UI/UX improvements, accessibility enhancements
- **Content**: Medical content review, language translations
- **Testing**: Bug reports, device testing, user feedback
- **Outreach**: Community engagement, partnership development

### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/AnshXGrind/medaid.git
   cd medaid
   ```

2. **Set up development environment**
   ```bash
   npm install
   cp .env.example .env.local
   npm run dev
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Development Guidelines

### Code Style

- **TypeScript**: Use strict mode, proper type definitions
- **React**: Functional components with hooks
- **Styling**: Tailwind CSS for consistency
- **Testing**: Write tests for new features

### Commit Convention

We follow conventional commits:

```
type(scope): description

Examples:
feat(ai): add offline response fallback
fix(reminder): resolve notification timing bug
docs(readme): update installation instructions
style(ui): improve button accessibility
```

### Code Quality

- Run linting: `npm run lint`
- Run tests: `npm test`
- Check types: `npm run type-check`
- Build check: `npm run build`

## 🌍 Localization Contributions

### Adding a New Language

1. Create locale file: `src/locales/{language-code}.json`
2. Add medical content: `src/medical-content/{language-code}.json`
3. Update language selector: `src/components/LanguageSelector.tsx`
4. Test UI rendering with new script
5. Submit PR with native speaker validation

### Translation Guidelines

- **Accuracy**: Medical translations must be precise
- **Cultural Sensitivity**: Adapt content for local context
- **Simplicity**: Use simple, commonly understood words
- **Consistency**: Maintain terminology across the app

## 🩺 Medical Content Guidelines

### Content Requirements

- **Evidence-Based**: All medical advice must have reliable sources
- **Safety-First**: Include appropriate warnings and disclaimers
- **Cultural Appropriateness**: Consider local health practices
- **Accessibility**: Use simple language for low-literacy users

### Review Process

1. **Medical Expert Review**: Healthcare professional validation
2. **Language Review**: Native speaker accuracy check
3. **Cultural Review**: Local appropriateness assessment
4. **Legal Review**: Compliance with medical disclaimer requirements

## 🔒 Security & Privacy

### Security Guidelines

- Never log sensitive user data
- Encrypt all personal information
- Follow OWASP security guidelines
- Report security issues privately to: security@medaid.app

### Privacy Requirements

- Minimize data collection
- Implement data retention policies
- Ensure GDPR/Indian privacy law compliance
- Obtain explicit consent for data usage

## 🐛 Bug Reports

### Before Reporting

1. Check existing issues
2. Test on multiple devices/browsers
3. Reproduce the bug consistently
4. Check if it's already been fixed

### Bug Report Template

```markdown
**Bug Description**
Clear description of what's wrong

**Steps to Reproduce**
1. Go to...
2. Click on...
3. See error

**Expected Behavior**
What should happen

**Environment**
- Device: [e.g., Android 10, iPhone 12]
- Browser: [e.g., Chrome 95, Safari 15]
- Network: [e.g., 2G, WiFi]
- Language: [e.g., Hindi, Telugu]

**Screenshots/Logs**
Add any relevant screenshots or error logs
```

## 🚀 Feature Requests

### Feature Proposal Template

```markdown
**Problem Statement**
What problem does this feature solve?

**Proposed Solution**
How should this feature work?

**Target Users**
Who would benefit from this feature?

**Success Metrics**
How would we measure success?

**Technical Considerations**
Any technical constraints or requirements?
```

## 🧪 Testing

### Testing Priorities

1. **Core Functionality**: AI responses, reminders, SOS
2. **Offline Capability**: Works without internet
3. **Cross-Device**: Android, iOS, different screen sizes
4. **Network Conditions**: 2G, 3G, intermittent connectivity
5. **Accessibility**: Screen readers, keyboard navigation

### Testing Checklist

- [ ] Feature works in all supported languages
- [ ] Responsive design on mobile devices
- [ ] Offline functionality maintained
- [ ] Performance meets <3s load time on 2G
- [ ] Accessibility guidelines followed
- [ ] Medical disclaimers present where required

## 📋 Pull Request Process

### PR Checklist

- [ ] Code follows style guidelines
- [ ] Tests added for new functionality
- [ ] Documentation updated
- [ ] Medical content reviewed (if applicable)
- [ ] Accessibility tested
- [ ] Performance impact assessed

### PR Template

```markdown
**Description**
Brief description of changes

**Type of Change**
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

**Testing Done**
- [ ] Manual testing on mobile
- [ ] Cross-browser testing
- [ ] Offline functionality tested
- [ ] Performance benchmarked

**Medical/Legal Review**
- [ ] Medical content reviewed by healthcare professional
- [ ] Legal compliance checked
- [ ] Privacy impact assessed

**Screenshots/Demo**
Add screenshots or demo GIFs for UI changes
```

## 🏆 Recognition

### Contributors

We recognize contributions through:

- **Contributors list** in README
- **Release notes** mentioning contributors
- **LinkedIn recommendations** for significant contributions
- **Conference speaking opportunities** for major features

### Community Recognition

- **Monthly contributor spotlight**
- **Community badges** for different contribution types
- **Access to beta features** for active contributors

## 📞 Getting Help

### Channels

- **GitHub Discussions**: General questions and ideas
- **Issues**: Bug reports and feature requests
- **Discord**: Real-time community chat (invite in README)
- **Email**: medaid.contributors@gmail.com

### Mentorship

We offer mentorship for:

- **New contributors**: Getting started with the codebase
- **Medical students**: Contributing health content
- **Language enthusiasts**: Translation and localization
- **Accessibility advocates**: Making the app more inclusive

## 📚 Learning Resources

### Technical Skills

- **React + TypeScript**: [TypeScript React Guide](https://react-typescript-cheatsheet.netlify.app/)
- **PWA Development**: [PWA Builder](https://pwabuilder.com/)
- **Accessibility**: [WebAIM Guidelines](https://webaim.org/)
- **Performance**: [Web.dev Performance](https://web.dev/performance/)

### Domain Knowledge

- **Healthcare in India**: Understanding the healthcare landscape
- **Digital Health**: WHO Digital Health guidelines
- **Medical Communication**: Plain language medical writing
- **Cultural Sensitivity**: Cross-cultural health communication

## 🎉 First-Time Contributors

### Good First Issues

Look for issues labeled:
- `good first issue`: Perfect for beginners
- `help wanted`: We need community help
- `translation`: Language/localization work
- `documentation`: Improve our docs

### Starter Tasks

1. **Fix typos** in documentation
2. **Add translations** for your native language
3. **Improve accessibility** of existing components
4. **Add unit tests** for utility functions
5. **Update documentation** with new examples

## ⚖️ Code of Conduct

### Our Pledge

We are committed to making participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity.

### Standards

Examples of behavior that contributes to creating a positive environment:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Enforcement

Project maintainers are responsible for clarifying standards and may take action in response to behavior they deem inappropriate. Contact: conduct@medaid.app

---

## 🙏 Thank You

Every contribution, no matter how small, helps us bring healthcare guidance to millions of people across India. Together, we're building something that can truly make a difference in people's lives.

**"Healthcare that speaks your language" - made possible by contributors like you! 🇮🇳**