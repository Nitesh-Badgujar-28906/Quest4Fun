import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:provider/provider.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:go_router/go_router.dart';

import 'screens/splash_screen.dart';
import 'screens/onboarding_screen.dart';
import 'screens/home_screen.dart';
import 'screens/learning_screen.dart';
import 'screens/parent_dashboard.dart';
import 'services/auth_service.dart';
import 'services/progress_service.dart';
import 'utils/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Firebase
  await Firebase.initializeApp();
  
  // Initialize Hive for local storage
  await Hive.initFlutter();
  
  runApp(const Quest4FunApp());
}

class Quest4FunApp extends StatelessWidget {
  const Quest4FunApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => AuthService()),
        ChangeNotifierProvider(create: (context) => ProgressService()),
      ],
      child: MaterialApp.router(
        title: 'Quest4Fun',
        theme: AppTheme.kidFriendlyTheme,
        routerConfig: _router,
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}

// Router configuration
final GoRouter _router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      path: '/onboarding',
      builder: (context, state) => const OnboardingScreen(),
    ),
    GoRoute(
      path: '/home',
      builder: (context, state) => const HomeScreen(),
    ),
    GoRoute(
      path: '/learning/:subject',
      builder: (context, state) {
        final subject = state.pathParameters['subject']!;
        return LearningScreen(subject: subject);
      },
    ),
    GoRoute(
      path: '/parent-dashboard',
      builder: (context, state) => const ParentDashboard(),
    ),
  ],
);