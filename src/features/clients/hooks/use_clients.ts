import { useState, useEffect, useCallback } from 'react';
import { clientsService } from '../services/clients.service';
import type { Client, ClientFormData, ClientFilters } from '../types';

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<ClientFilters>({
    searchTerm: '',
    statusFilter: 'all',
  });

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const clientsData = await clientsService.getClients();
      setClients(clientsData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const createClient = async (clientData: ClientFormData): Promise<boolean> => {
    try {
      const newClient = await clientsService.createClient(clientData);
      if (newClient) {
        setClients(prev => [...prev, newClient]);
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.message || 'Failed to create client');
      return false;
    }
  };

  const updateClient = async (id: string, clientData: Partial<ClientFormData>): Promise<boolean> => {
    try {
      const updatedClient = await clientsService.updateClient(id, clientData);
      if (updatedClient) {
        setClients(prev => prev.map(client => client._id === id ? updatedClient : client));
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.message || 'Failed to update client');
      return false;
    }
  };

  const deleteClient = async (id: string): Promise<boolean> => {
    try {
      const success = await clientsService.deleteClient(id);
      if (success) {
        setClients(prev => prev.filter(client => client._id !== id));
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.message || 'Failed to delete client');
      return false;
    }
  };

  const updateFilters = useCallback((newFilters: Partial<ClientFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         client.clientId.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         client.contactEmail?.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesStatus = filters.statusFilter === 'all' || 
                         (filters.statusFilter === 'active' && client.isActive) ||
                         (filters.statusFilter === 'inactive' && !client.isActive);
    
    return matchesSearch && matchesStatus;
  });

  return {
    clients: filteredClients,
    loading,
    error,
    filters,
    createClient,
    updateClient,
    deleteClient,
    updateFilters,
    refetch: fetchClients,
  };
}; 