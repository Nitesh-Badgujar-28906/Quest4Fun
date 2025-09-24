import 'package:flutter/material.dart';
import '../utils/app_theme.dart';

class AvatarSelector extends StatelessWidget {
  final String selectedAvatar;
  final Function(String) onAvatarSelected;

  const AvatarSelector({
    super.key,
    required this.selectedAvatar,
    required this.onAvatarSelected,
  });

  static const List<Map<String, dynamic>> avatars = [
    {'id': 'avatar_1', 'icon': Icons.face, 'color': AppTheme.happyGreen},
    {'id': 'avatar_2', 'icon': Icons.face_2, 'color': AppTheme.playfulOrange},
    {'id': 'avatar_3', 'icon': Icons.face_3, 'color': AppTheme.softPink},
    {'id': 'avatar_4', 'icon': Icons.face_4, 'color': AppTheme.lightPurple},
    {'id': 'avatar_5', 'icon': Icons.face_5, 'color': AppTheme.primaryBlue},
    {'id': 'avatar_6', 'icon': Icons.face_6, 'color': AppTheme.brightYellow},
  ];

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
        childAspectRatio: 1,
      ),
      itemCount: avatars.length,
      itemBuilder: (context, index) {
        final avatar = avatars[index];
        final isSelected = selectedAvatar == avatar['id'];
        
        return GestureDetector(
          onTap: () => onAvatarSelected(avatar['id']),
          child: AnimatedContainer(
            duration: AppTheme.shortAnimation,
            decoration: BoxDecoration(
              color: avatar['color'],
              shape: BoxShape.circle,
              border: isSelected
                  ? Border.all(
                      color: AppTheme.darkText,
                      width: 4,
                    )
                  : null,
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  blurRadius: isSelected ? 15 : 8,
                  offset: Offset(0, isSelected ? 8 : 4),
                ),
              ],
            ),
            child: Icon(
              avatar['icon'],
              size: isSelected ? 50 : 40,
              color: Colors.white,
            ),
          ),
        );
      },
    );
  }
}