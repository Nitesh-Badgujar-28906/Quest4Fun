import 'dart:convert';

class UserModel {
  final String id;
  final String name;
  final String avatar;
  final int level;
  final int totalStars;
  final int totalCoins;
  final DateTime createdAt;

  UserModel({
    required this.id,
    required this.name,
    required this.avatar,
    required this.level,
    required this.totalStars,
    required this.totalCoins,
    required this.createdAt,
  });

  UserModel copyWith({
    String? id,
    String? name,
    String? avatar,
    int? level,
    int? totalStars,
    int? totalCoins,
    DateTime? createdAt,
  }) {
    return UserModel(
      id: id ?? this.id,
      name: name ?? this.name,
      avatar: avatar ?? this.avatar,
      level: level ?? this.level,
      totalStars: totalStars ?? this.totalStars,
      totalCoins: totalCoins ?? this.totalCoins,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'avatar': avatar,
      'level': level,
      'totalStars': totalStars,
      'totalCoins': totalCoins,
      'createdAt': createdAt.millisecondsSinceEpoch,
    };
  }

  factory UserModel.fromMap(Map<String, dynamic> map) {
    return UserModel(
      id: map['id'] ?? '',
      name: map['name'] ?? '',
      avatar: map['avatar'] ?? '',
      level: map['level']?.toInt() ?? 0,
      totalStars: map['totalStars']?.toInt() ?? 0,
      totalCoins: map['totalCoins']?.toInt() ?? 0,
      createdAt: DateTime.fromMillisecondsSinceEpoch(map['createdAt']),
    );
  }

  String toJson() => json.encode(toMap());

  factory UserModel.fromJson(String source) => UserModel.fromMap(json.decode(source));

  @override
  String toString() {
    return 'UserModel(id: $id, name: $name, avatar: $avatar, level: $level, totalStars: $totalStars, totalCoins: $totalCoins, createdAt: $createdAt)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
  
    return other is UserModel &&
      other.id == id &&
      other.name == name &&
      other.avatar == avatar &&
      other.level == level &&
      other.totalStars == totalStars &&
      other.totalCoins == totalCoins &&
      other.createdAt == createdAt;
  }

  @override
  int get hashCode {
    return id.hashCode ^
      name.hashCode ^
      avatar.hashCode ^
      level.hashCode ^
      totalStars.hashCode ^
      totalCoins.hashCode ^
      createdAt.hashCode;
  }
}