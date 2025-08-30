import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  Trophy, 
  Users, 
  Clock, 
  CreditCard, 
  Receipt, 
  School, 
  User, 
  Settings,
  X,
  BookCheck
} from 'lucide-react';

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: Home },
  { name: 'Mes cours', href: '/courses', icon: BookCheck },
  { name: 'Emploi du temps', href: '/timetable', icon: Calendar },
  { name: 'Notes & bulletins', href: '/grades', icon: BookOpen },
  { name: 'Classement de la classe', href: '/rankings', icon: Trophy },
  { name: 'Camarades de classe', href: '/classmates', icon: Users },
  { name: 'Historique des présences', href: '/attendance', icon: Clock },
  { name: 'Historique des paiements', href: '/payments', icon: CreditCard },
  { name: 'Versements de frais en suspens', href: '/fees', icon: Receipt },
  { name: 'Informations sur l\'école', href: '/school-info', icon: School },
  { name: 'Gestion du profil', href: '/profile', icon: User },
  { name: 'Paramètres', href: '/settings', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">✓</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Espace Elève</span>
          </div>
          <button 
            onClick={onToggle}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-8">
          <div className="px-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 mb-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-green-50 text-green-700 border-r-2 border-green-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => {
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-green-700' : 'text-gray-400'}`} />
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};