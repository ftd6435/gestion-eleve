import React from 'react';
import { Link } from 'react-router-dom';
import { StatBox } from '../components/ui/StatBox';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Calendar, TrendingUp, Clock, BookOpen, Users, GraduationCap, Bell } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const notifications = [
    {
      title: "Rappel: Inscription aux clubs",
      message: "Les inscriptions pour les clubs parascolaires se terminent le 31 janvier.",
      date: "18 Janvier 2024",
      type: "warning" as const
    },
    {
      title: "Journée Portes Ouvertes",
      message: "La Journée Portes Ouvertes de l'école aura lieu le samedi 25 février de 9h à 15h.",
      date: "15 Janvier 2024",
      type: "info" as const
    },
    {
      title: "Mise à jour de l'Emploi du Temps",
      message: "Une légère modification a été apportée à l'emploi du temps des cours de mathématiques.",
      date: "12 Janvier 2024",
      type: "success" as const
    }
  ];

  const quickActions = [
    { title: "Mon Emploi du Temps", description: "Voir mes cours de la semaine", icon: Calendar, href: "/timetable" },
    { title: "Mes Notes", description: "Consulter mes relevés et examens", icon: BookOpen, href: "/grades" },
    { title: "Mon Profil", description: "Gérer mes informations personnelles", icon: Users, href: "/profile" },
    { title: "Informations École", description: "Coordonnées et contacts", icon: GraduationCap, href: "/school-info" }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Aperçu Académique et Financier</h1>
        <p className="text-gray-600">Bienvenue dans votre espace étudiant</p>
      </div>

      {/* Academic Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatBox
          title="Moyenne Générale"
          value="85.5%"
          subtitle="Depuis le dernier rapport"
          icon={<TrendingUp size={24} />}
          trend={{ value: "+2.3%", isPositive: true }}
          color="green"
        />
        <StatBox
          title="Rang dans la classe"
          value="5/30"
          subtitle="Classe de 10ème année"
          icon={<GraduationCap size={24} />}
          color="blue"
        />
        <StatBox
          title="Taux de présence"
          value="92%"
          subtitle="À jour cette semaine"
          icon={<Clock size={24} />}
          color="green"
        />
        <StatBox
          title="Cours manqués"
          value="3"
          subtitle="Depuis le début du semestre"
          icon={<Bell size={24} />}
          color="orange"
        />
      </div>

      {/* Financial Status */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Statut Financier</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
                <span className='text-orange-600 font-semibold'>GNF</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Frais en suspens</p>
              <p className="text-2xl font-bold text-orange-600">2 000 000 GNF</p>
              <p className="text-xs text-gray-500">Total dû pour l'année</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                <span className="text-green-600 font-semibold">GNF</span> 
              </div>
              <p className="text-sm text-gray-600 mb-1">Dernier paiement</p>
              <p className="text-2xl font-bold text-green-600">1 500 000 GNF</p>
              <p className="text-xs text-gray-500">Reçu le 10/01/2024</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                <span className="text-blue-600 font-semibold">GNF</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Prochaine échéance</p>
              <p className="text-2xl font-bold text-blue-600">500 000 GNF</p>
              <p className="text-xs text-gray-500">Le 15/02/2024</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Announcements */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Annonces Importantes</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div key={index} className="border-l-4 border-l-green-500 pl-4 py-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{notification.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  </div>
                  <span className="text-xs text-gray-500 ml-4">{notification.date}</span>
                </div>
                <button className="text-green-600 text-sm hover:text-green-700">
                  Voir les détails →
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Accès Rapide</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="text-center p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors block"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mx-auto mb-3">
                  <action.icon className="text-gray-600" size={24} />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{action.title}</h3>
                <p className="text-xs text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};