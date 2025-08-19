import React, { useState } from 'react';
import { useUsers } from '../hooks/use_users';
import { UserFilters } from './user_filters';
import { UserTable } from './user_table';
import { UserForm } from './user_form';
import { Loading } from '../../../components/common/loading';
import { DashboardLayout } from '../../../layouts/dashboard_layout';
import type { User, UserFormData } from '../types';

export const UsersPage: React.FC = () => {
  const {
    users,
    clients,
    loading,
    error,
    filters,
    createUser,
    updateUser,
    deleteUser,
    updateFilters,
  } = useUsers();

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAdd = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(userId);
    }
  };

  const handleSubmit = async (userData: UserFormData): Promise<boolean> => {
    if (editingUser) {
      return await updateUser(editingUser.id, userData);
    } else {
      return await createUser(userData);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Loading size="lg" className="min-h-screen" />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Users</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        </div>

        <UserFilters
          filters={filters}
          clients={clients}
          onFiltersChange={updateFilters}
        />

        <UserTable
          users={users}
          clients={clients}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />

        <UserForm
          isOpen={showForm}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          user={editingUser}
          clients={clients}
        />
      </div>
    </DashboardLayout>
  );
}; 