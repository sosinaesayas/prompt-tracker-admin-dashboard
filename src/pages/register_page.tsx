import React from 'react';
import { RegisterForm } from '../features/auth';
import { Shield, Zap, Globe } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-center pt-8 pb-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">CircleScope</h1>
          <p className="text-gray-600 mb-1">Join CircleScope AI Security Platform</p>
          <p className="text-gray-500 text-sm">Start monitoring your AI prompts today</p>
        </div>
      </div>

      {/* Register Form */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </div>

      {/* Feature Icons */}
      <div className="flex justify-center pb-8 space-x-16 mt-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <p className="text-xs text-gray-600">Real-time Monitoring</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <p className="text-xs text-gray-600">AI Security</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <p className="text-xs text-gray-600">Multi-platform</p>
        </div>
      </div>
    </div>
  );
}; 