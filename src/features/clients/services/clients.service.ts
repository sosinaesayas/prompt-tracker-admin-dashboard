import { apiService } from '../../../services/api';
import type { Client, ClientFormData } from '../types';

export class ClientsService {
  async getClients(): Promise<Client[]> {
    const response = await apiService.get<Client[]>('/clients');
    return response.data || [];
  }

  async getClientById(id: string): Promise<Client | null> {
    const response = await apiService.get<Client>(`/clients/${id}`);
    return response.data || null;
  }

  async createClient(clientData: ClientFormData): Promise<Client | null> {
    const response = await apiService.post<Client>('/clients', clientData);
    return response.data || null;
  }

  async updateClient(id: string, clientData: Partial<ClientFormData>): Promise<Client | null> {
    const response = await apiService.patch<Client>(`/clients/${id}`, clientData);
    return response.data || null;
  }

  async deleteClient(id: string): Promise<boolean> {
    const response = await apiService.delete<null>(`/clients/${id}`);
    return response.success;
  }

  async activateClient(id: string): Promise<boolean> {
    const response = await apiService.patch<null>(`/clients/${id}/activate`);
    return response.success;
  }

  async deactivateClient(id: string): Promise<boolean> {
    const response = await apiService.patch<null>(`/clients/${id}/deactivate`);
    return response.success;
  }
}

export const clientsService = new ClientsService(); 