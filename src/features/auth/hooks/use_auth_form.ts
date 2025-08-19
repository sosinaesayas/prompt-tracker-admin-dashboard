import { useState } from 'react';
import type { LoginFormData, RegisterFormData, AuthFormErrors } from '../types';

export const useAuthForm = () => {
  const [errors, setErrors] = useState<AuthFormErrors>({});

  const validateLogin = (data: LoginFormData): boolean => {
    const newErrors: AuthFormErrors = {};

    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!data.password) {
      newErrors.password = 'Password is required';
    } else if (data.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = (data: RegisterFormData): boolean => {
    const newErrors: AuthFormErrors = {};

    if (!data.firstName) {
      newErrors.firstName = 'First name is required';
    } else if (data.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!data.lastName) {
      newErrors.lastName = 'Last name is required';
    } else if (data.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!data.password) {
      newErrors.password = 'Password is required';
    } else if (data.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validateLogin,
    validateRegister,
    clearErrors,
  };
}; 