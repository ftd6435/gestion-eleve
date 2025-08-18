import React, { useRef } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Clock, MapPin, User } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const Timetable: React.FC = () => {
  const tableRef = useRef<HTMLDivElement>(null);

  const timetableData = [
    { time: '08:00 - 09:00', monday: 'Mathématiques\nM. Sonomou\nSalle 101', tuesday: 'Français\nMme Diallo\nSalle 205', wednesday: 'Sciences\nM. Bah\nLabo A', thursday: 'Histoire\nMme Sylla\nSalle 302', friday: 'Anglais\nMs. Barry\nSalle 110' },
    { time: '09:00 - 10:00', monday: 'Français\nMme Diallo\nSalle 205', tuesday: 'Mathématiques\nM. Sonomou\nSalle 101', wednesday: 'Éducation Physique\nM. Conde\nGymnase', thursday: 'Sciences\nM. Bah\nLabo A', friday: 'Arts Plastiques\nMme Keita\nAtelier' },
    { time: '10:15 - 11:15', monday: 'Sciences\nM. Bah\nLabo A', tuesday: 'Histoire\nMme Sylla\nSalle 302', wednesday: 'Mathématiques\nM. Sonomou\nSalle 101', thursday: 'Anglais\nMs. Barry\nSalle 110', friday: 'Français\nMme Diallo\nSalle 205' },
    { time: '11:15 - 12:15', monday: 'Anglais\nMs. Barry\nSalle 110', tuesday: 'Éducation Physique\nM. Conde\nGymnase', wednesday: 'Français\nMme Diallo\nSalle 205', thursday: 'Arts Plastiques\nMme Keita\nAtelier', friday: 'Histoire\nMme Sylla\nSalle 302' },
    { time: '14:00 - 15:00', monday: 'Histoire\nMme Sylla\nSalle 302', tuesday: 'Sciences\nM. Bah\nLabo A', wednesday: 'Anglais\nMs. Barry\nSalle 110', thursday: 'Mathématiques\nM. Sonomou\nSalle 101', friday: 'Éducation Physique\nM. Conde\nGymnase' },
    { time: '15:00 - 16:00', monday: 'Arts Plastiques\nMme Keita\nAtelier', tuesday: 'Anglais\nMs. Barry\nSalle 110', wednesday: 'Histoire\nMme Sylla\nSalle 302', thursday: 'Français\nMme Diallo\nSalle 205', friday: 'Sciences\nM. Bah\nLabo A' }
  ];

  const renderTimetableCell = (value: string) => {
    if (!value) return <div className="p-2 text-gray-400">-</div>;
    const [subject, teacher, room] = value.split('\n');

    return (
      <div className="p-2 bg-green-50 border border-green-200 rounded-md">
        <div className="font-medium text-gray-900 text-sm mb-1">{subject}</div>
        <div className="flex items-center text-xs text-gray-600 mb-1">
          <User size={12} className="mr-1" />
          {teacher}
        </div>
        <div className="flex items-center text-xs text-gray-600">
          <MapPin size={12} className="mr-1" />
          {room}
        </div>
      </div>
    );
  };

  const columns = [
    {
      key: 'time',
      header: 'Heure',
      width: '120px',
      render: (value: string) => (
        <div className="flex items-center text-sm font-medium text-gray-900">
          <Clock size={16} className="mr-2 text-gray-400" />
          {value}
        </div>
      )
    },
    { key: 'monday', header: 'Lundi', render: renderTimetableCell },
    { key: 'tuesday', header: 'Mardi', render: renderTimetableCell },
    { key: 'wednesday', header: 'Mercredi', render: renderTimetableCell },
    { key: 'thursday', header: 'Jeudi', render: renderTimetableCell },
    { key: 'friday', header: 'Vendredi', render: renderTimetableCell }
  ];

  const downloadPDF = async () => {
    if (!tableRef.current) return;
    const canvas = await html2canvas(tableRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('landscape', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    // const pageHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth - 40;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 20, 20, pdfWidth, pdfHeight);
    pdf.save('emploi_du_temps.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Emploi du temps hebdomadaire</h1>
        <p className="text-gray-600">Classe de 10ème année - Section A</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Semaine du 15 au 19 Janvier 2024</h2>
            <button
              onClick={downloadPDF}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
            >
              Télécharger PDF
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div ref={tableRef} className="overflow-x-auto">
            <Table columns={columns} data={timetableData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
