import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Building2,
  TrendingUp,
  UserPlus,
  FileText,
  ArrowRight,
  Shield
} from 'lucide-react';
import { useAuth } from '../contexts/auth_context';
import { LogoutButton } from '../components/common/logout_button';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Client Management', href: '/clients', icon: Building2 },
  { name: 'Prompt Logs', href: '/prompts', icon: MessageSquare },
  { name: 'Analytics & Reports', href: '/analytics', icon: TrendingUp },
  { name: 'User Management', href: '/users', icon: UserPlus },
  { name: 'Billing & Invoices', href: '/billing', icon: FileText },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-60 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-6">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-400 rounded-xl flex items-center justify-center">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-500">CircleScope</h1>
              <p className="text-base text-gray-500">AI Security Platform</p>
            </div>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-base font-medium text-gray-900">
                Welcome back, {user?.firstName}!
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-base font-medium text-white">
                {user?.firstName?.[0]}{user?.lastName?.[0] || 'SE'}
              </span>
            </div>
            <LogoutButton
              variant="outline"
              size="sm"
              className="text-gray-600 hover:text-gray-900 border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg transition-colors"
              showIcon={true}
            >
              Logout
            </LogoutButton>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="fixed top-20 left-0 z-40 w-64 h-full bg-white shadow-lg">
        <div className="flex flex-col h-full mt-4">
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md mb-4 ${
                    isActive
                      ? 'bg-blue-500 text-white shadow-lg hover:shadow-xl hover:text-blue-100'
                      : 'text-gray-600 hover:bg-blue-50 hover:text-black shadow-lg hover:shadow-md'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Quick Stats */}
          <div className="p-4 border-t border-gray-200 mt-auto mb-24">
            <div className="bg-blue-50 rounded-lg p-4 shadow-md border border-blue-100">
              <h3 className="text-sm font-semibold text-blue-900 mb-3">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-blue-700">Active Sessions</span>
                  <span className="text-xs font-medium text-green-600">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-blue-700">Today's Alerts</span>
                  <span className="text-xs font-medium text-orange-600">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-blue-700">System Health</span>
                  <span className="text-xs font-medium text-green-600">Excellent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200 absolute bottom-0 left-0 right-0">
            <LogoutButton
              variant="ghost"
              size="sm"
              className="w-full justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50 shadow-sm hover:shadow-md transition-all duration-200"
              showIcon={true}
            >
              Logout
            </LogoutButton>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pl-64">
        <main className="min-h-screen p-6 mt-4">
          {children}
        </main>
      </div>
    </div>
  );
}; 