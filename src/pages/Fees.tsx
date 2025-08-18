import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { AlertTriangle, CheckCircle, CreditCard, Clock } from 'lucide-react';

export const Fees: React.FC = () => {
  const feesData = [
    { id: 'FEE001', description: 'Frais de scolarité - 3ème trimestre', amount: '150,00 €', dueDate: '15/03/2024', status: 'unpaid', priority: 'high' },
    { id: 'FEE002', description: 'Frais de cantine - Février', amount: '85,00 €', dueDate: '10/02/2024', status: 'unpaid', priority: 'high' },
    { id: 'FEE003', description: 'Sortie scolaire - Musée d\'Histoire', amount: '15,00 €', dueDate: '20/02/2024', status: 'unpaid', priority: 'medium' },
    { id: 'FEE004', description: 'Frais de scolarité - 2ème trimestre', amount: '150,00 €', dueDate: '15/01/2024', status: 'paid', priority: 'low' },
    { id: 'FEE005', description: 'Frais de cantine - Janvier', amount: '85,00 €', dueDate: '10/01/2024', status: 'paid', priority: 'low' }
  ];

  const unpaidFees = feesData.filter(fee => fee.status === 'unpaid');
  const totalUnpaid = unpaidFees.reduce((sum, fee) => {
    const amount = parseFloat(fee.amount.replace('€', '').replace(',', '.'));
    return sum + amount;
  }, 0);

  const overdueFees = unpaidFees.filter(fee => {
    const dueDate = new Date(fee.dueDate.split('/').reverse().join('-'));
    return dueDate < new Date();
  });

  const columns = [
    { key: 'id', header: 'Référence' },
    { key: 'description', header: 'Description' },
    {
      key: 'amount',
      header: 'Montant',
      render: (value: string) => (
        <span className="font-semibold text-gray-900">{value}</span>
      )
    },
    {
      key: 'dueDate',
      header: 'Date d\'échéance',
      render: (value: string, row: any) => {
        const dueDate = new Date(value.split('/').reverse().join('-'));
        const isOverdue = dueDate < new Date() && row.status === 'unpaid';
        return (
          <span className={isOverdue ? 'text-red-600 font-medium' : 'text-gray-900'}>
            {value}
          </span>
        );
      }
    },
    {
      key: 'status',
      header: 'Statut',
      render: (value: string, row: any) => {
        const dueDate = new Date(row.dueDate.split('/').reverse().join('-'));
        const isOverdue = dueDate < new Date() && value === 'unpaid';
        
        if (value === 'paid') {
          return (
            <div className="flex items-center px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs font-medium w-fit">
              <CheckCircle className="h-3 w-3 mr-1" />
              Payé
            </div>
          );
        }
        
        return (
          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium w-fit ${
            isOverdue 
              ? 'bg-red-100 text-red-600' 
              : 'bg-yellow-100 text-yellow-600'
          }`}>
            {isOverdue ? <AlertTriangle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
            {isOverdue ? 'En retard' : 'À payer'}
          </div>
        );
      }
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (value: any, row: any) => (
        row.status === 'unpaid' ? (
          <button className="flex items-center px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700">
            <CreditCard className="h-3 w-3 mr-1" />
            Payer
          </button>
        ) : (
          <span className="text-gray-400 text-xs">-</span>
        )
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Frais scolaires à payer</h1>
        <p className="text-gray-600">Gérez vos paiements de frais scolaires</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-10 w-10 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-red-800">Total à payer</p>
                <p className="text-3xl font-bold text-red-900">{totalUnpaid.toLocaleString('fr-FR')} €</p>
                <p className="text-xs text-red-600">{unpaidFees.length} frais en attente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-10 w-10 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-800">En retard</p>
                <p className="text-3xl font-bold text-orange-900">{overdueFees.length}</p>
                <p className="text-xs text-orange-600">Paiements en retard</p>
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
                <p className="text-sm font-medium text-blue-800">Prochaine échéance</p>
                <p className="text-2xl font-bold text-blue-900">10/02</p>
                <p className="text-xs text-blue-600">85,00 € - Cantine</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Fees Alert */}
      {overdueFees.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <h2 className="text-lg font-semibold text-red-900">Frais en retard</h2>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-4">
              Vous avez {overdueFees.length} frais en retard. Veuillez effectuer les paiements dès que possible pour éviter des pénalités.
            </p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
              Payer maintenant
            </button>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Actions rapides</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <CreditCard className="h-5 w-5 mr-2" />
                Payer tous les frais en attente
              </button>
              <button className="w-full flex items-center justify-center p-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                <Clock className="h-5 w-5 mr-2" />
                Configurer les paiements automatiques
              </button>
              <button className="w-full flex items-center justify-center p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Demander un échelonnement
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Moyens de paiement</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-600 mr-3" />
                  <span>Carte bancaire</span>
                </div>
                <span className="text-green-600 text-sm">Recommandé</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-600 mr-3" />
                  <span>Virement bancaire</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-600 mr-3" />
                  <span>PayPal</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fees Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Liste des frais</h2>
            <div className="flex space-x-2">
              <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                <option>Tous les statuts</option>
                <option>À payer</option>
                <option>Payés</option>
                <option>En retard</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table columns={columns} data={feesData} />
        </CardContent>
      </Card>
    </div>
  );
};