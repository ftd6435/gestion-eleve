import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { MapPin, Phone, Mail, Globe, Clock, GraduationCap } from 'lucide-react';

export const SchoolInfo: React.FC = () => {
  const schoolContacts = [
    {
      name: 'Madame Dubois',
      role: 'Directrice',
      email: 'directrice@ecole-excellence.fr',
      phone: '+33 1 23 45 67 89',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Monsieur Lefevre',
      role: 'Responsable administratif',
      email: 'admin@ecole-excellence.fr',
      phone: '+33 1 23 45 67 90',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Mademoiselle Moreau',
      role: 'Conseillère d\'orientation',
      email: 'orientation@ecole-excellence.fr',
      phone: '+33 1 23 45 67 91',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const schoolHours = [
    { day: 'Lundi - Vendredi', hours: '08:00 - 17:00' },
    { day: 'Samedi', hours: '08:00 - 12:00' },
    { day: 'Dimanche', hours: 'Fermé' }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Informations sur l'école</h1>
        <p className="text-gray-600">Coordonnées et contacts de l'établissement</p>
      </div>

      {/* School Overview */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-8">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-green-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">École d'Excellence Lumière</h2>
              <p className="text-gray-700 leading-relaxed">
                L'École d'Excellence Lumière est dédiée à former les leaders de demain par une 
                éducation holistique, favorisant l'excellence académique, le développement personnel et 
                la citoyenneté responsable. Nous cultivons un environnement d'apprentissage stimulant 
                et inclusif pour chaque élève.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Contact et Localisation</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Adresse</p>
                  <p className="text-gray-600">123 Rue de la Sagesse, 75001 Paris, France</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Téléphone</p>
                  <p className="text-gray-600">+33 1 23 45 67 89</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">contact@ecole-lumiere.fr</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Globe className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Site web</p>
                  <a href="#" className="text-green-600 hover:text-green-700">
                    www.ecole-lumiere.fr
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* School Hours */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Horaires d'ouverture</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schoolHours.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-900">{schedule.day}</span>
                  </div>
                  <span className="text-gray-600">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Section */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Emplacement de l'école</h2>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
            <div className="text-center text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p>Carte interactive de l'école</p>
              <p className="text-sm">123 Rue de la Sagesse, 75001 Paris</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Directory */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Personnel clé</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {schoolContacts.map((contact, index) => (
              <div key={index} className="text-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  className="h-16 w-16 rounded-full mx-auto mb-4 object-cover"
                  src={contact.avatar}
                  alt={contact.name}
                />
                <h3 className="font-semibold text-gray-900 mb-1">{contact.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{contact.role}</p>
                <div className="space-y-2">
                  <a 
                    href={`mailto:${contact.email}`}
                    className="flex items-center justify-center text-sm text-green-600 hover:text-green-700"
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    {contact.email}
                  </a>
                  <a 
                    href={`tel:${contact.phone}`}
                    className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-800"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    {contact.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Liens utiles</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Globe className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <span className="text-sm font-medium">Site web</span>
            </button>
            <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Mail className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <span className="text-sm font-medium">Nous contacter</span>
            </button>
            <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <span className="text-sm font-medium">Directions</span>
            </button>
            <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Clock className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <span className="text-sm font-medium">Horaires</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};