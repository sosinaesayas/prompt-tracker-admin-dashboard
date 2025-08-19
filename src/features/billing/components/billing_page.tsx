import React from 'react';
import { useBilling } from '../hooks/use_billing';
import { Loading } from '../../../components/common/loading';
import { DashboardLayout } from '../../../layouts/dashboard_layout';
import { Card } from '../../../components/common/card';
import { CreditCard, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export const BillingPage: React.FC = () => {
  const { stats, loading, error } = useBilling();

  if (loading) {
    return (
      <DashboardLayout>
        <Loading size="lg" className="min-h-screen" />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Billing</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: stats ? `$${stats.totalRevenue.toLocaleString()}` : '$0',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Monthly Revenue',
      value: stats ? `$${stats.monthlyRevenue.toLocaleString()}` : '$0',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Outstanding Invoices',
      value: stats ? stats.outstandingInvoices.toString() : '0',
      icon: CreditCard,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Overdue Amount',
      value: stats ? `$${stats.overdueAmount.toLocaleString()}` : '$0',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
            <p className="text-gray-600">Payment methods management will be implemented here.</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Invoices</h3>
            <p className="text-gray-600">Invoice management will be implemented here.</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}; 