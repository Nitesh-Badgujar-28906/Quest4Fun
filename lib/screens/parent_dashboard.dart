import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../services/auth_service.dart';
import '../services/progress_service.dart';
import '../utils/app_theme.dart';

class ParentDashboard extends StatefulWidget {
  const ParentDashboard({super.key});

  @override
  State<ParentDashboard> createState() => _ParentDashboardState();
}

class _ParentDashboardState extends State<ParentDashboard> {
  bool _isAuthenticated = false;
  final TextEditingController _pinController = TextEditingController();

  @override
  void dispose() {
    _pinController.dispose();
    super.dispose();
  }

  Future<void> _authenticateParent() async {
    final authService = Provider.of<AuthService>(context, listen: false);
    final isValid = await authService.authenticateParent(_pinController.text);
    
    if (isValid) {
      setState(() {
        _isAuthenticated = true;
      });
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Incorrect PIN! Try: 1234'),
          backgroundColor: AppTheme.softPink,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!_isAuthenticated) {
      return _buildAuthScreen();
    }
    
    return _buildDashboard();
  }

  Widget _buildAuthScreen() {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Parent Dashboard'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.go('/home'),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(32.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(
              Icons.admin_panel_settings,
              size: 100,
              color: AppTheme.primaryBlue,
            ),
            
            const SizedBox(height: 32),
            
            Text(
              'Parent Access',
              style: Theme.of(context).textTheme.displayMedium?.copyWith(
                color: AppTheme.primaryBlue,
              ),
            ),
            
            const SizedBox(height: 16),
            
            Text(
              'Enter your PIN to view your child\'s progress',
              style: Theme.of(context).textTheme.bodyLarge,
              textAlign: TextAlign.center,
            ),
            
            const SizedBox(height: 32),
            
            TextField(
              controller: _pinController,
              obscureText: true,
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.headlineMedium,
              decoration: const InputDecoration(
                hintText: 'Enter PIN',
                prefixIcon: Icon(Icons.lock, color: AppTheme.primaryBlue),
              ),
              keyboardType: TextInputType.number,
              maxLength: 4,
            ),
            
            const SizedBox(height: 24),
            
            ElevatedButton(
              onPressed: _authenticateParent,
              child: const Text('Access Dashboard'),
            ),
            
            const SizedBox(height: 16),
            
            Text(
              'Demo PIN: 1234',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: AppTheme.lightText,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDashboard() {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Parent Dashboard'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.go('/home'),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              setState(() {
                _isAuthenticated = false;
                _pinController.clear();
              });
            },
          ),
        ],
      ),
      body: Consumer2<AuthService, ProgressService>(
        builder: (context, authService, progressService, child) {
          final user = authService.currentUser;
          
          return SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Child info card
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Row(
                      children: [
                        Container(
                          width: 60,
                          height: 60,
                          decoration: const BoxDecoration(
                            color: AppTheme.happyGreen,
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(
                            Icons.person,
                            size: 30,
                            color: Colors.white,
                          ),
                        ),
                        
                        const SizedBox(width: 16),
                        
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                user?.name ?? 'Young Explorer',
                                style: Theme.of(context).textTheme.headlineMedium,
                              ),
                              Text(
                                'Level ${user?.level ?? 1} • ${user?.totalStars ?? 0} Stars',
                                style: Theme.of(context).textTheme.bodyMedium,
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                
                const SizedBox(height: 24),
                
                // Overall progress
                Text(
                  'Learning Progress',
                  style: Theme.of(context).textTheme.headlineLarge,
                ),
                
                const SizedBox(height: 16),
                
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Overall Progress'),
                            Text(
                              '${progressService.overallProgress.toInt()}%',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                color: AppTheme.primaryBlue,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        LinearProgressIndicator(
                          value: progressService.overallProgress / 100,
                          backgroundColor: Colors.grey[300],
                          valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.happyGreen),
                        ),
                      ],
                    ),
                  ),
                ),
                
                const SizedBox(height: 24),
                
                // Subject-wise progress
                Text(
                  'Subject Performance',
                  style: Theme.of(context).textTheme.headlineLarge,
                ),
                
                const SizedBox(height: 16),
                
                ...['math', 'english', 'evs', 'science'].map((subject) {
                  final progress = progressService.getSubjectProgress(subject);
                  final stars = progressService.getSubjectStars(subject);
                  final color = AppTheme.subjectColors[subject] ?? AppTheme.primaryBlue;
                  
                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        children: [
                          Row(
                            children: [
                              Container(
                                width: 40,
                                height: 40,
                                decoration: BoxDecoration(
                                  color: color,
                                  shape: BoxShape.circle,
                                ),
                                child: Icon(
                                  _getSubjectIcon(subject),
                                  color: Colors.white,
                                  size: 20,
                                ),
                              ),
                              
                              const SizedBox(width: 12),
                              
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          subject.toUpperCase(),
                                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        Row(
                                          children: [
                                            const Icon(
                                              Icons.star,
                                              size: 16,
                                              color: AppTheme.brightYellow,
                                            ),
                                            const SizedBox(width: 4),
                                            Text('$stars'),
                                          ],
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 4),
                                    Text('${progress.toInt()}% Complete'),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          
                          const SizedBox(height: 8),
                          
                          LinearProgressIndicator(
                            value: progress / 100,
                            backgroundColor: Colors.grey[300],
                            valueColor: AlwaysStoppedAnimation<Color>(color),
                          ),
                        ],
                      ),
                    ),
                  );
                }).toList(),
                
                const SizedBox(height: 24),
                
                // Achievements
                Text(
                  'Achievements',
                  style: Theme.of(context).textTheme.headlineLarge,
                ),
                
                const SizedBox(height: 16),
                
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        _buildAchievementItem('⭐', '${progressService.totalStars}', 'Total Stars'),
                        _buildAchievementItem('🪙', '${progressService.totalCoins}', 'Coins Earned'),
                        _buildAchievementItem('🏅', '${progressService.totalBadges}', 'Badges Won'),
                      ],
                    ),
                  ),
                ),
                
                const SizedBox(height: 24),
                
                // Tips for parents
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '💡 Tips for Parents',
                          style: Theme.of(context).textTheme.headlineMedium,
                        ),
                        const SizedBox(height: 12),
                        const Text('• Encourage daily practice for 15-20 minutes'),
                        const Text('• Celebrate achievements and progress'),
                        const Text('• Help with difficult concepts when needed'),
                        const Text('• Make learning fun with real-world examples'),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildAchievementItem(String emoji, String count, String label) {
    return Column(
      children: [
        Text(
          emoji,
          style: const TextStyle(fontSize: 32),
        ),
        const SizedBox(height: 4),
        Text(
          count,
          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        Text(
          label,
          style: Theme.of(context).textTheme.bodyMedium,
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  IconData _getSubjectIcon(String subject) {
    switch (subject) {
      case 'math':
        return Icons.calculate;
      case 'english':
        return Icons.book;
      case 'evs':
        return Icons.nature;
      case 'science':
        return Icons.science;
      default:
        return Icons.school;
    }
  }
}