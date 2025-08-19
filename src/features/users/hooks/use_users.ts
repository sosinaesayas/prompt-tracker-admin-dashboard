import { useState, useEffect, useCallback } from 'react';
import { usersService } from '../services/users.service';
import type { User, Client, UserFormData, UserFilters } from '../types';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<UserFilters>({
    searchTerm: '',
    roleFilter: 'all',
    clientFilter: 'all',
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [usersData, clientsData] = await Promise.all([
        usersService.getUsers(),
        usersService.getClients(),
      ]);
      setUsers(usersData);
      setClients(clientsData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createUser = async (userData: UserFormData): Promise<boolean> => {
    try {
      const newUser = await usersService.createUser(userData);
      if (newUser) {
        setUsers(prev => [...prev, newUser]);
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.message || 'Failed to create user');
      return false;
    }
  };

  const updateUser = async (id: number, userData: Partial<UserFormData>): Promise<boolean> => {
    try {
      const updatedUser = await usersService.updateUser(id, userData);
      if (updatedUser) {
        setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.message || 'Failed to update user');
      return false;
    }
  };

  const deleteUser = async (id: number): Promise<boolean> => {
    try {
      const success = await usersService.deleteUser(id);
      if (success) {
        setUsers(prev => prev.filter(user => user.id !== id));
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.message || 'Failed to delete user');
      return false;
    }
  };

  const updateFilters = useCallback((newFilters: Partial<UserFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesRole = filters.roleFilter === 'all' || user.role === filters.roleFilter;
    const matchesClient = filters.clientFilter === 'all' || user.clientId === filters.clientFilter;
    
    return matchesSearch && matchesRole && matchesClient;
  });

  return {
    users: filteredUsers,
    clients,
    loading,
    error,
    filters,
    createUser,
    updateUser,
    deleteUser,
    updateFilters,
    refetch: fetchData,
  };
}; 