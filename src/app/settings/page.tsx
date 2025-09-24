'use client';

import { useAuth } from '@/context/AuthContext';
import { AppLayout } from '@/components/layout/AppLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Child, Parent } from '@/types';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Volume2, 
  VolumeX,
  Moon,
  Sun,
  Shield,
  HelpCircle,
  LogOut,
  Edit,
  Save,
  X,
  Camera,
  Palette,
  Globe,
  Lock,
  Mail,
  Phone
} from 'lucide-react';

interface UserSettings {
  notifications: {
    dailyReminders: boolean;
    achievements: boolean;
    parentUpdates: boolean;
    weeklyProgress: boolean;
  };
  audio: {
    soundEffects: boolean;
    backgroundMusic: boolean;
    voiceInstructions: boolean;
    masterVolume: number;
  };
  display: {
    theme: 'light' | 'dark' | 'auto';
    colorScheme: 'default' | 'colorful' | 'pastel' | 'bright';
    fontSize: 'small' | 'medium' | 'large';
    reducedMotion: boolean;
  };
  privacy: {
    shareProgress: boolean;
    profileVisible: boolean;
    dataCollection: boolean;
  };
}

const defaultSettings: UserSettings = {
  notifications: {
    dailyReminders: true,
    achievements: true,
    parentUpdates: true,
    weeklyProgress: false
  },
  audio: {
    soundEffects: true,
    backgroundMusic: true,
    voiceInstructions: true,
    masterVolume: 75
  },
  display: {
    theme: 'light',
    colorScheme: 'colorful',
    fontSize: 'medium',
    reducedMotion: false
  },
  privacy: {
    shareProgress: true,
    profileVisible: true,
    dataCollection: true
  }
};

