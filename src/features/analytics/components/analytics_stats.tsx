import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, MessageSquare } from 'lucide-react';
import { Card } from '../../../components/common/card';
import type { AnalyticsStats as AnalyticsStatsType } from '../types';

interface AnalyticsStatsProps {
  stats: AnalyticsStatsType;
}

export const AnalyticsStats: React.FC<AnalyticsStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Prompts',
      value: stats.totalPrompts,
      icon: MessageSquare,
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
      title: 'Flag Rate',
      value: `${stats.totalPrompts > 0 ? ((stats.flaggedPrompts / stats.totalPrompts) * 100).toFixed(1) : 0}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'High Risk',
      value: stats.highRiskPrompts,
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
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
              <p className="text-sm font-medium text-black">{stat.title}</p>
              <p className="text-2xl font-semibold text-black">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}; 