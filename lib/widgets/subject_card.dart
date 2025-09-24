import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../services/progress_service.dart';
import '../utils/app_theme.dart';

class SubjectCard extends StatefulWidget {
  final String subject;
  final String title;
  final IconData icon;
  final String description;

  const SubjectCard({
    super.key,
    required this.subject,
    required this.title,
    required this.icon,
    required this.description,
  });

  @override
  State<SubjectCard> createState() => _SubjectCardState();
}

class _SubjectCardState extends State<SubjectCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: AppTheme.shortAnimation,
      vsync: this,
    );
    
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _onTapDown(TapDownDetails details) {
    _controller.forward();
  }

  void _onTapUp(TapUpDetails details) {
    _controller.reverse();
    _navigateToLearning();
  }

  void _onTapCancel() {
    _controller.reverse();
  }

  void _navigateToLearning() {
    context.go('/learning/${widget.subject}');
  }

  @override
  Widget build(BuildContext context) {
    final subjectColor = AppTheme.subjectColors[widget.subject] ?? AppTheme.primaryBlue;
    
    return Consumer<ProgressService>(
      builder: (context, progressService, child) {
        final progress = progressService.getSubjectProgress(widget.subject);
        final isLocked = progressService.isSubjectLocked(widget.subject);
        
        return AnimatedBuilder(
          animation: _scaleAnimation,
          builder: (context, child) {
            return Transform.scale(
              scale: _scaleAnimation.value,
              child: GestureDetector(
                onTapDown: isLocked ? null : _onTapDown,
                onTapUp: isLocked ? null : _onTapUp,
                onTapCancel: isLocked ? null : _onTapCancel,
                child: Card(
                  color: isLocked ? Colors.grey[300] : subjectColor.withOpacity(0.1),
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(20),
                      gradient: isLocked
                          ? null
                          : LinearGradient(
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                              colors: [
                                subjectColor.withOpacity(0.1),
                                subjectColor.withOpacity(0.05),
                              ],
                            ),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        // Icon with background
                        Container(
                          width: 60,
                          height: 60,
                          decoration: BoxDecoration(
                            color: isLocked ? Colors.grey[400] : subjectColor,
                            shape: BoxShape.circle,
                            boxShadow: isLocked
                                ? null
                                : [
                                    BoxShadow(
                                      color: subjectColor.withOpacity(0.3),
                                      blurRadius: 10,
                                      offset: const Offset(0, 4),
                                    ),
                                  ],
                          ),
                          child: Icon(
                            isLocked ? Icons.lock : widget.icon,
                            color: Colors.white,
                            size: 30,
                          ),
                        ),
                        
                        const SizedBox(height: 12),
                        
                        // Title
                        Text(
                          widget.title,
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                            color: isLocked ? Colors.grey[600] : AppTheme.darkText,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        
                        const SizedBox(height: 4),
                        
                        // Description
                        Text(
                          isLocked ? 'Complete previous subjects' : widget.description,
                          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            color: isLocked ? Colors.grey[500] : AppTheme.lightText,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        
                        const SizedBox(height: 12),
                        
                        // Progress indicator
                        if (!isLocked) ...[
                          LinearProgressIndicator(
                            value: progress / 100,
                            backgroundColor: Colors.grey[300],
                            valueColor: AlwaysStoppedAnimation<Color>(subjectColor),
                            minHeight: 6,
                          ),
                          const SizedBox(height: 4),
                          Text(
                            '${progress.toInt()}% Complete',
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              fontSize: 12,
                              color: subjectColor,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                        
                        // Stars earned
                        if (!isLocked) ...[
                          const SizedBox(height: 8),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Icon(
                                Icons.star,
                                color: AppTheme.brightYellow,
                                size: 16,
                              ),
                              const SizedBox(width: 4),
                              Text(
                                '${progressService.getSubjectStars(widget.subject)}',
                                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                  fontWeight: FontWeight.bold,
                                  color: AppTheme.brightYellow,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ],
                    ),
                  ),
                ),
              ),
            );
          },
        );
      },
    );
  }
}