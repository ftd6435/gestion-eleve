import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Download, CheckCircle, Clock, CreditCard } from 'lucide-react';

export const Payments: React.FC = () => {
  const paymentsData = [
    { id: 'PAY001', date: '15/01/2024', description: 'Frais de scolarité - 2ème trimestre', amount: '150,00 €', status: 'paid', method: 'Carte bancaire', receipt: 'receipt_001.pdf' },
    { id: 'PAY002', date: '10/12/2023', description: 'Frais de cantine - Décembre', amount: '85,00 €', status: 'paid', method: 'Virement', receipt: 'receipt_002.pdf' },
    { id: 'PAY003', date: '01/12/2023', description: 'Assurance scolaire', amount: '25,00 €', status: 'paid', method: 'Chèque', receipt: 'receipt_003.pdf' },
    { id: 'PAY004', date: '15/11/2023', description: 'Frais de scolarité - 1er trimestre', amount: '150,00 €', status: 'paid', method: 'Carte bancaire', receipt: 'receipt_004.pdf' },
    { id: 'PAY005', date: '10/11/2023', description: 'Frais de cantine - Novembre', amount: '85,00 €', status: 'paid', method: 'Virement', receipt: 'receipt_005.pdf' },
    { id: 'PAY006', date: '01/10/2023', description: 'Fournitures scolaires', amount: '45,00 €', status: 'paid', method: 'Carte bancaire', receipt: 'receipt_006.pdf' },
    { id: 'PAY007', date: '15/09/2023', description: 'Inscription annuelle', amount: '75,00 €', status: 'paid', method: 'Virement', receipt: 'receipt_007.pdf' }
  ];

  const totalPaid = paymentsData.reduce((sum, payment) => {
    const amount = parseFloat(payment.amount.replace('€', '').replace(',', '.'));
    return sum + amount;
  }, 0);

  const columns = [
    { key: 'id', header: 'Référence' },
    { key: 'date', header: 'Date' },
    { key: 'description', header: 'Description' },
    {
      key: 'amount',
      header: 'Montant',
      render: (value: string) => (
        <span className="font-semibold text-green-600">{value}</span>
      )
    },
    {
      key: 'status',
      header: 'Statut',
      render: (value: string) => (
        <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium w-fit ${
          value === 'paid' 
            ? 'bg-green-100 text-green-600' 
            : 'bg-yellow-100 text-yellow-600'
        }`}>
          {value === 'paid' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
          {value === 'paid' ? 'Payé' : 'En attente'}
        </div>
      )
    },
    { key: 'method', header: 'Moyen de paiement' },
    {
      key: 'receipt',
      header: 'Reçu',
      render: (value: string) => (
        <button className="flex items-center text-green-600 hover:text-green-700 text-sm">
          <Download className="h-4 w-4 mr-1" />
          Télécharger
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Historique des paiements</h1>
        <p className="text-gray-600">Consultez l'historique de vos paiements et téléchargez vos reçus</p>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-800">Total payé</p>
                <p className="text-3xl font-bold text-green-900">{totalPaid.toLocaleString('fr-FR')} €</p>
                <p className="text-xs text-green-600">Année scolaire 2023-2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CreditCard className="h-10 w-10 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-800">Paiements</p>
                <p className="text-3xl font-bold text-blue-900">{paymentsData.length}</p>
                <p className="text-xs text-blue-600">Transactions effectuées</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Download className="h-10 w-10 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-800">Reçus</p>
                <p className="text-3xl font-bold text-orange-900">{paymentsData.length}</p>
                <p className="text-xs text-orange-600">Disponibles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Moyens de paiement utilisés</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
                  <span className="font-medium">Carte bancaire</span>
                </div>
                <span className="text-blue-600 font-semibold">320,00 €</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 text-green-600 mr-3" />
                  <span className="font-medium">Virement bancaire</span>
                </div>
                <span className="text-green-600 font-semibold">235,00 €</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 text-gray-600 mr-3" />
                  <span className="font-medium">Chèque</span>
                </div>
                <span className="text-gray-600 font-semibold">25,00 €</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Actions rapides</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center p-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                <Download className="h-5 w-5 mr-2" />
                Télécharger tous les reçus
              </button>
              <button className="w-full flex items-center justify-center p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <CreditCard className="h-5 w-5 mr-2" />
                Nouveau paiement
              </button>
              <button className="w-full flex items-center justify-center p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <CheckCircle className="h-5 w-5 mr-2" />
                Voir les frais à payer
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History Table */}
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
          <Table columns={columns} data={paymentsData} />
        </CardContent>
      </Card>
    </div>
  );
};