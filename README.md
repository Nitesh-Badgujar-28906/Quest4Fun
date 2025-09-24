# Quest4Fun - Educational App for Kids 🎓✨

An interactive educational Flutter app designed to make learning fun for children through gamification, engaging visuals, and progress tracking.

## 🚀 Features

### ✅ Implemented (Phase 1 - Core Features)
- **Splash Screen** - Fun logo animation with mascot
- **Onboarding Flow** - Avatar picker and child's name input  
- **Home Screen** - Subject cards (Math, English, EVS, Science) with progress tracking
- **Learning Screen** - Game map style level progression
- **Parent Dashboard** - PIN-protected progress reports and analytics
- **User Profiles** - Child + Parent authentication system
- **Progress Tracking** - Local storage with Hive/SharedPreferences
- **Rewards System** - Stars, coins, and badges for achievements
- **Subject Unlocking** - Progressive unlocking based on completion

### 🎨 UI/UX Features
- Kid-friendly design with bright cartoon colors (blue, yellow, green, orange)
- Big, tappable buttons with icons
- Smooth animations and transitions
- Minimal text with visual-first approach
- Hidden parent section with PIN protection

### 📱 Technical Stack
- **Frontend**: Flutter with Material Design
- **State Management**: Provider pattern
- **Local Storage**: SharedPreferences for progress and user data
- **Navigation**: Go Router for clean URL-based navigation
- **Architecture**: Service-based architecture with models

## 🛠️ Getting Started

### Prerequisites
- Flutter SDK (3.0.0 or higher)
- Dart SDK
- Android Studio / VS Code
- Android device/emulator or iOS device/simulator

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nitesh-Badgujar-28906/Quest4Fun.git
   cd Quest4Fun
   ```

2. **Install dependencies**
   ```bash
   flutter pub get
   ```

3. **Run the app**
   ```bash
   flutter run
   ```

### Development with Codespaces
This project includes a `.devcontainer` configuration for easy development in GitHub Codespaces:

1. Open repository in GitHub Codespaces
2. The environment will automatically set up Flutter SDK and dependencies
3. Use the integrated terminal to run `flutter run`

## 📁 Project Structure

```
lib/
├── main.dart                 # App entry point
├── models/                   # Data models
│   └── user_model.dart      # User profile model
├── screens/                  # App screens
│   ├── splash_screen.dart   # Animated splash screen
│   ├── onboarding_screen.dart # User setup flow
│   ├── home_screen.dart     # Main dashboard
│   ├── learning_screen.dart # Subject learning area
│   └── parent_dashboard.dart # Parent analytics
├── services/                 # Business logic
│   ├── auth_service.dart    # Authentication logic
│   └── progress_service.dart # Progress tracking
├── utils/                    # Utilities
│   └── app_theme.dart       # Theme configuration
└── widgets/                  # Reusable components
    ├── avatar_selector.dart
    ├── subject_card.dart
    ├── level_node.dart
    └── progress_indicator_widget.dart
```

## 🎯 Usage

### For Children
1. **First Time Setup**: Choose an avatar and enter your name
2. **Learning Journey**: Start with Math (other subjects unlock with progress)
3. **Complete Lessons**: Earn stars and coins for each completed lesson
4. **Track Progress**: View your achievements and progress on the home screen

### For Parents
1. **Access Dashboard**: Tap the admin icon and enter PIN (demo: 1234)
2. **View Progress**: See detailed subject-wise progress and achievements
3. **Monitor Performance**: Track learning patterns and time spent
4. **Get Tips**: Access parenting tips for educational support

## 🏗️ Roadmap

### Phase 2: Enhanced Features (Planned)
- [ ] Firebase integration for cloud sync
- [ ] Voice narration with text-to-speech
- [ ] Offline mode improvements
- [ ] Quiz and game mechanics
- [ ] Advanced reward animations

### Phase 3: Backend & Analytics (Planned)  
- [ ] Firestore for progress storage
- [ ] Firebase Storage for media assets
- [ ] Detailed analytics and reporting
- [ ] Parent email reports

### Phase 4: Advanced Features (Future)
- [ ] Leaderboards and social features
- [ ] Teacher/school management mode
- [ ] Multi-language support
- [ ] AR/VR learning modules

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Flutter team for the amazing framework
- Icons and illustrations from Material Design
- Educational content guidelines from child development experts

---

**Quest4Fun** - Making learning an adventure! 🌟