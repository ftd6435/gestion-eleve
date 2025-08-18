import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Download, TrendingUp, Award } from 'lucide-react';

import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import { downloadTranscript } from '../components/ui/Transcript';

export const Grades: React.FC = () => {
  const gradesData = [
    { subject: 'Mathématiques', grade: '18/20', average: '16.5/20', coefficient: '4', lastExam: '15/01/2024' },
    { subject: 'Français', grade: '16/20', average: '15.8/20', coefficient: '4', lastExam: '12/01/2024' },
    { subject: 'Sciences', grade: '17/20', average: '16.2/20', coefficient: '3', lastExam: '10/01/2024' },
    { subject: 'Histoire-Géographie', grade: '15/20', average: '14.9/20', coefficient: '3', lastExam: '08/01/2024' },
    { subject: 'Anglais', grade: '16/20', average: '15.5/20', coefficient: '3', lastExam: '05/01/2024' },
    { subject: 'Arts Plastiques', grade: '19/20', average: '17.8/20', coefficient: '2', lastExam: '03/01/2024' },
    { subject: 'Éducation Physique', grade: '18/20', average: '17.2/20', coefficient: '2', lastExam: '02/01/2024' }
  ];

  const columns = [
    { key: 'subject', header: 'Matière' },
    {
      key: 'grade',
      header: 'Dernière note',
      render: (value: string, row: any) => (
        <span className="font-semibold text-green-600">{value}</span>
      )
    },
    // {
    //   key: 'average',
    //   header: 'Moyenne générale',
    //   render: (value: string) => (
    //     <span className="font-medium text-gray-900">{value}</span>
    //   )
    // },
    { key: 'coefficient', header: 'Coefficient' },
    { key: 'lastExam', header: 'Dernier examen' }
  ];

  const reportCards = [
    {
      title: 'Bulletin du 1er Trimestre',
      date: '15 Décembre 2023',
      average: '16.2/20',
      status: 'Disponible',
      grades: [
        { subject: 'Mathématiques', months: ['18/20', '17/20', '19/20'], average: '18/20' },
        { subject: 'Français', months: ['16/20', '15/20', '17/20'], average: '16/20' },
        { subject: 'Sciences', months: ['17/20', '18/20', '17/20'], average: '17.3/20' },
        { subject: 'Histoire-Géo', months: ['15/20', '14/20', '16/20'], average: '15/20' },
        { subject: 'Anglais', months: ['16/20', '15/20', '17/20'], average: '16/20' },
      ],
    },
    {
      title: 'Bulletin du 2ème Trimestre',
      date: '15 Mars 2024',
      average: '-',
      status: 'En cours',
      grades: [], // empty or partial
    },
    {
      title: 'Bulletin du 3ème Trimestre',
      date: '15 Juin 2024',
      average: '-',
      status: 'À venir',
      grades: [], // empty or partial
    }
  ];


  const tableRef = React.useRef<HTMLDivElement>(null);

  const exportGradesPDF = async () => {
    if (!tableRef.current) return;
    const canvas = await html2canvas(tableRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('landscape', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pdfWidth = pageWidth - 40;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 20, 20, pdfWidth, pdfHeight);
    pdf.save('notes_detail.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Notes et Bulletins</h1>
        <p className="text-gray-600">Consultez vos performances académiques</p>
      </div>

      {/* Academic Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-800">Moyenne Générale</p>
                <p className="text-2xl font-bold text-green-900">16.4/20</p>
                <p className="text-xs text-green-600">+0.3 pts ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-800">Classement</p>
                <p className="text-2xl font-bold text-blue-900">5ème/30</p>
                <p className="text-xs text-blue-600">Top 17%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Download className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-800">Bulletins</p>
                <p className="text-2xl font-bold text-orange-900">1</p>
                <p className="text-xs text-orange-600">Disponible</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grades Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Détail des notes par matière</h2>
            <button onClick={exportGradesPDF} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
              Exporter les notes
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <Table columns={columns} data={gradesData} ref={tableRef} />
        </CardContent>
      </Card>

      {/* Report Cards */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Bulletins de notes</h2>
        </CardHeader>
        <CardContent>
          {reportCards.map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Download className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-600">Date de publication: {report.date}</p>
                  {report.average !== '-' && (
                    <p className="text-sm text-green-600 font-medium">Moyenne: {report.average}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  report.status === 'Disponible'
                    ? 'bg-green-100 text-green-800'
                    : report.status === 'En cours'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {report.status}
                </span>
                {report.status === 'Disponible' && (
                  <button
                    onClick={() => downloadTranscript(report)}
                    className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700"
                  >
                    Télécharger
                  </button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};