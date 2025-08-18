import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { FormField } from '../components/ui/FormField';
import { useAuth } from '../context/AuthContext';
import { LogOut, Save, Moon, Sun, Bell, Shield, Globe } from 'lucide-react';

export const Settings: React.FC = () => {
  const { logout } = useAuth();
  const [settings, setSettings] = useState({
    language: 'fr',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      grades: true,
      attendance: true,
      payments: false
    },
    privacy: {
      showProfile: true,
      allowMessages: true,
      shareGrades: false
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSettingChange = (category: string, setting: string, value: any) => {
    if (category === 'root') {
      setSettings(prev => ({ ...prev, [setting]: value }));
    } else {
      setSettings(prev => ({
        ...prev,
        [category]: { ...prev[category as keyof typeof prev], [setting]: value }
      }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // In real app, save to API
  };

  const handleChangePassword = () => {
    console.log('Changing password');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      logout();
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Paramètres</h1>
        <p className="text-gray-600">Gérez vos préférences et paramètres de compte</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-green-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Préférences générales</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              label="Langue"
              name="language"
              type="select"
              value={settings.language}
              onChange={(e) => handleSettingChange('root', 'language', e.target.value)}
              options={[
                { value: 'fr', label: 'Français' },
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Español' },
                { value: 'de', label: 'Deutsch' }
              ]}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Thème de l'interface
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleSettingChange('root', 'theme', 'light')}
                  className={`flex items-center px-4 py-2 rounded-md border ${
                    settings.theme === 'light' 
                      ? 'border-green-500 bg-green-50 text-green-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Clair
                </button>
                <button
                  onClick={() => handleSettingChange('root', 'theme', 'dark')}
                  className={`flex items-center px-4 py-2 rounded-md border ${
                    settings.theme === 'dark' 
                      ? 'border-green-500 bg-green-50 text-green-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Sombre
                </button>
              </div>
            </div>

            <button
              onClick={handleSaveSettings}
              className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Enregistrer les préférences
            </button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-green-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'email', label: 'Notifications par e-mail' },
              { key: 'push', label: 'Notifications push' },
              { key: 'grades', label: 'Nouvelles notes' },
              { key: 'attendance', label: 'Présences/Absences' },
              { key: 'payments', label: 'Rappels de paiement' }
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm text-gray-700">{label}</label>
                <button
                  onClick={() => handleSettingChange('notifications', key, !settings.notifications[key as keyof typeof settings.notifications])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.notifications[key as keyof typeof settings.notifications] 
                      ? 'bg-green-600' 
                      : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications[key as keyof typeof settings.notifications] 
                        ? 'translate-x-6' 
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-green-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Confidentialité</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { key: 'showProfile', label: 'Profil visible par les camarades', description: 'Permet aux autres étudiants de voir votre profil' },
              { key: 'allowMessages', label: 'Autoriser les messages', description: 'Recevoir des messages de vos camarades de classe' },
              { key: 'shareGrades', label: 'Partager les notes', description: 'Afficher vos notes dans le classement de classe' }
            ].map(({ key, label, description }) => (
              <div key={key} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{label}</h3>
                  <button
                    onClick={() => handleSettingChange('privacy', key, !settings.privacy[key as keyof typeof settings.privacy])}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.privacy[key as keyof typeof settings.privacy] 
                        ? 'bg-green-600' 
                        : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.privacy[key as keyof typeof settings.privacy] 
                          ? 'translate-x-6' 
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-green-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Changer le mot de passe</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="Mot de passe actuel"
              name="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Mot de passe actuel"
            />
            <FormField
              label="Nouveau mot de passe"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="Nouveau mot de passe"
            />
            <FormField
              label="Confirmer le mot de passe"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirmer le mot de passe"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={handleChangePassword}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Changer le mot de passe
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="border-red-200">
        <CardHeader>
          <h2 className="text-lg font-semibold text-red-900">Actions du compte</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Se déconnecter
            </button>
            <button className="flex items-center justify-center px-6 py-3 border-2 border-red-600 text-red-600 rounded-md hover:bg-red-50">
              Supprimer le compte
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            La déconnexion vous ramènera à la page de connexion. La suppression du compte est irréversible.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};