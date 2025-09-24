import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class ProgressService extends ChangeNotifier {
  Map<String, double> _subjectProgress = {};
  Map<String, int> _subjectStars = {};
  int _totalStars = 0;
  int _totalCoins = 0;
  int _totalBadges = 0;

  // Getters
  double get overallProgress {
    if (_subjectProgress.isEmpty) return 0.0;
    final total = _subjectProgress.values.reduce((a, b) => a + b);
    return total / _subjectProgress.length;
  }

  int get totalStars => _totalStars;
  int get totalCoins => _totalCoins;
  int get totalBadges => _totalBadges;

  double getSubjectProgress(String subject) {
    return _subjectProgress[subject] ?? 0.0;
  }

  int getSubjectStars(String subject) {
    return _subjectStars[subject] ?? 0;
  }

  bool isSubjectLocked(String subject) {
    // For demo, only math is unlocked initially
    const subjectOrder = ['math', 'english', 'evs', 'science'];
    final subjectIndex = subjectOrder.indexOf(subject);
    
    if (subjectIndex == 0) return false; // Math is always unlocked
    
    // Check if previous subject has at least 50% progress
    final previousSubject = subjectOrder[subjectIndex - 1];
    return getSubjectProgress(previousSubject) < 50.0;
  }

  Future<void> initialize() async {
    await _loadProgressFromPrefs();
  }

  Future<void> updateSubjectProgress({
    required String subject,
    required double progress,
    int starsEarned = 0,
    int coinsEarned = 0,
  }) async {
    _subjectProgress[subject] = progress;
    
    if (starsEarned > 0) {
      _subjectStars[subject] = (_subjectStars[subject] ?? 0) + starsEarned;
      _totalStars += starsEarned;
    }
    
    if (coinsEarned > 0) {
      _totalCoins += coinsEarned;
    }

    // Check for badges
    _checkForBadges(subject, progress);

    await _saveProgressToPrefs();
    notifyListeners();
  }

  Future<void> completeLesson({
    required String subject,
    required String lessonId,
    required int starsEarned,
    required int coinsEarned,
  }) async {
    // Update lesson completion
    final lessonKey = '${subject}_$lessonId';
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('lesson_$lessonKey', true);

    // Update subject progress (simplified - in real app would be more complex)
    final currentProgress = getSubjectProgress(subject);
    final newProgress = (currentProgress + 10).clamp(0.0, 100.0);

    await updateSubjectProgress(
      subject: subject,
      progress: newProgress,
      starsEarned: starsEarned,
      coinsEarned: coinsEarned,
    );
  }

  bool isLessonCompleted(String subject, String lessonId) {
    // This would be loaded from SharedPreferences in a real implementation
    return false;
  }

  void _checkForBadges(String subject, double progress) {
    // Award badges for milestones
    if (progress >= 25.0 && !_hasBadge('${subject}_beginner')) {
      _awardBadge('${subject}_beginner');
    }
    if (progress >= 50.0 && !_hasBadge('${subject}_intermediate')) {
      _awardBadge('${subject}_intermediate');
    }
    if (progress >= 100.0 && !_hasBadge('${subject}_expert')) {
      _awardBadge('${subject}_expert');
    }
  }

  bool _hasBadge(String badgeId) {
    // Simplified badge checking
    return false;
  }

  void _awardBadge(String badgeId) {
    _totalBadges++;
    // In a real app, would save badge details
  }

  Future<void> _saveProgressToPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    
    final progressData = {
      'subjectProgress': _subjectProgress,
      'subjectStars': _subjectStars,
      'totalStars': _totalStars,
      'totalCoins': _totalCoins,
      'totalBadges': _totalBadges,
    };
    
    await prefs.setString('progress_data', jsonEncode(progressData));
  }

  Future<void> _loadProgressFromPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    final progressDataString = prefs.getString('progress_data');
    
    if (progressDataString != null) {
      try {
        final progressData = jsonDecode(progressDataString);
        
        _subjectProgress = Map<String, double>.from(
          progressData['subjectProgress']?.map((k, v) => MapEntry(k, v.toDouble())) ?? {}
        );
        _subjectStars = Map<String, int>.from(progressData['subjectStars'] ?? {});
        _totalStars = progressData['totalStars'] ?? 0;
        _totalCoins = progressData['totalCoins'] ?? 0;
        _totalBadges = progressData['totalBadges'] ?? 0;
        
        notifyListeners();
      } catch (e) {
        debugPrint('Error loading progress data: $e');
      }
    }
  }

  Future<void> resetProgress() async {
    _subjectProgress.clear();
    _subjectStars.clear();
    _totalStars = 0;
    _totalCoins = 0;
    _totalBadges = 0;
    
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('progress_data');
    
    notifyListeners();
  }
}