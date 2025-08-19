export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'readonly';
  clientId?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  clientId: string;
}

export interface UserFormData {
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'readonly';
  clientId: string;
  password: string;
}

export interface UserFilters {
  searchTerm: string;
  roleFilter: string;
  clientFilter: string;
} 