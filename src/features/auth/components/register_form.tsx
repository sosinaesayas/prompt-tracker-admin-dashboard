import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth_context';
import { useAuthForm } from '../hooks/use_auth_form';
import { Button, PasswordInput } from '../../../components/common';
import { LogIn } from 'lucide-react';
import type { RegisterFormData } from '../types';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { errors, validateRegister, clearErrors } = useAuthForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    setError('');

    console.log('Register attempt with:', { 
      email: formData.email, 
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: '***' 
    });

    if (!validateRegister(formData)) {
      console.log('Validation failed:', errors);
      return;
    }

    setLoading(true);
    try {
      console.log('Calling register service...');
      await register(formData);
      console.log('Registration successful, navigating to dashboard');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Registration failed:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText
      });
      setError(error.response?.data?.message || error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof RegisterFormData) => (
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
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              First Name *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={handleChange('firstName')}
              placeholder="John"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
              required
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={handleChange('lastName')}
              placeholder="Doe"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
              required
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            placeholder="john.doe@company.com"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <PasswordInput
          label="Password *"
          value={formData.password}
          onChange={handleChange('password')}
          placeholder="Create a strong password"
          error={errors.password}
          className="px-4 py-3 rounded-lg"
          required
        />

        <PasswordInput
          label="Confirm Password *"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          className="px-4 py-3 rounded-lg"
          required
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Create Account
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-5">Already have an account?</p>
          <Link
            to="/login"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            <LogIn className="h-4 w-4 mr-1" />
            Sign in to your account
          </Link>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our Terms of Service and
          </p>
        </div>
      </form>
    </div>
  );
}; 