import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp, Award } from 'lucide-react';

export const Rankings: React.FC = () => {
  const performanceData = [
    { subject: 'Français', yourGrade: '85%', classAverage: '82%', yourRank: 3 },
    { subject: 'Mathématiques', yourGrade: '92%', classAverage: '88%', yourRank: 1 },
    { subject: 'Histoire-Géographie', yourGrade: '78%', classAverage: '75%', yourRank: 7 },
    { subject: 'Sciences', yourGrade: '89%', classAverage: '87%', yourRank: 2 },
    { subject: 'Anglais', yourGrade: '80%', classAverage: '80%', yourRank: 5 },
    { subject: 'Arts Plastiques', yourGrade: '95%', classAverage: '90%', yourRank: 1 },
    { subject: 'Éducation Physique et Sportive', yourGrade: '90%', classAverage: '85%', yourRank: 2 }
  ];

  const trendData = [
    { month: 'Sep', average: 82 },
    { month: 'Oct', average: 85 },
    { month: 'Nov', average: 87 },
    { month: 'Dec', average: 86 },
    { month: 'Jan', average: 88 },
    { month: 'Fév', average: 90 }
  ];

  const columns = [
    { key: 'subject', header: 'Matière' },
    {
      key: 'yourGrade',
      header: 'Votre moyenne',
      render: (value: string) => (
        <span className="font-semibold text-green-600">{value}</span>
      )
    },
    {
      key: 'classAverage',
      header: 'Moyenne de la classe',
      render: (value: string) => (
        <span className="text-orange-600 font-medium">{value}</span>
      )
    },
    {
      key: 'yourRank',
      header: 'Votre rang',
      render: (value: number) => (
        <div className="flex items-center">
          {value <= 3 && <Trophy className="h-4 w-4 text-yellow-500 mr-1" />}
          <span className={`font-bold ${value <= 3 ? 'text-yellow-600' : 'text-gray-900'}`}>
            {value}
          </span>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Classement et moyenne de la classe</h1>
        <p className="text-gray-600">Aperçu de vos notes et de votre classement par matière</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-10 w-10 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-800">Votre moyenne générale actuelle</p>
                <p className="text-4xl font-bold text-green-900">88.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Award className="h-10 w-10 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-800">Votre classement dans la classe</p>
                <p className="text-4xl font-bold text-orange-900">5ème/30</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance by Subject */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Performances par matière</h2>
          <p className="text-sm text-gray-600">Aperçu de vos notes et de votre classement par matière.</p>
        </CardHeader>
        <CardContent>
          <Table columns={columns} data={performanceData} />
        </CardContent>
      </Card>

      {/* Trend Chart */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Tendance de la moyenne générale</h2>
          <p className="text-sm text-gray-600">Evolution de votre moyenne générale au fil des mois.</p>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="average" 
                  stroke="#059669" 
                  strokeWidth={3}
                  dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};