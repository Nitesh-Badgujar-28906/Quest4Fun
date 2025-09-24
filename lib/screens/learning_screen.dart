import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../services/progress_service.dart';
import '../utils/app_theme.dart';
import '../widgets/level_node.dart';

class LearningScreen extends StatefulWidget {
  final String subject;

  const LearningScreen({
    super.key,
    required this.subject,
  });

  @override
  State<LearningScreen> createState() => _LearningScreenState();
}

class _LearningScreenState extends State<LearningScreen> {
  late ScrollController _scrollController;

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController();
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  String get _subjectTitle {
    switch (widget.subject) {
      case 'math':
        return 'Math Adventures';
      case 'english':
        return 'English Exploration';
      case 'evs':
        return 'Environmental Studies';
      case 'science':
        return 'Science Discovery';
      default:
        return 'Learning Journey';
    }
  }

  Color get _subjectColor {
    return AppTheme.subjectColors[widget.subject] ?? AppTheme.primaryBlue;
  }

  List<Map<String, dynamic>> get _lessons {
    // Sample lessons for each subject
    switch (widget.subject) {
      case 'math':
        return [
          {'id': 'lesson_1', 'title': 'Counting 1-10', 'difficulty': 'Easy'},
          {'id': 'lesson_2', 'title': 'Addition Basics', 'difficulty': 'Easy'},
          {'id': 'lesson_3', 'title': 'Subtraction Fun', 'difficulty': 'Medium'},
          {'id': 'lesson_4', 'title': 'Shapes & Patterns', 'difficulty': 'Medium'},
          {'id': 'lesson_5', 'title': 'Time & Clock', 'difficulty': 'Hard'},
        ];
      case 'english':
        return [
          {'id': 'lesson_1', 'title': 'Alphabet Song', 'difficulty': 'Easy'},
          {'id': 'lesson_2', 'title': 'Phonics Fun', 'difficulty': 'Easy'},
          {'id': 'lesson_3', 'title': 'Simple Words', 'difficulty': 'Medium'},
          {'id': 'lesson_4', 'title': 'Reading Stories', 'difficulty': 'Medium'},
          {'id': 'lesson_5', 'title': 'Writing Practice', 'difficulty': 'Hard'},
        ];
      case 'evs':
        return [
          {'id': 'lesson_1', 'title': 'Plants & Trees', 'difficulty': 'Easy'},
          {'id': 'lesson_2', 'title': 'Animals Around Us', 'difficulty': 'Easy'},
          {'id': 'lesson_3', 'title': 'Weather & Seasons', 'difficulty': 'Medium'},
          {'id': 'lesson_4', 'title': 'Our Environment', 'difficulty': 'Medium'},
          {'id': 'lesson_5', 'title': 'Save Nature', 'difficulty': 'Hard'},
        ];
      default:
        return [
          {'id': 'lesson_1', 'title': 'Getting Started', 'difficulty': 'Easy'},
          {'id': 'lesson_2', 'title': 'Building Blocks', 'difficulty': 'Easy'},
          {'id': 'lesson_3', 'title': 'Practice Time', 'difficulty': 'Medium'},
        ];
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_subjectTitle),
        backgroundColor: _subjectColor,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.go('/home'),
        ),
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              _subjectColor.withOpacity(0.1),
              AppTheme.lightBackground,
            ],
          ),
        ),
        child: Consumer<ProgressService>(
          builder: (context, progressService, child) {
            final subjectProgress = progressService.getSubjectProgress(widget.subject);
            final subjectStars = progressService.getSubjectStars(widget.subject);
            
            return Column(
              children: [
                // Progress header
                Container(
                  padding: const EdgeInsets.all(16.0),
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Progress: ${subjectProgress.toInt()}%',
                                  style: Theme.of(context).textTheme.headlineMedium,
                                ),
                                const SizedBox(height: 8),
                                LinearProgressIndicator(
                                  value: subjectProgress / 100,
                                  backgroundColor: Colors.grey[300],
                                  valueColor: AlwaysStoppedAnimation<Color>(_subjectColor),
                                  minHeight: 8,
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 16),
                          Column(
                            children: [
                              Container(
                                padding: const EdgeInsets.all(8),
                                decoration: BoxDecoration(
                                  color: AppTheme.brightYellow,
                                  shape: BoxShape.circle,
                                ),
                                child: const Icon(
                                  Icons.star,
                                  color: Colors.white,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                '$subjectStars',
                                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                  color: AppTheme.brightYellow,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                
                // Game map
                Expanded(
                  child: SingleChildScrollView(
                    controller: _scrollController,
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      children: [
                        Text(
                          'Choose Your Adventure!',
                          style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                            color: _subjectColor,
                          ),
                        ),
                        const SizedBox(height: 24),
                        
                        // Lesson nodes in a path-like layout
                        ...List.generate(_lessons.length, (index) {
                          final lesson = _lessons[index];
                          final isCompleted = progressService.isLessonCompleted(widget.subject, lesson['id']);
                          final isAccessible = index == 0 || progressService.isLessonCompleted(widget.subject, _lessons[index - 1]['id']);
                          
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 40.0),
                            child: Row(
                              children: [
                                if (index % 2 == 0) ...[
                                  Expanded(
                                    child: LevelNode(
                                      lessonId: lesson['id'],
                                      title: lesson['title'],
                                      difficulty: lesson['difficulty'],
                                      isCompleted: isCompleted,
                                      isAccessible: isAccessible,
                                      subjectColor: _subjectColor,
                                      onTap: () => _startLesson(lesson),
                                    ),
                                  ),
                                  const SizedBox(width: 60),
                                  const Spacer(),
                                ] else ...[
                                  const Spacer(),
                                  const SizedBox(width: 60),
                                  Expanded(
                                    child: LevelNode(
                                      lessonId: lesson['id'],
                                      title: lesson['title'],
                                      difficulty: lesson['difficulty'],
                                      isCompleted: isCompleted,
                                      isAccessible: isAccessible,
                                      subjectColor: _subjectColor,
                                      onTap: () => _startLesson(lesson),
                                    ),
                                  ),
                                ],
                              ],
                            ),
                          );
                        }),
                      ],
                    ),
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }

  void _startLesson(Map<String, dynamic> lesson) {
    // For demo, just show a dialog
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        title: Text('🎮 ${lesson['title']}'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Ready to start this lesson?',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: 16),
            Text(
              'Difficulty: ${lesson['difficulty']}',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: _subjectColor,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Maybe Later'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _completeLesson(lesson);
            },
            child: const Text('Start Learning!'),
          ),
        ],
      ),
    );
  }

  void _completeLesson(Map<String, dynamic> lesson) {
    // For demo, immediately complete the lesson with rewards
    final progressService = Provider.of<ProgressService>(context, listen: false);
    
    progressService.completeLesson(
      subject: widget.subject,
      lessonId: lesson['id'],
      starsEarned: 3,
      coinsEarned: 10,
    );

    // Show celebration
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        title: const Text('🎉 Congratulations!'),
        content: const Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('Lesson completed successfully!'),
            SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Column(
                  children: [
                    Text('⭐', style: TextStyle(fontSize: 24)),
                    Text('3 Stars'),
                  ],
                ),
                Column(
                  children: [
                    Text('🪙', style: TextStyle(fontSize: 24)),
                    Text('10 Coins'),
                  ],
                ),
              ],
            ),
          ],
        ),
        actions: [
          ElevatedButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Awesome!'),
          ),
        ],
      ),
    );
  }
}