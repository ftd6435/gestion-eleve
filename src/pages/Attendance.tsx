import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

export const Attendance: React.FC = () => {
  const attendanceData = [
    { date: '22/01/2024', subject: 'Mathématiques', status: 'present', time: '08:00' },
    { date: '22/01/2024', subject: 'Français', status: 'present', time: '09:00' },
    { date: '21/01/2024', subject: 'Sciences', status: 'late', time: '08:15' },
    { date: '21/01/2024', subject: 'Histoire', status: 'present', time: '10:00' },
    { date: '20/01/2024', subject: 'Anglais', status: 'present', time: '14:00' },
    { date: '19/01/2024', subject: 'Arts Plastiques', status: 'absent', time: '-' },
    { date: '19/01/2024', subject: 'Éducation Physique', status: 'present', time: '15:00' },
    { date: '18/01/2024', subject: 'Mathématiques', status: 'present', time: '08:00' },
    { date: '18/01/2024', subject: 'Sciences', status: 'late', time: '10:15' },
    { date: '17/01/2024', subject: 'Français', status: 'present', time: '09:00' }
  ];

  const pieData = [
    { name: 'Présent', value: 70, color: '#10B981' },
    { name: 'Retard', value: 20, color: '#F59E0B' },
    { name: 'Absent', value: 10, color: '#EF4444' }
  ];

  const monthlyData = [
    { month: 'Sep', present: 85, absent: 15 },
    { month: 'Oct', present: 88, absent: 12 },
    { month: 'Nov', present: 92, absent: 8 },
    { month: 'Dec', present: 90, absent: 10 },
    { month: 'Jan', present: 87, absent: 13 }
  ];

  const columns = [
    {
      key: 'date',
      header: 'Date',
      render: (value: string) => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
          {value}
        </div>
      )
    },
    { key: 'subject', header: 'Matière' },
    {
      key: 'status',
      header: 'Statut',
      render: (value: string) => {
        const statusConfig = {
          present: { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle, label: 'Présent' },
          late: { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: Clock, label: 'Retard' },
          absent: { color: 'text-red-600', bg: 'bg-red-100', icon: XCircle, label: 'Absent' }
        };
        
        const config = statusConfig[value as keyof typeof statusConfig];
        const Icon = config.icon;
        
        return (
          <div className={`flex items-center px-2 py-1 rounded-full ${config.bg} ${config.color} text-xs font-medium w-fit`}>
            <Icon className="h-3 w-3 mr-1" />
            {config.label}
          </div>
        );
      }
    },
    { key: 'time', header: 'Heure d\'arrivée' }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Historique des présences</h1>
        <p className="text-gray-600">Suivi de votre assiduité et ponctualité</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-800">Taux de présence</p>
                <p className="text-3xl font-bold text-green-900">92%</p>
                <p className="text-xs text-green-600">À jour cette semaine</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-10 w-10 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-yellow-800">Retards</p>
                <p className="text-3xl font-bold text-yellow-900">2</p>
                <p className="text-xs text-yellow-600">Ce mois-ci</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-red-800">Absences</p>
                <p className="text-3xl font-bold text-red-900">3</p>
                <p className="text-xs text-red-600">Depuis le début du semestre</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Répartition des présences</h2>
            <p className="text-sm text-gray-600">Pourcentage sur le semestre en cours</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{entry.name}: {entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Évolution mensuelle</h2>
            <p className="text-sm text-gray-600">Taux de présence par mois</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="present" fill="#10B981" name="Présent %" />
                  <Bar dataKey="absent" fill="#EF4444" name="Absent %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Historique détaillé</h2>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
              Exporter
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <Table columns={columns} data={attendanceData} />
        </CardContent>
      </Card>
    </div>
  );
};