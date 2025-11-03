'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { createChild } from '@/lib/firestore';
import { X, User, Calendar, GraduationCap, Image, CheckCircle, AlertCircle } from 'lucide-react';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  parentId: string;
  onStudentAdded?: () => void;
}

const avatarOptions = [
  '/avatars/boy1.png',
  '/avatars/boy2.png',
  '/avatars/boy3.png',
  '/avatars/girl1.png',
  '/avatars/girl2.png',
  '/avatars/girl3.png',
  '/avatars/default1.png',
  '/avatars/default2.png'
];

const grades = ['JKG', 'LKG', '1st', '2nd', '3rd', '4th'];

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  parentId,
  onStudentAdded
}) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: 'JKG',
    avatar: avatarOptions[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validate inputs
      if (!formData.name.trim()) {
        throw new Error('Please enter a student name');
      }
      
      const age = parseInt(formData.age);
      if (!age || age < 3 || age > 15) {
        throw new Error('Please enter a valid age (3-15 years)');
      }

      // Create child in Firebase
      const childId = await createChild({
        name: formData.name.trim(),
        avatar: formData.avatar,
        age: age,
        grade: formData.grade,
        parentId: parentId,
        totalStars: 0,
        totalCoins: 0,
        badges: [],
        unlockedLevels: [],
        currentStreak: 0,
        preferences: {
          soundEnabled: true,
          difficultyLevel: 'easy'
        }
      });

      console.log('Student created successfully with ID:', childId);
      setSuccess(true);

      // Reset form after a short delay
      setTimeout(() => {
        setFormData({
          name: '',
          age: '',
          grade: 'JKG',
          avatar: avatarOptions[0]
        });
        setSuccess(false);
        onClose();
        onStudentAdded?.();
      }, 2000);

    } catch (err) {
      console.error('Error adding student:', err);
      setError(err instanceof Error ? err.message : 'Failed to add student. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Add New Student</h2>
                <p className="text-blue-100">Create a learning profile for your child</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Success Message */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-semibold">Student Added Successfully! 🎉</p>
                  <p className="text-green-600 text-sm">Redirecting back to dashboard...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Student Name */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <User className="w-4 h-4" />
              Student Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter student's full name"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              required
              disabled={isSubmitting || success}
            />
          </div>

          {/* Age */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <Calendar className="w-4 h-4" />
              Age *
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
              placeholder="Enter age (3-15 years)"
              min="3"
              max="15"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              required
              disabled={isSubmitting || success}
            />
          </div>

          {/* Grade */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <GraduationCap className="w-4 h-4" />
              Grade *
            </label>
            <select
              value={formData.grade}
              onChange={(e) => handleChange('grade', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              required
              disabled={isSubmitting || success}
            >
              {grades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
              <Image className="w-4 h-4" />
              Choose Avatar
            </label>
            <div className="grid grid-cols-4 gap-3">
              {avatarOptions.map((avatar, index) => (
                <motion.button
                  key={avatar}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChange('avatar', avatar)}
                  className={`relative aspect-square rounded-xl border-4 transition-all overflow-hidden ${
                    formData.avatar === avatar
                      ? 'border-blue-500 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  disabled={isSubmitting || success}
                >
                  <div className={`w-full h-full flex items-center justify-center text-4xl ${
                    formData.avatar === avatar ? 'bg-blue-50' : 'bg-gray-50'
                  }`}>
                    {/* Emoji avatars as fallback */}
                    {['👦', '👨', '🧑', '👧', '👩', '👶', '🧒', '👤'][index]}
                  </div>
                  {formData.avatar === avatar && (
                    <div className="absolute top-1 right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting || success}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={isSubmitting || success}
              loading={isSubmitting}
            >
              {isSubmitting ? 'Adding Student...' : 'Add Student'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
