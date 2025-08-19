import React from 'react';
import { LogoutButton } from './logout_button';
import { LogOut } from 'lucide-react';

interface FloatingLogoutButtonProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
}

export const FloatingLogoutButton: React.FC<FloatingLogoutButtonProps> = ({
  position = 'top-right',
  className = ''
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      default:
        return 'top-4 right-4';
    }
  };

  return (
    <div className={`fixed ${getPositionClasses()} z-50 ${className}`}>
      <LogoutButton
        variant="default"
        size="sm"
        className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full p-3"
        showIcon={true}
      >
        <LogOut className="h-5 w-5" />
      </LogoutButton>
    </div>
  );
}; 