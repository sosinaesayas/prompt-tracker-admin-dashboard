import { apiService } from '../../../services/api';
import type { User, Client, UserFormData } from '../types';

export class UsersService {
  async getUsers(): Promise<User[]> {
    const response = await apiService.get<{ users: User[] }>('/users');
    return response.data?.users || [];
  }

  async getClients(): Promise<Client[]> {
    const response = await apiService.get<Client[]>('/clients');
    return response.data || [];
  }

  async createUser(userData: UserFormData): Promise<User | null> {
    const response = await apiService.post<User>('/users', userData);
    return response.data || null;
  }

  async updateUser(id: number, userData: Partial<UserFormData>): Promise<User | null> {
    const response = await apiService.patch<User>(`/users/${id}`, userData);
    return response.data || null;
  }

  async deleteUser(id: number): Promise<boolean> {
    const response = await apiService.delete<null>(`/users/${id}`);
    return response.success;
  }

  async activateUser(id: number): Promise<boolean> {
    const response = await apiService.patch<null>(`/users/${id}/activate`);
    return response.success;
  }

  async deactivateUser(id: number): Promise<boolean> {
    const response = await apiService.patch<null>(`/users/${id}/deactivate`);
    return response.success;
  }
}

export const usersService = new UsersService(); 