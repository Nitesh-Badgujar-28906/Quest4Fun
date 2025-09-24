import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/user_model.dart';

class AuthService extends ChangeNotifier {
  UserModel? _currentUser;
  bool _isAuthenticated = false;

  UserModel? get currentUser => _currentUser;
  bool get isAuthenticated => _isAuthenticated;

  Future<void> initialize() async {
    await _loadUserFromPrefs();
  }

  Future<bool> hasCompletedOnboarding() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool('onboarding_completed') ?? false;
  }

  Future<void> completeOnboarding({
    required String name,
    required String avatar,
  }) async {
    _currentUser = UserModel(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      name: name,
      avatar: avatar,
      level: 1,
      totalStars: 0,
      totalCoins: 0,
      createdAt: DateTime.now(),
    );

    await _saveUserToPrefs();
    
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('onboarding_completed', true);
    
    _isAuthenticated = true;
    notifyListeners();
  }

  Future<void> updateUserProgress({
    int? starsEarned,
    int? coinsEarned,
    int? newLevel,
  }) async {
    if (_currentUser == null) return;

    _currentUser = _currentUser!.copyWith(
      totalStars: _currentUser!.totalStars + (starsEarned ?? 0),
      totalCoins: _currentUser!.totalCoins + (coinsEarned ?? 0),
      level: newLevel ?? _currentUser!.level,
    );

    await _saveUserToPrefs();
    notifyListeners();
  }

  Future<void> _saveUserToPrefs() async {
    if (_currentUser == null) return;
    
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('user_data', _currentUser!.toJson());
  }

  Future<void> _loadUserFromPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    final userData = prefs.getString('user_data');
    
    if (userData != null) {
      try {
        _currentUser = UserModel.fromJson(userData);
        _isAuthenticated = true;
        notifyListeners();
      } catch (e) {
        debugPrint('Error loading user data: $e');
      }
    }
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
    
    _currentUser = null;
    _isAuthenticated = false;
    notifyListeners();
  }

  // Parent authentication (simple PIN for demo)
  Future<bool> authenticateParent(String pin) async {
    // In a real app, this would be more secure
    const correctPin = '1234';
    return pin == correctPin;
  }
}