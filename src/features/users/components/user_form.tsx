import React, { useState, useEffect } from 'react';
import { Modal } from '../../../components/common/modal';
import { Input } from '../../../components/common/input';
import { Button } from '../../../components/common/button';
import type { User, Client, UserFormData } from '../types';

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: UserFormData) => Promise<boolean>;
  user?: User | null ;
  clients: Client[];
}

export const UserForm: React.FC<UserFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  user,
  clients,
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    firstName: '',
    lastName: '',
    role: 'user',
    clientId: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        clientId: user.clientId || '',
        password: '',
      });
    } else {
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        role: 'user',
        clientId: '',
        password: '',
      });
    }
  }, [user]);

  const handleChange = (field: keyof UserFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await onSubmit(formData);
      if (success) {
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? 'Edit User' : 'Add User'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={formData.firstName}
            onChange={handleChange('firstName')}
            required
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange('lastName')}
            required
          />
        </div>

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          required
        />

        {!user && (
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
            required
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={handleChange('role')}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="readonly">Read Only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client
            </label>
            <select
              value={formData.clientId}
              onChange={handleChange('clientId')}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            >
              <option value="">No Client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
          >
            {user ? 'Update' : 'Create'} User
          </Button>
        </div>
      </form>
    </Modal>
  );
}; 