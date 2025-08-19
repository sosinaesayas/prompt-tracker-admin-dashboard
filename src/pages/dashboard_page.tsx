import React from 'react';
import { useAuth } from '../contexts/auth_context';
import { DashboardLayout } from '../layouts/dashboard_layout';
import { Card } from '../components/common/card';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  AlertTriangle,
  Plus
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Prompts',
      value: '1,234',
      change: '+12%',
      changeType: 'positive' as const,
      icon: MessageSquare,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Active Users',
      value: '89',
      change: '+5%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Flagged Prompts',
      value: '23',
      change: '-8%',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600">
              Welcome back, {user?.firstName} {user?.lastName}!
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Quick Action</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-gray-400 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-black text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <stat.icon className="h-8 w-8" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <div className="w-5 h-5"></div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New prompt logged from <span className="font-semibold">John Doe</span></p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">High-risk prompt flagged from <span className="font-semibold">Jane Smith</span></p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
              <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New user <span className="font-semibold">Mike Johnson</span> registered</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}; 