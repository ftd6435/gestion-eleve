import React from "react";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Link } from "react-router-dom";
import {
  Calendar,
  Calculator,
  Atom,
  Globe,
  FlaskConical,
  BookOpen,
  Languages,
  Users,
  GraduationCap,
} from "lucide-react";

export const Courses: React.FC = () => {
  // Liste fictive de cours, simulant des données venant d'une API
  const myCourses = [
    { subject: "Mathématiques", teacher: "M. Camara", icon: Calculator },
    { subject: "Français", teacher: "Mme Diallo", icon: BookOpen },
    { subject: "Anglais", teacher: "M. Barry", icon: Languages },
    { subject: "Physique", teacher: "Mme Bah", icon: FlaskConical },
    { subject: "Chimie", teacher: "M. Bah", icon: Atom },
    { subject: "Histoire", teacher: "M. Sylla", icon: Globe },
    { subject: "Géographie", teacher: "Mme Keita", icon: Globe },
    { subject: "Biologie", teacher: "Mme Keita", icon: Atom },
  ];

  const quickActions = [
    {
      title: "Mon Emploi du Temps",
      description: "Voir mes cours de la semaine",
      icon: Calendar,
      href: "/timetable",
    },
    {
      title: "Mes Notes",
      description: "Consulter mes relevés et examens",
      icon: BookOpen,
      href: "/grades",
    },
    {
      title: "Mon Profil",
      description: "Gérer mes informations personnelles",
      icon: Users,
      href: "/profile",
    },
    {
      title: "Informations École",
      description: "Coordonnées et contacts",
      icon: GraduationCap,
      href: "/school-info",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">
        📚 Liste des cours - Classe de 10ème Année
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map((course, index) => {
          const Icon = course.icon;
          return (
            <div
              key={index}
              className="flex items-center p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-700 shadow-md mr-4">
                <Icon size={26} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {course.subject}
                </h3>
                <p className="text-sm text-gray-500">
                  Professeur : {course.teacher}
                </p>
              </div>
            </div>
          );
        })}
      </div>

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
                <h3 className="font-medium text-gray-900 mb-1">
                  {action.title}
                </h3>
                <p className="text-xs text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
