import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, MessageSquare } from 'lucide-react';
import axios from 'axios';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalPrompts: 0,
    flaggedPrompts: 0,
    highRiskPrompts: 0,
    mediumRiskPrompts: 0,
    lowRiskPrompts: 0,
    topPlatforms: [],
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:3000/prompts/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Prompts</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalPrompts}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Flagged Prompts</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.flaggedPrompts}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Flag Rate</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalPrompts > 0 ? ((stats.flaggedPrompts / stats.totalPrompts) * 100).toFixed(1) : 0}%
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">High Risk</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.highRiskPrompts}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Risk Distribution
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">High Risk</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full" 
                      style={{ width: `${stats.totalPrompts > 0 ? (stats.highRiskPrompts / stats.totalPrompts) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">{stats.highRiskPrompts}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Medium Risk</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-yellow-600 h-2 rounded-full" 
                      style={{ width: `${stats.totalPrompts > 0 ? (stats.mediumRiskPrompts / stats.totalPrompts) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">{stats.mediumRiskPrompts}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Low Risk</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${stats.totalPrompts > 0 ? (stats.lowRiskPrompts / stats.totalPrompts) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">{stats.lowRiskPrompts}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top AI Platforms */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Top AI Platforms
            </h3>
            {stats.topPlatforms && stats.topPlatforms.length > 0 ? (
              <div className="space-y-3">
                {stats.topPlatforms.map((platform: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{platform.name}</span>
                    <span className="text-sm text-gray-500">{platform.count} prompts</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2">No platform data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          {stats.recentActivity && stats.recentActivity.length > 0 ? (
            <div className="space-y-3">
              {stats.recentActivity.map((activity: any, index: number) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{activity.description}</p>
                    <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2">No recent activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics; 