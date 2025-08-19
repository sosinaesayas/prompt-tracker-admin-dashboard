import React from 'react';
import { useAnalytics } from '../hooks/use_analytics';
import { AnalyticsStats } from './analytics_stats';
import { RecentActivity } from './recent_activity';
import { Loading } from '../../../components/common/loading';
import { DashboardLayout } from '../../../layouts/dashboard_layout';

export const AnalyticsPage: React.FC = () => {
  const { stats, loading, error } = useAnalytics();

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
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Analytics</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!stats) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Analytics Data</h2>
            <p className="text-gray-600">No analytics data available.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        </div>

        <AnalyticsStats stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity stats={stats} />
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Platforms</h3>
            <div className="space-y-3">
              {stats.topPlatforms.map((platform) => (
                <div key={platform.name} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{platform.name}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {platform.count} ({platform.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}; 