import React from 'react';
import { useAuth } from '../../contexts/auth_context';
import { Button } from './button';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  variant = 'outline',
  size = 'sm',
  className = '',
  showIcon = true,
  children
}) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button
      onClick={handleLogout}
      variant={variant}
      size={size}
      className={`flex items-center space-x-2 ${className}`}
    >
      {showIcon && <LogOut className="h-4 w-4" />}
      <span>{children || 'Logout'}</span>
    </Button>
  );
}; 