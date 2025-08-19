import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth_context';
import { useAuthForm } from '../hooks/use_auth_form';
import { Button, PasswordInput } from '../../../components/common';
import { UserPlus } from 'lucide-react';
import type { LoginFormData } from '../types';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { errors, validateLogin, clearErrors } = useAuthForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    setError('');

    console.log('Login attempt with:', { email: formData.email, password: '***' });

    if (!validateLogin(formData)) {
      console.log('Validation failed:', errors);
      return;
    }

    setLoading(true);
    try {
      console.log('Calling login service...');
      await login(formData);
      console.log('Login successful, navigating to dashboard');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login failed:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText
      });
      setError(error.response?.data?.message || error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            placeholder="youremail@gmail.com"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <PasswordInput
            label="Password"
            value={formData.password}
            onChange={handleChange('password')}
            placeholder="Enter your password"
            error={errors.password}
            className="px-4 py-3 rounded-lg"
            required
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Sign In
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-5">Don't have an account?</p>
          <Link
            to="/register"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Create a new account
          </Link>
        </div>
      </form>
    </div>
  );
}; 