import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../services/auth_service.dart';
import '../utils/app_theme.dart';
import '../widgets/avatar_selector.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  final TextEditingController _nameController = TextEditingController();
  int _currentPage = 0;
  String _selectedAvatar = 'avatar_1';

  @override
  void dispose() {
    _pageController.dispose();
    _nameController.dispose();
    super.dispose();
  }

  void _nextPage() {
    if (_currentPage < 2) {
      _pageController.nextPage(
        duration: AppTheme.mediumAnimation,
        curve: Curves.easeInOut,
      );
    } else {
      _completeOnboarding();
    }
  }

  void _previousPage() {
    if (_currentPage > 0) {
      _pageController.previousPage(
        duration: AppTheme.mediumAnimation,
        curve: Curves.easeInOut,
      );
    }
  }

  Future<void> _completeOnboarding() async {
    if (_nameController.text.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please enter your name!'),
          backgroundColor: AppTheme.playfulOrange,
        ),
      );
      return;
    }

    final authService = Provider.of<AuthService>(context, listen: false);
    await authService.completeOnboarding(
      name: _nameController.text.trim(),
      avatar: _selectedAvatar,
    );

    if (mounted) {
      context.go('/home');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              AppTheme.lightBackground,
              Color(0xFFE3F2FD),
            ],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              // Progress indicator
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: Row(
                  children: List.generate(3, (index) {
                    return Expanded(
                      child: Container(
                        height: 4,
                        margin: const EdgeInsets.symmetric(horizontal: 2),
                        decoration: BoxDecoration(
                          color: index <= _currentPage
                              ? AppTheme.happyGreen
                              : Colors.grey.withOpacity(0.3),
                          borderRadius: BorderRadius.circular(2),
                        ),
                      ),
                    );
                  }),
                ),
              ),
              
              // Page content
              Expanded(
                child: PageView(
                  controller: _pageController,
                  onPageChanged: (index) {
                    setState(() {
                      _currentPage = index;
                    });
                  },
                  children: [
                    _buildWelcomePage(),
                    _buildAvatarSelectionPage(),
                    _buildNameInputPage(),
                  ],
                ),
              ),
              
              // Navigation buttons
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    if (_currentPage > 0)
                      ElevatedButton(
                        onPressed: _previousPage,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.grey[300],
                          foregroundColor: AppTheme.darkText,
                        ),
                        child: const Text('Back'),
                      )
                    else
                      const SizedBox.shrink(),
                    
                    ElevatedButton(
                      onPressed: _nextPage,
                      child: Text(_currentPage == 2 ? 'Let\'s Start!' : 'Next'),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildWelcomePage() {
    return Padding(
      padding: const EdgeInsets.all(32.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 200,
            height: 200,
            decoration: BoxDecoration(
              color: AppTheme.brightYellow,
              shape: BoxShape.circle,
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  blurRadius: 20,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: const Icon(
              Icons.celebration,
              size: 100,
              color: AppTheme.primaryBlue,
            ),
          ),
          
          const SizedBox(height: 40),
          
          Text(
            'Welcome to Quest4Fun!',
            style: Theme.of(context).textTheme.displayMedium?.copyWith(
              color: AppTheme.primaryBlue,
            ),
            textAlign: TextAlign.center,
          ),
          
          const SizedBox(height: 20),
          
          Text(
            'Get ready for an amazing learning adventure filled with fun games, exciting quests, and awesome rewards!',
            style: Theme.of(context).textTheme.bodyLarge,
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildAvatarSelectionPage() {
    return Padding(
      padding: const EdgeInsets.all(32.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'Choose Your Avatar',
            style: Theme.of(context).textTheme.displayMedium?.copyWith(
              color: AppTheme.primaryBlue,
            ),
            textAlign: TextAlign.center,
          ),
          
          const SizedBox(height: 20),
          
          Text(
            'Pick an avatar that represents you!',
            style: Theme.of(context).textTheme.bodyLarge,
            textAlign: TextAlign.center,
          ),
          
          const SizedBox(height: 40),
          
          AvatarSelector(
            selectedAvatar: _selectedAvatar,
            onAvatarSelected: (avatar) {
              setState(() {
                _selectedAvatar = avatar;
              });
            },
          ),
        ],
      ),
    );
  }

  Widget _buildNameInputPage() {
    return Padding(
      padding: const EdgeInsets.all(32.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 120,
            height: 120,
            decoration: BoxDecoration(
              color: AppTheme.subjectColors[_selectedAvatar.split('_')[1]] ?? AppTheme.happyGreen,
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.person,
              size: 60,
              color: Colors.white,
            ),
          ),
          
          const SizedBox(height: 40),
          
          Text(
            'What\'s Your Name?',
            style: Theme.of(context).textTheme.displayMedium?.copyWith(
              color: AppTheme.primaryBlue,
            ),
            textAlign: TextAlign.center,
          ),
          
          const SizedBox(height: 20),
          
          Text(
            'Tell us your name so we can personalize your learning journey!',
            style: Theme.of(context).textTheme.bodyLarge,
            textAlign: TextAlign.center,
          ),
          
          const SizedBox(height: 40),
          
          TextField(
            controller: _nameController,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.headlineMedium,
            decoration: const InputDecoration(
              hintText: 'Enter your name',
              prefixIcon: Icon(Icons.person, color: AppTheme.primaryBlue),
            ),
            textCapitalization: TextCapitalization.words,
          ),
        ],
      ),
    );
  }
}