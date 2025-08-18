import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Search, Mail, Phone, MessageCircle } from 'lucide-react';

export const Classmates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const classmates = [
    { id: 1, name: 'Alice Martin', email: 'alice.martin@example.fr', phone: '+33 6 12 34 56 78', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150', status: 'online' },
    { id: 2, name: 'Baptiste Durand', email: 'baptiste.durand@example.fr', phone: '+33 6 23 45 67 89', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', status: 'offline' },
    { id: 3, name: 'Camille Rousseau', email: 'camille.rousseau@example.fr', phone: '+33 6 34 56 78 90', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', status: 'online' },
    { id: 4, name: 'David Bernard', email: 'david.bernard@example.fr', phone: '+33 6 45 67 89 01', avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150', status: 'offline' },
    { id: 5, name: 'Emma Leroy', email: 'emma.leroy@example.fr', phone: '+33 6 56 78 90 12', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150', status: 'online' },
    { id: 6, name: 'Florian Moreau', email: 'florian.moreau@example.fr', phone: '+33 6 67 89 01 23', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150', status: 'online' },
    { id: 7, name: 'Gabrielle Simon', email: 'gabrielle.simon@example.fr', phone: '+33 6 78 90 12 34', avatar: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=150', status: 'offline' },
    { id: 8, name: 'Hugo Michel', email: 'hugo.michel@example.fr', phone: '+33 6 89 01 23 45', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', status: 'online' }
  ];

  const filteredClassmates = classmates.filter(classmate =>
    classmate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Camarades de classe</h1>
        <p className="text-gray-600">Classe de 10ème année - Section A ({classmates.length} étudiants)</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un camarade de classe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </CardContent>
      </Card>

      {/* Classmates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClassmates.map((classmate) => (
          <Card key={classmate.id} hover className="relative">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={classmate.avatar}
                    alt={classmate.name}
                  />
                  <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                    classmate.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{classmate.name}</h3>
                  <p className="text-sm text-gray-500">
                    {classmate.status === 'online' ? 'En ligne' : 'Hors ligne'}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="truncate">{classmate.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{classmate.phone}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center px-3 py-2 border border-green-600 text-green-600 text-sm rounded-md hover:bg-green-50 transition-colors">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </button>
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClassmates.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Aucun camarade trouvé pour "{searchTerm}"</p>
          </CardContent>
        </Card>
      )}

      {/* Class Stats */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Statistiques de la classe</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{classmates.length}</p>
              <p className="text-sm text-gray-600">Total étudiants</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {classmates.filter(c => c.status === 'online').length}
              </p>
              <p className="text-sm text-gray-600">En ligne</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">16.4/20</p>
              <p className="text-sm text-gray-600">Moyenne classe</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">92%</p>
              <p className="text-sm text-gray-600">Taux présence</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};