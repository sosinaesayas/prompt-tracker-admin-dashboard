import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  MessageSquare, 
  AlertTriangle, 
  Settings, 
  LogOut,
  BarChart3,
  Shield,
  Activity,
  TrendingUp,
  Eye,
  Zap,
  Globe,
  CreditCard,
  FileText,
  Building2,
  UserPlus
} from 'lucide-react';
import Clients from './Clients';
import Prompts from './Prompts';
import Analytics from './Analytics';
import UsersComponent from './Users';
import Billing from './Billing';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'clients':
        return <Clients />;
      case 'prompts':
        return <Prompts />;
      case 'analytics':
        return <Analytics />;
      case 'users':
        return <UsersComponent />;
      case 'billing':
        return <Billing />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm w-full">
        <div className="w-full px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  CircleScope
                </h1>
                <p className="text-xs text-gray-500">AI Security Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  Welcome back, {user?.firstName}!
                </p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-8 py-8">
        <div className="flex gap-8 w-full">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeTab === 'overview'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-white hover:text-gray-900 hover:shadow-md'
                }`}
              >
                <BarChart3 className="mr-3 h-5 w-5" />
                Dashboard Overview
              </button>
              <button
                onClick={() => setActiveTab('clients')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeTab === 'clients'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-white hover:text-gray-900 hover:shadow-md'
                }`}
              >
                <Building2 className="mr-3 h-5 w-5" />
                Client Management
              </button>
              <button
                onClick={() => setActiveTab('prompts')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeTab === 'prompts'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-white hover:text-gray-900 hover:shadow-md'
                }`}
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                Prompt Logs
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeTab === 'analytics'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-white hover:text-gray-900 hover:shadow-md'
                }`}
              >
                <Activity className="mr-3 h-5 w-5" />
                Analytics & Reports
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeTab === 'users'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-white hover:text-gray-900 hover:shadow-md'
                }`}
              >
                <UserPlus className="mr-3 h-5 w-5" />
                User Management
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeTab === 'billing'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-white hover:text-gray-900 hover:shadow-md'
                }`}
              >
                <CreditCard className="mr-3 h-5 w-5" />
                Billing & Invoices
              </button>
            </nav>

            {/* Quick Stats */}
            <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Sessions</span>
                  <span className="text-sm font-semibold text-green-500">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Today's Alerts</span>
                  <span className="text-sm font-semibold text-orange-500">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">System Health</span>
                  <span className="text-sm font-semibold text-green-500">Excellent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Overview Component
const Overview = () => {
  return (
    <div className="space-y-8 w-full">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Monitor your AI security platform in real-time</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-6 rounded-2xl shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Clients</p>
              <p className="text-3xl font-bold">24</p>
              <p className="text-blue-100 text-xs mt-1">+12% from last month</p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <Users className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-500 p-6 rounded-2xl shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Prompts</p>
              <p className="text-3xl font-bold">1,847</p>
              <p className="text-green-100 text-xs mt-1">+8% from yesterday</p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <MessageSquare className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-red-400 p-6 rounded-2xl shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Flagged Prompts</p>
              <p className="text-3xl font-bold">23</p>
              <p className="text-orange-100 text-xs mt-1">1.2% flag rate</p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <AlertTriangle className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-500 p-6 rounded-2xl shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Active Agents</p>
              <p className="text-3xl font-bold">156</p>
              <p className="text-purple-100 text-xs mt-1">Across 12 clients</p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <Zap className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Risk Distribution</h3>
            <Eye className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">High Risk</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-red-400 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
                <span className="text-sm font-semibold text-gray-900">15%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Medium Risk</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <span className="text-sm font-semibold text-gray-900">25%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Low Risk</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <span className="text-sm font-semibold text-gray-900">60%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Top AI Platforms</h3>
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">C</span>
                </div>
                <span className="text-sm font-medium text-gray-700">ChatGPT</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">45%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Gemini</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">28%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-400 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">C</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Claude</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">27%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
          <TrendingUp className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">High-risk prompt detected</p>
              <p className="text-xs text-gray-500">ChatGPT • 2 minutes ago</p>
            </div>
            <span className="text-xs font-semibold text-red-500 bg-red-100 px-2 py-1 rounded-full">High Risk</span>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New client onboarded</p>
              <p className="text-xs text-gray-500">TechCorp Inc • 15 minutes ago</p>
            </div>
            <span className="text-xs font-semibold text-green-500 bg-green-100 px-2 py-1 rounded-full">New</span>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
            <div className="w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">System health check completed</p>
              <p className="text-xs text-gray-500">All systems operational • 1 hour ago</p>
            </div>
            <span className="text-xs font-semibold text-green-500 bg-green-100 px-2 py-1 rounded-full">Healthy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 