export default function SettingsPage() {
  const { user, userType, isLoading, logout } = useAuth();
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [selectedTab, setSelectedTab] = useState('profile');

  // Type guard functions
  const isChild = (user: any): user is Child => {
    return userType === 'child' && user && 'avatar' in user;
  };

  const isParent = (user: any): user is Parent => {
    return userType === 'parent' && user && 'email' in user;
  };

  useEffect(() => {
    if (!isLoading && (!user || userType !== 'child')) {
      redirect('/');
    }
  }, [user, userType, isLoading]);

  useEffect(() => {
    if (user) {
      setEditedName(user.name || '');
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" color="text-white" />
          <div className="text-white text-2xl font-bold">Loading Settings...</div>
        </div>
      </div>
    );
  }

  if (!user || userType !== 'child') {
    return null; // Will redirect
  }

  const handleSettingChange = (category: keyof UserSettings, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSaveProfile = () => {
    // In real app, save to Firebase
    console.log('Saving profile changes:', { name: editedName });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
  };

  const TabButton = ({ id, label, icon: Icon }: { id: string; label: string; icon: any }) => (
    <button
      onClick={() => setSelectedTab(id)}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
        selectedTab === id
          ? 'bg-blue-500 text-white shadow-lg'
          : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: (value: boolean) => void }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <AppLayout currentPage="settings">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-2">⚙️ Settings</h1>
            <p className="text-xl text-gray-600">Customize your Quest4Fun experience</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              <TabButton id="profile" label="Profile" icon={User} />
              <TabButton id="notifications" label="Notifications" icon={Bell} />
              <TabButton id="audio" label="Audio" icon={Volume2} />
              <TabButton id="display" label="Display" icon={Palette} />
              <TabButton id="privacy" label="Privacy" icon={Shield} />
              <TabButton id="help" label="Help" icon={HelpCircle} />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {selectedTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>
                    
                    <div className="flex items-center gap-6 mb-6">
                      <div className="relative">
                        <Avatar
                          src={isChild(user) ? user.avatar : '/images/avatars/default-parent.png'}
                          alt={user.name}
                          size="xl"
                          className="border-4 border-blue-200"
                        />
                        <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                          <Camera className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex-1">
                        {isEditing ? (
                          <div className="space-y-4">
                            <input
                              type="text"
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter your name"
                            />
                            <div className="flex gap-2">
                              <Button onClick={handleSaveProfile} className="flex items-center gap-1">
                                <Save className="w-4 h-4" />
                                Save
                              </Button>
                              <Button 
                                variant="secondary" 
                                onClick={() => {
                                  setIsEditing(false);
                                  setEditedName(user.name || '');
                                }}
                                className="flex items-center gap-1"
                              >
                                <X className="w-4 h-4" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h3>
                            <p className="text-gray-600 mb-4">Level {isChild(user) ? (user as any).currentLevel || 1 : 1} Learner</p>
                            <Button 
                              variant="secondary" 
                              onClick={() => setIsEditing(true)}
                              className="flex items-center gap-1"
                            >
                              <Edit className="w-4 h-4" />
                              Edit Profile
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{isChild(user) ? user.totalStars : 0}</div>
                        <div className="text-sm text-gray-600">Stars Earned</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{isChild(user) ? user.totalCoins : 0}</div>
                        <div className="text-sm text-gray-600">Coins</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{isChild(user) ? user.currentStreak : 0}</div>
                        <div className="text-sm text-gray-600">Day Streak</div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Parent Contact</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-600">
                        <Mail className="w-5 h-5" />
                        <span>parent@example.com</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Phone className="w-5 h-5" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Notifications Tab */}
            {selectedTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">Daily Learning Reminders</h3>
                          <p className="text-sm text-gray-600">Get reminded to practice every day</p>
                        </div>
                        <ToggleSwitch 
                          enabled={settings.notifications.dailyReminders}
                          onChange={(value) => handleSettingChange('notifications', 'dailyReminders', value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">Achievement Notifications</h3>
                          <p className="text-sm text-gray-600">Celebrate when you earn badges and rewards</p>
                        </div>
                        <ToggleSwitch 
                          enabled={settings.notifications.achievements}
                          onChange={(value) => handleSettingChange('notifications', 'achievements', value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">Parent Updates</h3>
                          <p className="text-sm text-gray-600">Send progress updates to your parents</p>
                        </div>
                        <ToggleSwitch 
                          enabled={settings.notifications.parentUpdates}
                          onChange={(value) => handleSettingChange('notifications', 'parentUpdates', value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">Weekly Progress Report</h3>
                          <p className="text-sm text-gray-600">Get a summary of your week's learning</p>
                        </div>
                        <ToggleSwitch 
                          enabled={settings.notifications.weeklyProgress}
                          onChange={(value) => handleSettingChange('notifications', 'weeklyProgress', value)}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Audio Tab */}
            {selectedTab === 'audio' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Audio Settings</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Master Volume: {settings.audio.masterVolume}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={settings.audio.masterVolume}
                          onChange={(e) => handleSettingChange('audio', 'masterVolume', parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">Sound Effects</h3>
                          <p className="text-sm text-gray-600">Play sounds for clicks, success, and errors</p>
                        </div>
                        <ToggleSwitch 
                          enabled={settings.audio.soundEffects}
                          onChange={(value) => handleSettingChange('audio', 'soundEffects', value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">Background Music</h3>
                          <p className="text-sm text-gray-600">Play cheerful music while learning</p>
                        </div>
                        <ToggleSwitch 
                          enabled={settings.audio.backgroundMusic}
                          onChange={(value) => handleSettingChange('audio', 'backgroundMusic', value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">Voice Instructions</h3>
                          <p className="text-sm text-gray-600">Hear spoken instructions and feedback</p>
                        </div>
                        <ToggleSwitch 
                          enabled={settings.audio.voiceInstructions}
                          onChange={(value) => handleSettingChange('audio', 'voiceInstructions', value)}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Display Tab */}
            {selectedTab === 'display' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Display Settings</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Color Scheme</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {['default', 'colorful', 'pastel', 'bright'].map((scheme) => (
                            <button
                              key={scheme}
                              onClick={() => handleSettingChange('display', 'colorScheme', scheme)}
                              className={`p-3 border rounded-lg text-center capitalize transition-all ${
                                settings.display.colorScheme === scheme
                                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {scheme}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Font Size</label>
                        <div className="flex gap-3">
                          {['small', 'medium', 'large'].map((size) => (
                            <button
                              key={size}
                              onClick={() => handleSettingChange('display', 'fontSize', size)}
                              className={`px-4 py-2 border rounded-lg capitalize transition-all ${
                                settings.display.fontSize === size
                                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">Reduced Motion</h3>
                          <p className="text-sm text-gray-600">Minimize animations and transitions</p>
                        </div>
                        <ToggleSwitch 
                          enabled={settings.display.reducedMotion}
                          onChange={(value) => handleSettingChange('display', 'reducedMotion', value)}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Privacy Tab */}
            {selectedTab === 'privacy' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Privacy Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">Share Progress</h3>
                          <p className="text-sm text-gray-600">Allow friends to see your achievements</p>
                        </div>
                        <ToggleSwitch 
                          enabled={settings.privacy.shareProgress}
                          onChange={(value) => handleSettingChange('privacy', 'shareProgress', value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">Profile Visibility</h3>
                          <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                        </div>
                        <ToggleSwitch 
                          enabled={settings.privacy.profileVisible}
                          onChange={(value) => handleSettingChange('privacy', 'profileVisible', value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">Data Collection</h3>
                          <p className="text-sm text-gray-600">Help improve the app with usage data</p>
                        </div>
                        <ToggleSwitch 
                          enabled={settings.privacy.dataCollection}
                          onChange={(value) => handleSettingChange('privacy', 'dataCollection', value)}
                        />
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-start gap-3">
                        <Lock className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div className="text-sm text-yellow-800">
                          <p className="font-medium mb-1">Your Privacy is Important</p>
                          <p>We never share your personal information with third parties. All data is kept secure and used only to improve your learning experience.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Help Tab */}
            {selectedTab === 'help' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Help & Support</h2>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
                        <p className="text-blue-700 text-sm mb-3">
                          Ask your parent or teacher for help, or contact our support team.
                        </p>
                        <Button variant="secondary" className="text-blue-600 border-blue-300 hover:bg-blue-100">
                          Contact Support
                        </Button>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h3 className="font-semibold text-green-800 mb-2">App Version</h3>
                        <p className="text-green-700 text-sm">Quest4Fun v1.0.0</p>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <Button 
                          onClick={handleLogout}
                          variant="danger"
                          className="flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}