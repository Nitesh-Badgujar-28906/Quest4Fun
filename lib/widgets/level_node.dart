import 'package:flutter/material.dart';
import '../utils/app_theme.dart';

class LevelNode extends StatefulWidget {
  final String lessonId;
  final String title;
  final String difficulty;
  final bool isCompleted;
  final bool isAccessible;
  final Color subjectColor;
  final VoidCallback onTap;

  const LevelNode({
    super.key,
    required this.lessonId,
    required this.title,
    required this.difficulty,
    required this.isCompleted,
    required this.isAccessible,
    required this.subjectColor,
    required this.onTap,
  });

  @override
  State<LevelNode> createState() => _LevelNodeState();
}

class _LevelNodeState extends State<LevelNode>
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
    if (widget.isAccessible) {
      _controller.forward();
    }
  }

  void _onTapUp(TapUpDetails details) {
    if (widget.isAccessible) {
      _controller.reverse().then((_) {
        widget.onTap();
      });
    }
  }

  void _onTapCancel() {
    if (widget.isAccessible) {
      _controller.reverse();
    }
  }

  Color get _nodeColor {
    if (!widget.isAccessible) return Colors.grey[400]!;
    if (widget.isCompleted) return AppTheme.happyGreen;
    return widget.subjectColor;
  }

  IconData get _nodeIcon {
    if (!widget.isAccessible) return Icons.lock;
    if (widget.isCompleted) return Icons.check_circle;
    return Icons.play_circle_filled;
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _scaleAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: GestureDetector(
            onTapDown: _onTapDown,
            onTapUp: _onTapUp,
            onTapCancel: _onTapCancel,
            child: Column(
              children: [
                // Main node circle
                Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    color: _nodeColor,
                    shape: BoxShape.circle,
                    border: widget.isCompleted
                        ? Border.all(color: AppTheme.brightYellow, width: 3)
                        : null,
                    boxShadow: widget.isAccessible
                        ? [
                            BoxShadow(
                              color: _nodeColor.withOpacity(0.3),
                              blurRadius: 15,
                              offset: const Offset(0, 6),
                            ),
                          ]
                        : null,
                  ),
                  child: Icon(
                    _nodeIcon,
                    size: 40,
                    color: Colors.white,
                  ),
                ),
                
                const SizedBox(height: 12),
                
                // Lesson info card
                Container(
                  constraints: const BoxConstraints(maxWidth: 140),
                  child: Card(
                    color: widget.isAccessible
                        ? AppTheme.cardBackground
                        : Colors.grey[200],
                    child: Padding(
                      padding: const EdgeInsets.all(12.0),
                      child: Column(
                        children: [
                          Text(
                            widget.title,
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              fontWeight: FontWeight.bold,
                              color: widget.isAccessible
                                  ? AppTheme.darkText
                                  : Colors.grey[600],
                            ),
                            textAlign: TextAlign.center,
                          ),
                          
                          const SizedBox(height: 4),
                          
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 4,
                            ),
                            decoration: BoxDecoration(
                              color: _getDifficultyColor().withOpacity(0.2),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Text(
                              widget.difficulty,
                              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                fontSize: 12,
                                color: _getDifficultyColor(),
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                          
                          if (widget.isCompleted) ...[
                            const SizedBox(height: 8),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: const [
                                Icon(
                                  Icons.star,
                                  size: 16,
                                  color: AppTheme.brightYellow,
                                ),
                                SizedBox(width: 2),
                                Text(
                                  '3',
                                  style: TextStyle(
                                    fontSize: 12,
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
              ],
            ),
          ),
        );
      },
    );
  }

  Color _getDifficultyColor() {
    switch (widget.difficulty.toLowerCase()) {
      case 'easy':
        return AppTheme.happyGreen;
      case 'medium':
        return AppTheme.playfulOrange;
      case 'hard':
        return AppTheme.softPink;
      default:
        return AppTheme.primaryBlue;
    }
  }
}