import 'package:flutter/material.dart';

class AppTheme {
  // Kid-friendly colors
  static const Color primaryBlue = Color(0xFF4A90E2);
  static const Color brightYellow = Color(0xFFFFD700);
  static const Color happyGreen = Color(0xFF7ED321);
  static const Color playfulOrange = Color(0xFFFF9500);
  static const Color softPink = Color(0xFFFF6B9D);
  static const Color lightPurple = Color(0xFF9B59B6);
  
  // Background colors
  static const Color lightBackground = Color(0xFFF8F9FA);
  static const Color cardBackground = Color(0xFFFFFFFF);
  
  // Text colors
  static const Color darkText = Color(0xFF2C3E50);
  static const Color lightText = Color(0xFF7F8C8D);

  static ThemeData get kidFriendlyTheme {
    return ThemeData(
      primarySwatch: Colors.blue,
      primaryColor: primaryBlue,
      scaffoldBackgroundColor: lightBackground,
      fontFamily: 'ComicSans',
      
      // AppBar theme
      appBarTheme: const AppBarTheme(
        backgroundColor: primaryBlue,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.bold,
          fontFamily: 'ComicSans',
        ),
      ),
      
      // Card theme
      cardTheme: CardTheme(
        color: cardBackground,
        elevation: 8,
        shadowColor: Colors.black26,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
      ),
      
      // Button themes
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: brightYellow,
          foregroundColor: darkText,
          padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(25),
          ),
          textStyle: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            fontFamily: 'ComicSans',
          ),
          elevation: 5,
        ),
      ),
      
      // Text themes
      textTheme: const TextTheme(
        displayLarge: TextStyle(
          fontSize: 32,
          fontWeight: FontWeight.bold,
          color: darkText,
          fontFamily: 'ComicSans',
        ),
        displayMedium: TextStyle(
          fontSize: 28,
          fontWeight: FontWeight.bold,
          color: darkText,
          fontFamily: 'ComicSans',
        ),
        headlineLarge: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.bold,
          color: darkText,
          fontFamily: 'ComicSans',
        ),
        headlineMedium: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: darkText,
          fontFamily: 'ComicSans',
        ),
        bodyLarge: TextStyle(
          fontSize: 16,
          color: darkText,
          fontFamily: 'ComicSans',
        ),
        bodyMedium: TextStyle(
          fontSize: 14,
          color: lightText,
          fontFamily: 'ComicSans',
        ),
      ),
      
      // Input decoration theme
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: cardBackground,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(15),
          borderSide: BorderSide.none,
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        hintStyle: const TextStyle(
          color: lightText,
          fontFamily: 'ComicSans',
        ),
      ),
      
      colorScheme: const ColorScheme.light(
        primary: primaryBlue,
        secondary: brightYellow,
        surface: cardBackground,
        background: lightBackground,
        onPrimary: Colors.white,
        onSecondary: darkText,
        onSurface: darkText,
        onBackground: darkText,
      ),
    );
  }
  
  // Subject-specific colors
  static const Map<String, Color> subjectColors = {
    'math': playfulOrange,
    'english': happyGreen,
    'evs': lightPurple,
    'science': primaryBlue,
    'social': softPink,
  };
  
  // Animation durations
  static const Duration shortAnimation = Duration(milliseconds: 300);
  static const Duration mediumAnimation = Duration(milliseconds: 500);
  static const Duration longAnimation = Duration(milliseconds: 800);
}