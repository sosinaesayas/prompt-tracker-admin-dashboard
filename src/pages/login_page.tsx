import React from 'react';
import { LoginForm } from '../features/auth/components/login_form';

export const LoginPage: React.FC = () => {
  console.log('LoginPage rendered');
  console.log('API URL:', import.meta.env.VITE_API_URL);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your CircleScope account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}; 