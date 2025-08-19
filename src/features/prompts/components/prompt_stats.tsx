import React from 'react';
import { TrendingUp, AlertTriangle, Shield, Clock } from 'lucide-react';
import { Card } from '../../../components/common/card';
import type { PromptStats as PromptStatsType } from '../types';

interface PromptStatsProps {
  stats: PromptStatsType;
}

export const PromptStats: React.FC<PromptStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Prompts',
      value: stats.totalPrompts,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Flagged Prompts',
      value: stats.flaggedPrompts,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'High Risk',
      value: stats.highRiskPrompts,
      icon: Shield,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Recent Activity',
      value: stats.recentActivity.length,
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
  );
}; 