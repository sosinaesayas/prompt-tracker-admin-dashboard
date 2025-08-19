import React from 'react';
import { Card } from '../../../components/common/card';
import type { AnalyticsStats } from '../types';

interface RecentActivityProps {
  stats: AnalyticsStats;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ stats }) => {
  const getActivityColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {stats.recentActivity.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <div className={`h-2 w-2 rounded-full ${getActivityColor(activity.riskLevel)}`}></div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 font-medium">
                {activity.aiPlatform} - {activity.source}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {activity.prompt.substring(0, 100)}...
              </p>
            </div>
            <span className="text-xs text-gray-400">
              {new Date(activity.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}; 