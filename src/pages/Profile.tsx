import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { FormField } from '../components/ui/FormField';
import { useAuth } from '../context/AuthContext';
import { Camera, Save, X } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    birthDate: user?.birthDate || '',
    gender: user?.gender || '',
    address: user?.address || '',
    email: user?.email || '',
    phone: user?.phone || '',
    studentId: user?.studentId || '',
    schoolYear: '2024-2025',
    class: user?.class || '',
    majorSubject: 'Sciences'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSave = () => {
    // In a real app, this would make an API call
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const handlePasswordSave = () => {
    // In a real app, this would make an API call
    console.log('Changing password');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Gestion du profil étudiant</h1>
        <p className="text-gray-600">Modifiez vos informations personnelles et académiques</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Informations personnelles</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  isEditing 
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isEditing ? <X className="h-4 w-4" /> : 'Modifier'}
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Prénom"
                name="firstName"
                value={profileData.firstName}
                onChange={handleProfileChange}
                disabled={!isEditing}
                required
              />
              <FormField
                label="Nom de famille"
                name="lastName"
                value={profileData.lastName}
                onChange={handleProfileChange}
                disabled={!isEditing}
                required
              />
            </div>

            <FormField
              label="Date de naissance"
              name="birthDate"
              type="date"
              value={profileData.birthDate}
              onChange={handleProfileChange}
              disabled={!isEditing}
            />

            <FormField
              label="Sexe"
              name="gender"
              type="select"
              value={profileData.gender}
              onChange={handleProfileChange}
              disabled={!isEditing}
              options={[
                { value: 'Masculin', label: 'Masculin' },
                { value: 'Féminin', label: 'Féminin' },
                { value: 'Autre', label: 'Autre' }
              ]}
            />

            <FormField
              label="Adresse"
              name="address"
              type="textarea"
              value={profileData.address}
              onChange={handleProfileChange}
              disabled={!isEditing}
              rows={2}
            />

            {isEditing && (
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleProfileSave}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Enregistrer les modifications
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Annuler
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Informations académiques</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              label="ID Étudiant"
              name="studentId"
              value={profileData.studentId}
              onChange={handleProfileChange}
              disabled
            />

            <FormField
              label="Année scolaire"
              name="schoolYear"
              type="select"
              value={profileData.schoolYear}
              onChange={handleProfileChange}
              disabled={!isEditing}
              options={[
                { value: '2024-2025', label: '2024-2025' },
                { value: '2023-2024', label: '2023-2024' }
              ]}
            />

            <FormField
              label="Classe"
              name="class"
              type="select"
              value={profileData.class}
              onChange={handleProfileChange}
              disabled={!isEditing}
              options={[
                { value: '10ème Année - Section A', label: '10ème Année - Section A' },
                { value: '10ème Année - Section B', label: '10ème Année - Section B' },
                { value: '11ème Année - Section A', label: '11ème Année - Section A' }
              ]}
            />

            <FormField
              label="Matière principale"
              name="majorSubject"
              type="select"
              value={profileData.majorSubject}
              onChange={handleProfileChange}
              disabled={!isEditing}
              options={[
                { value: 'Sciences', label: 'Sciences' },
                { value: 'Lettres', label: 'Lettres' },
                { value: 'Mathématiques', label: 'Mathématiques' },
                { value: 'Arts', label: 'Arts' }
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Coordonnées</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              label="Adresse e-mail"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleProfileChange}
              disabled={!isEditing}
            />

            <FormField
              label="Numéro de téléphone"
              name="phone"
              type="tel"
              value={profileData.phone}
              onChange={handleProfileChange}
              disabled={!isEditing}
            />
          </CardContent>
        </Card>

        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Photo de profil</h2>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  className="h-24 w-24 rounded-full object-cover mx-auto"
                  src={user?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'}
                  alt="Photo de profil"
                />
                <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 shadow-lg">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Votre photo de profil aide les autres à vous reconnaître.
              </p>
              <button className="mt-2 px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 text-sm">
                Changer l'image
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Sécurité du compte</h2>
          <p className="text-sm text-gray-600">Modifier votre mot de passe pour des raisons de sécurité.</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="Mot de passe actuel"
              name="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Entrez votre mot de passe actuel"
            />

            <FormField
              label="Nouveau mot de passe"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="Entrez un nouveau mot de passe"
            />

            <FormField
              label="Confirmer le nouveau mot de passe"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirmez votre nouveau mot de passe"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handlePasswordSave}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Changer le mot de passe
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};