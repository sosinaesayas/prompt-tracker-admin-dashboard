import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  Activity, 
  MessageSquare, 
  AlertTriangle,
  Globe,
  TrendingUp,
  Zap,
  Settings,
  BarChart3
} from 'lucide-react';
import { DashboardLayout } from '../layouts/dashboard_layout';
import axios from 'axios';

interface ClientStats {
  totalPrompts: number;
  flaggedPrompts: number;
  activeAgents: number;
  topAiPlatforms: Array<{ name: string; count: number; percentage: number }>;
  topUsers: Array<{ name: string; prompts: number; flagged: number }>;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    severity?: string;
  }>;
}

interface Client {
  id: string;
  name: string;
  clientId: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  isActive: boolean;
  allowedDomains?: string[];
  settings?: any;
  createdAt: Date;
  updatedAt: Date;
}

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [stats, setStats] = useState<ClientStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      fetchClientData();
    }
  }, [id]);

  const fetchClientData = async () => {
    try {
      const [clientResponse, statsResponse] = await Promise.all([
        axios.get(`/clients/${id}`),
        axios.get(`/clients/${id}/stats`)
      ]);

      setClient(clientResponse.data.data);
      setStats(statsResponse.data.data.stats);
    } catch (error) {
      console.error('Failed to fetch client data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!client) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Client not found</h2>
          <button
            onClick={() => navigate('/clients')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Back to Clients
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ClientOverview stats={stats} />;
      case 'prompts':
        return <ClientPrompts clientId={client.clientId} />;
      case 'users':
        return <ClientUsers clientId={client.clientId} />;
      case 'settings':
        return <ClientSettings />;
      default:
        return <ClientOverview stats={stats} />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/clients')}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                {client.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
                <p className="text-gray-600">Client ID: {client.clientId}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              client.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {client.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'prompts', label: 'Prompt Logs', icon: MessageSquare },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

// Client Overview Component
const ClientOverview = ({ stats }: { stats: ClientStats | null }) => {
  if (!stats) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading client statistics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Endpoints Deployed</p>
              <p className="text-3xl font-bold">{stats.activeAgents}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <Zap className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Prompts</p>
              <p className="text-3xl font-bold">{stats.totalPrompts}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <MessageSquare className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Flagged Prompts</p>
              <p className="text-3xl font-bold">{stats.flaggedPrompts}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <AlertTriangle className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Flag Rate</p>
              <p className="text-3xl font-bold">
                {stats.totalPrompts > 0 ? ((stats.flaggedPrompts / stats.totalPrompts) * 100).toFixed(1) : 0}%
              </p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <TrendingUp className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top AI Platforms */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Top AI Platforms</h3>
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {stats.topAiPlatforms.map((platform) => (
              <div key={platform.name} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{platform.name.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{platform.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{platform.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Users */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Top Users</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {stats.topUsers.map((user) => (
              <div key={user.name} className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                    <p className="text-xs text-gray-500">{user.prompts} prompts</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900">{user.prompts}</span>
                  {user.flagged > 0 && (
                    <p className="text-xs text-red-500">{user.flagged} flagged</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
          <Activity className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {stats.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
              </div>
              {activity.severity && (
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  activity.severity === 'high' ? 'bg-red-100 text-red-800' :
                  activity.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {activity.severity}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Placeholder components for other tabs
const ClientPrompts = ({ clientId }: { clientId: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Prompt Logs for {clientId}</h3>
    <p className="text-gray-600">Prompt logs functionality will be implemented here.</p>
  </div>
);

const ClientUsers = ({ clientId }: { clientId: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Users for {clientId}</h3>
    <p className="text-gray-600">User management functionality will be implemented here.</p>
  </div>
);

const ClientSettings = () => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Client Settings</h3>
    <p className="text-gray-600">Settings functionality will be implemented here.</p>
  </div>
);

export default ClientDetail; 