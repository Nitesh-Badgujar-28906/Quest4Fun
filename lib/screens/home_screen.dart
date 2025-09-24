import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../services/auth_service.dart';
import '../services/progress_service.dart';
import '../utils/app_theme.dart';
import '../widgets/subject_card.dart';
import '../widgets/progress_indicator_widget.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen>
    with TickerProviderStateMixin {
  late AnimationController _greetingController;
  late Animation<double> _greetingAnimation;

  @override
  void initState() {
    super.initState();
    
    _greetingController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    
    _greetingAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _greetingController,
      curve: Curves.easeOut,
    ));
    
    _greetingController.forward();
  }

  @override
  void dispose() {
    _greetingController.dispose();
    super.dispose();
  }

  String _getGreeting() {
    final hour = DateTime.now().hour;
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 17) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Quest4Fun'),
        actions: [
          IconButton(
            icon: const Icon(Icons.person),
            onPressed: () {
              _showProfileDialog(context);
            },
          ),
          IconButton(
            icon: const Icon(Icons.admin_panel_settings),
            onPressed: () {
              context.go('/parent-dashboard');
            },
          ),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Greeting section
              FadeTransition(
                opacity: _greetingAnimation,
                child: Consumer<AuthService>(
                  builder: (context, authService, child) {
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '${_getGreeting()},',
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                            color: AppTheme.lightText,
                          ),
                        ),
                        Text(
                          authService.currentUser?.name ?? 'Young Explorer',
                          style: Theme.of(context).textTheme.displayMedium?.copyWith(
                            color: AppTheme.primaryBlue,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Ready for today\'s adventure?',
                          style: Theme.of(context).textTheme.bodyLarge,
                        ),
                      ],
                    );
                  },
                ),
              ),
              
              const SizedBox(height: 24),
              
              // Overall progress
              Consumer<ProgressService>(
                builder: (context, progressService, child) {
                  return ProgressIndicatorWidget(
                    title: 'Your Learning Journey',
                    progress: progressService.overallProgress,
                  );
                },
              ),
              
              const SizedBox(height: 32),
              
              // Subject selection
              Text(
                'Choose Your Subject',
                style: Theme.of(context).textTheme.headlineLarge,
              ),
              
              const SizedBox(height: 16),
              
              Expanded(
                child: GridView.count(
                  crossAxisCount: 2,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                  childAspectRatio: 0.9,
                  children: const [
                    SubjectCard(
                      subject: 'math',
                      title: 'Math',
                      icon: Icons.calculate,
                      description: 'Numbers & Problem Solving',
                    ),
                    SubjectCard(
                      subject: 'english',
                      title: 'English',
                      icon: Icons.book,
                      description: 'Reading & Writing',
                    ),
                    SubjectCard(
                      subject: 'evs',
                      title: 'EVS',
                      icon: Icons.nature,
                      description: 'Environment & Science',
                    ),
                    SubjectCard(
                      subject: 'science',
                      title: 'Science',
                      icon: Icons.science,
                      description: 'Experiments & Discovery',
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          _showRewardsDialog(context);
        },
        backgroundColor: AppTheme.brightYellow,
        child: const Icon(
          Icons.emoji_events,
          color: AppTheme.primaryBlue,
        ),
      ),
    );
  }

  void _showProfileDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        title: const Text('Profile'),
        content: Consumer<AuthService>(
          builder: (context, authService, child) {
            final user = authService.currentUser;
            return Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    color: AppTheme.happyGreen,
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.person,
                    size: 40,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  user?.name ?? 'Young Explorer',
                  style: Theme.of(context).textTheme.headlineMedium,
                ),
                const SizedBox(height: 8),
                Text(
                  'Level ${user?.level ?? 1} Explorer',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ],
            );
          },
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  void _showRewardsDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        title: const Text('🏆 Your Rewards'),
        content: Consumer<ProgressService>(
          builder: (context, progressService, child) {
            return Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    _buildRewardItem(
                      '⭐',
                      '${progressService.totalStars}',
                      'Stars',
                    ),
                    _buildRewardItem(
                      '🪙',
                      '${progressService.totalCoins}',
                      'Coins',
                    ),
                    _buildRewardItem(
                      '🏅',
                      '${progressService.totalBadges}',
                      'Badges',
                    ),
                  ],
                ),
              ],
            );
          },
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Awesome!'),
          ),
        ],
      ),
    );
  }

  Widget _buildRewardItem(String emoji, String count, String label) {
    return Column(
      children: [
        Text(
          emoji,
          style: const TextStyle(fontSize: 32),
        ),
        const SizedBox(height: 4),
        Text(
          count,
          style: Theme.of(context).textTheme.headlineMedium,
        ),
        Text(
          label,
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }
}